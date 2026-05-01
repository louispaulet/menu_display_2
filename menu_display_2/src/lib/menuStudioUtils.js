import { getGeneratedImageBaseUrl } from './imageAssets';

export const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const apiBase = (import.meta.env.VITE_MENU_API_BASE || '/api').replace(/\/$/, '');
export const menuExampleImageBaseUrl = getGeneratedImageBaseUrl('menu_examples');

export function formatBytes(bytes) {
  if (!bytes) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getClientFileError(file) {
  if (!file) return 'Choose a menu image first.';
  if (!ACCEPTED_TYPES.has(file.type)) return 'Upload a JPEG, PNG, or WebP menu image.';
  if (file.size > MAX_UPLOAD_BYTES) return 'Keep the menu image under 10MB.';
  return '';
}
