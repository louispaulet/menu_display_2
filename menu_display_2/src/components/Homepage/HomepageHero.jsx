/* eslint-disable react/prop-types */
import { scrollToZone } from '../../lib/homepageUtils';
import FeaturedMenu from './FeaturedMenu';

export default function HomepageHero({ availableZones, featuredMenu, featuredZone, featuredImageUrl }) {
  return (
    <header className="mx-auto mb-14 max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <div className="strong-panel p-7 sm:p-10 lg:p-12">
          <p className="page-kicker">Restaurant guide</p>
          <h1 className="page-title">Exquisite tasting menus from imagined kitchens.</h1>
          <p className="page-lede mx-0 max-w-2xl">
            Browse imagined restaurants, dining rooms, wine pairings, and full tasting menus from around the globe. Each destination keeps a distinct regional mood inside one warm editorial atlas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {availableZones.slice(0, 6).map((zone) => (
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

        <aside className="grid gap-4">
          <FeaturedMenu
            featuredMenu={featuredMenu}
            featuredZone={featuredZone}
            featuredImageUrl={featuredImageUrl}
          />

          <div className="soft-panel p-5">
            <p className="page-kicker">Atlas note</p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Regional tints guide the eye without splitting the site into separate brands: Paris stays polished, Bali glows green, and Mars keeps a violet edge.
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}
