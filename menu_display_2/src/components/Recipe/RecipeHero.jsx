/* eslint-disable react/prop-types */
import ProgressiveImage from '../ProgressiveImage';

export default function RecipeHero({
  dishImageUrl,
  title,
  accent,
  recipeContext,
  ingredientsCount,
  methodCount,
}) {
  return (
    <article className="content-card shadow-editorial">
      {dishImageUrl ? (
        <div className="relative aspect-[16/9] border-b border-stone-200/80 bg-stone-100">
          <ProgressiveImage
            src={dishImageUrl}
            alt={`${title} dish image`}
            loading="eager"
            className="h-full w-full"
            imageClassName="h-full w-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-35`} />
        </div>
      ) : null}

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap gap-2">
          <span className={`accent-chip ${accent.border} ${accent.wash} ${accent.text}`}>Recipe</span>
          {recipeContext?.zone && (
            <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">{recipeContext.zone.title}</span>
          )}
          {recipeContext?.restaurantName && (
            <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">{recipeContext.restaurantName}</span>
          )}
        </div>

        <h1 className="mt-4 font-playfair text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
          {recipeContext
            ? `${recipeContext.chefName} at ${recipeContext.location} serves this dish inside a tasting menu with the same mood and texture.`
            : 'A plated recipe from the generated tasting menu library.'}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="stat-tile">
            <p className="stat-label">Ingredients</p>
            <p className="stat-value text-2xl">{ingredientsCount}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Method steps</p>
            <p className="stat-value text-2xl">{methodCount}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Pairing</p>
            <p className="stat-value text-sm">Linked below</p>
          </div>
        </div>
      </div>
    </article>
  );
}
