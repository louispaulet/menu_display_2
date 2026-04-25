// src/pages/Homepage.jsx

import MenuPreview from '../components/MenuPreview';
import menuData from '../menuData';

function Homepage() {
    
  return (
    <div className="page-shell">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <p className="page-kicker">Restaurant guide</p>
        <h1 className="page-title">Exquisite tasting menus from imagined kitchens.</h1>
        <p className="page-lede">
          Browse AI-conceived restaurants, atmospheric dining rooms, wine pairings, and full tasting menus from around the globe.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuData.map((menu, index) => (
          <MenuPreview
            key={index}
            id={index}
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
}

export default Homepage;
