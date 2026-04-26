import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import menuData from '../menuData';
import { linkifyWineMarkdown, useWineLinkContext } from '../lib/wineLinks';

const dishImageBaseUrl = 'https://raw.githubusercontent.com/louispaulet/menu_display_2/main/dish_pictures/';

const normalizeText = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const extractRecipeTitle = (markdown = '') => {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  return match ? match[1].trim() : '';
};

const stripMarkdownImages = (markdown = '') => markdown.replace(/!\[[^\]]*]\([^)]+\)\s*/g, '').trim();

const getDishImageUrl = (markdown) => {
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
};

const Recipe = () => {
  const { recipeName } = useParams(); // Get the recipe name from the URL
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const wineLinkContext = useWineLinkContext();

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        // Dynamically import the markdown file
        const module = await import(`./../dish_recipes/${recipeName}.md`);
        const response = await fetch(module.default);

        const text = await response.text();

        // Check if the response contains HTML instead of markdown (fallback behavior)
        if (text.includes('<!doctype html>') || text.includes('<html')) {
          throw new Error('File not found or invalid content');
        }

        setContent(text);
        setError(false); // Reset error state if successful
      } catch (error) {
        console.error('Error loading the markdown file:', error);
        setError(true); // Set error state if there's an issue
      }
    };

    loadRecipe();
  }, [recipeName]);

  const dishImageUrl = getDishImageUrl(content);
  const renderedContent = stripMarkdownImages(content);
  const linkedContent = useMemo(
    () => linkifyWineMarkdown(renderedContent, wineLinkContext),
    [renderedContent, wineLinkContext],
  );
  const markdownComponents = useMemo(
    () => ({
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

  return (
    <div className="page-shell">
      {error ? (
        <div className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-linen p-8 text-center shadow-card">
          <p className="page-kicker">Recipe unavailable</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Recipe not found</h1>
          <p className="mt-4 text-stone-600">
            Sorry, the recipe named {recipeName} was not found or could not be loaded.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-stone-200/80 bg-linen shadow-card">
          {dishImageUrl ? (
            <div className="aspect-[16/9] border-b border-stone-200/80 bg-stone-100">
              <img
                src={dishImageUrl}
                alt={`${extractRecipeTitle(content) || recipeName.replace(/-/g, ' ')} dish image`}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          ) : null}
          <article className="prose prose-stone max-w-none p-7 prose-headings:font-playfair prose-headings:text-ink prose-a:text-clay prose-strong:text-ink sm:p-10">
            <ReactMarkdown components={markdownComponents}>{linkedContent}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  );
};

export default Recipe;
