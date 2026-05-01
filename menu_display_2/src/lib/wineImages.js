export function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function defaultWineImageFilename(wine) {
  const idPart = String(wine.id).padStart(3, '0');
  const namePart = slugify(wine.name).slice(0, 60);
  return `wine-image-${idPart}-${namePart}.webp`;
}

const wineImageFilenameOverrides = new Map([
  ['Mole de Piedra Blend 2021', 'wine-image-267-mole-de-piedra-blend-2021-v2.webp'],
]);

export function buildWineImageIndex(manifest) {
  const entries = manifest?.items ?? [];
  return new Map(entries.map((entry) => [entry.wine_name, entry.filename]));
}

export function resolveWineImageFilename(wine, imageIndex) {
  return imageIndex.get(wine.name) ?? wineImageFilenameOverrides.get(wine.name) ?? defaultWineImageFilename(wine);
}
