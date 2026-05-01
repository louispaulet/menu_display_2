const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return currencyFormatter.format(value);
}

export function formatPriceRange(range) {
  if (!range) return '—';

  const low = formatPrice(range.low);
  const high = formatPrice(range.high);

  if (low === '—' && high === '—') return '—';
  if (low === '—') return high;
  if (high === '—') return low;
  if (low === high) return low;

  return `${low} to ${high}`;
}

export function humanize(value) {
  if (typeof value !== 'string') return '—';
  return value.replace(/_/g, ' ');
}
