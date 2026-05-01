/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { MdAttachMoney, MdLocalBar, MdLocationOn, MdRestaurantMenu } from 'react-icons/md';
import ProgressiveImage from './ProgressiveImage';
import { useWineLinkContext, linkifyWineText } from '../lib/wineLinks';
import { findZoneByRestaurantName, getZoneAccentForRestaurant } from '../lib/siteThemes';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';

const encodeAssetSegment = (value) => encodeURIComponent(value.replace(/ /g, '_')).replace(/%2C/gi, ',');

function MenuDisplay({ restaurantName, chefName, location, tastingMenu, diningRoomDescription, grandTotal }) {
  const wineLinkContext = useWineLinkContext();
  const menuZone = useMemo(() => findZoneByRestaurantName(restaurantName), [restaurantName]);
  const accent = getZoneAccentForRestaurant(restaurantName);
  const averageCoursePrice = Math.round(grandTotal / Math.max(tastingMenu.length, 1));
  const baseImageUrl = getGeneratedImageBaseUrl('dish_pictures');
  const baseRestaurantImageUrl = getGeneratedImageBaseUrl('restaurant_pictures');

  const generateImageUrl = (courseName, courseDescription) => {
    const chefNameEncoded = encodeAssetSegment(chefName);
    const restaurantNameEncoded = encodeAssetSegment(restaurantName);
    const courseNameEncoded = encodeAssetSegment(courseName);
    const courseDescriptionEncoded = encodeAssetSegment(courseDescription);
    return `${baseImageUrl}${chefNameEncoded}-${restaurantNameEncoded}-${courseNameEncoded}-${courseDescriptionEncoded}.webp`;
  };

  const generateRestaurantImageUrl = (name) => {
    const restaurantNameEncoded = encodeAssetSegment(name);
    return `${baseRestaurantImageUrl}${restaurantNameEncoded}.webp`;
  };

  const getRecipeLink = (course, description) => {
    const courseEncoded = course.replace(/ /g, '_');
    const descriptionEncoded = description.replace(/ /g, '_');
    return `/recipe/${courseEncoded}-${descriptionEncoded}`;
  };

  const scrollToCourse = (courseId) => {
    const element = document.getElementById(courseId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const courseIds = useMemo(
    () => tastingMenu.map((item, index) => ({
      id: `course-${index + 1}`,
      label: `${index + 1}. ${item.course}`,
    })),
    [tastingMenu],
  );

  return (
    <article className="mx-auto max-w-6xl">
      <header className="strong-panel overflow-hidden">
        <div className="grid lg:min-h-[36rem] lg:grid-cols-[0.92fr_1.08fr]">
          <div className={`relative flex min-h-80 items-end justify-center overflow-hidden bg-gradient-to-br ${accent.wash} p-4 sm:min-h-96 sm:p-6 lg:min-h-full`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-70`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.68),transparent_34%)]" />
            <ProgressiveImage
              src={generateRestaurantImageUrl(restaurantName)}
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
                <span>{tastingMenu.length} courses</span>
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
                <p className="stat-value text-lg">{tastingMenu.length} plates</p>
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

      <section className="py-12 sm:py-14">
        <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="page-kicker">The menu</p>
            <h2 className="mt-2 font-playfair text-4xl font-semibold text-ink">Courses and pairings</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              Move through the tasting sequence by plate, wine, and recipe.
            </p>
          </div>
          <div className={`rounded-full border px-5 py-3 text-sm font-bold shadow-sm ${accent.border} ${accent.wash} ${accent.text}`}>
            Total ${grandTotal}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-6">
            {tastingMenu.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <section
                  key={index}
                  id={`course-${index + 1}`}
                  className={`content-card scroll-mt-28 ${
                    isEven ? 'lg:bg-white/70' : ''
                  }`}
                >
                  <div className={`grid lg:grid-cols-2 ${isEven ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] bg-stone-100 lg:aspect-auto">
                      <ProgressiveImage
                        src={generateImageUrl(item.course, item.description)}
                        alt={`${item.course}: ${item.description}`}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        className="h-full w-full"
                        imageClassName="h-full w-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-35`} />
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center justify-between gap-3">
                        <p className="page-kicker">Course {index + 1}</p>
                        <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[0.7rem] font-bold text-stone-600">
                          ${item.price}
                        </span>
                      </div>
                      <h3 className="mt-3 font-playfair text-3xl font-semibold leading-tight text-ink sm:text-4xl">{item.course}</h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">{item.description}</p>
                      <div className="mt-6 grid gap-3 border-y border-stone-200/80 py-5 text-sm font-semibold text-stone-700 sm:grid-cols-[0.35fr_0.65fr]">
                        <p className="flex items-center gap-2">
                          <MdAttachMoney className={`h-4 w-4 ${accent.text}`} />
                          ${item.price}
                        </p>
                        <p className="flex items-start gap-2">
                          <MdLocalBar className={`mt-1 h-4 w-4 shrink-0 ${accent.text}`} />
                          <span className="leading-6">{linkifyWineText(item.wine_pairing, wineLinkContext)}</span>
                        </p>
                      </div>
                      <Link
                        to={getRecipeLink(item.course, item.description)}
                        className={`action-pill mt-6 ${
                          accent.border
                        } ${accent.wash} ${accent.text} hover:border-clay hover:bg-clay hover:text-white`}
                      >
                        View recipe
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="soft-panel p-5">
              <p className="page-kicker">Jump to course</p>
              <h3 className="mt-2 font-playfair text-2xl font-semibold text-ink">Course index</h3>
              <nav className="mt-4 space-y-2" aria-label="Menu courses">
                {courseIds.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => scrollToCourse(course.id)}
                    className="index-link w-full appearance-none text-left"
                  >
                    {course.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

export default MenuDisplay;
