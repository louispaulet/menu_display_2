PYTHON ?= python3
BATCH_SCRIPT := scripts/hot_sauce_batch.py

.PHONY: hot-sauce-csv hot-sauce-jsonl hot-sauce-batch hot-sauce-submit hot-sauce-resume hot-sauce-refresh

hot-sauce-csv:
	$(PYTHON) $(BATCH_SCRIPT) --refresh-csv

hot-sauce-jsonl:
	$(PYTHON) $(BATCH_SCRIPT) --build-jsonl

hot-sauce-batch:
	$(PYTHON) $(BATCH_SCRIPT)

hot-sauce-submit:
	$(PYTHON) $(BATCH_SCRIPT) --submit-only

hot-sauce-resume:
	$(PYTHON) $(BATCH_SCRIPT) --resume-only

hot-sauce-refresh:
	$(PYTHON) $(BATCH_SCRIPT) --refresh-csv
	$(PYTHON) $(BATCH_SCRIPT) --build-jsonl
