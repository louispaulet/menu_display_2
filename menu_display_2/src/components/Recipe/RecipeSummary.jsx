/* eslint-disable react/prop-types */

export default function RecipeSummary({ recipeContext, accent }) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className="soft-panel p-5">
        <p className="page-kicker">Summary</p>
        <h2 className="mt-2 font-playfair text-2xl font-semibold text-ink">At a glance</h2>
        <div className="mt-4 space-y-3">
          <div className="stat-tile">
            <p className="stat-label">Restaurant</p>
            <p className="mt-1 font-semibold text-ink">{recipeContext?.restaurantName ?? 'Generated kitchen'}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Chef</p>
            <p className="mt-1 font-semibold text-ink">{recipeContext?.chefName ?? 'Exquisite Menus'}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Location</p>
            <p className="mt-1 font-semibold text-ink">{recipeContext?.location ?? 'Imagined dining room'}</p>
          </div>
        </div>
      </div>

      <div className={`soft-panel border ${accent.border} p-5`}>
        <p className="page-kicker">Editorial tone</p>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          A compact recipe article keeps the plated image, context, outline, and method close at hand.
        </p>
      </div>
    </aside>
  );
}
