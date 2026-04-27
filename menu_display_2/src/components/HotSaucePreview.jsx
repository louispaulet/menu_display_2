/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaDollarSign, FaHourglassHalf, FaPepperHot, FaWarehouse } from 'react-icons/fa';
import { GiFireBottle } from 'react-icons/gi';
import ProgressiveImage from './ProgressiveImage';

function HotSaucePreview({
  name,
  hotnessLevel,
  bottlingDate,
  price,
  scovilleUnits,
  ageMonths,
  batchSize,
  description,
  id,
}) {
  const generateImageUrl = (name) => {
    const nameEncoded = encodeURIComponent(name.replace(/ /g, '_'));
    return `/sauce_pictures/${nameEncoded}.webp`;
  };

  return (
    <Link to={`/hot-sauce/${id}`} className="editorial-card group block border-rose-200/70">
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <ProgressiveImage
          src={generateImageUrl(name)}
          alt={`${name} bottle`}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          imageClassName="h-full w-full object-contain object-center transition duration-500 ease-out group-hover:scale-105"
          placeholderClassName="bg-gradient-to-b from-rose-50 via-white to-amber-50"
        />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="page-kicker text-[0.65rem] text-rose-700">Small batch sauce</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold leading-tight text-ink">{name}</h2>
        </div>
        <div className="space-y-2">
          <p className="meta-row text-stone-700">
            <FaPepperHot className="meta-icon text-rose-600" /> <span>Heat level {hotnessLevel}/10</span>
          </p>
          <p className="meta-row text-stone-700">
            <GiFireBottle className="meta-icon text-rose-600" /> <span>{scovilleUnits.toLocaleString()} SHU</span>
          </p>
          <p className="meta-row text-stone-700">
            <FaDollarSign className="meta-icon text-rose-600" /> <span>${price} bottle</span>
          </p>
          <p className="meta-row text-stone-700">
            <FaHourglassHalf className="meta-icon text-rose-600" /> <span>Aged {ageMonths} months</span>
          </p>
          <p className="meta-row text-stone-700">
            <FaWarehouse className="meta-icon text-rose-600" /> <span>{batchSize} bottle batch</span>
          </p>
          <p className="meta-row text-stone-700">
            <FaCalendarAlt className="meta-icon text-rose-600" /> <span>Bottled {bottlingDate}</span>
          </p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-stone-600">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default HotSaucePreview;
