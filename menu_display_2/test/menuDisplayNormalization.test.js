import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

import {
  formatPrice,
  normalizeDisplayMenu,
} from '../src/lib/menuDisplayNormalization.js';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wellBeanExtraction = JSON.parse(
  readFileSync(join(__dirname, 'fixtures/well-bean-deli-extraction.json'), 'utf8'),
);

function findSection(menu, name) {
  return menu.sections.find((section) => section.name === name);
}

function findItem(section, name) {
  return section.items.find((item) => item.name === name);
}

it('normalizeDisplayMenu turns repeated Well Bean item notes into section notes', () => {
  const normalized = normalizeDisplayMenu(wellBeanExtraction.menu);
  const burgers = findSection(normalized, 'BURGERS');
  const sandwiches = findSection(normalized, 'SANDWICHES');
  const milkshakes = findSection(normalized, 'MILKSHAKES');

  expect(burgers.notes).toEqual([
    'Served on a ww. sesame bun with sprouts, tomato, our special sauce, marinade, and a dill pickle.',
  ]);
  expect(burgers.items.map((item) => item.notes)).toEqual(Array.from({ length: 7 }, () => null));

  expect(sandwiches.notes).toEqual([
    'Served on Grain Bin ww with sprouts, tomato, soy mayo, and a dill pickle.',
  ]);
  expect(sandwiches.items.map((item) => item.notes)).toEqual(Array.from({ length: 3 }, () => null));

  expect(milkshakes.notes).toEqual([
    'Made with local organic soymilk—bananas, and sweetened with honey and vanilla.',
  ]);
  expect(milkshakes.items.map((item) => item.notes)).toEqual(Array.from({ length: 3 }, () => null));
});

it('normalizeDisplayMenu cleans Well Bean compact salad prices without losing serving notes', () => {
  const normalized = normalizeDisplayMenu(wellBeanExtraction.menu);
  const salads = findSection(normalized, 'SALADS');
  const artichokes = findItem(salads, 'Marinated Artichokes');
  const olives = findItem(salads, 'Pimento Stuffed Olives');
  const tossedGreen = findItem(salads, 'Tossed Green Salad');

  expect(salads.notes).toEqual(['1/2 pt. / pt.']);
  expect(artichokes.price).toBe('.95');
  expect(artichokes.notes).toBe('1/3 cup');
  expect(olives.price).toBe('.65');
  expect(olives.notes).toBe('1/2 cup');
  expect(tossedGreen.price).toBe('.75 / 1.40');
  expect(tossedGreen.notes).toBe(null);
});

it('formatPrice displays Well Bean prices with the extracted currency', () => {
  expect(formatPrice('$', '2.25')).toBe('$2.25');
  expect(formatPrice('$', '.75')).toBe('$0.75');
  expect(formatPrice('$', '1.30 / 2.45')).toBe('$1.30 / $2.45');
  expect(formatPrice('$', '.75 / 1.40')).toBe('$0.75 / $1.40');
});
