import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';  // Chef icon
import { MdLocationOn, MdRestaurantMenu, MdAttachMoney } from 'react-icons/md';  // Location, Courses, and Price icons

function MenuPreview({ restaurantName, chefName, location, numberOfCourses, totalPrice, id }) {
  return (
    <Link to={`/menu/${id}`} className="block bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{restaurantName}</h2>
      <p className="text-gray-600 mb-2 flex items-center">
        <GiChefToque className="mr-2" /> {chefName}
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <MdLocationOn className="mr-2" /> {location}
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <MdRestaurantMenu className="mr-2" /> {numberOfCourses} Courses
      </p>
      <p className="text-gray-600 flex items-center">
        <MdAttachMoney className="mr-2" /> ${totalPrice}
      </p>
    </Link>
  );
}

export default MenuPreview;
