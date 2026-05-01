/* eslint-disable react/prop-types */

export function DetailCard({ label, value, note, className = '' }) {
  return (
    <div className={`wine-dossier-card min-h-[6.5rem] p-4 sm:p-5 ${className}`}>
      <p className="wine-dossier-label">{label}</p>
      <p className="wine-dossier-value">{value}</p>
      {note ? <p className="wine-dossier-note">{note}</p> : null}
    </div>
  );
}

export function MetricCard({ label, value, note }) {
  return (
    <div className="wine-metric-card min-h-[8rem]">
      <p className="stat-label">{label}</p>
      <p className="mt-2 text-xl font-semibold leading-snug text-ink sm:text-[1.35rem]">{value}</p>
      {note ? <p className="mt-1 text-[0.78rem] leading-5 text-stone-500">{note}</p> : null}
    </div>
  );
}
