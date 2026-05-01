/* eslint-disable react/prop-types */
import { formatPrice, medianPrice } from '../../lib/wineListUtils';

export default function SectionHeader({ title, description, count, totalPrice, scoreLabel, scoreValue }) {
  return (
    <div className="section-panel mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="page-kicker">{scoreLabel}</p>
          <h3 className="mt-2 font-playfair text-3xl font-semibold text-ink">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="stat-tile">
            <p className="stat-label">Bottles</p>
            <p className="stat-value text-2xl">{count}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Median price</p>
            <p className="stat-value text-2xl">{formatPrice(medianPrice(totalPrice))}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">{scoreLabel}</p>
            <p className="stat-value text-2xl">{scoreValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
