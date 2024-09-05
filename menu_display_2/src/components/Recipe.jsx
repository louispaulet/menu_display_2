import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Recipe = () => {
  const { recipeName } = useParams(); // Get the recipe name from the URL
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load the markdown file from public/dish_recipes
    import(`/dish_recipes/${recipeName}.md`)
      .then((module) => fetch(module.default))
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error loading the markdown file:', error));
  }, [recipeName]);

  return (
    <div className="prose max-w-4xl mx-auto p-6">
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>

  );
};

export default Recipe;
