// src/pages/Homepage.jsx

import MenuPreview from '../components/MenuPreview';
import menuData from '../menuData';

const zones = [
  {
    id: 'french',
    title: 'French Excellence',
    description: 'Indulge in the cradle of fine dining, from the heart of Paris to the snow-capped Alps.',
    restaurantNames: ["L'Etoile d'Or", "Le Paradis des Douceurs", "L'Étoile des Neiges", "Le Jardin Végétal", "Le Festin Opulent", "Le Papillon d'Or", "Le Château des Choux", "La Dame de Pic", "The Imperial Room"]
  },
  {
    id: 'japanese',
    title: 'Japanese Artistry',
    description: 'Experience the precision and seasonal purity of traditional and modern Japanese cuisine.',
    restaurantNames: ["Sakura No Hana", "Le Jardin Zen", "Sushi Zenkai"]
  },
  {
    id: 'southeast-asian',
    title: 'South East Asian Jewels',
    description: 'A journey through the vibrant spices and delicate balance of Vietnam and Indonesia.',
    restaurantNames: ["Taman Sari", "Sen Vàng"]
  },
  {
    id: 'south-asian',
    title: 'South Asian & Indian Ocean',
    description: 'Exotic flavors from the bustling streets of Mumbai to the serene shores of the Maldives.',
    restaurantNames: ["Fisherman's Grill", "Sarvottam"]
  },
  {
    id: 'polynesian',
    title: 'Polynesian Paradise',
    description: 'Tropical paradises offering the freshest catches from the crystal-clear waters of the Pacific.',
    restaurantNames: ["Le Lagon", "Island Elysium", "Kai 'Olu"]
  },
  {
    id: 'nordic',
    title: 'Nordic Spirit',
    description: 'Bold and innovative flavors from the pristine landscapes of Finland and Iceland.',
    restaurantNames: ["Nordic Essence", "Nordic Haven", "Aurora Borealis"]
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean Charm',
    description: 'Sun-drenched ingredients and timeless recipes from Italy, Spain, and Greece.',
    restaurantNames: ["La Serenissima", "La Dolce Vita", "Lab de Sabores", "The Golden Aegean", "La Cucina dei Sogni", "La Esencia"]
  },
  {
    id: 'latin-american',
    title: 'Latin American Soul',
    description: 'A celebration of diverse cultures and vibrant ingredients from Mexico to the Amazon.',
    restaurantNames: ["Inti Raymi", "Cielo Azul", "Pescado Sagrado"]
  },
  {
    id: 'north-american',
    title: 'North American Modern',
    description: 'Contemporary culinary landmarks from the streets of New York to the Pacific coast.',
    restaurantNames: ["Verdant Elegance", "The American Tapestry", "Parkview Elegance", "Sol y Sakura"]
  },
  {
    id: 'european-heritage',
    title: 'European Heritage',
    description: 'Refined classics from the heart of Germany, Switzerland, and the grandeur of Russia.',
    restaurantNames: ["Deutscher Geschmack", "Imperial Caviar", "Alpine Heights"]
  },
  {
    id: 'middle-eastern',
    title: 'Middle Eastern Oasis',
    description: 'Opulent dining experiences blending modern elegance with rich regional traditions.',
    restaurantNames: ["Alcazar"]
  },
  {
    id: 'african',
    title: 'African Savanna',
    description: 'Unique dining adventures amidst the breathtaking landscapes and wildlife of the Serengeti.',
    restaurantNames: ["Majani"]
  },
  {
    id: 'outer-space',
    title: 'Interstellar Gastronomy',
    description: 'Avant-garde dining beyond our atmosphere, from the Red Planet to the far future.',
    restaurantNames: ["The Red Planet Bistro", "Galactic Delights"]
  }
];

function Homepage() {
  // Create a map for quick access to menu items by their original index
  const indexedMenuData = menuData.map((menu, index) => ({ ...menu, originalIndex: index }));
  const availableZones = zones.filter((zone) =>
    indexedMenuData.some((menu) => zone.restaurantNames.includes(menu.restaurant_name))
  );

  return (
    <div className="page-shell">
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <p className="page-kicker">Restaurant guide</p>
        <h1 className="page-title">Exquisite tasting menus from imagined kitchens.</h1>
        <p className="page-lede">
          Browse AI-conceived restaurants, atmospheric dining rooms, wine pairings, and full tasting menus from around the globe.
        </p>
      </header>

      <nav className="mb-16" aria-label="Jump to category">
        <div className="rounded-3xl border border-stone-200/80 bg-linen/85 p-4 shadow-card backdrop-blur-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="page-kicker">Quick jump</p>
              <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">Pick a category</h2>
            </div>
            <p className="hidden max-w-sm text-sm leading-6 text-stone-500 sm:block">
              Jump straight to any of the 13 curated menu regions below.
            </p>
          </div>
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1 pr-1">
            {availableZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  const target = document.getElementById(zone.id);
                  if (!target) return;

                  const root = document.documentElement;
                  const previousScrollBehavior = root.style.scrollBehavior;
                  root.style.scrollBehavior = 'auto';

                  const targetTop = Math.max(
                    0,
                    target.getBoundingClientRect().top + window.scrollY - 112
                  );
                  window.scrollTo({ top: targetTop, behavior: 'auto' });

                  window.requestAnimationFrame(() => {
                    root.style.scrollBehavior = previousScrollBehavior;
                  });
                }}
                className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-saffron/50 hover:bg-parchment hover:text-ink"
              >
                {zone.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="space-y-24">
        {zones.map((zone) => {
          const zoneRestaurants = indexedMenuData.filter((menu) => 
            zone.restaurantNames.includes(menu.restaurant_name)
          );

          if (zoneRestaurants.length === 0) return null;

          return (
            <div key={zone.id} id={zone.id} className="zone-section scroll-mt-28">
              <div className="mb-10 border-b border-stone-200 pb-6">
                <h2 className="font-playfair text-4xl font-bold text-ink sm:text-5xl">{zone.title}</h2>
                <p className="mt-3 max-w-2xl text-lg text-stone-600 italic">
                  {zone.description}
                </p>
              </div>
              <section className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
