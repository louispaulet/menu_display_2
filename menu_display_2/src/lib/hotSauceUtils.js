import hotSauceData from '../hotsauceData';

export const sortOptions = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'age-desc', label: 'Age longest' },
  { value: 'age-asc', label: 'Age youngest' },
  { value: 'scoville-desc', label: 'Scoville hottest' },
  { value: 'scoville-asc', label: 'Scoville mildest' },
  { value: 'hotness-desc', label: 'Heat level hottest' },
  { value: 'batch-asc', label: 'Smallest batch' },
];

export const hotSauceList = Object.values(hotSauceData).map((sauce, id) => ({
  ...sauce,
  id,
}));

export function sortSauces(sauces, sortBy) {
  return [...sauces].sort((first, second) => {
    switch (sortBy) {
      case 'price-asc':
        return first.price - second.price;
      case 'price-desc':
        return second.price - first.price;
      case 'age-desc':
        return second.age_months - first.age_months;
      case 'age-asc':
        return first.age_months - second.age_months;
      case 'scoville-desc':
        return second.scoville_units - first.scoville_units;
      case 'scoville-asc':
        return first.scoville_units - second.scoville_units;
      case 'hotness-desc':
        return second.hotness_level - first.hotness_level;
      case 'batch-asc':
        return first.batch_size - second.batch_size;
      case 'name-asc':
      default:
        return first.name.localeCompare(second.name);
    }
  });
}
