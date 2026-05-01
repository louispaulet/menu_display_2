/* eslint-disable react/prop-types */
import { MdLocationOn, MdRestaurantMenu } from 'react-icons/md';
import ProgressiveImage from '../ProgressiveImage';

export default function MenuDisplayHeader({
  restaurantName,
  chefName,
  location,
  tastingMenuLength,
  diningRoomDescription,
  grandTotal,
  menuZone,
  accent,
  averageCoursePrice,
  restaurantImageUrl,
}) {
  return (
    <header className="strong-panel overflow-hidden">
      <div className="grid lg:min-h-[36rem] lg:grid-cols-[0.92fr_1.08fr]">
        <div className={`relative flex min-h-80 items-end justify-center overflow-hidden bg-gradient-to-br ${accent.wash} p-4 sm:min-h-96 sm:p-6 lg:min-h-full`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-70`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.68),transparent_34%)]" />
          <ProgressiveImage
            src={restaurantImageUrl}
            alt={`${restaurantName} dining room`}
            loading="eager"
            className="relative z-10 h-full w-full rounded-lg border border-white/65 bg-white/80 shadow-editorial"
            imageClassName="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-16">
          <div className="flex flex-wrap gap-2">
            <span className={`accent-chip ${accent.border} ${accent.wash} ${accent.text}`}>Featured tasting menu</span>
            {menuZone && (
              <span className="accent-chip border-stone-200 bg-white/80 text-stone-600">
                {menuZone.title}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-playfair text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            {restaurantName}
          </h1>

          <div className="mt-6 grid gap-3 text-stone-600 sm:grid-cols-2">
            <p className="meta-row">
              <MdRestaurantMenu className={`meta-icon ${accent.text}`} />
              <span>{tastingMenuLength} courses</span>
            </p>
            <p className="meta-row">
              <MdLocationOn className={`meta-icon ${accent.text}`} />
              <span>{location}</span>
            </p>
            <p className="meta-row sm:col-span-2">
              <span className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${accent.border} ${accent.fill}`} />
              <span>{chefName}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="stat-tile">
              <p className="stat-label">Courses</p>
              <p className="stat-value text-lg">{tastingMenuLength} plates</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">A full tasting sequence.</p>
            </div>
            <div className="stat-tile">
              <p className="stat-label">Tasting total</p>
              <p className="stat-value text-lg">${grandTotal}</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">Chef menu price.</p>
            </div>
            <div className="stat-tile">
              <p className="stat-label">Average plate</p>
              <p className="stat-value text-lg">${averageCoursePrice}</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">{menuZone?.title ?? 'Curated destination'}.</p>
            </div>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="font-playfair text-2xl font-semibold text-ink">Dining room</h2>
            <p className="mt-3 max-w-4xl text-base leading-8 text-stone-600 sm:text-lg sm:leading-9">
              {diningRoomDescription}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
