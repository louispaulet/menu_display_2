import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { to: '/', label: 'Menus', activePaths: ['/', '/menu', '/recipe'] },
  { to: '/hot-sauces', label: 'Hot sauces', activePaths: ['/hot-sauces', '/hot-sauce'] },
  { to: '/about', label: 'About', activePaths: ['/about'] },
  { to: '/v1', label: 'V1', activePaths: ['/v1'] },
  { to: '/wines', label: 'Wine list', activePaths: ['/wines'] },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isItemActive = (item) =>
    item.activePaths.some((path) => pathname === path || (path !== '/' && pathname.startsWith(`${path}/`)));
  const navLinkClass = (isActive) =>
    [
      'rounded-full px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-ink text-linen shadow-sm'
        : 'text-stone-600 hover:bg-stone-100 hover:text-ink',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-linen/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-saffron/40 bg-parchment font-playfair text-lg font-semibold text-clay shadow-sm">
            EM
          </span>
          <span>
            <span className="block font-playfair text-2xl font-semibold leading-none text-ink">
              Exquisite Menus
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 sm:block">
              AI dining atlas
            </span>
          </span>
        </Link>
        <nav className="hidden md:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={navLinkClass(isItemActive(item))} aria-current={isItemActive(item) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-stone-200 bg-white p-2 text-ink shadow-sm transition hover:border-saffron/60"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="border-t border-stone-200/80 bg-linen px-5 py-3 md:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  aria-current={isItemActive(item) ? 'page' : undefined}
                  className={[
                    'block rounded-lg px-4 py-3 text-sm font-semibold',
                    isItemActive(item) ? 'bg-ink text-linen' : 'text-stone-700 hover:bg-stone-100',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
