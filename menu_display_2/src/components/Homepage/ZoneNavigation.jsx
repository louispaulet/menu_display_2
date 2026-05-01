/* eslint-disable react/prop-types */
import { scrollToZone } from '../../lib/homepageUtils';

export default function ZoneNavigation({ availableZones }) {
  return (
    <nav className="mb-14" aria-label="Jump to category">
      <div className="soft-panel p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-kicker">Quick jump</p>
            <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">Pick a region</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-500">
            Move straight into the dining worlds below.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 pb-1 pr-1">
          {availableZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => scrollToZone(zone.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${zone.accent.border} ${zone.accent.wash} ${zone.accent.text} hover:bg-white`}
            >
              {zone.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
