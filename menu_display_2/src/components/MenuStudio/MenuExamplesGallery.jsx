/* eslint-disable react/prop-types */

export default function MenuExamplesGallery({ menuExamples, handleLoadExample, detailsRef }) {
  if (!menuExamples || menuExamples.length === 0) return null;

  return (
    <section className="mx-auto mb-8 max-w-7xl">
      <details ref={detailsRef} className="soft-panel group p-6 sm:p-7 lg:p-8">
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
            <button
              key={entry.filename}
              type="button"
              onClick={() => handleLoadExample(entry.filename)}
              className="text-left overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40"
            >
              <div className="aspect-[4/3] bg-stone-100">
                <img src={entry.imageUrl} alt={entry.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{entry.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{entry.description}</p>
              </div>
            </button>
          ))}
        </div>
      </details>
    </section>
  );
}
