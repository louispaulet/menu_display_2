import MenuPreview from '../components/MenuPreview';
import ProgressiveImage from '../components/ProgressiveImage';
import menuData from '../menuData';
import { CONTENT_ZONES, findZoneByRestaurantName } from '../lib/siteThemes';

function scrollToZone(zoneId) {
  const target = document.getElementById(zoneId);
  if (!target) return;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 112);
  window.scrollTo({ top: targetTop, behavior: 'auto' });

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
}

function Homepage() {
  const indexedMenuData = menuData.map((menu, index) => ({ ...menu, originalIndex: index }));
  const availableZones = CONTENT_ZONES.filter((zone) =>
    indexedMenuData.some((menu) => zone.restaurantNames.includes(menu.restaurant_name)),
  );

  const featuredMenu = indexedMenuData[0];
  const featuredZone = featuredMenu ? findZoneByRestaurantName(featuredMenu.restaurant_name) : null;
  const featuredImageUrl = featuredMenu
    ? `https://raw.githubusercontent.com/louispaulet/menu_display_2/main/restaurant_pictures/thumbnails/${encodeURIComponent(
        featuredMenu.restaurant_name.replace(/ /g, '_'),
      )}.webp`
    : null;

  return (
    <div className="page-shell">
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
            {featuredMenu && featuredImageUrl && (
              <article className={`soft-panel overflow-hidden ${featuredZone?.accent.border ?? ''}`}>
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${featuredZone?.accent.wash ?? 'bg-white/80'} from-white to-stone-100`}>
                  <ProgressiveImage
                    src={featuredImageUrl}
                    alt={`${featuredMenu.restaurant_name} dining room`}
                    loading="eager"
                    className="h-full w-full"
                    imageClassName="h-full w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredZone?.accent.glow ?? 'from-stone-200/30 via-transparent to-transparent'} opacity-50`} />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className={`accent-chip ${featuredZone?.accent.border ?? 'border-stone-200'} ${featuredZone?.accent.wash ?? 'bg-white/80'} ${featuredZone?.accent.text ?? 'text-stone-700'}`}>
                      Featured menu
                    </span>
                    {featuredZone && (
                      <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">
                        {featuredZone.title}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-playfair text-3xl font-semibold text-ink">{featuredMenu.restaurant_name}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{featuredMenu.chef_name}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="stat-tile">
                      <p className="stat-label">Location</p>
                      <p className="mt-1 font-semibold text-ink">{featuredMenu.location}</p>
                    </div>
                    <div className="stat-tile">
                      <p className="stat-label">Courses</p>
                      <p className="mt-1 font-semibold text-ink">{featuredMenu.tasting_menu.length}</p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            <div className="soft-panel p-5">
              <p className="page-kicker">Atlas note</p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Regional tints guide the eye without splitting the site into separate brands: Paris stays polished, Bali glows green, and Mars keeps a violet edge.
              </p>
            </div>
          </aside>
        </div>
      </header>

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

      <div className="space-y-20">
        {CONTENT_ZONES.map((zone) => {
          const zoneRestaurants = indexedMenuData.filter((menu) => zone.restaurantNames.includes(menu.restaurant_name));

          if (zoneRestaurants.length === 0) return null;

          return (
            <div key={zone.id} id={zone.id} className="zone-section scroll-mt-28">
              <div className={`mb-8 rounded-lg border px-6 py-6 sm:px-8 ${zone.accent.border} ${zone.accent.wash}`}>
                <p className="page-kicker">{zone.title}</p>
                <h2 className="mt-2 font-playfair text-3xl font-bold text-ink sm:text-4xl">Featured kitchens</h2>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">{zone.description}</p>
              </div>
              <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {zoneRestaurants.map((menu) => (
                  <MenuPreview
                    key={menu.originalIndex}
                    id={menu.originalIndex}
                    restaurantName={menu.restaurant_name}
                    chefName={menu.chef_name}
                    location={menu.location}
                    numberOfCourses={menu.tasting_menu.length}
                    totalPrice={menu.grand_total}
                  />
                ))}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Homepage;
