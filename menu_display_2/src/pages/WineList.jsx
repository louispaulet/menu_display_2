/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return currencyFormatter.format(value);
}

function PriceBadge({ label, value, range }) {
  return (
    <div className="text-sm text-stone-500">
      <p className="font-semibold text-ink">{label}</p>
      <p>{formatPrice(value)}</p>
      {range && (
        <p className="text-xs text-stone-400">
          {formatPrice(range.low)} – {formatPrice(range.high)}
        </p>
      )}
    </div>
  );
}

function WineList() {
  const [wineData, setWineData] = useState(null);

  useEffect(() => {
    fetch('/wines.json')
      .then((res) => res.json())
      .then(setWineData)
      .catch(console.error);
  }, []);

  const metadata = wineData?.metadata;
  const wines = wineData?.wines ?? [];

  const featured = useMemo(() => {
    if (!wineData?.wines?.length) return [];
    return [...wineData.wines].sort((a, b) => b.base_price_eur_750ml - a.base_price_eur_750ml).slice(0, 4);
  }, [wineData]);

  if (!wineData) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white/80 p-8 text-center shadow-sm">
          <p className="page-kicker">Wine list</p>
          <p className="mt-3 text-lg text-stone-600">Loading pricing intelligence…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="mb-14 space-y-6">
        <p className="page-kicker">Wine list</p>
        <h1 className="page-title">Price-buddy intelligence for the cellar</h1>
        <p className="page-lede max-w-4xl">
          {metadata.description} The dataset keeps both base-market price guidance and a Michelin-star
          list price so sommeliers and menu writers can match dishes with thoughtful markups.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white/70 p-5 shadow-sm">
            <p className="text-sm text-stone-500">Total bottles tracked</p>
            <p className="mt-1 text-3xl font-semibold text-ink">{metadata.count}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white/70 p-5 shadow-sm">
            <p className="text-sm text-stone-500">Fictional or unpriceable</p>
            <p className="mt-1 text-3xl font-semibold text-ink">{metadata.fictional_or_unpriceable_count}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white/70 p-5 shadow-sm">
            <p className="text-sm text-stone-500">Pricing confidence</p>
            <p className="mt-1 text-lg font-semibold text-ink">{metadata.assumptions.base_price}</p>
          </div>
        </div>
      </header>

      <section className="mb-14 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-3xl font-semibold text-ink">Featured tiers</h2>
          <p className="text-sm text-stone-500">Sorted by highest stated base price</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((wine) => (
            <article key={wine.id} className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-parchment/80 p-6 shadow-lg">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{wine.price_type.replace(/_/g, ' ')}</p>
                <h3 className="mt-1 text-2xl font-semibold text-ink">{wine.name}</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <PriceBadge label="Base price" value={wine.base_price_eur_750ml} range={wine.base_price_range_eur_750ml} />
                <PriceBadge label="Michelin markup" value={wine.michelin_star_price_eur_750ml} range={wine.michelin_star_price_range_eur_750ml} />
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-500">
                <span className="rounded-full border border-stone-300 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  ×{wine.michelin_markup_multiple_used}
                </span>
                <span className="text-xs">Confidence: {wine.confidence}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-3xl font-semibold text-ink">Full index</h2>
          <p className="text-sm text-stone-500">Sorted alphabetically for quick lookup</p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-stone-200 bg-white/50 shadow-sm">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-linen text-stone-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Wine</th>
                <th className="px-4 py-3 font-semibold">Base price (range)</th>
                <th className="px-4 py-3 font-semibold">Michelin price (range)</th>
                <th className="px-4 py-3 font-semibold">Markup</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {wines.map((wine) => (
                <tr key={wine.id} className="border-t border-stone-100 hover:bg-linen/60">
                  <td className="px-4 py-3 font-semibold text-ink" style={{ whiteSpace: 'nowrap' }}>
                    {wine.name}
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {formatPrice(wine.base_price_eur_750ml)}
                    <br />
                    <span className="text-xs text-stone-400">
                      {formatPrice(wine.base_price_range_eur_750ml?.low)} – {formatPrice(wine.base_price_range_eur_750ml?.high)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {formatPrice(wine.michelin_star_price_eur_750ml)}
                    <br />
                    <span className="text-xs text-stone-400">
                      {formatPrice(wine.michelin_star_price_range_eur_750ml?.low)} – {formatPrice(wine.michelin_star_price_range_eur_750ml?.high)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">×{wine.michelin_markup_multiple_used}</td>
                  <td className="px-4 py-3 text-stone-600">{wine.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default WineList;
