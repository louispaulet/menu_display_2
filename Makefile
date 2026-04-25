PYTHON ?= python3
HOT_SAUCE_BATCH_SCRIPT := scripts/hot_sauce_batch.py
RECIPE_IMAGE_BATCH_SCRIPT := scripts/recipe_image_batch.py
RESTAURANT_IMAGE_BATCH_SCRIPT := scripts/restaurant_image_batch.py
WEBP_CONVERT_SCRIPT := scripts/convert_images_to_webp.py
FRONTEND_DIR := menu_display_2
IMAGE_INPUT_DIR ?= artifacts/recipe_images/new_pngs
IMAGE_OUTPUT_DIR ?=
WEBP_QUALITY ?= 90

.PHONY: up test lint build deploy images-webp hot-sauce-csv hot-sauce-jsonl hot-sauce-batch hot-sauce-check hot-sauce-submit hot-sauce-resume hot-sauce-refresh recipe-images-csv recipe-images-jsonl recipe-images-validate recipe-images-submit recipe-images-check recipe-images-download recipe-images-backup recipe-images-apply recipe-images-refresh restaurant-images-csv restaurant-images-jsonl restaurant-images-validate restaurant-images-submit restaurant-images-check restaurant-images-download restaurant-images-backup restaurant-images-apply restaurant-images-refresh

up:
	cd $(FRONTEND_DIR) && npm run dev

test: lint build

lint:
	cd $(FRONTEND_DIR) && npm run lint

build:
	cd $(FRONTEND_DIR) && npm run build

deploy:
	cd $(FRONTEND_DIR) && npm run deploy

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
