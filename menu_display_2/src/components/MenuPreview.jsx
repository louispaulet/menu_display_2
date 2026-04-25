/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';
import { MdAttachMoney, MdLocationOn, MdRestaurantMenu } from 'react-icons/md';

function MenuPreview({ restaurantName, chefName, location, numberOfCourses, totalPrice, id }) {
  const baseImageUrl = "https://raw.githubusercontent.com/louispaulet/menu_display_2/main/restaurant_pictures/thumbnails/";

  const generateImageUrl = (restaurantName) => {
    const restaurantNameEncoded = encodeURIComponent(restaurantName.replace(/ /g, '_'));
    return `${baseImageUrl}${restaurantNameEncoded}.webp`;
  };
  return (
    <Link to={`/menu/${id}`} className="editorial-card group block">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={generateImageUrl(restaurantName)}
          alt={`${restaurantName} dining room`}
          className="h-full w-full transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="page-kicker text-[0.65rem]">Tasting menu</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold leading-tight text-ink">{restaurantName}</h2>
        </div>
        <div className="space-y-2">
          <p className="meta-row">
            <GiChefToque className="meta-icon" /> <span>{chefName}</span>
          </p>
          <p className="meta-row">
            <MdLocationOn className="meta-icon" /> <span>{location}</span>
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-sm font-semibold text-stone-700">
          <span className="flex items-center gap-2">
            <MdRestaurantMenu className="h-4 w-4 text-clay" /> {numberOfCourses} courses
          </span>
          <span className="flex items-center gap-1">
            <MdAttachMoney className="h-4 w-4 text-clay" /> {totalPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MenuPreview;
