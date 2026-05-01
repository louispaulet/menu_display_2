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
  ['Champagne de Barranco Brut Nature 2016', 'wine-image-262-champagne-de-barranco-brut-nature-2016-v2.webp'],
  ['Ayni de Barranco Albariño 2023', 'wine-image-263-ayni-de-barranco-albarino-2023-v2.webp'],
  ['Maison Varenne Junmai Daiginjo 2023', 'wine-image-264-maison-varenne-junmai-daiginjo-2023-v2.webp'],
  ['Pampa Negra Malbec 2019', 'wine-image-265-pampa-negra-malbec-2019-v2.webp'],
  ['Etxe Senda Txakoli 2022', 'wine-image-266-etxe-senda-txakoli-2022-v2.webp'],
  ['Mole de Piedra Blend 2021', 'wine-image-267-mole-de-piedra-blend-2021-v2.webp'],
  ['Gran Vía Garnacha 2021', 'wine-image-268-gran-via-garnacha-2021-v2.webp'],
  ['Refshale Bloom Blanc de Noirs 2017', 'wine-image-269-refshale-bloom-blanc-de-noirs-2017-v2.webp'],
  ['Siam Silk Riesling 2022', 'wine-image-270-siam-silk-riesling-2022-v2.webp'],
  ['Marunouchi Cuvée Éclat 2018', 'wine-image-271-marunouchi-cuvee-eclat-2018-v2.webp'],
]);

export function buildWineImageIndex(manifest) {
  const entries = manifest?.items ?? [];
  return new Map(entries.map((entry) => [entry.wine_name, entry.filename]));
}

export function resolveWineImageFilename(wine, imageIndex) {
  return imageIndex.get(wine.name) ?? wineImageFilenameOverrides.get(wine.name) ?? defaultWineImageFilename(wine);
}
