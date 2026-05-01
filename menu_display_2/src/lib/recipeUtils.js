import menuData from '../menuData';
import { findZoneByRestaurantName } from './siteThemes';
import { getGeneratedImageBaseUrl } from './imageAssets';

const dishImageBaseUrl = getGeneratedImageBaseUrl('dish_pictures');

export const encodeAssetSegment = (value) => encodeURIComponent(value.replace(/ /g, '_')).replace(/%2C/gi, ',');

export const normalizeText = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const slugifyHeading = (value = '') =>
  normalizeText(value).replace(/\s+/g, '-').replace(/^-+|-+$/g, '');

export const childrenToText = (children) => {
  if (Array.isArray(children)) {
    return children.map(childrenToText).join('');
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (children?.props?.children) {
    return childrenToText(children.props.children);
  }

  return '';
};

export const extractRecipeTitle = (markdown = '') => {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  return match ? match[1].trim() : '';
};

export const stripMarkdownImages = (markdown = '') => markdown.replace(/!\[[^\]]*]\([^)]+\)\s*/g, '').trim();

export const stripLeadingTitleHeading = (markdown = '', title = '') => {
  const lines = markdown.split('\n');
  const firstHeadingIndex = lines.findIndex((line) => /^#{1,6}\s+/.test(line.trim()));
  if (firstHeadingIndex === -1) return markdown;

  const headingText = lines[firstHeadingIndex].replace(/^#{1,6}\s+/, '').trim();
  if (normalizeText(headingText) !== normalizeText(title)) return markdown;

  return [
    ...lines.slice(0, firstHeadingIndex),
    ...lines.slice(firstHeadingIndex + 1),
  ].join('\n').trim();
};

export const isListItem = (line = '') => /^(-|\d+\.)\s+/.test(line.trim());

export const countBullets = (markdown = '', startHeading = 'Ingredients', endHeading = 'Instructions') => {
  const lines = markdown.split('\n');
  const headingPattern = /^#{2,4}\s+(.+)$/;
  const startIndex = lines.findIndex((line) => normalizeText(line.match(headingPattern)?.[1] ?? '') === normalizeText(startHeading));
  if (startIndex === -1) return 0;

  const endIndex = lines.findIndex((line, index) => (
    index > startIndex && normalizeText(line.match(headingPattern)?.[1] ?? '') === normalizeText(endHeading)
  ));
  const slice = lines.slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex).join('\n');
  return slice.split('\n').filter(isListItem).length;
};

export const countMethodSteps = (markdown = '') => {
  const lines = markdown.split('\n');
  const headingPattern = /^#{2,4}\s+(.+)$/;
  const startIndex = lines.findIndex((line) => normalizeText(line.match(headingPattern)?.[1] ?? '') === 'instructions');
  if (startIndex === -1) return 0;

  const endIndex = lines.findIndex((line, index) => {
    if (index <= startIndex) return false;
    const heading = normalizeText(line.match(headingPattern)?.[1] ?? '');
    return heading === 'suggested wine pairing' || heading === 'wine pairing' || heading === 'notes';
  });

  return lines
    .slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex)
    .filter(isListItem)
    .length;
};

export const buildOutline = (markdown = '') =>
  markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (!match) return null;
      return {
        level: match[1].length,
        title: match[2].trim(),
        id: slugifyHeading(match[2]),
      };
    })
    .filter(Boolean);

export const findRecipeContext = (title = '') => {
  const normalizedTitle = normalizeText(title.replace(/^recipe:\s*/i, '').replace(/\s+recipe$/i, ''));

  for (const menu of menuData) {
    for (const item of menu.tasting_menu) {
      const normalizedDescription = normalizeText(item.description);
      if (normalizedDescription === normalizedTitle || normalizedTitle.includes(normalizedDescription) || normalizedDescription.includes(normalizedTitle)) {
        return {
          restaurantName: menu.restaurant_name,
          chefName: menu.chef_name,
          location: menu.location,
          menuItem: item,
          zone: findZoneByRestaurantName(menu.restaurant_name),
        };
      }
    }
  }

  return null;
};

export function getDishImageUrl(markdown) {
  const recipeTitle = normalizeText(extractRecipeTitle(markdown).replace(/^recipe:\s*/i, '').replace(/\s+recipe$/i, ''));

  for (const menu of menuData) {
    for (const item of menu.tasting_menu) {
      if (normalizeText(item.description) === recipeTitle) {
        const chefNameEncoded = encodeAssetSegment(menu.chef_name);
        const restaurantNameEncoded = encodeAssetSegment(menu.restaurant_name);
        const courseNameEncoded = encodeAssetSegment(item.course);
        const courseDescriptionEncoded = encodeAssetSegment(item.description);

        return `${dishImageBaseUrl}${chefNameEncoded}-${restaurantNameEncoded}-${courseNameEncoded}-${courseDescriptionEncoded}.webp`;
      }
    }
  }

  return null;
}
