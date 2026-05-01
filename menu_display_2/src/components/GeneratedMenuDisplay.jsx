/* eslint-disable react/prop-types */
import { MdWarningAmber } from 'react-icons/md';
import { formatPrice, normalizeDisplayMenu } from '../lib/menuDisplayNormalization';

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
  if (!menu) return null;

  const displayMenu = normalizeDisplayMenu(menu);
  const sections = displayMenu.sections ?? [];
  const warnings = displayMenu.extractionWarnings ?? [];

  return (
    <article className="mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-stone-200/80 bg-linen/95 shadow-editorial">
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

      {warnings.length > 0 && (
        <section className="border-b border-saffron/25 bg-saffron/10 px-6 py-5 text-sm leading-6 text-clay sm:px-10 lg:px-12">
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

      <div className="divide-y divide-stone-200/80">
        {sections.map((section, sectionIndex) => (
          <section key={`${section.name}-${sectionIndex}`} className="px-6 py-8 sm:px-10 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
              <div>
                <p className="page-kicker">{section.items.length} items</p>
                <h2 className="mt-2 font-playfair text-3xl font-semibold leading-tight text-ink">
                  {section.name}
                </h2>
                {section.notes.length > 0 && (
                  <div className="mt-4 space-y-2 text-sm italic leading-6 text-stone-500">
                    {section.notes.map((note, noteIndex) => (
                      <p key={`${note}-${noteIndex}`}>{note}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="divide-y divide-stone-200/80">
                {section.items.map((item, itemIndex) => {
                  const formattedPrice = formatPrice(displayMenu.currency, item.price);

                  return (
                    <div key={`${item.name}-${itemIndex}`} className="py-5 first:pt-0 last:pb-0">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                        <div className="min-w-0">
                          <h3 className="font-playfair text-2xl font-semibold leading-tight text-ink">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="mt-2 max-w-3xl text-base leading-7 text-stone-600">
                              {item.description}
                            </p>
                          )}
                          {item.notes && (
                            <p className="mt-2 text-sm italic leading-6 text-stone-500">{item.notes}</p>
                          )}
                          {item.dietaryTags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.dietaryTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-olive/25 bg-olive/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-olive"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {formattedPrice && (
                          <p className="shrink-0 pt-1 text-right font-playfair text-xl font-semibold text-clay">
                            {formattedPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default GeneratedMenuDisplay;
