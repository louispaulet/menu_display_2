// src/pages/Homepage.jsx

function Homepage() {
  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🍽️ World of Food Photography 📸</h1>
        <p className="text-lg text-gray-600">Capturing the beauty and essence of culinary delights from around the globe.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🌍 Explore Our Menus</h2>
        <p className="text-gray-700 mb-6">From the bustling streets of Bangkok to the cozy cafes of Paris, our food photography captures the heart and soul of global cuisine.</p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-2xl mr-4">🇹🇭</span>
            <span>Thai Street Food: A Symphony of Flavors</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-4">🇫🇷</span>
            <span>Parisian Pastries: Elegance in Every Bite</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-4">🇮🇹</span>
            <span>Italian Pasta: Tradition and Taste</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-4">🇯🇵</span>
            <span>Sushi Artistry: Precision and Perfection</span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">📷 Why Food Photography?</h2>
        <p className="text-gray-700">
          Food photography is more than just taking pictures of meals. It's about telling a story, evoking emotions, and inspiring people to experience new tastes and cultures.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">🍲 Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to bring the world closer together through the universal language of food. We aim to celebrate the diversity of culinary traditions and the artistry involved in creating each dish.
        </p>
      </section>
    </div>
  );
}

export default Homepage;
