import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  formatPrice,
  normalizeDisplayMenu,
} from '../src/lib/menuDisplayNormalization.js';

const wellBeanExtraction = JSON.parse(
  readFileSync(new URL('./fixtures/well-bean-deli-extraction.json', import.meta.url), 'utf8'),
);

function findSection(menu, name) {
  return menu.sections.find((section) => section.name === name);
}

function findItem(section, name) {
  return section.items.find((item) => item.name === name);
}

test('normalizeDisplayMenu turns repeated Well Bean item notes into section notes', () => {
  const normalized = normalizeDisplayMenu(wellBeanExtraction.menu);
  const burgers = findSection(normalized, 'BURGERS');
  const sandwiches = findSection(normalized, 'SANDWICHES');
  const milkshakes = findSection(normalized, 'MILKSHAKES');

  assert.deepEqual(burgers.notes, [
    'Served on a ww. sesame bun with sprouts, tomato, our special sauce, marinade, and a dill pickle.',
  ]);
  assert.deepEqual(burgers.items.map((item) => item.notes), Array.from({ length: 7 }, () => null));

  assert.deepEqual(sandwiches.notes, [
    'Served on Grain Bin ww with sprouts, tomato, soy mayo, and a dill pickle.',
  ]);
  assert.deepEqual(sandwiches.items.map((item) => item.notes), Array.from({ length: 3 }, () => null));

  assert.deepEqual(milkshakes.notes, [
    'Made with local organic soymilk—bananas, and sweetened with honey and vanilla.',
  ]);
  assert.deepEqual(milkshakes.items.map((item) => item.notes), Array.from({ length: 3 }, () => null));
});

test('normalizeDisplayMenu cleans Well Bean compact salad prices without losing serving notes', () => {
  const normalized = normalizeDisplayMenu(wellBeanExtraction.menu);
  const salads = findSection(normalized, 'SALADS');
  const artichokes = findItem(salads, 'Marinated Artichokes');
  const olives = findItem(salads, 'Pimento Stuffed Olives');
  const tossedGreen = findItem(salads, 'Tossed Green Salad');

  assert.deepEqual(salads.notes, ['1/2 pt. / pt.']);
  assert.equal(artichokes.price, '.95');
  assert.equal(artichokes.notes, '1/3 cup');
  assert.equal(olives.price, '.65');
  assert.equal(olives.notes, '1/2 cup');
  assert.equal(tossedGreen.price, '.75 / 1.40');
  assert.equal(tossedGreen.notes, null);
});

test('formatPrice displays Well Bean prices with the extracted currency', () => {
  assert.equal(formatPrice('$', '2.25'), '$2.25');
  assert.equal(formatPrice('$', '.75'), '$0.75');
  assert.equal(formatPrice('$', '1.30 / 2.45'), '$1.30 / $2.45');
  assert.equal(formatPrice('$', '.75 / 1.40'), '$0.75 / $1.40');
});
