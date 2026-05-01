#!/usr/bin/env python3
"""Build and run a resumable OpenAI image batch for recipe dish images."""

from __future__ import annotations

import argparse
import base64
import csv
import json
import os
import shutil
import subprocess
import sys
import time
import zipfile
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from PIL import Image


REPO_ROOT = Path(__file__).resolve().parents[1]
ARTIFACT_DIR = REPO_ROOT / "artifacts" / "recipe_images"
BACKUP_DIR = REPO_ROOT / "backups"
CSV_PATH = ARTIFACT_DIR / "recipe_image_requests.csv"
JSONL_PATH = ARTIFACT_DIR / "recipe_image_requests.jsonl"
STATE_PATH = ARTIFACT_DIR / "recipe_image_batch_state.json"
OUTPUT_JSONL_PATH = ARTIFACT_DIR / "recipe_image_batch_output.jsonl"
ERROR_JSONL_PATH = ARTIFACT_DIR / "recipe_image_batch_errors.jsonl"
NEW_PNGS_DIR = ARTIFACT_DIR / "new_pngs"
MANIFEST_PATH = ARTIFACT_DIR / "manifest.csv"

API_BASE = os.environ.get("OPENAI_API_BASE", "https://api.openai.com/v1").rstrip("/")
API_KEY = os.environ.get("OPENAI_API_KEY")
BATCHES_PATH = os.environ.get("OPENAI_BATCHES_PATH", "/batches")
FILES_PATH = os.environ.get("OPENAI_FILES_PATH", "/files")
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
SIZE = os.environ.get("OPENAI_IMAGE_SIZE", "1024x1024")
QUALITY = os.environ.get("OPENAI_IMAGE_QUALITY", "medium")
POLL_INTERVAL_SECONDS = int(os.environ.get("OPENAI_BATCH_POLL_INTERVAL_SECONDS", "600"))
WEBP_QUALITY = int(os.environ.get("WEBP_QUALITY", "90"))
TARGET_COLLECTION = "worlds-best-remix"


@dataclass(frozen=True)
class RecipeImageRequest:
    custom_id: str
    restaurant_name: str
    chef_name: str
    location: str
    course: str
    dish_name: str
    dish_description: str
    wine_pairing: str
    dining_room_description: str
    source_webp_path: str
    prompt: str
    output_png_path: str
    model: str = MODEL
    size: str = SIZE
    quality: str = QUALITY


def now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def slugify(text: str, *, max_length: int = 96) -> str:
    chars: list[str] = []
    for ch in text.lower():
        if ch.isalnum():
            chars.append(ch)
        else:
            chars.append("-")
    slug = "".join(chars)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")[:max_length].strip("-")


def image_path_part(text: str) -> str:
    return text.replace(" ", "_")


def dish_webp_path(chef_name: str, restaurant_name: str, course: str, description: str) -> str:
    filename = "-".join(
        [
            image_path_part(chef_name),
            image_path_part(restaurant_name),
            image_path_part(course),
            image_path_part(description),
        ]
    )
    return f"dish_pictures/{filename}.webp"


