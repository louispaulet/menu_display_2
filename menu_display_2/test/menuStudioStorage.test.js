import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MENU_STUDIO_STORAGE_KEY,
  clearMenuStudioResult,
  loadStoredMenuStudioResult,
  saveMenuStudioResult,
} from '../src/lib/menuStudioStorage.js';

function createStorage(initialValue) {
  const store = new Map(initialValue ? [[MENU_STUDIO_STORAGE_KEY, initialValue]] : []);
  return {
    getItem(key) {
      return store.get(key) ?? null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(key, value);
    },
  };
}

test('saveMenuStudioResult stores serialized extraction results', () => {
  const storage = createStorage();
  const result = { menu: { sections: [] }, meta: { model: 'gpt-5.4-mini' } };

  saveMenuStudioResult(result, storage);

  assert.deepEqual(JSON.parse(storage.getItem(MENU_STUDIO_STORAGE_KEY)), result);
});

test('loadStoredMenuStudioResult returns parsed saved results', () => {
  const result = { menu: { restaurantName: 'Cafe' }, meta: { generatedAt: '2026-04-30T00:00:00.000Z' } };
  const storage = createStorage(JSON.stringify(result));

  assert.deepEqual(loadStoredMenuStudioResult(storage), result);
});

test('loadStoredMenuStudioResult clears invalid saved JSON', () => {
  const storage = createStorage('{broken');

  assert.equal(loadStoredMenuStudioResult(storage), null);
  assert.equal(storage.getItem(MENU_STUDIO_STORAGE_KEY), null);
});

test('clearMenuStudioResult removes the saved result', () => {
  const storage = createStorage(JSON.stringify({ menu: {} }));

  clearMenuStudioResult(storage);

  assert.equal(storage.getItem(MENU_STUDIO_STORAGE_KEY), null);
});
