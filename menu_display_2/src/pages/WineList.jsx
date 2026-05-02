
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
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter wines by search query
  const filteredWines = useMemo(() => {
    if (!searchQuery.trim()) return enrichedWines;
    const q = searchQuery.toLowerCase();
    return enrichedWines.filter(
      (entry) =>
        entry.wine.name.toLowerCase().includes(q) ||
        entry.style.label.toLowerCase().includes(q) ||
        entry.country.label.toLowerCase().includes(q),
    );
  }, [enrichedWines, searchQuery]);

  const sections = useMemo(() => buildGroupedSections(filteredWines, viewMode), [filteredWines, viewMode]);

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
      filteredWines.map((entry) => ({
        ...entry,
        imageFilename: resolveWineImageFilename(entry.wine, imageByWineName),
      })),
    [filteredWines, imageByWineName],
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
      {/* Compact header with segmented control */}
      <header className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200/80 bg-linen/90 p-6 shadow-editorial sm:p-8 lg:p-10 animate-fade-in-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,144,63,0.14),transparent_28%),linear-gradient(135deg,rgba(169,86,56,0.08),transparent_40%)]" />
        <div className="relative">
          <p className="page-kicker">Wine list</p>
          <h1 className="page-title">Browse the cellar by style, origin, and mood.</h1>
          <p className="page-lede mx-0 max-w-4xl">
            {metadata.description} Move through reds, whites, sparkling bottles, origins, price ladders, and collector-coded shelves.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="segmented-control">
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

            {/* Search input */}
            <div className="relative sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wines, styles, regions…"
                className="w-full rounded-full border border-stone-200 bg-white/90 py-2.5 pl-10 pr-4 text-sm font-medium text-ink shadow-sm outline-none transition placeholder:text-stone-400 focus:border-clay/50 focus:ring-2 focus:ring-clay/20"
              />
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Compact stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="stat-tile p-4">
          <p className="stat-label">Total bottles</p>
          <p className="stat-value text-2xl">{metadata.count}</p>
        </div>
        <div className="stat-tile p-4">
          <p className="stat-label">Dominant style</p>
          <p className="stat-value text-lg">{summary.topStyle}</p>
        </div>
        <div className="stat-tile p-4">
          <p className="stat-label">Top origin</p>
          <p className="stat-value text-lg">{summary.topCountry}</p>
        </div>
        <div className="stat-tile p-4">
          <p className="stat-label">Rare / legendary</p>
          <p className="stat-value text-2xl">{summary.rareCount}</p>
        </div>
      </section>

      {/* Section jump nav */}
      {!searchQuery && sections.length > 1 && (
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Wine shelves">
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
      )}

      {/* Search feedback */}
      {searchQuery && (
        <div className="mb-6 text-sm text-stone-500">
          Showing <strong className="text-ink">{filteredWines.length}</strong> of {enrichedWines.length} bottles
          {filteredWines.length === 0 && (
            <span className="ml-1">— try a different search term.</span>
          )}
        </div>
      )}

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
