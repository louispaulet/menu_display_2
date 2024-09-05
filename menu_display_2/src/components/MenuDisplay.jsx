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

  const generateRestaurantImageUrl = (restaurantName) => {
    const restaurantNameEncoded = encodeURIComponent(restaurantName.replace(/ /g, '_'));
    return `${baseRestaurantImageUrl}${restaurantNameEncoded}.webp`;
  };
  
  const getRecipeLink = (course, description) => {
      const courseEncoded = course.replace(/ /g, '_')
      const descriptionEncoded = description.replace(/ /g, '_')
      return `#recipe/${courseEncoded}-${descriptionEncoded}`
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg border border-gray-200 max-w-screen-lg mx-auto">
      {/* Display restaurant, chef, location, and dining room description only once */}
    <header className="mb-8 text-center">
      <h1 className="text-5xl font-playfair mb-2">{restaurantName}</h1>
        <p className="text-center text-gray-600 text-xl mb-4">
          {chefName} @ {location}
        </p>
    </header>

    <section className="mb-8 text-center">
      <img
        src={generateRestaurantImageUrl(restaurantName)}
        alt={`${restaurantName} image`}
        className="w-full max-w-md h-auto rounded-lg mx-auto"
      />
      <h2 className="text-2xl font-semibold my-4">Dining Room Description</h2>
      <p className="text-gray-700 text-left">{diningRoomDescription}</p>
    </section>

    <h2 className="text-2xl font-semibold my-8 text-center"> The Menu </h2>

      {/* Display each dish with its own image */}
      {tastingMenu.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Column 1: Text Information */}
          <div className="flex flex-col justify-center text-center md:text-justified">
            <section className="mb-4">
              <h3 className="text-xl font-semibold">{item.course}</h3>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-500"><strong></strong> - ${item.price} - </p>
              <p className="text-gray-500 italic"><strong>Wine Pairing:</strong> {item.wine_pairing}</p>
              <a className="text-gray-700 hover:underline" href={getRecipeLink(item.course, item.description)}> 🍽️ check recipe</a>
            </section>
          </div>

          {/* Column 2: Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={generateImageUrl(item.course, item.description)}
              alt={`${item.course} image`}
              className="w-full max-w-md h-auto rounded-lg"
            />
          </div>
        </div>
      ))}

      {/* Display total price only once */}
      <footer className="mt-8">
        <h2 className="text-2xl font-semibold text-center md:text-left">Total Price</h2>
        <p className="text-lg text-gray-700 text-center md:text-left">${grandTotal}</p>
      </footer>
    </div>
  );
}

export default MenuDisplay;
