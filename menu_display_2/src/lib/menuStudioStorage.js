export const MENU_STUDIO_STORAGE_KEY = 'exquisite-menus:menu-studio:last-result';

function getStorage(storage) {
  if (storage) return storage;
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function loadStoredMenuStudioResult(storage) {
  const targetStorage = getStorage(storage);
  if (!targetStorage) return null;

  const value = targetStorage.getItem(MENU_STUDIO_STORAGE_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    targetStorage.removeItem(MENU_STUDIO_STORAGE_KEY);
    return null;
  }
}

export function saveMenuStudioResult(result, storage) {
  const targetStorage = getStorage(storage);
  if (!targetStorage) return;

  targetStorage.setItem(MENU_STUDIO_STORAGE_KEY, JSON.stringify(result));
}

export function clearMenuStudioResult(storage) {
  const targetStorage = getStorage(storage);
  if (!targetStorage) return;

  targetStorage.removeItem(MENU_STUDIO_STORAGE_KEY);
}
