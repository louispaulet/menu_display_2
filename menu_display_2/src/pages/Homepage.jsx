// src/pages/Homepage.jsx

import MenuPreview from '../components/MenuPreview';
import menuData from '../menuData';

function Homepage() {
  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🍽️ World of Food Photography 📸</h1>
        <p className="text-lg text-gray-600">Capturing the beauty and essence of culinary delights from around the globe.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {menuData.map((menu, index) => (
          <MenuPreview
            key={index}
            id={index} // Pass the index as the ID
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
