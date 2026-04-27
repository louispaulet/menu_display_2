import { Link, useParams } from 'react-router-dom';
import hotSauceData from '../hotsauceData';
import { FaCalendarAlt, FaDollarSign, FaHourglassHalf, FaPepperHot, FaWarehouse } from 'react-icons/fa';
import { GiFireBottle } from 'react-icons/gi';
import ProgressiveImage from './ProgressiveImage';

function HotSauceDetails() {
  const { id } = useParams();
  const sauce = Object.values(hotSauceData)[id];

  if (!sauce) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl soft-panel p-8 text-center">
          <p className="page-kicker">Missing sauce</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Hot sauce not found</h1>
          <p className="mt-4 text-stone-600">The bottle you are looking for does not exist or has not loaded correctly.</p>
          <Link
            to="/hot-sauces"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay"
          >
            Back to hot sauces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mb-6 hidden md:block">
        <Link
          to="/hot-sauces"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-linen px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-clay hover:text-clay"
        >
          <span aria-hidden="true">←</span>
          Back to hot sauces
        </Link>
      </div>
      <article className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="soft-panel overflow-hidden border-rose-200/70 bg-gradient-to-b from-rose-50 via-white to-amber-50 p-6">
          <div className="relative flex items-center justify-center">
            <ProgressiveImage
              src={`/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.webp`}
              alt={`${sauce.name} bottle`}
              loading="eager"
              className="w-full max-w-[24rem]"
              imageClassName="h-auto w-full object-contain object-center"
              placeholderClassName="bg-gradient-to-b from-rose-50 via-white to-amber-50"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-0 py-4 sm:py-6 lg:py-10">
          <div className="flex flex-wrap gap-2">
            <span className="accent-chip border-rose-200 bg-rose-100/70 text-rose-800">Small batch sauce</span>
            <span className="accent-chip border-amber-200 bg-amber-50 text-amber-900">Spice cellar</span>
          </div>
          <h1 className="mt-3 font-playfair text-5xl font-semibold leading-tight text-ink">{sauce.name}</h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            {sauce.description}
          </p>

          <div className="mt-6 grid gap-3 rounded-[1.6rem] border border-stone-200/80 bg-white/70 p-5 text-stone-700 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaPepperHot className="h-4 w-4 text-rose-600" />
              Heat level {sauce.hotness_level}/10
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <GiFireBottle className="h-4 w-4 text-rose-600" />
              {sauce.scoville_units.toLocaleString()} SHU
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaDollarSign className="h-4 w-4 text-rose-600" />
              ${sauce.price} bottle
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaHourglassHalf className="h-4 w-4 text-rose-600" />
              Aged {sauce.age_months} months
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaWarehouse className="h-4 w-4 text-rose-600" />
              {sauce.batch_size} bottle batch
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaCalendarAlt className="h-4 w-4 text-rose-600" />
              Bottled {sauce.bottling_date}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              pH {sauce.acidity_ph.toFixed(1)}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default HotSauceDetails;
