// src/pages/V1.jsx

function V1() {
  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 font-montserrat">Exquisite Menus V1</h1>
        <p className="text-lg text-gray-600">The previous version, made with Stable Diffusion 1.5</p>
        <a
          href="https://exquisite-menus-old.thefrenchartist.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xl font-semibold text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Visit Exquisite Menus V1
        </a>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🤖 Image Generation with Stable Diffusion 1.5</h2>
        <p className="text-gray-700 mb-6">
          In our V1 version, we utilized the Stable Diffusion 1.5 model to generate the images for our menus. While this model provided a solid foundation for visualizing AI-generated dishes, it lacked some of the advanced features and fine-tuning capabilities of the FLUX-DEV-1 model used in our current version. However, it still played a critical role in bringing our culinary concepts to life, offering a glimpse into the potential of AI in visual art.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">💻 Simpler Development with JavaScript</h2>
        <p className="text-gray-700 mb-6">
          The V1 version was developed using simple JavaScript, without the modern tooling of Vite and ReactJS. This approach, while more straightforward, meant that the development process lacked some of the efficiencies and performance enhancements offered by more contemporary frameworks. The focus was on creating a functional prototype that could effectively showcase our concept.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">🎨 Styling with Bootstrap</h2>
        <p className="text-gray-700 mb-6">
          Instead of TailwindCSS, the V1 version used Bootstrap for styling. Bootstrap provided a robust and responsive framework, making it easier to create a polished and consistent design across different devices. However, the switch to TailwindCSS in our current version has allowed for greater flexibility and customization in the design process, enabling us to create a more unique and tailored user experience.
        </p>
      </section>
    </div>
  );
}

export default V1;
