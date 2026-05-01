/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaDollarSign, FaHourglassHalf, FaPepperHot, FaWarehouse } from 'react-icons/fa';
import { GiFireBottle } from 'react-icons/gi';
import ProgressiveImage from './ProgressiveImage';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';

const sauceImageBaseUrl = getGeneratedImageBaseUrl('sauce_pictures');

function heatTone(level) {
  if (level >= 9) return 'bg-rose-700';
  if (level >= 7) return 'bg-orange-600';
  if (level >= 5) return 'bg-amber-500';
  return 'bg-lime-600';
}

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
    return `${sauceImageBaseUrl}${nameEncoded}.webp`;
  };

  return (
    <Link to={`/hot-sauce/${id}`} className="editorial-card group flex h-full flex-col border-rose-200/70">
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <ProgressiveImage
          src={generateImageUrl(name)}
          alt={`${name} bottle`}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          imageClassName="h-full w-full object-contain object-center transition duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-bold text-rose-900 shadow-sm">
          {hotnessLevel}/10 heat
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="page-kicker text-[0.65rem] text-rose-700">Small batch sauce</p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold leading-tight text-ink">{name}</h2>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <div className={`h-full ${heatTone(hotnessLevel)}`} style={{ width: `${Math.min(100, hotnessLevel * 10)}%` }} />
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
        <p className="mt-auto line-clamp-3 border-t border-stone-200 pt-4 text-sm leading-6 text-stone-600">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default HotSaucePreview;
