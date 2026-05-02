/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import FeaturedMenu from './FeaturedMenu';

export default function HomepageHero({ availableZones, featuredMenu, featuredZone, featuredImageUrl }) {
  return (
    <header className="mx-auto mb-14 max-w-6xl animate-fade-in-up">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <div className="strong-panel p-7 sm:p-10 lg:p-12">
          <p className="page-kicker">Restaurant guide</p>
          <h1 className="page-title gradient-text">Exquisite tasting menus from imagined kitchens.</h1>
          <p className="page-lede mx-0 max-w-2xl">
            Browse imagined restaurants, dining rooms, wine pairings, and full tasting menus from around the globe. Each destination keeps a distinct regional mood inside one warm editorial atlas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/menu/0"
              className="action-pill border-clay bg-clay text-white shadow-md hover:border-ink hover:bg-ink"
            >
              Explore the atlas →
            </Link>
            <span className="text-sm font-semibold text-stone-400">
              {availableZones.length} regions · {availableZones.reduce((acc, zone) => acc + zone.restaurantNames.length, 0)} restaurants
            </span>
          </div>
        </div>

        <FeaturedMenu
          featuredMenu={featuredMenu}
          featuredZone={featuredZone}
          featuredImageUrl={featuredImageUrl}
        />
      </div>
    </header>
  );
}
