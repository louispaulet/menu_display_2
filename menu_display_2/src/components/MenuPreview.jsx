/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';
import { MdAttachMoney, MdLocationOn, MdRestaurantMenu } from 'react-icons/md';
import ProgressiveImage from './ProgressiveImage';
import { getZoneAccentForRestaurant } from '../lib/siteThemes';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
import { useSingleFadeIn } from '../lib/useIntersectionFadeIn';

const encodeAssetSegment = (value) => encodeURIComponent(value.replace(/ /g, '_')).replace(/%2C/gi, ',');

function MenuPreview({ restaurantName, chefName, location, numberOfCourses, totalPrice, id }) {
  const baseImageUrl = getGeneratedImageBaseUrl('restaurant_pictures/thumbnails');
  const accent = getZoneAccentForRestaurant(restaurantName);
  const { ref, visible } = useSingleFadeIn();

  const generateImageUrl = (restaurantName) => {
    const restaurantNameEncoded = encodeAssetSegment(restaurantName);
    return `${baseImageUrl}${restaurantNameEncoded}.webp`;
  };
  return (
    <Link
      ref={ref}
      to={`/menu/${id}`}
      className={`editorial-card group flex h-full flex-col ${accent.border} io-hidden ${visible ? 'io-visible' : ''}`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${accent.wash} from-white to-stone-100`}>
        <ProgressiveImage
          src={generateImageUrl(restaurantName)}
          alt={`${restaurantName} dining room`}
          loading="lazy"
          className="h-full w-full"
          imageClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${accent.glow} opacity-55`} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="page-kicker text-[0.65rem]">Tasting menu</p>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${accent.border} ${accent.wash} ${accent.text}`}>
              ${totalPrice}
            </span>
          </div>
          <h2 className="mt-2 font-playfair text-2xl font-semibold leading-tight text-ink">{restaurantName}</h2>
        </div>
        <div className="space-y-2">
          <p className="meta-row">
            <GiChefToque className="meta-icon" /> <span>{chefName}</span>
          </p>
          <p className="meta-row">
            <MdLocationOn className="meta-icon" /> <span>{location}</span>
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-700">
          <span className="flex items-center gap-2">
            <MdRestaurantMenu className={`h-4 w-4 ${accent.text}`} /> {numberOfCourses} courses
          </span>
          <span className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-500">
            <MdAttachMoney className={`h-4 w-4 ${accent.text}`} /> tasting
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MenuPreview;
