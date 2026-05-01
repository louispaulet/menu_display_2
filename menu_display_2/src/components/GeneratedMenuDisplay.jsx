/* eslint-disable react/prop-types */
import { MdRestaurantMenu, MdWarningAmber } from 'react-icons/md';

function asText(value, fallback = 'Not shown') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
}

function confidenceClass(confidence) {
  if (confidence === 'high') return 'border-olive/30 bg-olive/10 text-olive';
  if (confidence === 'medium') return 'border-saffron/40 bg-saffron/10 text-clay';
  return 'border-clay/35 bg-clay/10 text-clay';
}

function GeneratedMenuDisplay({ menu, meta }) {
  const sections = menu?.sections ?? [];
  const warnings = menu?.extractionWarnings ?? [];

  if (!menu) return null;

  return (
    <article className="mx-auto max-w-5xl">
      <header className="strong-panel p-7 sm:p-10 lg:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="page-kicker">Generated menu</p>
            <h1 className="mt-3 font-playfair text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {asText(menu.restaurantName, asText(menu.menuTitle, 'Untitled menu'))}
            </h1>
            {menu.menuTitle && menu.restaurantName && (
              <p className="mt-3 text-xl font-semibold text-stone-700">{menu.menuTitle}</p>
            )}
            {menu.subtitle && (
              <p className="mt-2 max-w-2xl text-base leading-7 text-stone-600">{menu.subtitle}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-80">
            <div className="stat-tile">
              <p className="stat-label">Sections</p>
              <p className="stat-value">{sections.length}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-label">Currency</p>
              <p className="stat-value">{asText(menu.currency)}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-label">Language</p>
              <p className="stat-value">{asText(menu.language)}</p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className={`accent-chip ${confidenceClass(menu.sourceConfidence)}`}>
            {menu.sourceConfidence} confidence
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

      {warnings.length > 0 && (
        <section className="mt-6 rounded-lg border border-saffron/30 bg-saffron/10 p-5 text-sm leading-6 text-clay">
          <div className="flex items-center gap-2 font-bold">
            <MdWarningAmber className="h-5 w-5" />
            Extraction notes
          </div>
          <ul className="mt-3 space-y-2">
            {warnings.map((warning, index) => (
              <li key={`${warning}-${index}`}>{warning}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 space-y-7">
        {sections.map((section, sectionIndex) => (
          <section key={`${section.name}-${sectionIndex}`} className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <MdRestaurantMenu className="h-5 w-5 text-clay" />
              <h2 className="font-playfair text-3xl font-semibold text-ink">{section.name}</h2>
            </div>

            <div className="mt-6 divide-y divide-stone-200/80">
              {section.items.map((item, itemIndex) => (
                <div key={`${item.name}-${itemIndex}`} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-playfair text-2xl font-semibold leading-tight text-ink">{item.name}</h3>
                    {item.price && (
                      <p className="shrink-0 rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-bold text-stone-700">
                        {item.price}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600">{item.description}</p>
                  )}

                  {(item.dietaryTags.length > 0 || item.notes) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag) => (
                        <span key={tag} className="accent-chip border-olive/25 bg-olive/10 text-olive">
                          {tag}
                        </span>
                      ))}
                      {item.notes && (
                        <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">
                          {item.notes}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default GeneratedMenuDisplay;
