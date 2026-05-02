/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { buildWineBottlePath } from '../../lib/wineLinks';
import ProgressiveImage from '../ProgressiveImage';
import {
  formatPrice,
  tastingNoteFor,
  cardToneForStyle,
  cardToneForCountry,
} from '../../lib/wineListUtils';
import { useSingleFadeIn } from '../../lib/useIntersectionFadeIn';

export default function WineBottleCard({ wine, imageSrc, style, country, priceBand, rarityScore, popularityScore }) {
  const rarity = rarityScore >= 100 ? 'Legendary' : rarityScore >= 80 ? 'Rare' : rarityScore >= 60 ? 'Notable' : 'Accessible';
  const popularity = popularityScore >= 30 ? 'Crowd favorite' : popularityScore >= 24 ? "Sommelier's pick" : popularityScore >= 18 ? 'Cult classic' : 'Deep cut';
  const { ref, visible } = useSingleFadeIn();

  return (
    <Link
      ref={ref}
      to={buildWineBottlePath(wine)}
      className={`editorial-card flex h-full flex-col transition hover:border-clay/40 io-hidden ${visible ? 'io-visible' : ''}`}
    >
      <div className="relative border-b border-stone-100 bg-white p-4">
        <div className="aspect-[2/3] overflow-hidden rounded-lg border border-stone-200 bg-white">
          <ProgressiveImage
            src={imageSrc}
            alt={`${wine.name} bottle`}
            loading="lazy"
            className="h-full w-full"
            imageClassName="h-full w-full object-contain object-center p-2"
          />
        </div>
        <div className="absolute left-6 top-6 flex flex-wrap gap-2">
          <span className={`accent-chip ${cardToneForStyle(style.key)}`}>
            {style.shortLabel}
          </span>
          <span className={`accent-chip ${cardToneForCountry(country.key)}`}>
            {country.label}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="stat-label">{priceBand.label}</p>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">{wine.name}</h3>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg bg-stone-50/80 px-3 py-2">
            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-stone-400">List</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{formatPrice(wine.michelin_star_price_eur_750ml)}</p>
          </div>
          <div className="flex-1 rounded-lg bg-stone-50/80 px-3 py-2">
            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-stone-400">Market</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{formatPrice(wine.base_price_eur_750ml)}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-stone-600">{tastingNoteFor(wine)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-stone-200 pt-3 text-xs font-semibold text-stone-500">
          <span className="rounded-full bg-stone-100 px-3 py-1">{rarity}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1">{popularity}</span>
        </div>
      </div>
    </Link>
  );
}
