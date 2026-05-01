PYTHON ?= python3
HOT_SAUCE_BATCH_SCRIPT := scripts/hot_sauce_batch.py
RECIPE_IMAGE_BATCH_SCRIPT := scripts/recipe_image_batch.py
RESTAURANT_IMAGE_BATCH_SCRIPT := scripts/restaurant_image_batch.py
WINE_IMAGE_BATCH_SCRIPT := scripts/wine_image_batch.py
WEBP_CONVERT_SCRIPT := scripts/convert_images_to_webp.py
FRONTEND_DIR := menu_display_2
ROOT_ENV_FILE ?= .env
MENU_WORKER_ORIGIN ?= https://menu-studio-extractor.louispaulet13.workers.dev
MENU_WORKER_API_BASE ?= $(MENU_WORKER_ORIGIN)/api
MENU_FRONTEND_ORIGIN ?= https://exquisite-menus-2.thefrenchartist.dev
IMAGE_INPUT_DIR ?= artifacts/recipe_images/new_pngs
IMAGE_OUTPUT_DIR ?=
WEBP_QUALITY ?= 90

.PHONY: up test unit lint build deploy menu-studio-worker-secret menu-studio-worker-dry-run menu-studio-worker-deploy menu-studio-worker-health menu-studio-worker-cors menu-studio-frontend-deploy menu-studio-deploy-prod images-webp hot-sauce-csv hot-sauce-jsonl hot-sauce-batch hot-sauce-check hot-sauce-submit hot-sauce-resume hot-sauce-refresh recipe-images-csv recipe-images-jsonl recipe-images-validate recipe-images-submit recipe-images-check recipe-images-download recipe-images-backup recipe-images-apply recipe-images-refresh restaurant-images-csv restaurant-images-jsonl restaurant-images-validate restaurant-images-submit restaurant-images-check restaurant-images-download restaurant-images-backup restaurant-images-apply restaurant-images-refresh wine-images-csv wine-images-jsonl wine-images-validate wine-images-submit wine-images-check wine-images-download wine-images-apply wine-images-refresh

up:
	cd $(FRONTEND_DIR) && npm run dev

test: unit lint build

unit:
	cd $(FRONTEND_DIR) && npm run test

lint:
	cd $(FRONTEND_DIR) && npm run lint

build:
	cd $(FRONTEND_DIR) && npm run build

deploy:
	cd $(FRONTEND_DIR) && VITE_MENU_API_BASE="$(MENU_WORKER_API_BASE)" npm run deploy

menu-studio-worker-secret:
	@if [ ! -f "$(ROOT_ENV_FILE)" ]; then echo "Create $(ROOT_ENV_FILE) from .env.example first."; exit 1; fi
	@set -eu; \
	API_KEY="$$(awk '/^OPENAI_API_KEY=/{sub(/^OPENAI_API_KEY=/, ""); print; exit}' "$(ROOT_ENV_FILE)")"; \
	if [ -z "$$API_KEY" ]; then echo "Set OPENAI_API_KEY in $(ROOT_ENV_FILE) before running this target."; exit 1; fi; \
	printf '%s' "$$API_KEY" | (cd $(FRONTEND_DIR) && npx wrangler secret put OPENAI_API_KEY --config ../wrangler.jsonc)

menu-studio-worker-dry-run:
	cd $(FRONTEND_DIR) && npx wrangler deploy --dry-run --config ../wrangler.jsonc

menu-studio-worker-deploy:
	cd $(FRONTEND_DIR) && npm run deploy:worker

menu-studio-worker-health:
	curl -sS -i "$(MENU_WORKER_API_BASE)/health" | sed -n '1,20p'

menu-studio-worker-cors:
	curl -sS -i -X OPTIONS "$(MENU_WORKER_API_BASE)/menu-extractions" \
		-H "Origin: $(MENU_FRONTEND_ORIGIN)" \
		-H "Access-Control-Request-Method: POST" | sed -n '1,24p'

menu-studio-frontend-deploy:
	cd $(FRONTEND_DIR) && VITE_MENU_API_BASE="$(MENU_WORKER_API_BASE)" npm run deploy

menu-studio-deploy-prod:
	$(MAKE) menu-studio-worker-deploy
	$(MAKE) menu-studio-frontend-deploy

images-webp:
	$(PYTHON) $(WEBP_CONVERT_SCRIPT) $(IMAGE_INPUT_DIR) $(IMAGE_OUTPUT_DIR) --quality $(WEBP_QUALITY)

hot-sauce-csv:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --refresh-csv

hot-sauce-jsonl:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --build-jsonl

hot-sauce-batch:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT)

hot-sauce-check:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --poll-once

hot-sauce-submit:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --submit-only

hot-sauce-resume:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --resume-only

hot-sauce-refresh:
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(HOT_SAUCE_BATCH_SCRIPT) --build-jsonl

recipe-images-csv:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --refresh-csv

recipe-images-jsonl:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --build-jsonl

recipe-images-validate:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --validate

recipe-images-submit:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --submit-only

recipe-images-check:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --poll-once

recipe-images-download:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --download

recipe-images-backup:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --backup

recipe-images-apply:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --apply

recipe-images-refresh:
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --build-jsonl
	$(PYTHON) $(RECIPE_IMAGE_BATCH_SCRIPT) --validate

restaurant-images-csv:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --refresh-csv

restaurant-images-jsonl:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --build-jsonl

restaurant-images-validate:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --validate

restaurant-images-submit:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --submit-only

restaurant-images-check:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --poll-once

restaurant-images-download:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --download

restaurant-images-backup:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --backup

restaurant-images-apply:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --apply

restaurant-images-refresh:
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --build-jsonl
	$(PYTHON) $(RESTAURANT_IMAGE_BATCH_SCRIPT) --validate

wine-images-csv:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --refresh-csv

wine-images-jsonl:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --build-jsonl

wine-images-validate:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --validate

wine-images-submit:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --submit-only

wine-images-check:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --poll-once

wine-images-download:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --download

wine-images-apply:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --apply

wine-images-refresh:
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --build-jsonl
	$(PYTHON) $(WINE_IMAGE_BATCH_SCRIPT) --validate
