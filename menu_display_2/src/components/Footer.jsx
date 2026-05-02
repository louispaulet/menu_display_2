// src/components/Footer.jsx

import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/', label: 'Menus' },
  { to: '/wines', label: 'Wine List' },
  { to: '/hot-sauces', label: 'Hot Sauces' },
  { to: '/menu-studio', label: 'Menu Studio' },
  { to: '/about', label: 'About' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-0 bg-ink/[0.03]">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand block */}
          <div className="max-w-xs">
            <p className="font-playfair text-xl font-semibold text-ink">Exquisite Menus</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              An AI-powered culinary atlas exploring imagined restaurants, tasting menus, wines, and artisanal hot sauces.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-stone-400">Explore</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-semibold text-stone-600 transition hover:text-clay"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-col gap-2 border-t border-stone-200/60 pt-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Exquisite Menus V3. All rights reserved.</p>
          <p className="font-semibold text-stone-500">Built with React, Vite &amp; AI imagination</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
