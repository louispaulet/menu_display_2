/* eslint-disable react/prop-types */
import { scrollToZone } from '../../lib/homepageUtils';

const ZONE_EMOJI = {
  french: '🇫🇷',
  japanese: '🇯🇵',
  'southeast-asian': '🌴',
  'south-asian': '🌊',
  polynesian: '🐚',
  nordic: '❄️',
  mediterranean: '☀️',
  'latin-american': '🌮',
  'north-american': '🗽',
  'global-icons': '🌍',
  'european-heritage': '🏰',
  'middle-eastern': '🕌',
  african: '🦁',
  'outer-space': '🚀',
};

export default function ZoneNavigation({ availableZones }) {
  return (
    <nav className="mb-14 animate-fade-in" aria-label="Jump to category">
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
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:bg-white hover:-translate-y-0.5 hover:shadow-sm ${zone.accent.border} ${zone.accent.wash} ${zone.accent.text}`}
            >
              <span className="text-base">{ZONE_EMOJI[zone.id] ?? '🍽️'}</span>
              {zone.title}
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink/10 px-1.5 text-[0.6rem] font-bold text-ink/60">
                {zone.restaurantNames.length}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
