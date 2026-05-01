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

function formatPriceRange(range) {
  if (!range) return '—';

  const low = formatPrice(range.low);
  const high = formatPrice(range.high);

  if (low === '—' && high === '—') return '—';
  if (low === '—') return high;
  if (high === '—') return low;
  if (low === high) return low;

  return `${low} to ${high}`;
}

function humanize(value) {
  if (typeof value !== 'string') return '—';
  return value.replace(/_/g, ' ');
}

function DetailCard({ label, value, note }) {
  return (
    <div className="wine-dossier-card min-h-[7.25rem] p-4 sm:p-5">
      <p className="wine-dossier-label">{label}</p>
      <p className="wine-dossier-value">{value}</p>
      {note ? <p className="wine-dossier-note">{note}</p> : null}
    </div>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <div className="wine-metric-card">
      <p className="stat-label">{label}</p>
      <p className="mt-2 text-2xl font-semibold leading-tight text-ink">{value}</p>
      {note ? <p className="mt-1 text-xs leading-5 text-stone-500">{note}</p> : null}
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
  const priceType = humanize(wine?.price_type);
  const pricingSource = humanize(wine?.pricing_source_basis);
  const bottleStatus = wine?.is_fictional_or_unpriceable ? 'Fictional or unpriceable' : 'Real bottle';
  const bottleNote = wine?.is_fictional_or_unpriceable
    ? 'Fictional or unpriceable'
    : 'Real bottle with estimated market guidance';

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
          className="quiet-link inline-flex items-center gap-2"
        >
          <span aria-hidden="true">←</span>
          Back to cellar
        </Link>
      </div>

      <article className="mx-auto max-w-7xl space-y-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,#fffdf7_0%,#f8f0e5_52%,#efe3d3_100%)] p-4 shadow-editorial sm:p-5 lg:p-6">
              <WineImageZoom
                src={`/the_cellar/${imageFilename}`}
                alt={`${wine.name} bottle`}
                appearance="museum"
              />
              <p className="mt-4 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
                Click image to open a larger frame
              </p>
            </div>
          </div>

          <header className="wine-hero-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,144,63,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent_24%)]" />
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                <span className="accent-chip border-stone-200 bg-white/85 text-stone-500">Wine bottle</span>
                <span className="accent-chip border-clay/20 bg-clay/10 text-clay">{style.label}</span>
                <span className="accent-chip border-saffron/20 bg-saffron/10 text-amber-900">{country.label}</span>
              </div>

              <h1 className="page-title mt-5 max-w-2xl text-[clamp(2.6rem,5vw,4.9rem)] leading-[0.92]">
                {wine.name}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
                {wine.tasting_note}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <MetricCard
                  label="List price"
                  value={formatPrice(wine.michelin_star_price_eur_750ml)}
                  note="per 750ml bottle"
                />
                <MetricCard
                  label="Market price"
                  value={formatPrice(wine.base_price_eur_750ml)}
                  note={priceBand.label}
                />
                <MetricCard
                  label="Cellar read"
                  value={rarityText}
                  note={popularityText}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">
                  Markup ×{wine.michelin_markup_multiple_used}
                </span>
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">
                  {popularityText}
                </span>
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">
                  Confidence {wine.confidence}
                </span>
              </div>
            </div>
          </header>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="wine-dossier-card p-6 sm:p-7">
            <p className="page-kicker">Cellar profile</p>
            <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">Identity and place</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              The broad profile sits together here so the page reads like a carefully annotated cellar label rather than a database export.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <DetailCard label="Style" value={style.label} />
              <DetailCard label="Origin" value={country.label} />
              <DetailCard label="Price band" value={priceBand.label} />
              <DetailCard label="Rarity / popularity" value={`${rarityText} · ${popularityText}`} />
            </div>
          </div>

          <div className="wine-dossier-card p-6 sm:p-7">
            <p className="page-kicker">Pricing dossier</p>
            <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">How the number is built</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              The implementation details remain visible, but the typography and spacing should make them feel like a premium method note.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <DetailCard
                label="Price range"
                value={`${formatPriceRange(wine.base_price_range_eur_750ml)} base, ${formatPriceRange(wine.michelin_star_price_range_eur_750ml)} Michelin`}
              />
              <DetailCard label="Confidence" value={wine.confidence} />
              <DetailCard label="Price type" value={priceType} />
              <DetailCard label="Pricing source" value={pricingSource} />
              <DetailCard label="Status" value={bottleStatus} />
              <DetailCard label="Bottle note" value={bottleNote} />
            </div>
          </div>
        </section>

        <section className="wine-dossier-card p-6 sm:p-7">
          <p className="page-kicker">Bottle notes</p>
          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-playfair text-3xl font-semibold text-ink">Tasting note and context</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                This is the long-form copy that should feel more editorial than administrative.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem]">
              <DetailCard label="List price" value={formatPrice(wine.michelin_star_price_eur_750ml)} />
              <DetailCard label="Market price" value={formatPrice(wine.base_price_eur_750ml)} />
              <DetailCard label="Cellar read" value={rarityText} />
            </div>
          </div>
          <p className="mt-6 text-base leading-8 text-stone-600">{wine.notes}</p>
        </section>
      </article>
    </div>
  );
}

export default WineBottle;
