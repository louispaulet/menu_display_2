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
      <div className="p-8">
        <h1 className="text-3xl font-bold">Menu Not Found</h1>
        <p className="text-gray-600">Sorry, the menu you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
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
