export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const VIEW_MODES = [
  { key: 'styles', label: 'Reds / whites / champagnes', description: 'A clean three-way split with a small fallback for the odd bottles.' },
  { key: 'countries', label: 'By country', description: 'Bottle names grouped by inferred origin, producer, or appellation.' },
  { key: 'prices', label: 'By price', description: 'A ladder from approachable pours to trophy bottles.' },
  { key: 'popularity', label: 'Popularity', description: 'The most recommendable bottles first, then the deeper cuts.' },
  { key: 'rarity', label: 'Rarity', description: 'Collector-coded bottles first, then the easier-to-pour labels.' },
  { key: 'all', label: 'All bottles', description: 'A master list if you just want the full cellar wall.' },
];

export const STYLE_ORDER = ['red', 'white', 'champagne', 'other'];
export const PRICE_BAND_ORDER = ['under-50', '50-149', '150-399', '400-plus'];
export const POPULARITY_BUCKETS = ['crowd-favorites', 'sommeliers-picks', 'cult-classics', 'deep-cuts'];
export const RARITY_BUCKETS = ['legendary', 'rare', 'notable', 'accessible'];

export function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return currencyFormatter.format(value);
}

export function medianPrice(wines) {
  const prices = wines
    .map((entry) => entry.wine.base_price_eur_750ml)
    .filter((price) => typeof price === 'number')
    .sort((a, b) => a - b);

  if (!prices.length) return null;

  const middle = Math.floor(prices.length / 2);
  return prices.length % 2 ? prices[middle] : (prices[middle - 1] + prices[middle]) / 2;
}

export function tastingNoteFor(wine) {
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

export function cardToneForStyle(styleKey) {
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

export function cardToneForCountry(countryKey) {
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

export function buildGroupedSections(enrichedWines, mode) {
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
