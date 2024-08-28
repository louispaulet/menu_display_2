// src/components/MenuDisplay.jsx

function MenuDisplay({ restaurantName, chefName, location, tastingMenu, diningRoomDescription, grandTotal }) {
  return (
    <div className="p-8 bg-white shadow-md rounded-lg border border-gray-200">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{restaurantName}</h1>
        <p className="text-lg text-gray-600"><strong>Chef:</strong> {chefName}</p>
        <p className="text-lg text-gray-600"><strong>Location:</strong> {location}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tasting Menu</h2>
        <ul>
          {tastingMenu.map((item, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{item.course}</h3>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-500"><strong>Price:</strong> ${item.price}</p>
              <p className="text-gray-500"><strong>Wine Pairing:</strong> {item.wine_pairing}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dining Room Description</h2>
        <p className="text-gray-700">{diningRoomDescription}</p>
      </section>

      <footer>
        <h2 className="text-2xl font-semibold">Total Price</h2>
        <p className="text-lg text-gray-700">${grandTotal}</p>
      </footer>
    </div>
  );
}

export default MenuDisplay;
