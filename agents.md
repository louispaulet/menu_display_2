# Repository Instructions

Always read this `agents.md` file before starting any task in this repository.

## Project Layout

- The React/Vite application lives in `menu_display_2/`.
- Source code is under `menu_display_2/src/`.
- Generated build output is under `menu_display_2/dist/` and should not be edited by hand.
- Maintained automation scripts live in `scripts/`.
- Generated batch manifests and outputs live in `artifacts/`.
- Backup archives live in `backups/`.

## Workflow

- Prefer small, focused changes that follow the existing React and Tailwind patterns.
- Run checks from `menu_display_2/` before finishing UI or code changes:
  - `npm run lint`
  - `npm run build`
- When changing the frontend, open or refresh the in-app browser on the affected route before reporting completion.
- Recipe image batches use `scripts/recipe_image_batch.py` and the Make targets documented in `README.md`.
- Restaurant image batches use `scripts/restaurant_image_batch.py`; full-size restaurant images are generated and thumbnails are derived locally.
- Before overwriting generated recipe WebP files, create a backup zip with `make recipe-images-backup` or let `make recipe-images-apply` create one automatically.
- Before overwriting restaurant WebP files, create a backup zip with `make restaurant-images-backup` or let `make restaurant-images-apply` create one automatically.
- Use `make images-webp IMAGE_INPUT_DIR=/path/to/pngs IMAGE_OUTPUT_DIR=/path/to/webps` for quick PNG/JPEG to WebP conversion.

## Git Hygiene

- Do not revert unrelated user changes.
- Ignore unrelated untracked assets unless the task explicitly asks to include them.
- After every completed change, commit and push the work before moving on.
- Always commit and push completed changes, even when working directly on `main`.
