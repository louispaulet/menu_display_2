/* eslint-disable react/prop-types */

export default function HeatBar({ level }) {
  const heatColor = level >= 9 ? 'bg-rose-700' : level >= 7 ? 'bg-orange-600' : level >= 5 ? 'bg-amber-500' : 'bg-lime-600';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-stone-600">
        <span>Heat level</span>
        <span>{level}/10</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
        <div className={`h-full ${heatColor}`} style={{ width: `${Math.min(100, level * 10)}%` }} />
      </div>
    </div>
  );
}
