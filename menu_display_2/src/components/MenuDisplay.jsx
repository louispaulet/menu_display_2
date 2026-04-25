/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdAttachMoney, MdLocalBar, MdLocationOn, MdRestaurantMenu } from 'react-icons/md';

function MenuDisplay({ restaurantName, chefName, location, tastingMenu, diningRoomDescription, grandTotal }) {
  const baseImageUrl = "https://raw.githubusercontent.com/louispaulet/menu_display_2/main/dish_pictures/";

  const generateImageUrl = (courseName, courseDescription) => {
    const chefNameEncoded = encodeURIComponent(chefName.replace(/ /g, '_'));
    const restaurantNameEncoded = encodeURIComponent(restaurantName.replace(/ /g, '_'));
    const courseNameEncoded = encodeURIComponent(courseName.replace(/ /g, '_'));
    const courseDescriptionEncoded = encodeURIComponent(courseDescription.replace(/ /g, '_'));
    return `${baseImageUrl}${chefNameEncoded}-${restaurantNameEncoded}-${courseNameEncoded}-${courseDescriptionEncoded}.webp`;
  };

  const baseRestaurantImageUrl = "https://raw.githubusercontent.com/louispaulet/menu_display_2/main/restaurant_pictures/";

  const generateRestaurantImageUrl = (name) => {
    const restaurantNameEncoded = encodeURIComponent(name.replace(/ /g, '_'));
    return `${baseRestaurantImageUrl}${restaurantNameEncoded}.webp`;
  };

  const getRecipeLink = (course, description) => {
    const courseEncoded = course.replace(/ /g, '_');
    const descriptionEncoded = description.replace(/ /g, '_');
    return `/recipe/${courseEncoded}-${descriptionEncoded}`;
  };

  return (
    <article className="mx-auto max-w-6xl">
      <header className="overflow-hidden rounded-lg border border-stone-200/80 bg-linen shadow-editorial">
        <div className="grid lg:grid-cols-[1fr_1.08fr]">
          <div className="aspect-square">
            <img
              src={generateRestaurantImageUrl(restaurantName)}
              alt={`${restaurantName} dining room`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="page-kicker">Featured tasting menu</p>
            <h1 className="mt-3 font-playfair text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              {restaurantName}
            </h1>
            <div className="mt-6 grid gap-3 text-stone-600 sm:grid-cols-2">
              <p className="meta-row">
                <MdRestaurantMenu className="meta-icon" />
                <span>{tastingMenu.length} courses</span>
              </p>
              <p className="meta-row">
                <MdLocationOn className="meta-icon" />
                <span>{location}</span>
              </p>
              <p className="meta-row sm:col-span-2">
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-clay/40" />
                <span>{chefName}</span>
              </p>
            </div>
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h2 className="font-playfair text-2xl font-semibold text-ink">Dining room</h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-stone-600">{diningRoomDescription}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-14">
        <div className="mb-10 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-kicker">The menu</p>
            <h2 className="mt-2 font-playfair text-4xl font-semibold text-ink">Courses and pairings</h2>
          </div>
          <div className="rounded-full border border-saffron/40 bg-linen px-5 py-3 text-sm font-bold text-ink shadow-sm">
            Total ${grandTotal}
          </div>
        </div>

        <div className="space-y-8">
          {tastingMenu.map((item, index) => (
            <section
              key={index}
              className="grid overflow-hidden rounded-lg border border-stone-200/80 bg-linen shadow-card lg:grid-cols-2"
            >
              <div className={`aspect-square ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={generateImageUrl(item.course, item.description)}
                  alt={`${item.course}: ${item.description}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="page-kicker">Course {index + 1}</p>
                <h3 className="mt-2 font-playfair text-3xl font-semibold leading-tight text-ink">{item.course}</h3>
                <p className="mt-4 text-lg leading-8 text-stone-700">{item.description}</p>
                <div className="mt-6 grid gap-3 border-y border-stone-200 py-5 text-sm font-semibold text-stone-700 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <MdAttachMoney className="h-4 w-4 text-clay" /> {item.price}
                  </p>
                  <p className="flex items-start gap-2">
                    <MdLocalBar className="mt-1 h-4 w-4 shrink-0 text-clay" />
                    <span>{item.wine_pairing}</span>
                  </p>
                </div>
                <Link
                  to={getRecipeLink(item.course, item.description)}
                  className="mt-6 inline-flex w-fit items-center rounded-full border border-clay/30 px-5 py-2 text-sm font-bold text-clay hover:border-clay hover:bg-clay hover:text-white"
                >
                  View recipe
                </Link>
              </div>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}

export default MenuDisplay;
