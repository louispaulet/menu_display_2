/* eslint-disable react/prop-types */

export default function MenuExamplesGallery({ menuExamples, handleLoadExample, detailsRef }) {
  if (!menuExamples || menuExamples.length === 0) return null;

  return (
    <section ref={detailsRef} className="mx-auto mb-8 max-w-7xl">
      <div className="soft-panel p-6 sm:p-7 lg:p-8">
        <div className="mb-6 border-b border-stone-200 pb-5">
          <p className="page-kicker">Examples</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">Try Our Examples</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
            Explore a few previous menus to see the kind of layouts and image quality the studio can handle.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {menuExamples.map((entry) => (
            <button
              key={entry.filename}
              type="button"
              onClick={() => handleLoadExample(entry.filename)}
              className="group text-left overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img src={entry.imageUrl} alt={entry.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{entry.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{entry.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
