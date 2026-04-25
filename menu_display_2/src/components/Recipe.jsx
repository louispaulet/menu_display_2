import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Recipe = () => {
  const { recipeName } = useParams(); // Get the recipe name from the URL
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

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
        <article className="prose prose-stone mx-auto max-w-4xl rounded-lg border border-stone-200/80 bg-linen p-7 shadow-card prose-headings:font-playfair prose-headings:text-ink prose-a:text-clay prose-strong:text-ink sm:p-10">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      )}
    </div>
  );
};

export default Recipe;
