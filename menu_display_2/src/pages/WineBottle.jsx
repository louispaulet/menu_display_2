import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buildWineImageIndex, resolveWineImageFilename } from '../lib/wineImages';
import { slugify, buildWineBottlePath } from '../lib/wineLinks';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
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
import { formatPrice, formatPriceRange, humanize } from '../lib/wineBottleUtils';
import { DetailCard, MetricCard } from '../components/WineBottle/WineBottleCards';

const cellarImageBaseUrl = getGeneratedImageBaseUrl('the_cellar');

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

  // Find similar wines (same style, excluding current)
  const similarWines = useMemo(() => {
    if (!wine || !style) return [];
    return wines
      .filter((w) => w.id !== wine.id && classifyWineStyle(w).key === style.key)
      .slice(0, 4);
  }, [wine, wines, style]);

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
        <Link to="/wines" className="quiet-link inline-flex items-center gap-2">
          <span aria-hidden="true">←</span> Back to cellar
        </Link>
      </div>

      <article className="mx-auto max-w-7xl space-y-8 animate-fade-in-up">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <WineImageZoom src={`${cellarImageBaseUrl}${imageFilename}`} alt={`${wine.name} bottle`} appearance="museum" />
          </div>

          <header className="p-0 py-2 sm:py-4 lg:py-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="accent-chip border-stone-200 bg-white/85 text-stone-500">Wine bottle</span>
                <span className="accent-chip border-clay/20 bg-clay/10 text-clay">{style.label}</span>
                <span className="accent-chip border-saffron/20 bg-saffron/10 text-amber-900">{country.label}</span>
              </div>

              <h1 className="page-title mt-5 max-w-2xl text-[clamp(2.6rem,5vw,4.9rem)] leading-[0.92]">{wine.name}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">{wine.tasting_note}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <MetricCard label="List price" value={formatPrice(wine.michelin_star_price_eur_750ml)} note="per 750ml bottle" />
                <MetricCard label="Market price" value={formatPrice(wine.base_price_eur_750ml)} note={priceBand.label} />
                <MetricCard label="Cellar read" value={rarityText} note={popularityText} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">Markup ×{wine.michelin_markup_multiple_used}</span>
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">{popularityText}</span>
                <span className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 shadow-sm">Confidence {wine.confidence}</span>
              </div>
            </div>
          </header>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="wine-dossier-card p-5 sm:p-6">
            <p className="page-kicker">Cellar profile</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <DetailCard label="Style" value={style.label} />
              <DetailCard label="Origin" value={country.label} />
              <DetailCard label="Price band" value={priceBand.label} />
              <DetailCard label="Rarity / popularity" value={`${rarityText} · ${popularityText}`} />
            </div>
          </div>

          <div className="wine-dossier-card p-5 sm:p-6">
            <p className="page-kicker">Pricing dossier</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <DetailCard label="Price range" value={`${formatPriceRange(wine.base_price_range_eur_750ml)} base`} note={`${formatPriceRange(wine.michelin_star_price_range_eur_750ml)} Michelin`} className="md:col-span-2" />
              <DetailCard label="Confidence" value={wine.confidence} />
              <DetailCard label="Price type" value={priceType} />
              <DetailCard label="Pricing source" value={pricingSource} className="md:col-span-2" />
              <DetailCard label="Status" value={bottleStatus} />
            </div>
          </div>
        </section>

        {/* Notes section (no longer duplicates the metric cards) */}
        {wine.notes && (
          <section className="wine-dossier-card p-5 sm:p-6">
            <p className="page-kicker">Bottle notes</p>
            <p className="mt-4 text-sm leading-8 text-stone-600 sm:text-base">{wine.notes}</p>
          </section>
        )}

        {/* Similar wines */}
        {similarWines.length > 0 && (
          <section className="mt-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="page-kicker">You may also like</p>
                <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">Similar {style.label} bottles</h2>
              </div>
              <Link to="/wines" className="quiet-link text-xs">
                View all wines →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similarWines.map((w) => {
                const imgFile = resolveWineImageFilename(w, imageIndex);
                return (
                  <Link
                    key={w.id}
                    to={buildWineBottlePath(w)}
                    className="editorial-card group flex flex-col transition hover:border-clay/40"
                  >
                    <div className="aspect-[2/3] overflow-hidden border-b border-stone-100 bg-white p-3">
                      <img
                        src={`${cellarImageBaseUrl}${imgFile}`}
                        alt={`${w.name} bottle`}
                        loading="lazy"
                        className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="stat-label">{classifyWineStyle(w).shortLabel}</p>
                      <h3 className="mt-1 text-sm font-semibold leading-tight text-ink">{w.name}</h3>
                      <p className="mt-2 text-sm font-semibold text-clay">{formatPrice(w.michelin_star_price_eur_750ml)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

export default WineBottle;
