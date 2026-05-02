/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useWineLinkContext } from '../lib/wineLinks';
import { findZoneByRestaurantName, getZoneAccentForRestaurant } from '../lib/siteThemes';
import { getGeneratedImageBaseUrl } from '../lib/imageAssets';
import MenuDisplayHeader from './MenuDisplay/MenuDisplayHeader';
import CourseItem from './MenuDisplay/CourseItem';
import useScrollSpy from '../lib/useScrollSpy';

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

  const sectionIds = useMemo(() => courseIds.map((c) => c.id), [courseIds]);
  const activeId = useScrollSpy(sectionIds);

  return (
    <article className="mx-auto max-w-6xl">
      <MenuDisplayHeader
        restaurantName={restaurantName}
        chefName={chefName}
        location={location}
        tastingMenuLength={tastingMenu.length}
        diningRoomDescription={diningRoomDescription}
        grandTotal={grandTotal}
        menuZone={menuZone}
        accent={accent}
        averageCoursePrice={averageCoursePrice}
        restaurantImageUrl={generateRestaurantImageUrl(restaurantName)}
      />

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
            {tastingMenu.map((item, index) => (
              <CourseItem
                key={index}
                item={item}
                index={index}
                accent={accent}
                imageUrl={generateImageUrl(item.course, item.description)}
                recipeLink={getRecipeLink(item.course, item.description)}
                wineLinkContext={wineLinkContext}
              />
            ))}
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
                    className={`index-link w-full appearance-none text-left transition-all duration-200 ${
                      activeId === course.id ? 'index-link-active' : ''
                    }`}
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
