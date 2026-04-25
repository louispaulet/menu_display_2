PYTHON ?= python3
BATCH_SCRIPT := scripts/hot_sauce_batch.py
FRONTEND_DIR := menu_display_2

.PHONY: up test lint build deploy hot-sauce-csv hot-sauce-jsonl hot-sauce-batch hot-sauce-check hot-sauce-submit hot-sauce-resume hot-sauce-refresh

up:
	cd $(FRONTEND_DIR) && npm run dev

test: lint build

lint:
	cd $(FRONTEND_DIR) && npm run lint

build:
	cd $(FRONTEND_DIR) && npm run build

deploy:
	cd $(FRONTEND_DIR) && npm run deploy

hot-sauce-csv:
	$(PYTHON) $(BATCH_SCRIPT) --refresh-csv

hot-sauce-jsonl:
	$(PYTHON) $(BATCH_SCRIPT) --build-jsonl

hot-sauce-batch:
	$(PYTHON) $(BATCH_SCRIPT)

hot-sauce-check:
	$(PYTHON) $(BATCH_SCRIPT) --poll-once

hot-sauce-submit:
	$(PYTHON) $(BATCH_SCRIPT) --submit-only

hot-sauce-resume:
	$(PYTHON) $(BATCH_SCRIPT) --resume-only

hot-sauce-refresh:
	$(PYTHON) $(BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(BATCH_SCRIPT) --build-jsonl
