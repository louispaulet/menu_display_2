import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useWineLinkContext } from '../lib/wineLinks';
import { linkifyWineMarkdown } from '../lib/wineLinksRenderer';
import { getZoneAccentForRestaurant } from '../lib/siteThemes';
import RecipeHero from './Recipe/RecipeHero';
import RecipeOutline from './Recipe/RecipeOutline';
import RecipeSummary from './Recipe/RecipeSummary';
import {
  extractRecipeTitle,
  stripMarkdownImages,
  stripLeadingTitleHeading,
  countBullets,
  countMethodSteps,
  buildOutline,
  findRecipeContext,
  getDishImageUrl,
  slugifyHeading,
  childrenToText,
} from '../lib/recipeUtils';

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          <RecipeHero
            dishImageUrl={dishImageUrl}
            title={title}
            accent={accent}
            recipeContext={recipeContext}
            ingredientsCount={ingredientsCount}
            methodCount={methodCount}
          />

          <article className="soft-panel p-6 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
              <div className="prose prose-stone max-w-none prose-headings:font-playfair prose-headings:text-ink prose-p:leading-8 prose-a:text-clay prose-strong:text-ink prose-li:my-1 prose-li:leading-7 prose-li:marker:text-clay sm:prose-lg">
                <ReactMarkdown components={markdownComponents}>{linkedContent}</ReactMarkdown>
              </div>

              <aside className="lg:sticky lg:top-24">
                <RecipeOutline outline={outline} scrollToSection={scrollToSection} />
              </aside>
            </div>
          </article>
        </div>

        <RecipeSummary recipeContext={recipeContext} accent={accent} />
      </div>
    </div>
  );
};

export default Recipe;
