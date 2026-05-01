#!/usr/bin/env python3
"""Generate or refresh wine metadata for one bottle at a time."""

from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


REPO_ROOT = Path(__file__).resolve().parents[1]
WINE_JSON_PATH = REPO_ROOT / "menu_display_2" / "public" / "wines.json"
ENV_PATH = REPO_ROOT / ".env"
OPENAI_API_URL = os.environ.get("OPENAI_API_BASE", "https://api.openai.com/v1").rstrip("/") + "/responses"
MODEL = "gpt-5.4-mini"

SOMMELIER_PROMPT = """You are a world-class sommelier and wine list editor.

Your task is to regenerate the practical bottle metadata for a wine based on a JSON input object.

You will receive one wine object with fields such as:

{
  "id": 1,
  "name": "Albariño Do Ferreiro Cepas Vellas 2019",
  "base_price_eur_750ml": 42,
  "base_price_range_eur_750ml": {
    "low": 34,
    "high": 52
  },
  "michelin_star_price_eur_750ml": 150,
  "michelin_star_price_range_eur_750ml": {
    "low": 130,
    "high": 180
  },
  "michelin_markup_multiple_used": 3.4,
  "price_type": "made_up_practical_estimate",
  "confidence": "low",
  "is_fictional_or_unpriceable": false,
  "pricing_source_basis": "estimated_retail_price_from_previous_file",
  "notes": "Likely base market/retail price, rounded for practical use; not live-verified bottle-by-bottle.",
  "tasting_note": "Bright grapefruit and floral top notes with a wet stone finish elegantly threaded with saline energy."
}

Write or replace only the mutable metadata fields, and leave `name` and `tasting_note` unchanged.

Important principles:

1. Infer carefully from the wine name.
   Use producer, region, appellation, grape variety, vintage, style keywords, and cuvée names when available.
   Do not invent exact vineyard facts unless they are clearly implied by the name.

2. Be honest about inference.
   The metadata should read like an informed sommeliers' estimate, not like a claim from live tasting or live pricing.
   Avoid inventing exact bottle facts that are not implied by the name, region, producer, style, or vintage.

3. Respect the style and category.
   Identify whether the wine is sparkling, still white, still red, rosé, sweet, fortified, sake, dessert wine, orange wine, or fictional.
   Match aromas, structure, sweetness, acidity, tannin, body, oak, lees, oxidation, autolysis, botrytis, rancio, or reduction appropriately.

4. Use vintage intelligently.
   If a vintage is present, account for age and likely maturity.
   A young wine should emphasize primary fruit, freshness, and structure.
   A mature wine may show tertiary notes such as honey, wax, dried fruit, leather, tobacco, sous-bois, mushroom, truffle, nut, toast, or rancio, depending on style.
   Do not make old wines sound unrealistically fresh unless the style is known for longevity.

5. Avoid generic praise.
   Do not make every wine sound profound, grand, mineral, or ageworthy.
   Match the likely quality level implied by producer, cuvée, appellation, and price, but do not overstate it.
   A modest wine can be described as fresh, direct, charming, or food-friendly rather than complex or monumental.

6. Use serious sommelier language, but keep it readable.
   Avoid purple prose, clichés, and exaggerated claims.
   Avoid overusing “saline,” “mineral,” “long finish,” “electric acidity,” or “velvety tannins.”
   Use concrete aromas and structural observations.

7. Regenerate the practical bottle fields.
   Update the price estimate, price ranges, markup multiple, confidence, fictional flag, pricing source basis, notes, and price type so they remain internally consistent.

8. For fictional or unpriceable wines:
   If `is_fictional_or_unpriceable` is true, write an explicitly imagined but serious note.
   Use wording such as “An imagined profile…” or “A speculative fine-wine profile…”
   Keep it elegant and plausible, not silly.

9. Do not change the bottle name or tasting note.
   Preserve the original `name` and `tasting_note` values exactly as supplied in the input object.

10. Output requirements:
   Return only valid JSON.
   Return only the fields that should be updated, not the full bottle object.
   Do not add markdown.
   Do not add commentary outside the JSON.
   The result should be a compact JSON object containing the updated metadata fields only.

Quality target:

The result should sound like a serious restaurant wine list and cellar brief: precise, plausible, restrained, and internally consistent."""


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()
        if not key or key in os.environ:
            continue
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        os.environ[key] = value


def load_api_key() -> str:
    load_env_file(ENV_PATH)
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is missing; set it in the environment or in .env")
    return api_key


def load_wines() -> dict[str, Any]:
    with WINE_JSON_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_wines(data: dict[str, Any]) -> None:
    WINE_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    with tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8", dir=WINE_JSON_PATH.parent, prefix=".wines.", suffix=".tmp") as handle:
        handle.write(payload)
        tmp_path = Path(handle.name)
    os.replace(tmp_path, WINE_JSON_PATH)


