// src/pages/Menu.jsx

import { useParams } from 'react-router-dom';
import menuData from '../menuData';
import MenuDisplay from '../components/MenuDisplay';

function Menu() {
  const { id } = useParams(); // Get the menu id from the URL
  const menu = menuData[id]; // Find the specific menu by id

  // Ensure a valid menu is selected
  if (!menu) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-linen p-8 text-center shadow-card">
          <p className="page-kicker">Missing menu</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Menu not found</h1>
          <p className="mt-4 text-stone-600">Sorry, the menu you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <MenuDisplay
        restaurantName={menu.restaurant_name}
        chefName={menu.chef_name}
        location={menu.location}
        tastingMenu={menu.tasting_menu}
        diningRoomDescription={menu.dining_room_description}
        grandTotal={menu.grand_total}
      />
    </div>
  );
}

export default Menu;
