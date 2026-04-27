/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';
import { MdAttachMoney, MdLocationOn, MdRestaurantMenu } from 'react-icons/md';
import ProgressiveImage from './ProgressiveImage';
import { getZoneAccentForRestaurant } from '../lib/siteThemes';

function MenuPreview({ restaurantName, chefName, location, numberOfCourses, totalPrice, id }) {
  const baseImageUrl = "https://raw.githubusercontent.com/louispaulet/menu_display_2/main/restaurant_pictures/thumbnails/";
  const accent = getZoneAccentForRestaurant(restaurantName);

  const generateImageUrl = (restaurantName) => {
    const restaurantNameEncoded = encodeURIComponent(restaurantName.replace(/ /g, '_'));
    return `${baseImageUrl}${restaurantNameEncoded}.webp`;
  };
  return (
    <Link to={`/menu/${id}`} className={`editorial-card group block ${accent.border}`}>
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${accent.wash} from-white to-stone-100`}>
        <ProgressiveImage
          src={generateImageUrl(restaurantName)}
          alt={`${restaurantName} dining room`}
          loading="lazy"
          className="h-full w-full"
          imageClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-x-4 top-4 h-20 rounded-[1.25rem] bg-gradient-to-b ${accent.glow} opacity-60`} />
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
        <div className="flex items-center justify-between gap-3 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-700">
          <span className="flex items-center gap-2">
            <MdRestaurantMenu className={`h-4 w-4 ${accent.text}`} /> {numberOfCourses} courses
          </span>
          <span className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.16em] text-stone-500">
            <MdAttachMoney className={`h-4 w-4 ${accent.text}`} /> {totalPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MenuPreview;
