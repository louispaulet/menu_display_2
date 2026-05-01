import { useEffect, useMemo, useRef, useState } from 'react';
import { MdCheckCircle, MdContentCopy, MdDelete, MdErrorOutline, MdUploadFile } from 'react-icons/md';
import GeneratedMenuDisplay from '../components/GeneratedMenuDisplay';
import {
  clearMenuStudioResult,
  loadStoredMenuStudioResult,
  saveMenuStudioResult,
} from '../lib/menuStudioStorage';

const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const apiBase = (import.meta.env.VITE_MENU_API_BASE || '/api').replace(/\/$/, '');

function formatBytes(bytes) {
  if (!bytes) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getClientFileError(file) {
  if (!file) return 'Choose a menu image first.';
  if (!ACCEPTED_TYPES.has(file.type)) return 'Upload a JPEG, PNG, or WebP menu image.';
  if (file.size > MAX_UPLOAD_BYTES) return 'Keep the menu image under 10MB.';
  return '';
}

function MenuStudio() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extraction, setExtraction] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [isRestored, setIsRestored] = useState(false);
  const [menuExamples, setMenuExamples] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const stored = loadStoredMenuStudioResult();
    if (stored) {
      setExtraction(stored);
      setIsRestored(true);
    }
  }, []);

  useEffect(() => {
    fetch('/menu_examples.json')
      .then((response) => response.json())
      .then((data) => {
        const entries = Object.entries(data).map(([filename, info]) => ({
          filename,
          title: info.title,
          description: info.description,
          imageUrl: `/menu_examples/${filename}`,
        }));
        setMenuExamples(entries);
      })
      .catch(() => setMenuExamples([]));
  }, []);

  const jsonOutput = useMemo(
    () => (extraction ? JSON.stringify(extraction, null, 2) : ''),
    [extraction],
  );
  const hasExtraction = Boolean(extraction?.menu);

  const fileStatus = selectedFile
    ? `${selectedFile.name} · ${formatBytes(selectedFile.size)}`
    : 'No file selected';

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setError(file ? getClientFileError(file) : '');
    setCopyStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientError = getClientFileError(selectedFile);

    if (clientError) {
      setError(clientError);
      return;
    }

    setError('');
    setCopyStatus('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.set('menuImage', selectedFile);

      const response = await fetch(`${apiBase}/menu-extractions`, {
        method: 'POST',
        body: formData,
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(body?.error?.message || 'Menu extraction failed.');
      }

      setExtraction(body);
      setIsRestored(false);
      saveMenuStudioResult(body);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Menu extraction failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setExtraction(null);
    setError('');
    setCopyStatus('');
    setIsRestored(false);
    clearMenuStudioResult();
    if (inputRef.current) inputRef.current.value = '';
    setSelectedFile(null);
  };

  const handleCopy = async () => {
    if (!jsonOutput) return;

    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopyStatus('JSON copied');
    } catch {
      setCopyStatus('Copy unavailable');
    }
  };

  return (
    <div className="page-shell">
      <header className={`mx-auto max-w-7xl ${hasExtraction ? 'mb-8' : 'mb-10'}`}>
        <div className="strong-panel p-7 sm:p-10 lg:p-12">
          <p className="page-kicker">Menu studio</p>
          <h1 className="page-title max-w-4xl">Turn a menu photo into a refined text menu.</h1>
          <p className="page-lede mx-0 max-w-3xl">
            Upload a photographed menu, extract the visible details with OpenAI, and keep the result as clean structured JSON.
          </p>
        </div>
      </header>

      <section className="mx-auto mb-8 max-w-7xl">
        <details className="soft-panel group p-6 sm:p-7 lg:p-8">
          <summary className="cursor-pointer list-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-clay/40">
            <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <p className="page-kicker">Examples</p>
                <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">try some of our examples!</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                  Explore a few previous menus to see the kind of layouts and image quality the studio can handle.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ink group-open:bg-ink">
                <span className="group-open:hidden">Show {menuExamples.length} examples</span>
                <span className="hidden group-open:inline">Hide {menuExamples.length} examples</span>
              </div>
            </div>
          </summary>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {menuExamples.map((entry) => (
              <article key={entry.filename} className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="aspect-[4/3] bg-stone-100">
                  <img src={entry.imageUrl} alt={entry.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-ink">{entry.title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{entry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </details>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <section className="soft-panel p-6 sm:p-7 lg:sticky lg:top-24 lg:self-start">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="page-kicker">Source</p>
              <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">Menu image</h2>
            </div>

            <label
              htmlFor="menuImage"
              className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-clay/40 bg-linen/70 px-5 py-9 text-center transition hover:border-clay hover:bg-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-clay/25 bg-white text-clay">
                <MdUploadFile className="h-6 w-6" />
              </span>
              <span className="font-semibold text-ink">Choose image</span>
              <span className="text-sm leading-6 text-stone-500">JPEG, PNG, or WebP · max 10MB</span>
              <input
                ref={inputRef}
                id="menuImage"
                name="menuImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>

            <div className="rounded-lg border border-stone-200 bg-white/80 px-4 py-3 text-sm font-semibold text-stone-600">
              {fileStatus}
            </div>

            {error && (
              <div className="flex gap-3 rounded-lg border border-clay/30 bg-clay/10 p-4 text-sm leading-6 text-clay">
                <MdErrorOutline className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isRestored && (
              <div className="flex gap-3 rounded-lg border border-olive/30 bg-olive/10 p-4 text-sm leading-6 text-olive">
                <MdCheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>Restored saved menu</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="action-pill border-clay bg-clay text-white hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-200 disabled:text-stone-500"
              >
                <MdUploadFile className="h-5 w-5" />
                {isSubmitting ? 'Extracting...' : 'Extract menu'}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="action-pill border-stone-200 bg-white text-ink hover:border-clay hover:text-clay"
              >
                <MdDelete className="h-5 w-5" />
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="min-w-0 space-y-8">
          {extraction?.menu ? (
            <>
              <GeneratedMenuDisplay menu={extraction.menu} meta={extraction.meta} />

              <div className="soft-panel overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-stone-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="page-kicker">JSON response</p>
                    <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">Structured menu</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    {copyStatus && <span className="text-sm font-semibold text-stone-500">{copyStatus}</span>}
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="quiet-link inline-flex items-center gap-2"
                    >
                      <MdContentCopy className="h-4 w-4" />
                      Copy JSON
                    </button>
                  </div>
                </div>
                <pre className="max-h-[32rem] overflow-auto bg-ink p-5 text-xs leading-6 text-linen sm:text-sm">
                  {jsonOutput}
                </pre>
              </div>
            </>
          ) : (
            <div className="soft-panel flex min-h-[28rem] items-center justify-center p-8 text-center">
              <div>
                <p className="page-kicker">Waiting room</p>
                <h2 className="mt-3 font-playfair text-4xl font-semibold text-ink">No menu yet</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-stone-600">
                  The generated version will appear here after extraction.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MenuStudio;
