// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

const suggestions = [
  { to: '/', label: 'Browse menus', icon: '🍽️' },
  { to: '/wines', label: 'Wine cellar', icon: '🍷' },
  { to: '/hot-sauces', label: 'Hot sauces', icon: '🌶️' },
  { to: '/menu-studio', label: 'Menu studio', icon: '📷' },
];

function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="max-w-2xl soft-panel p-8 text-center sm:p-12 animate-fade-in-up">
        {/* Large gradient 404 */}
        <p className="gradient-text font-playfair text-[8rem] font-bold leading-none sm:text-[10rem]">
          404
        </p>

        <p className="page-kicker mt-2">Page not found</p>
        <h1 className="mt-3 font-playfair text-3xl font-semibold sm:text-4xl">
          This table isn&apos;t set yet.
        </h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          The page you&apos;re looking for doesn&apos;t exist. Perhaps one of these will interest you:
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {suggestions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-lg border border-stone-200 bg-white/80 p-4 text-center transition hover:-translate-y-0.5 hover:border-clay/40 hover:shadow-card"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-2 text-xs font-semibold text-stone-600 group-hover:text-ink">{item.label}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen transition hover:bg-clay"
        >
          Back to menus
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
