
import { useEffect, useMemo, useState } from 'react';
import { buildWineImageIndex, resolveWineImageFilename } from '../lib/wineImages';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
import {
  classifyWineCountry,
  classifyWineStyle,
  getWinePopularityScore,
  getWinePriceBand,
  getWineRarityScore,
} from '../lib/wineFacets';
import { VIEW_MODES, buildGroupedSections } from '../lib/wineListUtils';
import WineBottleCard from '../components/WineList/WineBottleCard';
import SectionHeader from '../components/WineList/SectionHeader';

const cellarImageBaseUrl = getGeneratedImageBaseUrl('the_cellar');

function WineList() {
  const [wineData, setWineData] = useState(null);
  const [cellarManifest, setCellarManifest] = useState(null);
  const [viewMode, setViewMode] = useState('styles');

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
  const imageByWineName = useMemo(() => buildWineImageIndex(cellarManifest), [cellarManifest]);

  const enrichedWines = useMemo(
    () =>
      wines.map((wine) => {
        const style = classifyWineStyle(wine);
        const country = classifyWineCountry(wine);
        const priceBand = getWinePriceBand(wine);
        return {
          wine,
          style,
          country,
          priceBand,
          rarityScore: getWineRarityScore(wine),
          popularityScore: getWinePopularityScore(wine),
        };
      }),
    [wines],
  );

  const sections = useMemo(() => buildGroupedSections(enrichedWines, viewMode), [enrichedWines, viewMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const summary = useMemo(() => {
    const countryCounts = new Map();
    const styleCounts = new Map();
    let sparklingCount = 0;
    let rareCount = 0;

    enrichedWines.forEach((entry) => {
      countryCounts.set(entry.country.label, (countryCounts.get(entry.country.label) ?? 0) + 1);
      styleCounts.set(entry.style.label, (styleCounts.get(entry.style.label) ?? 0) + 1);
      if (entry.style.key === 'champagne') sparklingCount += 1;
      if (entry.rarityScore >= 80) rareCount += 1;
    });

    return {
      topCountry: [...countryCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? 'Unknown',
      topStyle: [...styleCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? 'Unknown',
      countryCount: countryCounts.size,
      styleCount: styleCounts.size,
      sparklingCount,
      rareCount,
    };
  }, [enrichedWines]);

  const allCards = useMemo(
    () =>
      enrichedWines.map((entry) => ({
        ...entry,
        imageFilename: resolveWineImageFilename(entry.wine, imageByWineName),
      })),
    [enrichedWines, imageByWineName],
  );

  if (!wineData) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-4xl soft-panel p-8 text-center">
          <p className="page-kicker">Wine list</p>
          <p className="mt-3 text-lg text-stone-600">Loading cellar intelligence…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="relative mb-10 overflow-hidden rounded-2xl border border-stone-200/80 bg-linen/90 p-6 shadow-editorial sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,144,63,0.14),transparent_28%),linear-gradient(135deg,rgba(169,86,56,0.08),transparent_40%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-end">
          <div>
            <p className="page-kicker">Wine list</p>
            <h1 className="page-title">Browse the cellar by style, origin, and mood.</h1>
            <p className="page-lede mx-0 max-w-4xl">
              {metadata.description} Move through reds, whites, sparkling bottles, origins, price ladders, and collector-coded shelves.
            </p>

            <div className="segmented-control mt-8">
              {VIEW_MODES.map((mode) => (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => setViewMode(mode.key)}
                  className={`segment-button ${
                    viewMode === mode.key
                      ? 'segment-button-active'
                      : ''
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="stat-tile p-5 backdrop-blur-sm">
              <p className="text-sm text-stone-500">Total bottles tracked</p>
              <p className="mt-1 text-3xl font-semibold text-ink">{metadata.count}</p>
              <p className="stat-label mt-2">Source data</p>
              <p className="mt-1 text-sm text-stone-600">{metadata.fictional_or_unpriceable_count} fictional or unpriceable entries included.</p>
            </div>
            <div className="stat-tile p-5 backdrop-blur-sm">
              <p className="text-sm text-stone-500">Current focus</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{VIEW_MODES.find((mode) => mode.key === viewMode)?.label}</p>
              <p className="mt-2 text-sm text-stone-600">{VIEW_MODES.find((mode) => mode.key === viewMode)?.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-10 soft-panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="page-kicker">Active view</p>
            <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">{VIEW_MODES.find((mode) => mode.key === viewMode)?.label}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">{VIEW_MODES.find((mode) => mode.key === viewMode)?.description}</p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-500">
            Jump into a shelf or open any bottle for the full label, pricing, and tasting note.
          </p>
        </div>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Wine shelves">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => scrollToSection(`wine-section-${section.key}`)}
              className="quiet-link px-3 py-1.5 text-xs"
            >
              {section.title}
            </button>
          ))}
        </nav>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="stat-tile p-5">
          <p className="text-sm text-stone-500">Dominant style</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{summary.topStyle}</p>
          <p className="mt-2 text-sm text-stone-600">{summary.styleCount} style buckets detected.</p>
        </div>
        <div className="stat-tile p-5">
          <p className="text-sm text-stone-500">Top origin</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{summary.topCountry}</p>
          <p className="mt-2 text-sm text-stone-600">{summary.countryCount} country buckets detected.</p>
        </div>
        <div className="stat-tile p-5">
          <p className="text-sm text-stone-500">Sparkling shelf</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{summary.sparklingCount}</p>
          <p className="mt-2 text-sm text-stone-600">Champagnes and related sparkling bottles.</p>
        </div>
        <div className="stat-tile p-5">
          <p className="text-sm text-stone-500">Rare or legendary</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{summary.rareCount}</p>
          <p className="mt-2 text-sm text-stone-600">Higher price and lower-confidence bottles.</p>
        </div>
      </section>

      <section className="section-panel mb-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="page-kicker">Cellar key</p>
            <h2 className="mt-1 font-playfair text-2xl font-semibold text-ink">Styles and origins are inferred, prices are listed per 750ml bottle</h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-stone-600">
            Each bottle opens into a detail page with the larger label image, tasting note, confidence, and price guidance.
          </p>
        </div>
      </section>

      {viewMode === 'all' ? (
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-3xl font-semibold text-ink">All bottles</h2>
            <p className="text-sm text-stone-500">The full cellar in source order</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {allCards.map(({ wine, imageFilename, style, country, priceBand, rarityScore, popularityScore }) => (
              <WineBottleCard
                key={wine.id}
                wine={wine}
                imageSrc={`${cellarImageBaseUrl}${imageFilename}`}
                style={style}
                country={country}
                priceBand={priceBand}
                rarityScore={rarityScore}
                popularityScore={popularityScore}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.key} id={`wine-section-${section.key}`} className="scroll-mt-28">
              <SectionHeader
                title={section.title}
                description={section.description}
                count={section.items.length}
                totalPrice={section.items}
                scoreLabel={viewMode === 'styles' ? 'Shelf note' : viewMode === 'countries' ? 'Origin note' : viewMode === 'prices' ? 'Price ladder' : viewMode === 'popularity' ? 'Popularity tier' : 'Rarity tier'}
                scoreValue={viewMode === 'styles' ? section.title : viewMode === 'countries' ? section.title : viewMode === 'prices' ? section.title : section.title}
              />
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {section.items.map((entry) => {
                  const imageFilename = resolveWineImageFilename(entry.wine, imageByWineName);

                  return (
                    <WineBottleCard
                      key={entry.wine.id}
                      wine={entry.wine}
                      imageSrc={`${cellarImageBaseUrl}${imageFilename}`}
                      style={entry.style}
                      country={entry.country}
                      priceBand={entry.priceBand}
                      rarityScore={entry.rarityScore}
                      popularityScore={entry.popularityScore}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default WineList;