def load_menu_data() -> list[dict[str, Any]]:
    script = """
      import('./menu_display_2/src/menuData.js')
        .then((module) => process.stdout.write(JSON.stringify(module.default)))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    """
    result = subprocess.run(
        ["node", "-e", script],
        cwd=REPO_ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return json.loads(result.stdout)


def load_target_menus() -> list[dict[str, Any]]:
    menus = [menu for menu in load_menu_data() if menu.get("collection") == TARGET_COLLECTION]
    if not menus:
        raise RuntimeError(f"no menus tagged with collection={TARGET_COLLECTION!r} were found")
    return menus


def build_prompt(
    *,
    restaurant_name: str,
    chef_name: str,
    location: str,
    course: str,
    dish_description: str,
    wine_pairing: str,
    dining_room_description: str,
) -> str:
    return (
        "Square 1024x1024 fine-dining editorial food photograph for a luxury digital tasting menu. "
        "Create a photorealistic plated dish with natural restaurant lighting, refined composition, "
        "crisp textures, appetizing color, shallow depth of field, and elegant negative space. "
        "Keep the plating disciplined and credible, with a clear sense of sauce placement, garnish restraint, and chef-driven luxury. "
        "No text, no logos, no watermarks, no hands, no utensils dominating the frame, no recipe card. "
        f"Restaurant context: {restaurant_name} in {location}, led by {chef_name}. "
        f"Dining room mood: {dining_room_description} "
        f"Course: {course}. Dish: {dish_description}. "
        f"Wine pairing influence: {wine_pairing}. "
        "Let the plating, garnish, table surface, and background atmosphere quietly reflect the restaurant's cuisine, the pairing style, and the room's level of formality."
    )


def build_requests() -> list[RecipeImageRequest]:
    requests: list[RecipeImageRequest] = []
    for menu_index, menu in enumerate(load_target_menus(), start=1):
        tasting_menu = menu.get("tasting_menu", [])
        for course_index, item in enumerate(tasting_menu, start=1):
            restaurant_name = menu["restaurant_name"]
            chef_name = menu["chef_name"]
            location = menu["location"]
            course = item["course"]
            description = item["description"]
            custom_id = (
                f"recipe-image-{len(requests) + 1:03d}-"
                f"{slugify(restaurant_name, max_length=34)}-"
                f"{slugify(course, max_length=24)}"
            )
            output_png_path = f"artifacts/recipe_images/new_pngs/{custom_id}.png"
            prompt = build_prompt(
                restaurant_name=restaurant_name,
                chef_name=chef_name,
                location=location,
                course=course,
                dish_description=description,
                wine_pairing=item.get("wine_pairing", ""),
                dining_room_description=menu.get("dining_room_description", ""),
            )
            requests.append(
                RecipeImageRequest(
                    custom_id=custom_id,
                    restaurant_name=restaurant_name,
                    chef_name=chef_name,
                    location=location,
                    course=course,
                    dish_name=description,
                    dish_description=description,
                    wine_pairing=item.get("wine_pairing", ""),
                    dining_room_description=menu.get("dining_room_description", ""),
                    source_webp_path=dish_webp_path(chef_name, restaurant_name, course, description),
                    prompt=prompt,
                    output_png_path=output_png_path,
                )
            )
    return requests


def generate_csv() -> None:
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "custom_id",
        "restaurant_name",
        "chef_name",
        "location",
        "course",
        "dish_name",
        "dish_description",
        "source_webp_path",
        "prompt",
        "output_png_path",
        "model",
        "size",
        "quality",
    ]
    with CSV_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for request in build_requests():
            writer.writerow({field: getattr(request, field) for field in fieldnames})
    print(f"wrote {CSV_PATH.relative_to(REPO_ROOT)}")


def load_rows() -> list[dict[str, str]]:
    if not CSV_PATH.exists():
        generate_csv()
    with CSV_PATH.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def build_jsonl() -> None:
    rows = load_rows()
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    with JSONL_PATH.open("w", encoding="utf-8") as handle:
        for row in rows:
            payload = {
                "custom_id": row["custom_id"],
                "method": "POST",
                "url": "/v1/images/generations",
                "body": {
                    "model": row.get("model", MODEL),
                    "prompt": row["prompt"],
                    "size": row.get("size", SIZE),
                    "quality": row.get("quality", QUALITY),
                },
            }
            handle.write(json.dumps(payload, ensure_ascii=False) + "\n")
    print(f"wrote {JSONL_PATH.relative_to(REPO_ROOT)}")


def validate_inputs() -> None:
    rows = load_rows()
    missing_webps = [row["source_webp_path"] for row in rows if not (REPO_ROOT / row["source_webp_path"]).exists()]
    expected_count = len(rows)
    if missing_webps:
        raise RuntimeError(f"missing source webp files: {missing_webps[:5]}")

    if not JSONL_PATH.exists():
        build_jsonl()
    with JSONL_PATH.open("r", encoding="utf-8") as handle:
        jsonl_rows = [json.loads(line) for line in handle if line.strip()]
    if len(jsonl_rows) != len(rows):
        raise RuntimeError(f"JSONL row count mismatch: {len(jsonl_rows)} != {len(rows)}")
    for payload in jsonl_rows:
        body = payload.get("body", {})
        if payload.get("url") != "/v1/images/generations":
            raise RuntimeError(f"unexpected endpoint in {payload.get('custom_id')}")
        if body.get("model") != MODEL or body.get("size") != SIZE or body.get("quality") != QUALITY:
            raise RuntimeError(f"unexpected image settings in {payload.get('custom_id')}: {body}")
    print(f"validated {expected_count} recipe image requests")


