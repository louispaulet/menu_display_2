import { Link, useParams } from 'react-router-dom';
import hotSauceData from '../hotsauceData';
import ProgressiveImage from './ProgressiveImage';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
import HotSauceStats from './HotSauce/HotSauceStats';

const sauceImageBaseUrl = getGeneratedImageBaseUrl('sauce_pictures');

function heatTone(level) {
  if (level >= 9) return 'bg-rose-700';
  if (level >= 7) return 'bg-orange-600';
  if (level >= 5) return 'bg-amber-500';
  return 'bg-lime-600';
}

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
      <div className="mb-6">
        <Link to="/hot-sauces" className="quiet-link inline-flex items-center gap-2">
          <span aria-hidden="true">←</span> Back to hot sauces
        </Link>
      </div>
      <article className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="soft-panel overflow-hidden border-rose-200/70 bg-gradient-to-b from-rose-50 via-white to-amber-50 p-6">
          <div className="relative flex items-center justify-center">
            <ProgressiveImage
              src={`${sauceImageBaseUrl}${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.webp`}
              alt={`${sauce.name} bottle`}
              loading="eager"
              className="w-full max-w-[24rem]"
              imageClassName="h-auto w-full object-contain object-center"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-0 py-4 sm:py-6 lg:py-10">
          <div className="flex flex-wrap gap-2">
            <span className="accent-chip border-rose-200 bg-rose-100/70 text-rose-800">Small batch sauce</span>
            <span className="accent-chip border-amber-200 bg-amber-50 text-amber-900">Spice cellar</span>
          </div>
          <h1 className="mt-3 font-playfair text-4xl font-semibold leading-tight text-ink sm:text-5xl">{sauce.name}</h1>

          {/* Heat visualization bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm font-semibold text-stone-600">
              <span>Heat level</span>
              <span className="text-rose-700">{sauce.hotness_level}/10</span>
            </div>
            <div className="mt-2 relative h-3 overflow-hidden rounded-full bg-stone-100">
              <div
                className={`h-full ${heatTone(sauce.hotness_level)} transition-all duration-700`}
                style={{ width: `${Math.min(100, sauce.hotness_level * 10)}%` }}
              />
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            {sauce.description}
          </p>

          <HotSauceStats sauce={sauce} />
        </div>
      </article>
    </div>
  );
}

export default HotSauceDetails;
