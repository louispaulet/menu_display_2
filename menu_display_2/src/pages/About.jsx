// src/pages/About.jsx

function About() {
  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">👩‍🍳 About Us</h1>
        <p className="text-lg text-gray-600">Learn more about the passion and story behind our food photography journey.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">📸 Our Story</h2>
        <p className="text-gray-700 mb-6">
          Our journey began with a simple love for food and a desire to capture its beauty. From humble beginnings as home cooks, we quickly realized that food is more than just sustenance; it's an art form that deserves to be shared with the world.
        </p>
        <p className="text-gray-700 mb-6">
          Through our lenses, we strive to showcase the diverse flavors and culinary traditions from all corners of the globe. Each photograph tells a story of culture, community, and creativity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🌍 Our Mission</h2>
        <p className="text-gray-700">
          We aim to bring the world's culinary wonders to your screen, inspiring you to explore new tastes and appreciate the artistry in food preparation. Our mission is to celebrate the beauty of food and its power to bring people together.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">👥 Meet the Team</h2>
        <p className="text-gray-700">
          Our team is a group of passionate food enthusiasts, photographers, and storytellers. We believe in the magic of a well-captured dish and the emotions it can evoke. Join us on this delicious journey!
        </p>
      </section>
    </div>
  );
}

export default About;
