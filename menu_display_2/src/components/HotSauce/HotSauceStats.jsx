/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaDollarSign, FaHourglassHalf, FaPepperHot, FaWarehouse } from 'react-icons/fa';
import { GiFireBottle } from 'react-icons/gi';
import HeatBar from './HeatBar';

export default function HotSauceStats({ sauce }) {
  return (
    <div className="mt-6 rounded-lg border border-stone-200/80 bg-white/70 p-5 text-stone-700">
      <HeatBar level={sauce.hotness_level} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FaPepperHot className="h-4 w-4 text-rose-600" />
          Heat level {sauce.hotness_level}/10
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <GiFireBottle className="h-4 w-4 text-rose-600" />
          {sauce.scoville_units.toLocaleString('en-US')} SHU
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FaDollarSign className="h-4 w-4 text-rose-600" />
          ${sauce.price} bottle
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FaHourglassHalf className="h-4 w-4 text-rose-600" />
          Aged {sauce.age_months} months
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FaWarehouse className="h-4 w-4 text-rose-600" />
          {sauce.batch_size} bottle batch
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FaCalendarAlt className="h-4 w-4 text-rose-600" />
          Bottled {sauce.bottling_date}
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          pH {sauce.acidity_ph.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
