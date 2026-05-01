/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { buildWineImageIndex, resolveWineImageFilename } from '../lib/wineImages';
import { buildWineBottlePath } from '../lib/wineLinks';
import ProgressiveImage from '../components/ProgressiveImage';
import {
  classifyWineCountry,
  classifyWineStyle,
  getWinePopularityScore,
  getWinePriceBand,
  getWineRarityScore,
} from '../lib/wineFacets';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const VIEW_MODES = [
  { key: 'styles', label: 'Reds / whites / champagnes', description: 'A clean three-way split with a small fallback for the odd bottles.' },
  { key: 'countries', label: 'By country', description: 'Bottle names grouped by inferred origin, producer, or appellation.' },
  { key: 'prices', label: 'By price', description: 'A ladder from approachable pours to trophy bottles.' },
  { key: 'popularity', label: 'Popularity', description: 'The most recommendable bottles first, then the deeper cuts.' },
  { key: 'rarity', label: 'Rarity', description: 'Collector-coded bottles first, then the easier-to-pour labels.' },
  { key: 'all', label: 'All bottles', description: 'A master list if you just want the full cellar wall.' },
];

const STYLE_ORDER = ['red', 'white', 'champagne', 'other'];
const PRICE_BAND_ORDER = ['under-50', '50-149', '150-399', '400-plus'];
const POPULARITY_BUCKETS = ['crowd-favorites', 'sommeliers-picks', 'cult-classics', 'deep-cuts'];
const RARITY_BUCKETS = ['legendary', 'rare', 'notable', 'accessible'];

function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return currencyFormatter.format(value);
}

function medianPrice(wines) {
  const prices = wines
    .map((entry) => entry.wine.base_price_eur_750ml)
    .filter((price) => typeof price === 'number')
    .sort((a, b) => a - b);

  if (!prices.length) return null;

  const middle = Math.floor(prices.length / 2);
  return prices.length % 2 ? prices[middle] : (prices[middle - 1] + prices[middle]) / 2;
}

function tastingNoteFor(wine) {
  if (!wine) return 'Balanced and precise.';
  if (typeof wine.tasting_note === 'string' && wine.tasting_note.trim()) {
    return wine.tasting_note.trim();
  }
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
    return 'Silky texture, ripe stone fruit, and a salivating savoury streak.';
  }
  return 'Opulent, deeply layered, with lingering spice and truffle notes.';
}

function cardToneForStyle(styleKey) {
  switch (styleKey) {
    case 'red':
      return 'border-clay/20 bg-clay/10 text-clay';
    case 'white':
      return 'border-saffron/20 bg-saffron/10 text-amber-900';
    case 'champagne':
      return 'border-ink/15 bg-ink/5 text-ink';
    default:
      return 'border-olive/20 bg-olive/10 text-olive';
  }
}

function cardToneForCountry(countryKey) {
  switch (countryKey) {
    case 'outer-space':
      return 'border-indigo-200 bg-indigo-50 text-indigo-900';
    case 'france':
      return 'border-stone-300 bg-white text-stone-700';
    case 'italy':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900';
    case 'spain':
      return 'border-amber-200 bg-amber-50 text-amber-900';
    case 'portugal':
      return 'border-rose-200 bg-rose-50 text-rose-900';
    case 'united-states':
      return 'border-sky-200 bg-sky-50 text-sky-900';
    case 'new-zealand':
      return 'border-teal-200 bg-teal-50 text-teal-900';
    case 'south-africa':
      return 'border-lime-200 bg-lime-50 text-lime-900';
    case 'argentina':
      return 'border-violet-200 bg-violet-50 text-violet-900';
    case 'chile':
      return 'border-orange-200 bg-orange-50 text-orange-900';
    case 'greece':
      return 'border-cyan-200 bg-cyan-50 text-cyan-900';
    case 'hungary':
      return 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900';
    case 'japan':
      return 'border-neutral-300 bg-neutral-50 text-neutral-700';
    case 'iceland':
      return 'border-slate-200 bg-slate-50 text-slate-700';
    case 'australia':
      return 'border-pink-200 bg-pink-50 text-pink-900';
    default:
      return 'border-stone-200 bg-stone-50 text-stone-600';
  }
}

