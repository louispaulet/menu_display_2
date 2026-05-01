/* eslint-disable react/prop-types */
import { MdWarningAmber } from 'react-icons/md';
import { formatPrice, normalizeDisplayMenu } from '../lib/menuDisplayNormalization';
import GeneratedMenuHeader from './GeneratedMenuDisplay/GeneratedMenuHeader';
import GeneratedMenuItem from './GeneratedMenuDisplay/GeneratedMenuItem';

function GeneratedMenuDisplay({ menu, meta }) {
  if (!menu) return null;

  const displayMenu = normalizeDisplayMenu(menu);
  const sections = displayMenu.sections ?? [];
  const warnings = displayMenu.extractionWarnings ?? [];

  return (
    <article className="mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-stone-200/80 bg-linen/95 shadow-editorial">
      <GeneratedMenuHeader displayMenu={displayMenu} sections={sections} meta={meta} />

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
                {section.items.map((item, itemIndex) => (
                  <GeneratedMenuItem
                    key={`${item.name}-${itemIndex}`}
                    item={item}
                    formattedPrice={formatPrice(displayMenu.currency, item.price)}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default GeneratedMenuDisplay;
