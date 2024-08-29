// src/pages/About.jsx

function About() {
  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 font-montserrat">🤖 About Our Project : Exquisite Menus V2</h1>
        <p className="text-lg text-gray-600">Exquisite Menus, an innovative fusion of AI and culinary creativity.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🌐 The Project</h2>
        <p className="text-gray-700 mb-6">
          Our project is at the intersection of technology and gastronomy. Using the advanced capabilities of <strong>GPT-4</strong>, we generate fictional yet captivating menus in JSON format, each one meticulously designed to reflect the culinary vision of an imagined chef and restaurant.
        </p>
        <p className="text-gray-700 mb-6">
          These menus aren't just lists of dishes—they tell stories. Each menu features a chef, a restaurant name and location, and a carefully calculated total price, along with the price per dish, offering a complete dining experience. This allows us to explore and showcase the limitless possibilities of AI in the culinary world.
        </p>
        <p className="text-gray-700 mb-6 italic">
          The current website your are on is the second version (V2). To learn more about version 1, checkout out the <a href="#V1" className="underline">V1 page</a>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🎨 Visualizing the Cuisine</h2>
        <p className="text-gray-700 mb-6">
          To bring these AI-generated menus to life, we use the <strong>FLUX-DEV-1</strong> image generation model to create stunning visuals of each dish. These images capture the essence of the fictional dishes, making the menus not just a digital text but a feast for the eyes.
        </p>
        <p className="text-gray-700">
          The visual component is crucial in our project, as it allows us to demonstrate how AI can push the boundaries of creativity, even in areas traditionally dominated by human artistry. Through this project, we aim to inspire both food enthusiasts and tech innovators.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">💡 Our Vision</h2>
        <p className="text-gray-700 mb-6">
          Our vision is to merge technology and creativity to revolutionize how we think about food and its presentation. We believe that AI has the potential to open new doors in culinary arts, offering novel perspectives and unexpected combinations that challenge the status quo.
        </p>
        <p className="text-gray-700">
          Whether you're a tech enthusiast, a foodie, or just curious about the future of AI, we invite you to explore these menus and enjoy the blend of innovation and gastronomy.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🛠️ The Website</h2>
        <p className="text-gray-700 mb-6">
          Our website is built using modern web technologies to ensure a fast and responsive user experience. We have chosen <strong>Vite</strong> as our build tool and <strong>React</strong> for building the user interface. The design is styled using <strong>TailwindCSS</strong>, allowing us to create a clean and minimalistic look that complements the content.
        </p>
        <p className="text-gray-700">
          We host the website on <strong>GitHub Pages</strong>, which provides a reliable and accessible platform for serving our project to a global audience. By leveraging these technologies, we aim to deliver a seamless and engaging experience as you explore the AI-generated menus.
        </p>
      </section>
    </div>
  );
}

export default About;