function WineBottleCard({ wine, imageSrc, style, country, priceBand, rarityScore, popularityScore }) {
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
            placeholderClassName="bg-white"
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

function SectionHeader({ title, description, count, totalPrice, scoreLabel, scoreValue }) {
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

function buildGroupedSections(enrichedWines, mode) {
  const cloned = [...enrichedWines];

  if (mode === 'countries') {
    const buckets = new Map();
    cloned.forEach((entry) => {
      const bucket = buckets.get(entry.country.key) ?? {
        key: entry.country.key,
        title: entry.country.label,
        description: entry.country.key === 'unknown'
          ? 'Bottle names that do not reveal a reliable origin clue, so they stay in a catch-all shelf.'
          : 'Inferred from region, producer, or appellation cues in the bottle name.',
        items: [],
      };
      bucket.items.push(entry);
      buckets.set(entry.country.key, bucket);
    });

    return [...buckets.values()]
      .map((group) => ({
        ...group,
        items: group.items.sort((a, b) => b.wine.base_price_eur_750ml - a.wine.base_price_eur_750ml),
      }))
      .sort((a, b) => b.items.length - a.items.length || a.title.localeCompare(b.title));
  }

  if (mode === 'prices') {
    const buckets = new Map();
    cloned.forEach((entry) => {
      const bucket = buckets.get(entry.priceBand.key) ?? {
        key: entry.priceBand.key,
        title: entry.priceBand.label,
        description:
          entry.priceBand.key === 'under-50'
            ? 'More approachable bottles and everyday pours.'
            : entry.priceBand.key === '50-149'
              ? 'Mid-range wines with enough structure for the spotlight.'
              : entry.priceBand.key === '150-399'
                ? 'Serious cellar bottles that still feel menu-friendly.'
                : 'Trophy wines and celebratory pours at the top of the ladder.',
        items: [],
      };
      bucket.items.push(entry);
      buckets.set(entry.priceBand.key, bucket);
    });

    return PRICE_BAND_ORDER
      .map((key) => buckets.get(key))
      .filter(Boolean)
      .map((group) => ({
        ...group,
        items: group.items.sort((a, b) => b.wine.base_price_eur_750ml - a.wine.base_price_eur_750ml),
      }));
  }

  if (mode === 'popularity' || mode === 'rarity') {
    const sorted = cloned.sort((a, b) =>
      mode === 'popularity' ? b.popularityScore - a.popularityScore : b.rarityScore - a.rarityScore,
    );
    const chunkSize = Math.max(1, Math.ceil(sorted.length / 4));
    const bucketKeys = mode === 'popularity' ? POPULARITY_BUCKETS : RARITY_BUCKETS;
    const bucketDetails = mode === 'popularity'
      ? [
          { title: 'Crowd favorites', description: 'Friendly on the palate and easy to recommend.' },
          { title: "Sommeliers' picks", description: 'Classics with strong menu appeal and broad diner confidence.' },
          { title: 'Cult classics', description: 'A little more specialist, but still very drinkable.' },
          { title: 'Deep cuts', description: 'Geekier or more extravagant pours.' },
        ]
      : [
          { title: 'Legendary', description: 'Collector-grade statements and trophy pours.' },
          { title: 'Rare', description: 'Scarce, serious, and likely to start a conversation.' },
          { title: 'Notable', description: 'Distinctive bottles with a strong cellar presence.' },
          { title: 'Accessible', description: 'More approachable and easier to pour by the glass.' },
        ];

    return bucketKeys.map((key, index) => {
      const items = sorted.slice(index * chunkSize, (index + 1) * chunkSize);
      return {
        key,
        title: bucketDetails[index].title,
        description: bucketDetails[index].description,
        items,
      };
    });
  }

  if (mode === 'styles') {
    const buckets = new Map();
    cloned.forEach((entry) => {
      const bucket = buckets.get(entry.style.key) ?? {
        key: entry.style.key,
        title: entry.style.label,
        description:
          entry.style.key === 'red'
            ? 'Dark-fruited, structured, and built for the deeper end of the list.'
            : entry.style.key === 'white'
              ? 'Crisp, aromatic, and a little more luminous on the palate.'
              : entry.style.key === 'champagne'
                ? 'Sparkling and celebratory, including champagne and closely related bubbles.'
                : 'A catch-all shelf for rosé, dessert, and bottles that resist easy classification.',
        items: [],
      };
      bucket.items.push(entry);
      buckets.set(entry.style.key, bucket);
    });

    return STYLE_ORDER
      .map((key) => buckets.get(key))
      .filter(Boolean)
      .map((group) => ({
        ...group,
        items: group.items.sort((a, b) => b.wine.base_price_eur_750ml - a.wine.base_price_eur_750ml),
      }));
  }

  return [
    {
      key: 'all',
      title: 'All bottles',
      description: 'The complete cellar wall in source order.',
      items: cloned.sort((a, b) => a.wine.id - b.wine.id),
    },
  ];
}

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
            <a key={section.key} href={`#wine-section-${section.key}`} className="quiet-link px-3 py-1.5 text-xs">
              {section.title}
            </a>
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
                imageSrc={`/the_cellar/${imageFilename}`}
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
                      imageSrc={`/the_cellar/${imageFilename}`}
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
