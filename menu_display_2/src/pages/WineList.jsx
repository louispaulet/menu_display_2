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

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function defaultWineImageFilename(wine) {
  const idPart = String(wine.id).padStart(3, '0');
  const namePart = slugify(wine.name).slice(0, 60);
  return `wine-image-${idPart}-${namePart}.webp`;
}

function tastingNoteFor(wine) {
  if (!wine) return 'Balanced and precise.';
  if (wine.is_fictional_or_unpriceable) {
    return 'Fantasized profile: vibrant, curious, and space-age.';
  }
  const price = wine.base_price_eur_750ml ?? 0;
  if (price < 45) {
    return 'Fresh citrus and mineral lift with a clean, agile finish.';
  }
  if (price < 150) {
    return 'Layered orchard fruit, luminous body, and subtle spice.';
  }
  if (price < 500) {
    return 'Silky texture, ripe stone fruit, and a salivating savory streak.';
  }
  return 'Opulent, deeply layered, with lingering spice and truffle notes.';
}

function WineBottleCard({ wine, imageSrc }) {
  return (
    <article className="editorial-card flex h-full flex-col bg-white/85">
      <div className="border-b border-stone-100 bg-white p-4">
        <div className="aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <img
            src={imageSrc}
            alt={`${wine.name} bottle`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-3"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-stone-400">
            {wine.price_type.replace(/_/g, ' ')}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-ink">{wine.name}</h3>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Michelin price</p>
            <p className="mt-1 text-lg font-semibold text-ink">{formatPrice(wine.michelin_star_price_eur_750ml)}</p>
            {wine.michelin_star_price_range_eur_750ml && (
              <p className="text-xs text-stone-400">
                {formatPrice(wine.michelin_star_price_range_eur_750ml.low)} –{' '}
                {formatPrice(wine.michelin_star_price_range_eur_750ml.high)}
              </p>
            )}
          </div>
          <span className="rounded-full border border-stone-300 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
            ×{wine.michelin_markup_multiple_used}
          </span>
        </div>
        <p className="text-sm leading-6 text-stone-600">{tastingNoteFor(wine)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 text-xs text-stone-500">
          <span>Base {formatPrice(wine.base_price_eur_750ml)}</span>
          <span>Confidence {wine.confidence}</span>
        </div>
      </div>
    </article>
  );
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
  const [cellarManifest, setCellarManifest] = useState(null);

  useEffect(() => {
    fetch('/wines.json')
      .then((res) => res.json())
      .then(setWineData)
      .catch(console.error);
    fetch('/the_cellar/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then(setCellarManifest)
      .catch(() => setCellarManifest(null));
  }, []);

  const metadata = wineData?.metadata;
  const wines = useMemo(() => wineData?.wines ?? [], [wineData]);
  const imageByWineName = useMemo(() => {
    const entries = cellarManifest?.items ?? [];
    return new Map(entries.map((entry) => [entry.wine_name, entry.filename]));
  }, [cellarManifest]);

  const featured = useMemo(() => {
    if (!wineData?.wines?.length) return [];
    return [...wineData.wines].sort((a, b) => b.base_price_eur_750ml - a.base_price_eur_750ml).slice(0, 4);
  }, [wineData]);

  const wineCards = useMemo(
    () =>
      wines.map((wine) => ({
        wine,
        imageFilename: imageByWineName.get(wine.name) ?? defaultWineImageFilename(wine),
      })),
    [imageByWineName, wines],
  );

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
          <h2 className="font-playfair text-3xl font-semibold text-ink">Cellar wall</h2>
          <p className="text-sm text-stone-500">One image card for each bottle, kept in source order</p>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {wineCards.map(({ wine, imageFilename }) => (
            <WineBottleCard key={wine.id} wine={wine} imageSrc={`/the_cellar/${imageFilename}`} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WineList;
