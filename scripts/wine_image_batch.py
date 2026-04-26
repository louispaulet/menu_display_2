#!/usr/bin/env python3
"""Build and run a resumable OpenAI image batch for wine bottle images."""

from __future__ import annotations

import argparse
import base64
import csv
import difflib
import json
import os
import re
import subprocess
import sys
import time
import unicodedata
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from PIL import Image, ImageOps


REPO_ROOT = Path(__file__).resolve().parents[1]
ARTIFACT_DIR = REPO_ROOT / "artifacts" / "wine_images"
CSV_PATH = ARTIFACT_DIR / "wine_image_requests.csv"
JSONL_PATH = ARTIFACT_DIR / "wine_image_requests.jsonl"
STATE_PATH = ARTIFACT_DIR / "wine_image_batch_state.json"
OUTPUT_JSONL_PATH = ARTIFACT_DIR / "wine_image_batch_output.jsonl"
ERROR_JSONL_PATH = ARTIFACT_DIR / "wine_image_batch_errors.jsonl"
MATCH_AUDIT_PATH = ARTIFACT_DIR / "match_audit.json"
MANIFEST_PATH = ARTIFACT_DIR / "manifest.csv"
NEW_PNGS_DIR = ARTIFACT_DIR / "new_pngs"
PORTRAIT_PNGS_DIR = ARTIFACT_DIR / "portrait_pngs"

API_BASE = os.environ.get("OPENAI_API_BASE", "https://api.openai.com/v1").rstrip("/")
API_KEY = os.environ.get("OPENAI_API_KEY")
BATCHES_PATH = os.environ.get("OPENAI_BATCHES_PATH", "/batches")
FILES_PATH = os.environ.get("OPENAI_FILES_PATH", "/files")
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
SIZE = os.environ.get("OPENAI_IMAGE_SIZE", "1024x1024")
QUALITY = os.environ.get("OPENAI_IMAGE_QUALITY", "high")
OUTPUT_FORMAT = os.environ.get("OPENAI_IMAGE_OUTPUT_FORMAT", "png")
POLL_INTERVAL_SECONDS = int(os.environ.get("OPENAI_BATCH_POLL_INTERVAL_SECONDS", "1800"))


@dataclass(frozen=True)
class WineRequest:
    custom_id: str
    wine_name: str
    price_eur_750ml: int
    pairing_strategy: str
    paired_dishes_text: str
    prompt: str
    output_png_path: str
    portrait_png_path: str
    model: str = MODEL
    size: str = SIZE
    quality: str = QUALITY
    output_format: str = OUTPUT_FORMAT


def now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def slugify(text: str, *, max_length: int = 96) -> str:
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    chars: list[str] = []
    for ch in ascii_text.lower():
        chars.append(ch if ch.isalnum() else "-")
    slug = "".join(chars)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")[:max_length].strip("-")


def normalize_text(text: str) -> str:
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"\s+", " ", re.sub(r"[\W_]+", " ", ascii_text.lower())).strip()


def load_wines() -> list[dict[str, Any]]:
    with (REPO_ROOT / "wines.json").open("r", encoding="utf-8") as handle:
        return json.load(handle)["wines"]


def load_menu_data() -> list[dict[str, Any]]:
    script = """
      import('./menu_display_2/src/menuData.js')
        .then((module) => process.stdout.write(JSON.stringify(module.default)))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    """
    result = subprocess.run(["node", "-e", script], cwd=REPO_ROOT, check=True, text=True, capture_output=True)
    return json.loads(result.stdout)


