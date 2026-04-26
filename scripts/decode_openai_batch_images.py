#!/usr/bin/env python3
"""Decode OpenAI image batch responses and save PNGs to a folder.

Usage:
  python3 scripts/decode_openai_batch_images.py response.txt output_pngs/
  python3 scripts/decode_openai_batch_images.py batch_output.jsonl output_pngs/

The input can be either:
  - a single pretty-printed JSON object
  - a JSONL file with one JSON object per line

Each record should contain:
  record["response"]["body"]["data"][0]["b64_json"]
"""

from __future__ import annotations

import argparse
import base64
import json
import re
from pathlib import Path
from urllib.request import urlopen


def safe_filename(text: str, fallback: str) -> str:
    text = text.strip()
    if not text:
        return fallback
    text = re.sub(r"[^A-Za-z0-9._-]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-._")
    return text or fallback


def load_records(path: Path) -> list[dict]:
    raw = path.read_text(encoding="utf-8").strip()
    if not raw:
        return []

    try:
        parsed = json.loads(raw)
        return [parsed] if isinstance(parsed, dict) else list(parsed)
    except json.JSONDecodeError:
        records: list[dict] = []
        for line in raw.splitlines():
            line = line.strip()
            if line:
                records.append(json.loads(line))
        return records


def extract_png_bytes(record: dict) -> bytes:
    response = record.get("response", {})
    body = response.get("body", {})
    data = body.get("data", [])
    if not data:
        raise ValueError(f"No image data found for {record.get('custom_id') or record.get('id')}")

    image_item = data[0]
    if "b64_json" in image_item:
        return base64.b64decode(image_item["b64_json"])
    if "url" in image_item:
        with urlopen(image_item["url"]) as response:
            return response.read()
    raise ValueError(f"Unsupported image payload for {record.get('custom_id') or record.get('id')}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Save OpenAI batch images as PNG files")
    parser.add_argument("input_file", type=Path, help="response.txt or batch_output.jsonl")
    parser.add_argument("output_dir", type=Path, help="folder to write PNGs into")
    args = parser.parse_args()

    records = load_records(args.input_file)
    args.output_dir.mkdir(parents=True, exist_ok=True)

    saved = 0
    for index, record in enumerate(records, start=1):
        custom_id = record.get("custom_id") or record.get("id") or f"image-{index:04d}"
        filename = safe_filename(custom_id, f"image-{index:04d}") + ".png"
        output_path = args.output_dir / filename
        output_path.write_bytes(extract_png_bytes(record))
        saved += 1
        print(f"saved {output_path}")

    print(f"done: {saved} image(s) written to {args.output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
