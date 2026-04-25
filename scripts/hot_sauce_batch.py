#!/usr/bin/env python3
"""Build and run a resumable OpenAI image batch for the hot sauce set.

The workflow is:
1. Generate a CSV of prompts and source image references.
2. Convert the CSV to a JSONL batch payload.
3. Upload the JSONL file to OpenAI.
4. Create a batch job for /v1/images/generations.
5. Poll until the batch completes.
6. Download the output and decode images into new_images/.

The script is resumable. A saved state file stores the batch id, timestamps,
and file ids so the same command can resume after interruption.
"""

from __future__ import annotations

import argparse
import base64
import csv
import json
import os
import sys
import time
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


REPO_ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = REPO_ROOT / "hot_sauce_requests.csv"
JSONL_PATH = REPO_ROOT / "hot_sauce_requests.jsonl"
STATE_PATH = REPO_ROOT / "hot_sauce_batch_state.json"
OUTPUT_JSONL_PATH = REPO_ROOT / "hot_sauce_batch_output.jsonl"
ERROR_JSONL_PATH = REPO_ROOT / "hot_sauce_batch_errors.jsonl"
NEW_IMAGES_DIR = REPO_ROOT / "new_images"

API_BASE = os.environ.get("OPENAI_API_BASE", "https://api.openai.com/v1").rstrip("/")
API_KEY = os.environ.get("OPENAI_API_KEY")
BATCHES_PATH = os.environ.get("OPENAI_BATCHES_PATH", "/batches")
FILES_PATH = os.environ.get("OPENAI_FILES_PATH", "/files")
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
SIZE = os.environ.get("OPENAI_IMAGE_SIZE", "1024x1536")
QUALITY = os.environ.get("OPENAI_IMAGE_QUALITY", "high")
POLL_INTERVAL_SECONDS = int(os.environ.get("OPENAI_BATCH_POLL_INTERVAL_SECONDS", "300"))


@dataclass(frozen=True)
class Sauce:
    name: str
    bottling_date: str
    hotness_level: int
    description: str


SAUCES: list[Sauce] = [
    Sauce(
        "Fiery Margherita Blaze",
        "2023-10-04",
        7,
        "Fiery Margherita Blaze is an artisanal hot sauce crafted specifically to enhance the flavor profile of your favorite pizza. Infused with sun-dried tomatoes, roasted garlic, and a special blend of Italian herbs, this sauce delivers a tangy punch with moderate heat, making it perfect for those who appreciate a bit of spice without overwhelming the palate.",
    ),
    Sauce(
        "Ghostly Inferno",
        "2023-10-20",
        5,
        "Unleash the fiery wrath of the Ghostly Inferno, a hot sauce crafted for the daring and the bold. This concoction harnesses the intense heat of the infamous ghost pepper, blending it seamlessly with smoky chipotle undertones and a hint of tangy lime.",
    ),
    Sauce(
        "Inferno Blaze",
        "2023-10-15",
        9,
        "Inferno Blaze is a fiery concoction designed for thrill-seekers and spice lovers alike. Crafted from a blend of ghost peppers, habaneros, and a hint of smoked paprika, this hot sauce delivers a bold heat that's balanced by a touch of sweetness from ripe mango and a trace of tangy lime.",
    ),
    Sauce(
        "Inferno Ember",
        "2023-10-25",
        9,
        "Inferno Ember is a fiery blend of habanero and ghost peppers balanced with the sweetness of roasted red bell peppers and a hint of smoked paprika. This sauce ignites the palate with its bold, intense heat while providing a rich, smoky undertone.",
    ),
    Sauce(
        "Inferno Queso",
        "2023-10-15",
        6,
        "Inferno Queso is a unique blend of fiery habaneros and creamy cheddar cheese, bringing the ultimate fusion between heat and cheesy goodness. With a smooth and luscious texture, this hot sauce adds a burst of spicy cheddar to tacos, burgers, or even nachos.",
    ),
    Sauce(
        "Pique de Azteca",
        "2023-10-01",
        8,
        "Pique de Azteca is a tribute to the rich agricultural history of Mexico, featuring the Xcatic pepper, a rare gem found in the Yucatán Peninsula. Known for its unique flavor profile that combines citrus undertones with a floral sweetness.",
    ),
    Sauce(
        "Arctic Blaze",
        "2023-10-05",
        7,
        "Arctic Blaze is a unique hot sauce crafted to bring the unexpected heat in a dazzling white color. Infused with creamy coconut milk and tangy lime, it combines the fierce heat of white ghost peppers with a smooth, velvety base.",
    ),
    Sauce(
        "Blaze Berry Inferno",
        "2023-11-15",
        8,
        "Blaze Berry Inferno is a uniquely crafted hot sauce that brings a fiery twist to fruity flavor. Featuring a blend of ripe blueberries and strawberries, this sauce combines savory garlic and onions with a burst of habanero heat.",
    ),
    Sauce(
        "Esprit de Provence",
        "2023-10-14",
        6,
        "Esprit de Provence is a unique hot sauce that captures the essence of Southern France. Infusing French elegance and culinary traditions, it features a delicate blend of ripe cayenne peppers with the floral notes of lavender and a hint of rosemary.",
    ),
    Sauce(
        "Fiery Garlic Inferno",
        "2023-10-29",
        7,
        "Fiery Garlic Inferno combines the robust, savory aroma of roasted garlic with the intense heat of habanero and serrano peppers. This hot sauce elevates any dish with its bold and complex flavor profile.",
    ),
    Sauce(
        "Smoky Oak Inferno",
        "2023-10-20",
        7,
        "Smoky Oak Inferno is a sophisticated hot sauce crafted through an artisanal process of aging in charred oak barrels for six months. This patient maturation process infuses the sauce with a deep, smoky aroma and a subtle sweetness reminiscent of fine bourbon.",
    ),
    Sauce(
        "Truffle Blaze",
        "2023-10-18",
        5,
        "Truffle Blaze is an exquisite fusion of earthy richness and fiery heat, crafted for those who desire luxury with a kick. This hot sauce combines the robust, aromatic flavor of Italian black truffles with the smoky heat of chipotle peppers.",
    ),
    Sauce(
        "Sweet Sting Honey Fire",
        "2023-11-08",
        4,
        "Sweet Sting Honey Fire is a delightful blend that marries the natural sweetness of honey with a fiery kick, delivering a perfectly balanced heat. Ideal for those who love a gentle, warm sensation that lingers just enough to tantalize the taste buds.",
    ),
]


