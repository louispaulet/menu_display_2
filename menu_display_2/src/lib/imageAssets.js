export const GENERATED_IMAGE_BASE_URL = 'https://storage.googleapis.com/exquisite-menus-images';

export const getGeneratedImageBaseUrl = (assetPath) =>
  import.meta.env.DEV ? `/${assetPath}/` : `${GENERATED_IMAGE_BASE_URL}/${assetPath}/`;
