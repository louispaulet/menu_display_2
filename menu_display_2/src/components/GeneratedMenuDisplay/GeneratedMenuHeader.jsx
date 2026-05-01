/* eslint-disable react/prop-types */

function asText(value, fallback = 'Not shown') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
}

function confidenceClass(confidence) {
  if (confidence === 'high') return 'border-olive/30 bg-olive/10 text-olive';
  if (confidence === 'medium') return 'border-saffron/40 bg-saffron/10 text-clay';
  return 'border-clay/35 bg-clay/10 text-clay';
}

export default function GeneratedMenuHeader({ displayMenu, sections, meta }) {
  return (
    <header className="border-b border-stone-200/80 px-6 py-8 sm:px-10 lg:px-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="page-kicker">Generated menu</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {asText(displayMenu.restaurantName, asText(displayMenu.menuTitle, 'Untitled menu'))}
          </h1>
          {displayMenu.menuTitle && displayMenu.restaurantName && (
            <p className="mt-3 text-lg font-semibold uppercase tracking-[0.16em] text-clay">
              {displayMenu.menuTitle}
            </p>
          )}
          {displayMenu.subtitle && (
            <p className="mt-4 text-base leading-7 text-stone-600">{displayMenu.subtitle}</p>
          )}
        </div>

        <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold uppercase tracking-[0.14em] text-stone-500 lg:max-w-72 lg:justify-end lg:text-right">
          <div>
            <dt className="text-[0.62rem] text-stone-400">Sections</dt>
            <dd className="mt-1 text-base tracking-normal text-ink">{sections.length}</dd>
          </div>
          <div>
            <dt className="text-[0.62rem] text-stone-400">Currency</dt>
            <dd className="mt-1 text-base tracking-normal text-ink">{asText(displayMenu.currency)}</dd>
          </div>
          <div>
            <dt className="text-[0.62rem] text-stone-400">Language</dt>
            <dd className="mt-1 text-base tracking-normal text-ink">{asText(displayMenu.language)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className={`accent-chip ${confidenceClass(displayMenu.sourceConfidence)}`}>
          {displayMenu.sourceConfidence} confidence
        </span>
        {meta?.model && (
          <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">
            {meta.model}
          </span>
        )}
        {meta?.generatedAt && (
          <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">
            {new Date(meta.generatedAt).toLocaleString()}
          </span>
        )}
      </div>
    </header>
  );
}