def now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def slugify(text: str) -> str:
    chars: list[str] = []
    for ch in text.lower():
        if ch.isalnum():
            chars.append(ch)
        else:
            chars.append("_")
    slug = "".join(chars)
    while "__" in slug:
        slug = slug.replace("__", "_")
    return slug.strip("_")


def safe_name(text: str) -> str:
    return quote(text.replace(" ", "_"), safe="_")


def source_image_filename(sauce: Sauce) -> str:
    return f"{safe_name(sauce.name)}.jpg"


def source_image_url(sauce: Sauce) -> str:
    return f"https://raw.githubusercontent.com/louispaulet/menu_display_2/main/sauce_pictures/{source_image_filename(sauce)}"


def source_image_path(sauce: Sauce) -> str:
    return f"sauce_pictures/{source_image_filename(sauce)}"


def build_prompt(sauce: Sauce) -> str:
    notes = sauce.description.rstrip(".")
    return (
        f"High-end studio product photograph of a gourmet hot sauce bottle named '{sauce.name}'. "
        f"Portrait composition for a premium menu application, glossy glass bottle, crisp label, "
        f"sharp food-photography lighting, subtle cinematic reflections, isolated on a clean light background, "
        f"ultra-detailed, photorealistic, no hands, no extra props, no watermarks. "
        f"Flavor direction: {notes}. "
        f"Emphasize a bottle that feels luxurious, appetizing, and ready for a modern editorial catalog."
    )


