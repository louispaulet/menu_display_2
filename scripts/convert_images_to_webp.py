#!/usr/bin/env python3
"""Convert PNG/JPEG images in a directory to WebP."""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

from PIL import Image


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg"}


def convert_directory(input_dir: Path, output_dir: Path | None, quality: int) -> None:
    if not input_dir.exists():
        raise RuntimeError(f"input directory does not exist: {input_dir}")

    target_dir = output_dir or input_dir
    target_dir.mkdir(parents=True, exist_ok=True)
    image_paths = sorted(path for path in input_dir.iterdir() if path.suffix.lower() in SUPPORTED_EXTENSIONS)
    if not image_paths:
        raise RuntimeError(f"no PNG/JPEG images found in {input_dir}")

    for image_path in image_paths:
        output_path = target_dir / f"{image_path.stem}.webp"
        with Image.open(image_path) as image:
            image.save(output_path, "WEBP", quality=quality, method=6)
        print(f"converted {image_path} -> {output_path}")


def parse_args(argv: Iterable[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert PNG/JPEG images to WebP")
    parser.add_argument("input_dir", type=Path, help="directory containing PNG/JPEG files")
    parser.add_argument("output_dir", nargs="?", type=Path, help="optional directory for converted WebP files")
    parser.add_argument("--quality", type=int, default=90, help="WebP quality, 1-100")
    return parser.parse_args(argv)


def main(argv: Iterable[str] | None = None) -> int:
    args = parse_args(argv)
    convert_directory(args.input_dir, args.output_dir, args.quality)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