def build_request_payload(wine: dict[str, Any], *, repair: bool = False) -> dict[str, Any]:
    instructions = (
        "Return only a JSON object with exactly the updated metadata fields."
        if not repair
        else "Your previous output was not valid JSON or did not follow the schema. Return only a JSON object with exactly the updated metadata fields."
    )
    return {
        "model": MODEL,
        "input": [
            {
                "role": "system",
                "content": [
                    {"type": "input_text", "text": SOMMELIER_PROMPT},
                ],
            },
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": instructions},
                    {"type": "input_text", "text": json.dumps(wine, ensure_ascii=False, indent=2)},
                ],
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "wine_metadata",
                "schema": {
                    "type": "object",
                    "properties": {
                        "base_price_eur_750ml": {
                            "type": "integer",
                            "minimum": 1,
                        },
                        "base_price_range_eur_750ml": {
                            "type": "object",
                            "properties": {
                                "low": {"type": "integer", "minimum": 1},
                                "high": {"type": "integer", "minimum": 1},
                            },
                            "required": ["low", "high"],
                            "additionalProperties": False,
                        },
                        "michelin_star_price_eur_750ml": {
                            "type": "integer",
                            "minimum": 1,
                        },
                        "michelin_star_price_range_eur_750ml": {
                            "type": "object",
                            "properties": {
                                "low": {"type": "integer", "minimum": 1},
                                "high": {"type": "integer", "minimum": 1},
                            },
                            "required": ["low", "high"],
                            "additionalProperties": False,
                        },
                        "michelin_markup_multiple_used": {
                            "type": "number",
                            "minimum": 0.1,
                        },
                        "price_type": {
                            "type": "string",
                        },
                        "confidence": {
                            "type": "string",
                        },
                        "is_fictional_or_unpriceable": {
                            "type": "boolean",
                        },
                        "pricing_source_basis": {
                            "type": "string",
                        },
                        "notes": {
                            "type": "string",
                        }
                    },
                    "required": [
                        "base_price_eur_750ml",
                        "base_price_range_eur_750ml",
                        "michelin_star_price_eur_750ml",
                        "michelin_star_price_range_eur_750ml",
                        "michelin_markup_multiple_used",
                        "price_type",
                        "confidence",
                        "is_fictional_or_unpriceable",
                        "pricing_source_basis",
                        "notes",
                    ],
                    "additionalProperties": False,
                },
                "strict": True,
            }
        },
        "temperature": 0.2,
    }


def extract_text(response: dict[str, Any]) -> str:
    if isinstance(response.get("output_text"), str) and response["output_text"].strip():
        return response["output_text"].strip()
    chunks: list[str] = []
    for item in response.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if isinstance(text, str):
                chunks.append(text)
    return "".join(chunks).strip()


def parse_updates(response_text: str) -> dict[str, Any]:
    data = json.loads(response_text)
    required_keys = {
        "base_price_eur_750ml",
        "base_price_range_eur_750ml",
        "michelin_star_price_eur_750ml",
        "michelin_star_price_range_eur_750ml",
        "michelin_markup_multiple_used",
        "price_type",
        "confidence",
        "is_fictional_or_unpriceable",
        "pricing_source_basis",
        "notes",
    }
    missing = sorted(key for key in required_keys if key not in data)
    if missing:
        raise ValueError(f"response JSON missing required keys: {', '.join(missing)}")
    updates: dict[str, Any] = {}
    for key in required_keys:
        updates[key] = data[key]
    return updates


def call_openai(wine: dict[str, Any], *, repair: bool = False) -> str:
    api_key = load_api_key()
    payload = build_request_payload(wine, repair=repair)
    request = Request(
        OPENAI_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urlopen(request, timeout=120) as response:
        body = response.read().decode("utf-8")
    parsed = json.loads(body)
    return extract_text(parsed)


def generate_updates(wine: dict[str, Any]) -> dict[str, Any]:
    attempts = [False, True]
    last_error: Exception | None = None
    for repair in attempts:
        try:
            response_text = call_openai(wine, repair=repair)
            return parse_updates(response_text)
        except (HTTPError, URLError, json.JSONDecodeError, ValueError, TimeoutError) as error:
            last_error = error
    raise RuntimeError(f"failed to generate metadata updates: {last_error}") from last_error


def update_wine_record(wines_payload: dict[str, Any], wine_id: int, updates: dict[str, Any]) -> dict[str, Any]:
    wines = wines_payload.get("wines")
    if not isinstance(wines, list):
        raise RuntimeError("wines.json does not contain a wines array")

    updated = False
    next_wines: list[dict[str, Any]] = []
    for wine in wines:
        if not isinstance(wine, dict):
            next_wines.append(wine)
            continue
        if wine.get("id") == wine_id:
            next_wine = dict(wine)
            for key, value in updates.items():
                if key not in {"id", "name", "tasting_note"}:
                    next_wine[key] = value
            next_wines.append(next_wine)
            updated = True
        else:
            next_wines.append(wine)

    if not updated:
        raise RuntimeError(f"wine id {wine_id} was not found")

    next_payload = dict(wines_payload)
    next_payload["wines"] = next_wines
    return next_payload


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate wine metadata one bottle at a time.")
    parser.add_argument("--wine-id", type=int, required=True, help="Wine id to process")
    parser.add_argument("--dry-run", action="store_true", help="Call the API and print the result without writing files")
    parser.add_argument("--write", action="store_true", help="Write the updated JSON back to the public wines file")
    args = parser.parse_args()

    if args.dry_run and args.write:
        parser.error("--dry-run and --write are mutually exclusive")
    if not args.dry_run and not args.write:
        parser.error("choose either --dry-run or --write")

    wines_payload = load_wines()
    wines = wines_payload.get("wines", [])
    wine = next((item for item in wines if isinstance(item, dict) and item.get("id") == args.wine_id), None)
    if wine is None:
        raise SystemExit(f"wine id {args.wine_id} not found in {WINE_JSON_PATH}")

    updates = generate_updates(wine)

    result = dict(wine)
    for key, value in updates.items():
        if key not in {"id", "name", "tasting_note"}:
            result[key] = value
    print(json.dumps(result, ensure_ascii=False, indent=2))

    if args.write:
        updated_payload = update_wine_record(wines_payload, args.wine_id, updates)
        save_wines(updated_payload)
        print(f"updated {WINE_JSON_PATH} for wine id {args.wine_id}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
