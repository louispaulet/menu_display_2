/* eslint-disable react/prop-types */

export default function GeneratedMenuItem({ item, formattedPrice }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="font-playfair text-2xl font-semibold leading-tight text-ink">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-2 max-w-3xl text-base leading-7 text-stone-600">
              {item.description}
            </p>
          )}
          {item.notes && (
            <p className="mt-2 text-sm italic leading-6 text-stone-500">{item.notes}</p>
          )}
          {item.dietaryTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-olive/25 bg-olive/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-olive"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {formattedPrice && (
          <p className="shrink-0 pt-1 text-right font-playfair text-xl font-semibold text-clay">
            {formattedPrice}
          </p>
        )}
      </div>
    </div>
  );
}
