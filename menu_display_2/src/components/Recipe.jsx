import React, { useState, useEffect } from 'react';
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
    <div className="prose max-w-4xl mx-auto p-6">
      {error ? (
        <div className="text-red-500">
          Sorry, the recipe "{recipeName}" was not found or could not be loaded.
        </div>
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </div>
  );
};

export default Recipe;
