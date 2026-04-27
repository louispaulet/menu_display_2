/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buildWineImageIndex, resolveWineImageFilename } from '../lib/wineImages';
import { slugify } from '../lib/wineLinks';
import WineImageZoom from '../components/WineImageZoom';
import {
  classifyWineCountry,
  classifyWineStyle,
  getWinePopularityScore,
  getWinePriceBand,
  getWineRarityScore,
  popularityTier,
  rarityTier,
} from '../lib/wineFacets';

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
    <div className="rounded-2xl border border-stone-200/80 bg-white/78 p-4 shadow-sm">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-stone-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink">{value}</p>
    </div>
  );
}

function WineBottle() {
  const { wineKey } = useParams();
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
  const wine = useMemo(() => {
    if (!wineKey) return null;

    const numericMatch = wineKey.match(/^(\d+)(?:-.+)?$/);
    if (numericMatch) {
      const wineId = Number(numericMatch[1]);
      return wines.find((entry) => entry.id === wineId) ?? null;
    }

    const normalizedKey = slugify(wineKey);
    return wines.find((entry) => slugify(entry.name) === normalizedKey) ?? null;
  }, [wineKey, wines]);
  const style = useMemo(() => classifyWineStyle(wine), [wine]);
  const country = useMemo(() => classifyWineCountry(wine), [wine]);
  const priceBand = useMemo(() => getWinePriceBand(wine), [wine]);
  const rarityScore = useMemo(() => getWineRarityScore(wine), [wine]);
  const popularityScore = useMemo(() => getWinePopularityScore(wine), [wine]);
  const rarity = useMemo(() => rarityTier(rarityScore), [rarityScore]);
  const popularity = useMemo(() => popularityTier(popularityScore), [popularityScore]);

  if (!wineData) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-4xl soft-panel p-8 text-center">
          <p className="page-kicker">Wine bottle</p>
          <p className="mt-3 text-lg text-stone-600">Loading bottle details…</p>
        </div>
      </div>
    );
  }

  if (!wine) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl soft-panel p-8 text-center">
          <p className="page-kicker">Missing wine</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Wine bottle not found</h1>
          <p className="mt-4 text-stone-600">Sorry, the bottle you are looking for does not exist.</p>
          <Link to="/wines" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay">
            Back to cellar
          </Link>
        </div>
      </div>
    );
  }

  const imageFilename = resolveWineImageFilename(wine, imageIndex);
  const rarityText = rarity.label;
  const popularityText = popularity.label;

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

      <article className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="strong-panel p-5 sm:p-6">
            <WineImageZoom src={`/the_cellar/${imageFilename}`} alt={`${wine.name} bottle`} className="shadow-none hover:shadow-none" />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.22em] text-stone-400">
              Click image to open a larger frame
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <header className="strong-panel p-7 sm:p-8 lg:p-10">
            <div className="flex flex-wrap gap-2">
              <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">Wine bottle</span>
              <span className={`accent-chip border-clay/20 bg-clay/10 text-clay`}>{style.label}</span>
              <span className={`accent-chip border-saffron/20 bg-saffron/10 text-amber-900`}>{country.label}</span>
            </div>
            <h1 className="page-title mt-4">{wine.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{wine.tasting_note}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-stone-400">Michelin price</p>
                <p className="mt-1 text-2xl font-semibold text-ink">{formatPrice(wine.michelin_star_price_eur_750ml)}</p>
                <p className="mt-1 text-xs text-stone-400">per 750ml bottle</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-stone-400">Base price</p>
                <p className="mt-1 text-2xl font-semibold text-ink">{formatPrice(wine.base_price_eur_750ml)}</p>
                <p className="mt-1 text-xs text-stone-400">{priceBand.label}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-stone-400">Markup</p>
                <p className="mt-1 text-2xl font-semibold text-ink">×{wine.michelin_markup_multiple_used}</p>
                <p className="mt-1 text-xs text-stone-400">{rarityText}</p>
              </div>
            </div>
          </header>

          <section className="soft-panel p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoPair label="Style" value={style.label} />
              <InfoPair label="Origin" value={country.label} />
              <InfoPair label="Price band" value={priceBand.label} />
              <InfoPair label="Rarity / popularity" value={`${rarityText} · ${popularityText}`} />
              <InfoPair
                label="Price range"
                value={`${formatPrice(wine.base_price_range_eur_750ml?.low)} to ${formatPrice(
                  wine.base_price_range_eur_750ml?.high,
                )} base, ${formatPrice(wine.michelin_star_price_range_eur_750ml?.low)} to ${formatPrice(
                  wine.michelin_star_price_range_eur_750ml?.high,
                )} Michelin`}
              />
              <InfoPair label="Bottle note" value={wine.is_fictional_or_unpriceable ? 'Fictional or unpriceable' : 'Real bottle with estimated market guidance'} />
            </div>
          </section>

          <section className="soft-panel p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoPair label="Confidence" value={wine.confidence} />
              <InfoPair label="Price type" value={wine.price_type.replace(/_/g, ' ')} />
              <InfoPair label="Pricing source" value={wine.pricing_source_basis} />
              <InfoPair label="Status" value={wine.is_fictional_or_unpriceable ? 'Fictional or unpriceable' : 'Real bottle'} />
            </div>
          </section>

          <section className="soft-panel p-6">
            <p className="page-kicker">Bottle notes</p>
            <p className="mt-3 text-base leading-8 text-stone-600">{wine.notes}</p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default WineBottle;
