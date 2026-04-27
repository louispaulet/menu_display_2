import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import menuData from '../menuData';
import ProgressiveImage from './ProgressiveImage';
import { linkifyWineMarkdown, useWineLinkContext } from '../lib/wineLinks';
import { findZoneByRestaurantName, getZoneAccentForRestaurant } from '../lib/siteThemes';

const dishImageBaseUrl = 'https://raw.githubusercontent.com/louispaulet/menu_display_2/main/dish_pictures/';

const normalizeText = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugifyHeading = (value = '') =>
  normalizeText(value).replace(/\s+/g, '-').replace(/^-+|-+$/g, '');

const childrenToText = (children) => {
  if (Array.isArray(children)) {
    return children.map(childrenToText).join('');
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (children?.props?.children) {
    return childrenToText(children.props.children);
  }

  return '';
};

const extractRecipeTitle = (markdown = '') => {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  return match ? match[1].trim() : '';
};

const stripMarkdownImages = (markdown = '') => markdown.replace(/!\[[^\]]*]\([^)]+\)\s*/g, '').trim();

const stripLeadingTitleHeading = (markdown = '', title = '') => {
  const lines = markdown.split('\n');
  const firstHeadingIndex = lines.findIndex((line) => /^#{1,6}\s+/.test(line.trim()));
  if (firstHeadingIndex === -1) return markdown;

  const headingText = lines[firstHeadingIndex].replace(/^#{1,6}\s+/, '').trim();
  if (normalizeText(headingText) !== normalizeText(title)) return markdown;

  return [
    ...lines.slice(0, firstHeadingIndex),
    ...lines.slice(firstHeadingIndex + 1),
  ].join('\n').trim();
};

const isListItem = (line = '') => /^(-|\d+\.)\s+/.test(line.trim());

const countBullets = (markdown = '', startHeading = 'Ingredients', endHeading = 'Instructions') => {
  const lines = markdown.split('\n');
  const headingPattern = /^#{2,4}\s+(.+)$/;
  const startIndex = lines.findIndex((line) => normalizeText(line.match(headingPattern)?.[1] ?? '') === normalizeText(startHeading));
  if (startIndex === -1) return 0;

  const endIndex = lines.findIndex((line, index) => (
    index > startIndex && normalizeText(line.match(headingPattern)?.[1] ?? '') === normalizeText(endHeading)
  ));
  const slice = lines.slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex).join('\n');
  return slice.split('\n').filter(isListItem).length;
};

const countMethodSteps = (markdown = '') => {
  const lines = markdown.split('\n');
  const headingPattern = /^#{2,4}\s+(.+)$/;
  const startIndex = lines.findIndex((line) => normalizeText(line.match(headingPattern)?.[1] ?? '') === 'instructions');
  if (startIndex === -1) return 0;

  const endIndex = lines.findIndex((line, index) => {
    if (index <= startIndex) return false;
    const heading = normalizeText(line.match(headingPattern)?.[1] ?? '');
    return heading === 'suggested wine pairing' || heading === 'wine pairing' || heading === 'notes';
  });

  return lines
    .slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex)
    .filter(isListItem)
    .length;
};

const buildOutline = (markdown = '') =>
  markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (!match) return null;
      return {
        level: match[1].length,
        title: match[2].trim(),
        id: slugifyHeading(match[2]),
      };
    })
    .filter(Boolean);

const findRecipeContext = (title = '') => {
  const normalizedTitle = normalizeText(title.replace(/^recipe:\s*/i, '').replace(/\s+recipe$/i, ''));

  for (const menu of menuData) {
    for (const item of menu.tasting_menu) {
      const normalizedDescription = normalizeText(item.description);
      if (normalizedDescription === normalizedTitle || normalizedTitle.includes(normalizedDescription) || normalizedDescription.includes(normalizedTitle)) {
        return {
          restaurantName: menu.restaurant_name,
          chefName: menu.chef_name,
          location: menu.location,
          menuItem: item,
          zone: findZoneByRestaurantName(menu.restaurant_name),
        };
      }
    }
  }

  return null;
};