def load_rows() -> list[dict[str, str]]:
    if not CSV_PATH.exists():
        generate_csv()

    with CSV_PATH.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def generate_csv() -> None:
    CSV_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open("w", encoding="utf-8", newline="") as handle:
        fieldnames = [
            "custom_id",
            "name",
            "prompt",
            "source_image_path",
            "source_image_url",
            "output_file",
            "model",
            "size",
            "quality",
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for index, sauce in enumerate(SAUCES, start=1):
            custom_id = f"hot-sauce-{index:02d}-{slugify(sauce.name)}"
            writer.writerow(
                {
                    "custom_id": custom_id,
                    "name": sauce.name,
                    "prompt": build_prompt(sauce),
                    "source_image_path": source_image_path(sauce),
                    "source_image_url": source_image_url(sauce),
                    "output_file": f"new_images/{custom_id}.png",
                    "model": MODEL,
                    "size": SIZE,
                    "quality": QUALITY,
                }
            )

    print(f"wrote {CSV_PATH.relative_to(REPO_ROOT)}")


def build_jsonl() -> None:
    rows = load_rows()
    with JSONL_PATH.open("w", encoding="utf-8") as handle:
        for row in rows:
            body = {
                "model": row.get("model", MODEL),
                "prompt": row["prompt"],
                "size": row.get("size", SIZE),
                "quality": row.get("quality", QUALITY),
            }
            payload = {
                "custom_id": row["custom_id"],
                "method": "POST",
                "url": "/v1/images/generations",
                "body": body,
            }
            handle.write(json.dumps(payload, ensure_ascii=False) + "\n")

    print(f"wrote {JSONL_PATH.relative_to(REPO_ROOT)}")


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

    url = f"{API_BASE}{path}"
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

    request = Request(url, data=body, headers=headers, method=method)

    try:
        response = urlopen(request, timeout=300)
        if stream:
            return response
        payload = response.read().decode("utf-8")
        if not payload:
            return {}
        return json.loads(payload)
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
    lines.append(f"--{boundary}--\r\n".encode())
    return b"".join(lines)


def upload_batch_file() -> str:
    with JSONL_PATH.open("rb") as handle:
        response = api_request(
            "POST",
            FILES_PATH,
            multipart_fields={"purpose": "batch"},
            files={"file": (JSONL_PATH.name, handle.read(), "application/jsonl")},
        )
    file_id = response["id"]
    print(f"uploaded batch file {file_id}")
    return file_id


def create_batch(input_file_id: str) -> dict[str, Any]:
    response = api_request(
        "POST",
        BATCHES_PATH,
        json_body={
            "input_file_id": input_file_id,
            "endpoint": "/v1/images/generations",
            "completion_window": "24h",
            "metadata": {
                "description": "Hot sauce image regeneration batch",
                "source": "menu_display_2",
            },
        },
    )
    print(f"created batch {response['id']} with status {response.get('status')}")
    return response


def get_batch(batch_id: str) -> dict[str, Any]:
    return api_request("GET", f"{BATCHES_PATH}/{batch_id}")


def download_file(file_id: str, destination: Path) -> None:
    response = api_request("GET", f"{FILES_PATH}/{file_id}/content", stream=True)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as handle:
        handle.write(response.read())
    print(f"downloaded {file_id} -> {destination.relative_to(REPO_ROOT)}")


def save_state(state: dict[str, Any]) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def load_state() -> dict[str, Any] | None:
    if not STATE_PATH.exists():
        return None
    return json.loads(STATE_PATH.read_text(encoding="utf-8"))


def print_batch_status(batch: dict[str, Any]) -> None:
    counts = batch.get("request_counts") or {}
    print(
        f"status={batch.get('status')} "
        f"total={counts.get('total')} completed={counts.get('completed')} failed={counts.get('failed')}"
    )


def decode_output_images(output_jsonl_path: Path) -> None:
    NEW_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    manifest_path = NEW_IMAGES_DIR / "manifest.csv"

    rows = load_rows()
    rows_by_custom_id = {row["custom_id"]: row for row in rows}
    manifest_rows: list[dict[str, str]] = []

    with output_jsonl_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            row = json.loads(line)
            custom_id = row.get("custom_id", "unknown")
            src_row = rows_by_custom_id.get(custom_id, {})

            if row.get("error"):
                manifest_rows.append(
                    {
                        "custom_id": custom_id,
                        "name": src_row.get("name", ""),
                        "status": "error",
                        "local_path": "",
                        "note": json.dumps(row["error"], ensure_ascii=False),
                    }
                )
                continue

            response_body = row.get("response", {}).get("body", {})
            data = response_body.get("data", [])

            if not data:
                manifest_rows.append(
                    {
                        "custom_id": custom_id,
                        "name": src_row.get("name", ""),
                        "status": "missing-data",
                        "local_path": "",
                        "note": "No data payload returned",
                    }
                )
                continue

            image_blob = None
            if "b64_json" in data[0]:
                image_blob = base64.b64decode(data[0]["b64_json"])
            elif "url" in data[0]:
                image_blob = fetch_binary(data[0]["url"])
            else:
                raise RuntimeError(f"Unsupported image payload for {custom_id}")

            file_name = src_row.get("output_file", f"new_images/{custom_id}.png").split("/", 1)[-1]
            output_path = NEW_IMAGES_DIR / file_name
            output_path.write_bytes(image_blob)

            manifest_rows.append(
                {
                    "custom_id": custom_id,
                    "name": src_row.get("name", ""),
                    "status": "saved",
                    "local_path": str(output_path.relative_to(REPO_ROOT)),
                    "note": "",
                }
            )
            print(f"saved {output_path.relative_to(REPO_ROOT)}")

    with manifest_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["custom_id", "name", "status", "local_path", "note"])
        writer.writeheader()
        writer.writerows(manifest_rows)

    print(f"wrote {manifest_path.relative_to(REPO_ROOT)}")