def api_request(
    method: str,
    path: str,
    *,
    json_body: dict[str, Any] | None = None,
    data: bytes | None = None,
    multipart_fields: dict[str, str] | None = None,
    files: dict[str, tuple[str, bytes, str]] | None = None,
    stream: bool = False,
) -> Any:
    if not API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not set")

    headers = {"Authorization": f"Bearer {API_KEY}"}
    body: bytes | None = None
    if json_body is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(json_body).encode("utf-8")
    elif files is not None:
        boundary = f"----codex-{int(time.time() * 1000)}"
        headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
        body = build_multipart_form(multipart_fields or {}, files, boundary)
    else:
        body = data

    request = Request(f"{API_BASE}{path}", data=body, headers=headers, method=method)
    try:
        response = urlopen(request, timeout=300)
        if stream:
            return response
        payload = response.read().decode("utf-8")
        return json.loads(payload) if payload else {}
    except HTTPError as error:
        message = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {error.code} on {path}: {message}") from error
    except URLError as error:
        raise RuntimeError(f"Network error on {path}: {error}") from error


def build_multipart_form(fields: dict[str, str], files: dict[str, tuple[str, bytes, str]], boundary: str) -> bytes:
    lines: list[bytes] = []
    for key, value in fields.items():
        lines.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{key}"\r\n\r\n'.encode(),
                value.encode(),
                b"\r\n",
            ]
        )
    for key, (filename, content, content_type) in files.items():
        lines.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{key}"; filename="{filename}"\r\n'.encode(),
                f"Content-Type: {content_type}\r\n\r\n".encode(),
                content,
                b"\r\n",
            ]
        )
    lines.append(f"--{boundary}--\r\n")
    return b"".join(line if isinstance(line, bytes) else line.encode() for line in lines)


def save_state(state: dict[str, Any]) -> None:
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def load_state() -> dict[str, Any] | None:
    if not STATE_PATH.exists():
        return None
    return json.loads(STATE_PATH.read_text(encoding="utf-8"))


def upload_batch_file() -> str:
    with JSONL_PATH.open("rb") as handle:
        response = api_request(
            "POST",
            FILES_PATH,
            multipart_fields={"purpose": "batch"},
            files={"file": (JSONL_PATH.name, handle.read(), "application/jsonl")},
        )
    print(f"uploaded batch file {response['id']}")
    return response["id"]


def create_batch(input_file_id: str) -> dict[str, Any]:
    response = api_request(
        "POST",
        BATCHES_PATH,
        json_body={
            "input_file_id": input_file_id,
            "endpoint": "/v1/images/generations",
            "completion_window": "24h",
            "metadata": {
                "description": "Recipe dish image regeneration batch",
                "source": "menu_display_2",
            },
        },
    )
    print(f"created batch {response['id']} with status {response.get('status')}")
    return response


def get_batch(batch_id: str) -> dict[str, Any]:
    return api_request("GET", f"{BATCHES_PATH}/{batch_id}")


def print_batch_status(batch: dict[str, Any]) -> None:
    counts = batch.get("request_counts") or {}
    print(
        f"status={batch.get('status')} "
        f"total={counts.get('total')} completed={counts.get('completed')} failed={counts.get('failed')}"
    )


def submit_new_batch() -> dict[str, Any]:
    generate_csv()
    build_jsonl()
    validate_inputs()
    input_file_id = upload_batch_file()
    state = {
        "submitted_at": now_iso(),
        "last_checked_at": now_iso(),
        "input_file_id": input_file_id,
        "status": "uploaded",
        "csv_path": str(CSV_PATH.relative_to(REPO_ROOT)),
        "jsonl_path": str(JSONL_PATH.relative_to(REPO_ROOT)),
        "image_count": len(load_rows()),
    }
    save_state(state)
    batch = create_batch(input_file_id)
    state.update(
        {
            "batch_id": batch["id"],
            "status": batch.get("status"),
            "output_file_id": batch.get("output_file_id"),
            "error_file_id": batch.get("error_file_id"),
        }
    )
    save_state(state)
    return state


def resume_or_submit(force_refresh: bool = False) -> dict[str, Any]:
    if force_refresh:
        return submit_new_batch()
    state = load_state()
    if state:
        batch_id = state.get("batch_id")
        if batch_id:
            print(f"resuming batch {batch_id}")
            return state
        input_file_id = state.get("input_file_id")
        if input_file_id:
            batch = create_batch(input_file_id)
            state.update(
                {
                    "batch_id": batch["id"],
                    "status": batch.get("status"),
                    "output_file_id": batch.get("output_file_id"),
                    "error_file_id": batch.get("error_file_id"),
                    "last_checked_at": now_iso(),
                }
            )
            save_state(state)
            return state
    return submit_new_batch()


