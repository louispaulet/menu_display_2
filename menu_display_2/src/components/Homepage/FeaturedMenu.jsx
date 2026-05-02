/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import ProgressiveImage from '../ProgressiveImage';

export default function FeaturedMenu({ featuredMenu, featuredZone, featuredImageUrl }) {
  if (!featuredMenu || !featuredImageUrl) return null;

  return (
    <Link
      to={`/menu/0`}
      className="group soft-panel overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial"
      style={{ borderColor: featuredZone?.accent.border ? undefined : undefined }}
    >
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${featuredZone?.accent.wash ?? 'bg-white/80'} from-white to-stone-100 overflow-hidden`}>
        <ProgressiveImage
          src={featuredImageUrl}
          alt={`${featuredMenu.restaurant_name} dining room`}
          loading="eager"
          className="h-full w-full"
          imageClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${featuredZone?.accent.glow ?? 'from-stone-200/30 via-transparent to-transparent'} opacity-50`} />

        {/* Hover arrow indicator */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
          <span className="text-lg">→</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className={`accent-chip ${featuredZone?.accent.border ?? 'border-stone-200'} ${featuredZone?.accent.wash ?? 'bg-white/80'} ${featuredZone?.accent.text ?? 'text-stone-700'}`}>
            Featured menu
          </span>
          {featuredZone && (
            <span className="accent-chip border-stone-200 bg-white/80 text-stone-500">
              {featuredZone.title}
            </span>
          )}
        </div>
        <h2 className="mt-4 font-playfair text-3xl font-semibold text-ink">{featuredMenu.restaurant_name}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">{featuredMenu.chef_name}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="stat-tile">
            <p className="stat-label">Location</p>
            <p className="mt-1 font-semibold text-ink">{featuredMenu.location}</p>
          </div>
          <div className="stat-tile">
            <p className="stat-label">Courses</p>
            <p className="mt-1 font-semibold text-ink">{featuredMenu.tasting_menu.length}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
