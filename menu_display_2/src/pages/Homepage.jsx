import MenuPreview from '../components/MenuPreview';
import menuData from '../menuData';
import { CONTENT_ZONES, findZoneByRestaurantName } from '../lib/siteThemes';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
import HomepageHero from '../components/Homepage/HomepageHero';
import ZoneNavigation from '../components/Homepage/ZoneNavigation';

const encodeAssetSegment = (value) => encodeURIComponent(value.replace(/ /g, '_')).replace(/%2C/gi, ',');

function Homepage() {
  const indexedMenuData = menuData.map((menu, index) => ({ ...menu, originalIndex: index }));
  const availableZones = CONTENT_ZONES.filter((zone) =>
    indexedMenuData.some((menu) => zone.restaurantNames.includes(menu.restaurant_name)),
  );

  const featuredMenu = indexedMenuData[0];
  const featuredZone = featuredMenu ? findZoneByRestaurantName(featuredMenu.restaurant_name) : null;
  const featuredImageUrl = featuredMenu
    ? `${getGeneratedImageBaseUrl('restaurant_pictures/thumbnails')}${encodeAssetSegment(
        featuredMenu.restaurant_name,
      )}.webp`
    : null;

  return (
    <div className="page-shell">
      <HomepageHero
        availableZones={availableZones}
        featuredMenu={featuredMenu}
        featuredZone={featuredZone}
        featuredImageUrl={featuredImageUrl}
      />

      <ZoneNavigation availableZones={availableZones} />

      <div className="space-y-20">
        {CONTENT_ZONES.map((zone) => {
          const zoneRestaurants = indexedMenuData.filter((menu) => zone.restaurantNames.includes(menu.restaurant_name));

          if (zoneRestaurants.length === 0) return null;

          return (
            <div key={zone.id} id={zone.id} className="zone-section scroll-mt-28">
              <div className={`mb-8 rounded-lg border px-6 py-6 sm:px-8 ${zone.accent.border} ${zone.accent.wash}`}>
                <p className="page-kicker">{zone.title}</p>
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