def load_recipe_catalog() -> list[dict[str, str]]:
    recipe_dir = REPO_ROOT / "menu_display_2" / "src" / "dish_recipes"
    catalog: list[dict[str, str]] = []
    for path in sorted(recipe_dir.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        title = next((line.strip("# ").strip() for line in text.splitlines() if line.startswith("#")), path.stem)
        summary = next((line.strip() for line in text.splitlines() if line.strip() and not line.startswith(("#", "-", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9."))), "")
        course, _, dish_slug = path.stem.partition("-")
        catalog.append(
            {
                "recipe_file": str(path.relative_to(REPO_ROOT)),
                "course": course.replace("_", " "),
                "dish": title,
                "summary": summary,
                "text": text,
                "dish_slug": dish_slug,
            }
        )
    return catalog


def build_exact_pairings(menu_data: list[dict[str, Any]]) -> dict[str, list[dict[str, str]]]:
    pairings: dict[str, list[dict[str, str]]] = {}
    for menu in menu_data:
        for item in menu.get("tasting_menu", []):
            wine_name = item.get("wine_pairing")
            if not wine_name:
                continue
            pairings.setdefault(wine_name, []).append(
                {
                    "restaurant_name": menu.get("restaurant_name", ""),
                    "course": item.get("course", ""),
                    "dish": item.get("description", ""),
                    "source": "menuData",
                }
            )
    return pairings


def score_recipe_match(wine_name: str, recipe: dict[str, str]) -> float:
    wine = normalize_text(wine_name)
    title = normalize_text(recipe["dish"])
    summary = normalize_text(recipe.get("summary", ""))
    text = normalize_text(recipe.get("text", ""))
    score = difflib.SequenceMatcher(None, wine, title).ratio() * 6.0
    score += difflib.SequenceMatcher(None, wine, summary).ratio() * 2.0
    keywords = {
        "pinot noir": ["duck", "truffle", "mushroom", "lamb"],
        "cabernet sauvignon": ["beef", "lamb", "duck", "venison"],
        "chardonnay": ["scallop", "lobster", "fish", "cream", "butter"],
        "sauvignon blanc": ["goat cheese", "scallop", "fish", "ceviche", "salad"],
        "riesling": ["spicy", "duck", "pork", "ginger"],
        "merlot": ["beef", "duck", "mushroom", "lamb"],
        "syrah": ["lamb", "beef", "game", "pepper"],
        "grenache": ["lamb", "duck", "stew"],
        "rosé": ["salad", "seafood", "goat cheese"],
        "rose": ["salad", "seafood", "goat cheese"],
        "sauternes": ["foie gras", "blue cheese", "dessert"],
        "banyuls": ["chocolate", "dessert"],
        "champagne": ["oyster", "scallop", "caviar", "aperitif"],
        "sake": ["sashimi", "tuna", "seafood", "tofu"],
    }
    for varietal, terms in keywords.items():
        if varietal in wine:
            for term in terms:
                if term in text:
                    score += 4.0
    if "duck" in text and "pinot noir" in wine:
        score += 3.0
    return score


def choose_fallback_recipe(wine_name: str, recipe_catalog: list[dict[str, str]]) -> dict[str, str]:
    scored = sorted(((score_recipe_match(wine_name, recipe), recipe) for recipe in recipe_catalog), key=lambda item: item[0], reverse=True)
    _, best = scored[0]
    return best


def pairing_text(pairings: list[dict[str, str]]) -> str:
    return "; ".join(
        f"{p.get('restaurant_name', '').strip()} / {p.get('course', '').strip()}: {p.get('dish', '').strip()}".strip(" /:")
        for p in pairings
    )


def build_prompt(*, wine_name: str, price_eur_750ml: int, paired_dishes_text: str, pairing_strategy: str) -> str:
    pairing_line = paired_dishes_text or "No direct menu pairings were available."
    strategy_line = "exact menu pairings" if pairing_strategy == "exact_menu" else "a nearest recipe-based pairing assumption"
    return (
        "Square 1024x1024 photoreal studio product image of a single wine bottle, classic portrait composition, "
        "centered and fully visible, with a uniform pure white background for easy removal later. "
        "Ultra-high-resolution, 4k-style detail, crisp glass reflections, natural bottle proportions, clean label presentation, "
        "elegant shadows, no hands, no extra bottles, no props, no watermark, no collage, no text overlay. "
        f"Wine bottle name: {wine_name}. Michelin list price: EUR {price_eur_750ml}. "
        f"Use these menu pairings as styling cues: {pairing_line}. "
        f"Treat the pairing guidance as {strategy_line}. "
        "Keep the result luxurious, editorial, and suitable for a refined digital wine list."
    )


def build_requests() -> tuple[list[WineRequest], dict[str, Any]]:
    wines = load_wines()
    menu_data = load_menu_data()
    recipe_catalog = load_recipe_catalog()
    exact_pairings = build_exact_pairings(menu_data)

    requests: list[WineRequest] = []
    audit_rows: list[dict[str, Any]] = []

    for index, wine in enumerate(wines, start=1):
        wine_name = wine["name"]
        price = int(wine["michelin_star_price_eur_750ml"])
        custom_id = f"wine-image-{index:03d}-{slugify(wine_name, max_length=60)}"
        output_png_path = f"artifacts/wine_images/new_pngs/{custom_id}.png"
        portrait_png_path = f"artifacts/wine_images/portrait_pngs/{custom_id}.png"

        pairings = exact_pairings.get(wine_name, [])
        pairing_strategy = "exact_menu"
        fallback_recipe = None
        if not pairings:
            pairing_strategy = "nearest_recipe"
            fallback_recipe = choose_fallback_recipe(wine_name, recipe_catalog)
            pairings = [
                {
                    "restaurant_name": "recipe corpus fallback",
                    "course": fallback_recipe["course"],
                    "dish": fallback_recipe["dish"],
                    "source": "dish_recipes",
                }
            ]

        prompt = build_prompt(
            wine_name=wine_name,
            price_eur_750ml=price,
            paired_dishes_text=pairing_text(pairings),
            pairing_strategy=pairing_strategy,
        )

        requests.append(
            WineRequest(
                custom_id=custom_id,
                wine_name=wine_name,
                price_eur_750ml=price,
                pairing_strategy=pairing_strategy,
                paired_dishes_text=pairing_text(pairings),
                prompt=prompt,
                output_png_path=output_png_path,
                portrait_png_path=portrait_png_path,
            )
        )
        audit_rows.append(
            {
                "custom_id": custom_id,
                "wine_name": wine_name,
                "price_eur_750ml": price,
                "pairing_strategy": pairing_strategy,
                "paired_dishes": pairings,
                "fallback_recipe": fallback_recipe,
                "prompt": prompt,
                "output_png_path": output_png_path,
                "portrait_png_path": portrait_png_path,
            }
        )

    audit = {
        "generated_at": now_iso(),
        "source": {
            "wines_json": "wines.json",
            "menu_data": "menu_display_2/src/menuData.js",
            "recipe_dir": "menu_display_2/src/dish_recipes",
        },
        "assumptions": [
            "Use Michelin list price from wines.json in the prompt.",
            "Use exact menu pairings when available.",
            "Use a nearest recipe-corpus fallback only when a bottle has no exact menu pairing.",
            "Generate square 1024x1024 images with a white background, then fit them to a 768x1024 portrait canvas afterward.",
        ],
        "summary": {
            "wine_count": len(wines),
            "exact_menu_match_wines": sum(1 for row in audit_rows if row["pairing_strategy"] == "exact_menu"),
            "fallback_wines": sum(1 for row in audit_rows if row["pairing_strategy"] != "exact_menu"),
            "recipe_catalog_count": len(recipe_catalog),
        },
        "wines": audit_rows,
    }
    return requests, audit


def write_audit_json(audit: dict[str, Any]) -> None:
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    MATCH_AUDIT_PATH.write_text(json.dumps(audit, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {MATCH_AUDIT_PATH.relative_to(REPO_ROOT)}")


def generate_csv() -> None:
    requests, audit = build_requests()
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "custom_id",
                "wine_name",
                "price_eur_750ml",
                "pairing_strategy",
                "paired_dishes_text",
                "prompt",
                "output_png_path",
                "portrait_png_path",
                "model",
                "size",
                "quality",
                "output_format",
            ],
        )
        writer.writeheader()
        for request in requests:
            writer.writerow({field: getattr(request, field) for field in writer.fieldnames})
    write_audit_json(audit)
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
            handle.write(
                json.dumps(
                    {
                        "custom_id": row["custom_id"],
                        "method": "POST",
                        "url": "/v1/images/generations",
                        "body": {
                            "model": row.get("model", MODEL),
                            "prompt": row["prompt"],
                            "size": row.get("size", SIZE),
                            "quality": row.get("quality", QUALITY),
                            "background": "opaque",
                            "output_format": row.get("output_format", OUTPUT_FORMAT),
                        },
                    },
                    ensure_ascii=False,
                )
                + "\n"
            )
    print(f"wrote {JSONL_PATH.relative_to(REPO_ROOT)}")


def api_request(
    method: str,
    path: str,
    *,
    json_body: dict[str, Any] | None = None,
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
    parts: list[bytes] = []
    for key, value in fields.items():
        parts.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{key}"\r\n\r\n'.encode(),
                value.encode(),
                b"\r\n",
            ]
        )
    for key, (filename, content, content_type) in files.items():
        parts.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{key}"; filename="{filename}"\r\n'.encode(),
                f"Content-Type: {content_type}\r\n\r\n".encode(),
                content,
                b"\r\n",
            ]
        )
    parts.append(f"--{boundary}--\r\n".encode())
    return b"".join(parts)


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
                "description": "Wine bottle image regeneration batch",
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
    print(f"status={batch.get('status')} total={counts.get('total')} completed={counts.get('completed')} failed={counts.get('failed')}")


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
        "audit_path": str(MATCH_AUDIT_PATH.relative_to(REPO_ROOT)),
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
    if state and state.get("batch_id"):
        return state
    if state and state.get("input_file_id"):
        batch = create_batch(state["input_file_id"])
        state.update({"batch_id": batch["id"], "status": batch.get("status")})
        save_state(state)
        return state
    return submit_new_batch()


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
        "audit_path": str(MATCH_AUDIT_PATH.relative_to(REPO_ROOT)),
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
    request = Request(url, headers={"User-Agent": "codex-wine-image-batch/1.0"})
    with urlopen(request, timeout=300) as response:
        return response.read()


def decode_output_images(output_jsonl_path: Path = OUTPUT_JSONL_PATH) -> None:
    NEW_PNGS_DIR.mkdir(parents=True, exist_ok=True)
    rows_by_custom_id = {row["custom_id"]: row for row in load_rows()}
    audit_rows = {row["custom_id"]: row for row in json.loads(MATCH_AUDIT_PATH.read_text(encoding="utf-8"))["wines"]} if MATCH_AUDIT_PATH.exists() else {}
    manifest_rows: list[dict[str, str]] = []

    with output_jsonl_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            payload = json.loads(line)
            custom_id = payload.get("custom_id", "unknown")
            request_row = rows_by_custom_id.get(custom_id, {})
            audit_row = audit_rows.get(custom_id, {})
            manifest_row = {
                "custom_id": custom_id,
                "wine_name": request_row.get("wine_name", audit_row.get("wine_name", "")),
                "status": "",
                "square_png_path": request_row.get("output_png_path", ""),
                "portrait_png_path": request_row.get("portrait_png_path", ""),
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

            output_path = REPO_ROOT / request_row.get("output_png_path", f"artifacts/wine_images/new_pngs/{custom_id}.png")
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(image_blob)
            manifest_row["status"] = "saved"
            manifest_rows.append(manifest_row)
            print(f"saved {output_path.relative_to(REPO_ROOT)}")

    write_manifest(manifest_rows)


def fit_to_portrait_canvas(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    contained = ImageOps.contain(image, (768, 1024), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (768, 1024), "white")
    canvas.alpha_composite(contained, ((768 - contained.width) // 2, (1024 - contained.height) // 2))
    return canvas.convert("RGB")


def apply_portrait_outputs() -> None:
    rows = load_manifest_rows()
    PORTRAIT_PNGS_DIR.mkdir(parents=True, exist_ok=True)
    for row in rows:
        if row.get("status") != "saved":
            continue
        square_png = REPO_ROOT / row["square_png_path"]
        portrait_png = REPO_ROOT / row["portrait_png_path"]
        if not square_png.exists():
            continue
        with Image.open(square_png) as image:
            fit_to_portrait_canvas(image).save(portrait_png, "PNG")
        print(f"converted {square_png.relative_to(REPO_ROOT)} -> {portrait_png.relative_to(REPO_ROOT)}")


def write_manifest(rows: list[dict[str, str]]) -> None:
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["custom_id", "wine_name", "status", "square_png_path", "portrait_png_path", "note"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {MANIFEST_PATH.relative_to(REPO_ROOT)}")


def load_manifest_rows() -> list[dict[str, str]]:
    if MANIFEST_PATH.exists():
        with MANIFEST_PATH.open("r", encoding="utf-8", newline="") as handle:
            return list(csv.DictReader(handle))
    return [
        {
            "custom_id": row["custom_id"],
            "wine_name": row["wine_name"],
            "status": "saved" if (REPO_ROOT / row["output_png_path"]).exists() else "missing",
            "square_png_path": row["output_png_path"],
            "portrait_png_path": row["portrait_png_path"],
            "note": "",
        }
        for row in load_rows()
    ]


def validate_inputs() -> None:
    rows = load_rows()
    if len(rows) != 261:
        raise RuntimeError(f"expected 261 wine rows, got {len(rows)}")
    if not MATCH_AUDIT_PATH.exists():
        raise RuntimeError("match audit file missing")
    audit = json.loads(MATCH_AUDIT_PATH.read_text(encoding="utf-8"))
    if len(audit.get("wines", [])) != 261:
        raise RuntimeError(f"expected 261 audit rows, got {len(audit.get('wines', []))}")
    if audit.get("summary", {}).get("fallback_wines") != 1:
        raise RuntimeError("expected exactly one fallback wine")
    if not JSONL_PATH.exists():
        build_jsonl()
    with JSONL_PATH.open("r", encoding="utf-8") as handle:
        jsonl_rows = [json.loads(line) for line in handle if line.strip()]
    if len(jsonl_rows) != 261:
        raise RuntimeError(f"JSONL row count mismatch: {len(jsonl_rows)}")
    for payload in jsonl_rows:
        body = payload.get("body", {})
        if payload.get("url") != "/v1/images/generations":
            raise RuntimeError(f"unexpected endpoint in {payload.get('custom_id')}")
        if body.get("model") != MODEL or body.get("size") != SIZE or body.get("quality") != QUALITY:
            raise RuntimeError(f"unexpected image settings in {payload.get('custom_id')}: {body}")
        if body.get("background") != "opaque" or body.get("output_format") != OUTPUT_FORMAT:
            raise RuntimeError(f"unexpected output settings in {payload.get('custom_id')}: {body}")
    print("validated 261 wine image requests")


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
        apply_portrait_outputs()
    else:
        print("no output file id yet; nothing to download")


def poll_once() -> dict[str, Any]:
    state = load_state()
    if not state or not state.get("batch_id"):
        raise RuntimeError("no saved wine image batch state found")
    batch = get_batch(state["batch_id"])
    print_batch_status(batch)
    update_state_from_batch(batch)
    if batch.get("status") in {"completed", "failed", "expired", "cancelled"}:
        download_results_if_available(batch)
    return batch


def poll_until_done(batch_id: str) -> dict[str, Any]:
    while True:
        batch = get_batch(batch_id)
        print_batch_status(batch)
        update_state_from_batch(batch)
        if batch.get("status") == "completed":
            print("batch completed")
            return batch
        if batch.get("status") in {"failed", "expired", "cancelled"}:
            print(f"batch ended with status {batch.get('status')}")
            return batch
        print(f"sleeping {POLL_INTERVAL_SECONDS} seconds before checking again")
        time.sleep(POLL_INTERVAL_SECONDS)


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OpenAI wine image batch workflow")
    parser.add_argument("--refresh-csv", action="store_true")
    parser.add_argument("--build-jsonl", action="store_true")
    parser.add_argument("--validate", action="store_true")
    parser.add_argument("--submit-only", action="store_true")
    parser.add_argument("--resume-only", action="store_true")
    parser.add_argument("--poll-once", action="store_true")
    parser.add_argument("--download", action="store_true")
    parser.add_argument("--apply", action="store_true")
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
    if args.download:
        download_results_if_available()
        return 0
    if args.apply:
        apply_portrait_outputs()
        return 0
    if args.submit_only:
        state = submit_new_batch()
        print(json.dumps(state, indent=2, ensure_ascii=False))
        return 0
    if args.resume_only:
        state = resume_or_submit(False)
        print(json.dumps(state, indent=2, ensure_ascii=False))
        return 0
    if args.poll_once:
        poll_once()
        return 0
    state = resume_or_submit(False)
    batch = poll_until_done(state["batch_id"])
    download_results_if_available(batch)
    final_state = load_state() or {}
    final_state.update({"last_checked_at": now_iso(), "status": batch.get("status"), "output_file_id": batch.get("output_file_id"), "error_file_id": batch.get("error_file_id")})
    if batch.get("status") == "completed" and batch.get("output_file_id"):
        final_state["downloaded_at"] = now_iso()
    save_state(final_state)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
