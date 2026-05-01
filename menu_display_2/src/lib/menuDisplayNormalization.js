function cleanText(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

function addUnique(list, value) {
  const cleaned = cleanText(value);
  if (!cleaned) return;

  if (!list.some((entry) => entry.toLowerCase() === cleaned.toLowerCase())) {
    list.push(cleaned);
  }
}

function parseCompactPrice(price) {
  const cleaned = cleanText(price);
  if (!cleaned) return null;

  const match = cleaned.match(
    /^((?:\d+\/\d+|\d+(?:\.\d+)?)\s*(?:cup|cups|pt\.?|pts\.?|pint|pints|quart|quarts|qt\.?|qts\.?|oz\.?|ounce|ounces|slice|slices|piece|pieces|pc\.?|pcs\.?)\.?)\s+([$€£¥]?\s*\.?\d+(?:\.\d{1,2})?)$/i,
  );

  if (!match) return null;

  return {
    note: cleanText(match[1]),
    price: cleanText(match[2]),
  };
}

function mergeNote(existingNote, noteToAdd) {
  const notes = [];
  addUnique(notes, existingNote);
  addUnique(notes, noteToAdd);

  if (notes.length === 0) return null;
  return notes.join(' · ');
}

function normalizeDisplayItem(item) {
  const normalized = {
    ...item,
    dietaryTags: Array.isArray(item.dietaryTags) ? item.dietaryTags : [],
    notes: item.notes ?? null,
  };

  const compactPrice = parseCompactPrice(normalized.price);
  if (compactPrice) {
    normalized.price = compactPrice.price;
    normalized.notes = mergeNote(normalized.notes, compactPrice.note);
  }

  const cleanedNote = cleanText(normalized.notes);
  normalized.notes = cleanedNote || null;

  return normalized;
}

function normalizeDisplaySection(section) {
  const sectionNotes = [];
  for (const note of section.notes ?? []) addUnique(sectionNotes, note);

  const items = (section.items ?? []).map(normalizeDisplayItem);
  const noteCounts = new Map();

  for (const item of items) {
    if (!item.notes) continue;
    const key = item.notes.toLowerCase();
    noteCounts.set(key, {
      count: (noteCounts.get(key)?.count ?? 0) + 1,
      text: item.notes,
    });
  }

  const notesToHoist = new Set();
  for (const [key, note] of noteCounts) {
    if (note.count > 1) {
      notesToHoist.add(key);
      addUnique(sectionNotes, note.text);
    }
  }

  return {
    ...section,
    notes: sectionNotes,
    items: items.map((item) => (
      item.notes && notesToHoist.has(item.notes.toLowerCase())
        ? { ...item, notes: null }
        : item
    )),
  };
}

export function normalizeDisplayMenu(menu) {
  return {
    ...menu,
    restaurantName: menu?.restaurantName || menu?.restaurant_name || 'Untitled menu',
    sections: (menu.sections ?? []).map(normalizeDisplaySection),
  };
}

function currencyPrefix(currency) {
  const value = cleanText(currency);
  if (!value || /^[A-Z]{3}$/i.test(value)) return '';
  return value;
}

function formatPriceToken(currency, token) {
  const price = cleanText(token);
  const prefix = currencyPrefix(currency);

  if (!price || !prefix || /[$€£¥]/.test(price) || !/^\.?\d/.test(price)) return price;
  return `${prefix}${price.startsWith('.') ? `0${price}` : price}`;
}

export function formatPrice(currency, value) {
  const price = cleanText(value);
  if (!price) return '';

  if (price.includes('/')) {
    return price
      .split('/')
      .map((token) => formatPriceToken(currency, token))
      .join(' / ');
  }

  return formatPriceToken(currency, price);
}
