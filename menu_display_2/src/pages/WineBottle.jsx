/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buildWineImageIndex, resolveWineImageFilename } from '../lib/wineImages';
import WineImageZoom from '../components/WineImageZoom';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return currencyFormatter.format(value);
}

function InfoPair({ label, value }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white/75 p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-stone-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink">{value}</p>
    </div>
  );
}

function WineBottle() {
  const { id } = useParams();
  const wineId = Number(id);
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

  const wines = useMemo(() => wineData?.wines ?? [], [wineData]);
  const imageIndex = useMemo(() => buildWineImageIndex(cellarManifest), [cellarManifest]);
  const wine = useMemo(() => wines.find((entry) => entry.id === wineId), [wineId, wines]);

  if (!wineData) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white/80 p-8 text-center shadow-sm">
          <p className="page-kicker">Wine bottle</p>
          <p className="mt-3 text-lg text-stone-600">Loading bottle details…</p>
        </div>
      </div>
    );
  }

  if (!wine) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-linen p-8 text-center shadow-card">
          <p className="page-kicker">Missing wine</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Wine bottle not found</h1>
          <p className="mt-4 text-stone-600">Sorry, the bottle you are looking for does not exist.</p>
          <Link
            to="/wines"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay"
          >
            <span aria-hidden="true">←</span>
            Back to cellar
          </Link>
        </div>
      </div>
    );
  }

  const imageFilename = resolveWineImageFilename(wine, imageIndex);

  return (
    <div className="page-shell">
      <div className="mb-8">
        <Link
          to="/wines"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-clay hover:text-clay"
        >
          <span aria-hidden="true">←</span>
          Back to cellar
        </Link>
      </div>

      <article className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-lg">
            <WineImageZoom
              src={`/the_cellar/${imageFilename}`}
              alt={`${wine.name} bottle`}
              className="shadow-none hover:shadow-none"
            />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.22em] text-stone-400">
              Click image to open a larger frame
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <header className="space-y-4">
            <p className="page-kicker">Wine bottle</p>
            <h1 className="page-title">{wine.name}</h1>
            <p className="max-w-3xl text-lg leading-8 text-stone-600">{wine.tasting_note}</p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2">
            <InfoPair label="Base price" value={`${formatPrice(wine.base_price_eur_750ml)} per 750ml bottle`} />
            <InfoPair
              label="Michelin list price"
              value={`${formatPrice(wine.michelin_star_price_eur_750ml)} per 750ml bottle`}
            />
            <InfoPair
              label="Price range"
              value={`${formatPrice(wine.base_price_range_eur_750ml?.low)} to ${formatPrice(
                wine.base_price_range_eur_750ml?.high,
              )} base, ${formatPrice(wine.michelin_star_price_range_eur_750ml?.low)} to ${formatPrice(
                wine.michelin_star_price_range_eur_750ml?.high,
              )} Michelin`}
            />
            <InfoPair label="Markup" value={`×${wine.michelin_markup_multiple_used} from base to Michelin list`} />
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <InfoPair label="Confidence" value={wine.confidence} />
            <InfoPair label="Price type" value={wine.price_type.replace(/_/g, ' ')} />
            <InfoPair label="Pricing source" value={wine.pricing_source_basis} />
            <InfoPair label="Bottle note" value={wine.is_fictional_or_unpriceable ? 'Fictional or unpriceable' : 'Real bottle with estimated market guidance'} />
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Bottle notes</p>
            <p className="mt-3 text-base leading-8 text-stone-600">{wine.notes}</p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default WineBottle;
