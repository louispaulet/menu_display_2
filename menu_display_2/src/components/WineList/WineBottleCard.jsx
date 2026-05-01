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

export default function WineBottleCard({ wine, imageSrc, style, country, priceBand, rarityScore, popularityScore }) {
  const rarity = rarityScore >= 100 ? 'Legendary' : rarityScore >= 80 ? 'Rare' : rarityScore >= 60 ? 'Notable' : 'Accessible';
  const popularity = popularityScore >= 30 ? 'Crowd favorite' : popularityScore >= 24 ? "Sommelier's pick" : popularityScore >= 18 ? 'Cult classic' : 'Deep cut';

  return (
    <Link
      to={buildWineBottlePath(wine)}
      className="editorial-card flex h-full flex-col transition hover:border-clay/40"
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
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="stat-label">{priceBand.label}</p>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">{wine.name}</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="stat-tile bg-stone-50/80">
            <p className="stat-label">List price</p>
            <p className="stat-value text-lg">{formatPrice(wine.michelin_star_price_eur_750ml)}</p>
          </div>
          <div className="stat-tile bg-stone-50/80">
            <p className="stat-label">Market</p>
            <p className="stat-value text-lg">{formatPrice(wine.base_price_eur_750ml)}</p>
          </div>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-stone-600">{tastingNoteFor(wine)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-stone-200 pt-4 text-xs font-semibold text-stone-500">
          <span className="rounded-full bg-stone-100 px-3 py-1">{rarity}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1">{popularity}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1">×{wine.michelin_markup_multiple_used}</span>
        </div>
      </div>
    </Link>
  );
}