def poll_until_done(batch_id: str) -> dict[str, Any]:
    while True:
        batch = get_batch(batch_id)
        print_batch_status(batch)
        update_state_from_batch(batch)
        if batch.get("status") in {"completed", "failed", "expired", "cancelled"}:
            return batch
        print(f"sleeping {POLL_INTERVAL_SECONDS} seconds before checking again")
        time.sleep(POLL_INTERVAL_SECONDS)


def update_state_from_batch(batch: dict[str, Any]) -> None:
    existing_state = load_state() or {}
    state = {
        **existing_state,
        "last_checked_at": now_iso(),
        "input_file_id": batch.get("input_file_id") or existing_state.get("input_file_id"),
        "batch_id": batch["id"],
        "status": batch.get("status"),
        "output_file_id": batch.get("output_file_id"),
        "error_file_id": batch.get("error_file_id"),
        "csv_path": str(CSV_PATH.relative_to(REPO_ROOT)),
        "jsonl_path": str(JSONL_PATH.relative_to(REPO_ROOT)),
        "image_count": len(load_rows()),
    }
    save_state(state)


def download_file(file_id: str, destination: Path) -> None:
    response = api_request("GET", f"{FILES_PATH}/{file_id}/content", stream=True)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as handle:
        handle.write(response.read())
    print(f"downloaded {file_id} -> {destination.relative_to(REPO_ROOT)}")


def fetch_binary(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "codex-recipe-image-batch/1.0"})
    with urlopen(request, timeout=300) as response:
        return response.read()


def decode_output_images(output_jsonl_path: Path = OUTPUT_JSONL_PATH) -> None:
    NEW_PNGS_DIR.mkdir(parents=True, exist_ok=True)
    rows = load_rows()
    rows_by_custom_id = {row["custom_id"]: row for row in rows}
    manifest_rows: list[dict[str, str]] = []

    with output_jsonl_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            payload = json.loads(line)
            custom_id = payload.get("custom_id", "unknown")
            request_row = rows_by_custom_id.get(custom_id, {})
            manifest_row = {
                "custom_id": custom_id,
                "restaurant_name": request_row.get("restaurant_name", ""),
                "course": request_row.get("course", ""),
                "dish_name": request_row.get("dish_name", ""),
                "source_webp_path": request_row.get("source_webp_path", ""),
                "output_png_path": request_row.get("output_png_path", ""),
                "status": "",
                "note": "",
            }

            if payload.get("error"):
                manifest_row["status"] = "error"
                manifest_row["note"] = json.dumps(payload["error"], ensure_ascii=False)
                manifest_rows.append(manifest_row)
                continue

            data = payload.get("response", {}).get("body", {}).get("data", [])
            if not data:
                manifest_row["status"] = "missing-data"
                manifest_row["note"] = "No data payload returned"
                manifest_rows.append(manifest_row)
                continue

            if "b64_json" in data[0]:
                image_blob = base64.b64decode(data[0]["b64_json"])
            elif "url" in data[0]:
                image_blob = fetch_binary(data[0]["url"])
            else:
                raise RuntimeError(f"Unsupported image payload for {custom_id}")

            output_path = REPO_ROOT / request_row.get("output_png_path", f"artifacts/recipe_images/new_pngs/{custom_id}.png")
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(image_blob)
            manifest_row["status"] = "saved"
            manifest_rows.append(manifest_row)
            print(f"saved {output_path.relative_to(REPO_ROOT)}")

    write_manifest(manifest_rows)


def write_manifest(rows: list[dict[str, str]]) -> None:
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["custom_id", "restaurant_name", "course", "dish_name", "source_webp_path", "output_png_path", "status", "note"]
    with MANIFEST_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {MANIFEST_PATH.relative_to(REPO_ROOT)}")


def download_results_if_available(batch: dict[str, Any] | None = None) -> None:
    if batch is None:
        state = load_state()
        if not state:
            raise RuntimeError("no saved batch state found")
        batch = get_batch(state["batch_id"])
        update_state_from_batch(batch)

    if batch.get("error_file_id"):
        download_file(batch["error_file_id"], ERROR_JSONL_PATH)
    if batch.get("output_file_id"):
        download_file(batch["output_file_id"], OUTPUT_JSONL_PATH)
        decode_output_images(OUTPUT_JSONL_PATH)
    else:
        print("no output file id yet; nothing to download")