const Recipe = () => {
  const { recipeName } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const wineLinkContext = useWineLinkContext();

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const module = await import(`./../dish_recipes/${recipeName}.md`);
        const response = await fetch(module.default);
        const text = await response.text();

        if (text.includes('<!doctype html>') || text.includes('<html')) {
          throw new Error('File not found or invalid content');
        }

        setContent(text);
        setError(false);
      } catch (loadError) {
        console.error('Error loading the markdown file:', loadError);
        setError(true);
      }
    };

    loadRecipe();
  }, [recipeName]);

  const dishImageUrl = getDishImageUrl(content);
  const title = extractRecipeTitle(content) || recipeName.replace(/-/g, ' ');
  const renderedContent = stripLeadingTitleHeading(stripMarkdownImages(content), title);
  const linkedContent = useMemo(() => linkifyWineMarkdown(renderedContent, wineLinkContext), [renderedContent, wineLinkContext]);
  const outline = useMemo(() => buildOutline(renderedContent), [renderedContent]);
  const recipeContext = useMemo(() => findRecipeContext(title), [title]);
  const accent = recipeContext ? getZoneAccentForRestaurant(recipeContext.restaurantName) : { border: 'border-stone-200/80', wash: 'bg-white/80', fill: 'bg-stone-100', text: 'text-stone-700', glow: 'from-stone-200/20 via-transparent to-transparent' };
  const ingredientsCount = countBullets(renderedContent, 'Ingredients', 'Instructions');
  const methodCount = countMethodSteps(renderedContent);

  const markdownComponents = useMemo(
    () => ({
      h2: ({ children }) => <h2 id={slugifyHeading(childrenToText(children))}>{children}</h2>,
      h3: ({ children }) => <h3 id={slugifyHeading(childrenToText(children))}>{children}</h3>,
      h4: ({ children }) => <h4 id={slugifyHeading(childrenToText(children))}>{children}</h4>,
      a: ({ href, children }) =>
        href?.startsWith('/wines/') ? (
          <Link to={href} className="text-clay underline decoration-clay/40 underline-offset-4 hover:text-ink">
            {children}
          </Link>
        ) : (
          <a href={href}>{children}</a>
        ),
    }),
    [],
  );

  if (error) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl soft-panel p-8 text-center sm:p-12">
          <p className="page-kicker">Recipe unavailable</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold text-ink">Recipe not found</h1>
          <p className="mt-4 text-stone-600">
            Sorry, the recipe named {recipeName} was not found or could not be loaded.
          </p>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay">
            Back to menus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="space-y-6">
          <article className="content-card shadow-editorial">
            {dishImageUrl ? (
              <div className="relative aspect-[16/9] border-b border-stone-200/80 bg-stone-100">
                <ProgressiveImage
                  src={dishImageUrl}
                  alt={`${title} dish image`}
                  loading="eager"
                  className="h-full w-full"
                  imageClassName="h-full w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-35`} />
              </div>
            ) : null}

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2">
                <span className={`accent-chip ${accent.border} ${accent.wash} ${accent.text}`}>Recipe</span>
                {recipeContext?.zone && (
                  <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">{recipeContext.zone.title}</span>
                )}
                {recipeContext?.restaurantName && (
                  <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">{recipeContext.restaurantName}</span>
                )}
              </div>

              <h1 className="mt-4 font-playfair text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
                {recipeContext
                  ? `${recipeContext.chefName} at ${recipeContext.location} serves this dish inside a tasting menu with the same mood and texture.`
                  : 'A plated recipe from the generated tasting menu library.'}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="stat-tile">
                  <p className="stat-label">Ingredients</p>
                  <p className="stat-value text-2xl">{ingredientsCount}</p>
                </div>
                <div className="stat-tile">
                  <p className="stat-label">Method steps</p>
                  <p className="stat-value text-2xl">{methodCount}</p>
                </div>
                <div className="stat-tile">
                  <p className="stat-label">Pairing</p>
                  <p className="stat-value text-sm">Linked below</p>
                </div>
              </div>
            </div>
          </article>

          <article className="soft-panel p-6 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
              <div className="prose prose-stone max-w-none prose-headings:font-playfair prose-headings:text-ink prose-p:leading-8 prose-a:text-clay prose-strong:text-ink prose-li:my-1 prose-li:leading-7 prose-li:marker:text-clay sm:prose-lg">
                <ReactMarkdown components={markdownComponents}>{linkedContent}</ReactMarkdown>
              </div>

              <aside className="lg:sticky lg:top-24">
                <div className="soft-panel p-4">
                  <p className="page-kicker">On this page</p>
                  <h2 className="mt-2 font-playfair text-2xl font-semibold text-ink">Recipe outline</h2>
                  <nav className="mt-4 space-y-2" aria-label="Recipe sections">
                    {outline.map((entry, index) => (
                      <a
                        key={`${entry.id}-${entry.level}-${index}`}
                        href={`#${entry.id}`}
                        className={`index-link ${
                          entry.level === 3 ? 'pl-6' : ''
                        }`}
                      >
                        {entry.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          </article>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="soft-panel p-5">
            <p className="page-kicker">Summary</p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-ink">At a glance</h2>
            <div className="mt-4 space-y-3">
              <div className="stat-tile">
                <p className="stat-label">Restaurant</p>
                <p className="mt-1 font-semibold text-ink">{recipeContext?.restaurantName ?? 'Generated kitchen'}</p>
              </div>
              <div className="stat-tile">
                <p className="stat-label">Chef</p>
                <p className="mt-1 font-semibold text-ink">{recipeContext?.chefName ?? 'Exquisite Menus'}</p>
              </div>
              <div className="stat-tile">
                <p className="stat-label">Location</p>
                <p className="mt-1 font-semibold text-ink">{recipeContext?.location ?? 'Imagined dining room'}</p>
              </div>
            </div>
          </div>

          <div className={`soft-panel border ${accent.border} p-5`}>
            <p className="page-kicker">Editorial tone</p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              A compact recipe article keeps the plated image, context, outline, and method close at hand.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

function getDishImageUrl(markdown) {
  const recipeTitle = normalizeText(extractRecipeTitle(markdown).replace(/^recipe:\s*/i, '').replace(/\s+recipe$/i, ''));

  for (const menu of menuData) {
    for (const item of menu.tasting_menu) {
      if (normalizeText(item.description) === recipeTitle) {
        const chefNameEncoded = encodeURIComponent(menu.chef_name.replace(/ /g, '_'));
        const restaurantNameEncoded = encodeURIComponent(menu.restaurant_name.replace(/ /g, '_'));
        const courseNameEncoded = encodeURIComponent(item.course.replace(/ /g, '_'));
        const courseDescriptionEncoded = encodeURIComponent(item.description.replace(/ /g, '_'));

        return `${dishImageBaseUrl}${chefNameEncoded}-${restaurantNameEncoded}-${courseNameEncoded}-${courseDescriptionEncoded}.webp`;
      }
    }
  }

  return null;
}

export default Recipe;
