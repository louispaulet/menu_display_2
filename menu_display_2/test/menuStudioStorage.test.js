import { describe, it, expect } from 'vitest';
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

describe('menuStudioStorage', () => {
  it('saveMenuStudioResult stores serialized extraction results', () => {
    const storage = createStorage();
    const result = { menu: { sections: [] }, meta: { model: 'gpt-5.4-mini' } };

    saveMenuStudioResult(result, storage);

    expect(JSON.parse(storage.getItem(MENU_STUDIO_STORAGE_KEY))).toEqual(result);
  });

  it('loadStoredMenuStudioResult returns parsed saved results', () => {
    const result = { menu: { restaurantName: 'Cafe' }, meta: { generatedAt: '2026-04-30T00:00:00.000Z' } };
    const storage = createStorage(JSON.stringify(result));

    expect(loadStoredMenuStudioResult(storage)).toEqual(result);
  });

  it('loadStoredMenuStudioResult clears invalid saved JSON', () => {
    const storage = createStorage('{broken');

    expect(loadStoredMenuStudioResult(storage)).toBe(null);
    expect(storage.getItem(MENU_STUDIO_STORAGE_KEY)).toBe(null);
  });

  it('clearMenuStudioResult removes the saved result', () => {
    const storage = createStorage(JSON.stringify({ menu: {} }));

    clearMenuStudioResult(storage);

    expect(storage.getItem(MENU_STUDIO_STORAGE_KEY)).toBe(null);
  });
});
