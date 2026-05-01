/* eslint-disable react/prop-types */

export default function RecipeOutline({ outline, scrollToSection }) {
  if (!outline || outline.length === 0) return null;

  return (
    <div className="soft-panel p-4">
      <p className="page-kicker">On this page</p>
      <h2 className="mt-2 font-playfair text-2xl font-semibold text-ink">Recipe outline</h2>
      <nav className="mt-4 space-y-2" aria-label="Recipe sections">
        {outline.map((entry, index) => (
          <button
            key={`${entry.id}-${entry.level}-${index}`}
            type="button"
            onClick={() => scrollToSection(entry.id)}
            className={`index-link w-full appearance-none text-left ${
              entry.level === 3 ? 'pl-6' : ''
            }`}
          >
            {entry.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
