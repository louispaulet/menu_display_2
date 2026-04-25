import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import HotSaucePreview from '../components/HotSaucePreview';
import hotSauceData from '../hotsauceData';

const sortOptions = [
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

const hotSauceList = Object.values(hotSauceData).map((sauce, id) => ({
  ...sauce,
  id,
}));

function sortSauces(sauces, sortBy) {
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

function HotSaucePage() {
  const [sortBy, setSortBy] = useState('name-asc');
  const hotSauces = sortSauces(hotSauceList, sortBy);

  return (
    <div className="page-shell">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <p className="page-kicker">Condiment cellar</p>
        <h1 className="page-title">Artisanal hot sauces with a chef’s point of view.</h1>
        <p className="page-lede">
          Explore heat levels, tasting notes, and small-batch bottlings designed to sharpen the menus without overwhelming them.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-3 rounded-lg border border-stone-200/80 bg-linen p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="page-kicker text-[0.65rem]">Cellar order</p>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            Sauces are listed A-Z by default. Use the cellar filter to reshuffle by the tasting stats.
          </p>
        </div>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:min-w-64">
          Filter by
          <span className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full appearance-none rounded-full border border-stone-300 bg-white py-3 pl-4 pr-12 text-sm font-semibold text-ink shadow-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink"
            />
          </span>
        </label>
      </div>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotSauces.map((sauce) => (
          <HotSaucePreview
            key={sauce.name}
            id={sauce.id}
            name={sauce.name}
            hotnessLevel={sauce.hotness_level}
            bottlingDate={sauce.bottling_date}
            price={sauce.price}
            scovilleUnits={sauce.scoville_units}
            ageMonths={sauce.age_months}
            batchSize={sauce.batch_size}
            description={sauce.description}
          />
        ))}
      </section>
    </div>
  );
}

export default HotSaucePage;