def fetch_binary(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "codex-hot-sauce-batch/1.0"})
    with urlopen(request, timeout=300) as response:
        return response.read()


def submit_new_batch() -> dict[str, Any]:
    generate_csv()
    build_jsonl()
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
        print("refresh requested; starting a new batch")
        return submit_new_batch()

    state = load_state()
    if state:
        submitted_at = state.get("submitted_at", "unknown time")
        print(f"waiting for the replay since {submitted_at}")
        batch_id = state.get("batch_id")
        if batch_id:
            print(f"resuming batch {batch_id}")
            return state

        input_file_id = state.get("input_file_id")
        if input_file_id:
            print(f"found uploaded batch file {input_file_id}; creating the batch now")
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

        print("saved state exists but no batch id or input file id was found; starting over")
        return submit_new_batch()

    print("no saved state found; creating a new batch")
    return submit_new_batch()


def poll_until_done(batch_id: str) -> dict[str, Any]:
    while True:
        batch = get_batch(batch_id)
        print_batch_status(batch)
        existing_state = load_state() or {}
        state = {
            "submitted_at": existing_state.get("submitted_at", now_iso()),
            "last_checked_at": now_iso(),
            "input_file_id": batch.get("input_file_id"),
            "batch_id": batch["id"],
            "status": batch.get("status"),
            "output_file_id": batch.get("output_file_id"),
            "error_file_id": batch.get("error_file_id"),
            "csv_path": str(CSV_PATH.relative_to(REPO_ROOT)),
            "jsonl_path": str(JSONL_PATH.relative_to(REPO_ROOT)),
            "image_count": len(load_rows()),
        }
        save_state(state)

        status = batch.get("status")
        if status == "completed":
            print("batch completed")
            return batch
        if status in {"failed", "expired", "cancelled"}:
            print(f"batch ended with status {status}")
            return batch

        print(f"sleeping {POLL_INTERVAL_SECONDS} seconds before checking again")
        time.sleep(POLL_INTERVAL_SECONDS)


def download_results_if_available(batch: dict[str, Any]) -> None:
    error_file_id = batch.get("error_file_id")
    output_file_id = batch.get("output_file_id")

    if error_file_id:
        download_file(error_file_id, ERROR_JSONL_PATH)

    if output_file_id:
        download_file(output_file_id, OUTPUT_JSONL_PATH)
        decode_output_images(OUTPUT_JSONL_PATH)
    else:
        print("no output file id yet; nothing to download")


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OpenAI hot sauce batch workflow")
    parser.add_argument("--refresh-csv", action="store_true", help="regenerate the CSV prompt file and stop")
    parser.add_argument("--build-jsonl", action="store_true", help="regenerate the JSONL file from the CSV and stop")
    parser.add_argument("--submit-only", action="store_true", help="submit a new batch without polling")
    parser.add_argument("--resume-only", action="store_true", help="resume from state without submitting a new batch")
    parser.add_argument("--poll-once", action="store_true", help="check the batch once and stop")
    return parser.parse_args(list(argv))


def main(argv: Iterable[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])

    if args.refresh_csv:
        generate_csv()
        return 0

    if args.build_jsonl:
        build_jsonl()
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
        if final_batch.get("status") not in {"completed", "failed", "expired", "cancelled"}:
            final_state = load_state() or {}
            final_state.update(
                {
                    "last_checked_at": now_iso(),
                    "status": final_batch.get("status"),
                }
            )
            save_state(final_state)
            return 0

        current_state = load_state() or {}
        if current_state.get("downloaded_at") and final_batch.get("status") == "completed":
            print("batch already completed and downloaded")
            return 0
    else:
        final_batch = poll_until_done(batch_id)
    download_results_if_available(final_batch)

    final_state = load_state() or {}
    final_state.update(
        {
            "last_checked_at": now_iso(),
            "status": final_batch.get("status"),
            "output_file_id": final_batch.get("output_file_id"),
            "error_file_id": final_batch.get("error_file_id"),
        }
    )
    if final_batch.get("status") == "completed" and final_batch.get("output_file_id"):
        final_state["downloaded_at"] = now_iso()
    save_state(final_state)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
