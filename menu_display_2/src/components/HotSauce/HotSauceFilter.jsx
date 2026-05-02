/* eslint-disable react/prop-types */
import { FaChevronDown } from 'react-icons/fa';
import { sortOptions } from '../../lib/hotSauceUtils';

export default function HotSauceFilter({ sortBy, setSortBy }) {
  return (
    <div className="mb-8 flex flex-col gap-3 rounded-lg border border-rose-200/70 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="page-kicker text-[0.65rem] text-rose-700">Cellar order</p>
        <p className="mt-1 text-sm leading-6 text-stone-600">
          Sort the bottles by name, price, age, heat, Scoville rating, or batch size.
        </p>
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:min-w-64">
        Sort by
        <span className="relative">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full appearance-none rounded-full border border-stone-300 bg-white py-3 pl-4 pr-12 text-sm font-semibold text-ink shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FaChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-rose-900"
          />
        </span>
      </label>
    </div>
  );
}
