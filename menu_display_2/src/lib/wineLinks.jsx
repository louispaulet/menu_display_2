import { useEffect, useMemo, useState } from 'react';


function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildWineBottlePath(wine) {
  return `/wines/${wine.id}-${slugify(wine.name)}`;
}

export function buildWineLinkContext(wines = []) {
  const entries = wines
    .filter((wine) => wine && wine.name && wine.id != null)
    .map((wine) => ({
      name: wine.name,
      path: buildWineBottlePath(wine),
    }))
    .sort((a, b) => b.name.length - a.name.length);

  return {
    entries,
    routeByName: new Map(entries.map((entry) => [entry.name, entry.path])),
    pattern: entries.length ? new RegExp(entries.map((entry) => escapeRegExp(entry.name)).join('|'), 'g') : null,
  };
}

export function useWineLinkContext() {
  const [wineData, setWineData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/wines.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setWineData(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load wine link data:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => buildWineLinkContext(wineData?.wines ?? []), [wineData]);
}

