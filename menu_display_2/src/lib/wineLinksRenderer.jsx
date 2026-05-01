import { Link } from 'react-router-dom';

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
