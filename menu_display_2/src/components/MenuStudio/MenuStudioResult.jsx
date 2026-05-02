/* eslint-disable react/prop-types */
import { MdContentCopy } from 'react-icons/md';
import GeneratedMenuDisplay from '../GeneratedMenuDisplay';

export default function MenuStudioResult({ extraction, jsonOutput, copyStatus, handleCopy }) {
  if (!extraction?.menu) {
    return (
      <section className="min-w-0 space-y-8">
        <div className="soft-panel flex min-h-[28rem] items-center justify-center p-8 text-center">
          <div className="animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
              <span className="text-4xl">🍽️</span>
            </div>
            <p className="page-kicker">Waiting room</p>
            <h2 className="mt-3 font-playfair text-4xl font-semibold text-ink">No menu yet</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-stone-600">
              Upload a menu photo or try one of our examples to see the extraction result here.
            </p>
            <div className="mt-6 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block h-2 w-2 rounded-full bg-clay/40"
                  style={{ animation: `fadeIn 1s ease-in-out ${i * 0.3}s infinite alternate` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-w-0 space-y-8 animate-fade-in-up">
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
    </section>
  );
}