def create_backup() -> Path:
    rows = load_rows()
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    backup_path = BACKUP_DIR / f"recipe_webp_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.zip"
    with zipfile.ZipFile(backup_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for row in rows:
            source_path = REPO_ROOT / row["source_webp_path"]
            if not source_path.exists():
                raise RuntimeError(f"missing source webp before backup: {row['source_webp_path']}")
            archive.write(source_path, arcname=row["source_webp_path"])
    print(f"wrote {backup_path.relative_to(REPO_ROOT)}")
    return backup_path


def load_manifest_rows() -> list[dict[str, str]]:
    if MANIFEST_PATH.exists():
        with MANIFEST_PATH.open("r", encoding="utf-8", newline="") as handle:
            return list(csv.DictReader(handle))

    rows = load_rows()
    return [
        {
            "custom_id": row["custom_id"],
            "restaurant_name": row["restaurant_name"],
            "course": row["course"],
            "dish_name": row["dish_name"],
            "source_webp_path": row["source_webp_path"],
            "output_png_path": row["output_png_path"],
            "status": "saved" if (REPO_ROOT / row["output_png_path"]).exists() else "missing",
            "note": "",
        }
        for row in rows
    ]


def validate_outputs() -> list[dict[str, str]]:
    rows = load_manifest_rows()
    failures = [row for row in rows if row.get("status") != "saved" or not (REPO_ROOT / row["output_png_path"]).exists()]
    if len(rows) != len(load_rows()):
        raise RuntimeError(f"manifest row count mismatch: {len(rows)} != {len(load_rows())}")
    if failures:
        preview = [f"{row.get('custom_id')}:{row.get('status')}:{row.get('note')}" for row in failures[:5]]
        raise RuntimeError(f"cannot apply images; output failures found: {preview}")
    print(f"validated {len(rows)} output PNG files")
    return rows


def apply_outputs(skip_backup: bool = False) -> None:
    rows = validate_outputs()
    if not skip_backup:
        create_backup()
    for row in rows:
        png_path = REPO_ROOT / row["output_png_path"]
        webp_path = REPO_ROOT / row["source_webp_path"]
        with Image.open(png_path) as image:
            image.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
        print(f"converted {png_path.relative_to(REPO_ROOT)} -> {webp_path.relative_to(REPO_ROOT)}")


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OpenAI recipe image batch workflow")
    parser.add_argument("--refresh-csv", action="store_true", help="regenerate the CSV prompt file and stop")
    parser.add_argument("--build-jsonl", action="store_true", help="regenerate the JSONL file from the CSV and stop")
    parser.add_argument("--validate", action="store_true", help="validate CSV, JSONL, recipes, and source WebP files")
    parser.add_argument("--submit-only", action="store_true", help="submit a new batch without polling")
    parser.add_argument("--resume-only", action="store_true", help="resume from state without submitting a new batch")
    parser.add_argument("--poll-once", action="store_true", help="check the batch once and stop")
    parser.add_argument("--download", action="store_true", help="download and decode completed batch output")
    parser.add_argument("--decode-output", action="store_true", help="decode an already downloaded output JSONL")
    parser.add_argument("--backup", action="store_true", help="zip all current mapped recipe WebP files")
    parser.add_argument("--apply", action="store_true", help="convert decoded PNG files to WebP and overwrite mapped targets")
    parser.add_argument("--skip-backup", action="store_true", help="do not create a backup during --apply")
    return parser.parse_args(list(argv))


def main(argv: Iterable[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])

    if args.refresh_csv:
        generate_csv()
        return 0
    if args.build_jsonl:
        build_jsonl()
        return 0
    if args.validate:
        validate_inputs()
        return 0
    if args.backup:
        create_backup()
        return 0
    if args.decode_output:
        decode_output_images()
        return 0
    if args.download:
        download_results_if_available()
        return 0
    if args.apply:
        apply_outputs(skip_backup=args.skip_backup)
        return 0
    if args.submit_only:
        state = submit_new_batch()
        print(json.dumps(state, indent=2, ensure_ascii=False))
        return 0
    if args.resume_only:
        state = resume_or_submit(force_refresh=False)
        print(json.dumps(state, indent=2, ensure_ascii=False))
        return 0

    state = resume_or_submit(force_refresh=False)
    batch_id = state["batch_id"]
    if args.poll_once:
        final_batch = get_batch(batch_id)
        print_batch_status(final_batch)
        update_state_from_batch(final_batch)
        if final_batch.get("status") in {"completed", "failed", "expired", "cancelled"}:
            download_results_if_available(final_batch)
        return 0

    final_batch = poll_until_done(batch_id)
    download_results_if_available(final_batch)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
