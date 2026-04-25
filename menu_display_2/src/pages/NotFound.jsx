// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="max-w-2xl rounded-lg border border-stone-200 bg-linen p-8 text-center shadow-card sm:p-12">
        <p className="page-kicker">404</p>
        <h1 className="mt-3 font-playfair text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">Sorry, the page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay"
        >
          Back to menus
      </Link>
      </div>
    </div>
  );
}

export default NotFound;
