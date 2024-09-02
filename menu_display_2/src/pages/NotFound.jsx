// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold my-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back to the homepage
      </Link>
    </div>
  );
}

export default NotFound;
