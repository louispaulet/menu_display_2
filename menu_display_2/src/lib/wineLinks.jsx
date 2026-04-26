import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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

export function linkifyWineText(text, wineLinkContext) {
  if (!text || !wineLinkContext?.pattern) return text;

  const { pattern, routeByName } = wineLinkContext;
  const nodes = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const matchedText = match[0];
    const start = match.index ?? 0;

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    const path = routeByName.get(matchedText);
    if (path) {
      nodes.push(
        <Link
          key={`${matchedText}-${start}`}
          to={path}
          className="font-semibold text-clay underline decoration-clay/40 underline-offset-4 transition hover:text-ink hover:decoration-ink"
        >
          {matchedText}
        </Link>,
      );
    } else {
      nodes.push(matchedText);
    }

    cursor = start + matchedText.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes.length ? nodes : text;
}

export function linkifyWineMarkdown(markdown, wineLinkContext) {
  if (!markdown || !wineLinkContext?.pattern) return markdown;

  return markdown.replace(wineLinkContext.pattern, (matchedText) => {
    const path = wineLinkContext.routeByName.get(matchedText);
    return path ? `[${matchedText}](${path})` : matchedText;
  });
}
