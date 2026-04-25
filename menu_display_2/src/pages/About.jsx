import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page-shell">
      <article className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <p className="page-kicker">About the project</p>
          <h1 className="page-title">A culinary atlas made with AI imagination.</h1>
          <p className="page-lede">
            Exquisite Menus is an experiment at the intersection of technology, gastronomy, and visual storytelling.
          </p>
        </header>

        <div className="space-y-8">
          <section className="rounded-lg border border-stone-200/80 bg-linen p-7 shadow-card sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">The project</h2>
            <p className="mt-4 leading-8 text-stone-600">
              Using the advanced capabilities of <strong className="text-ink">GPT-4</strong>, we generate fictional yet captivating menus in JSON format, each one designed to reflect the culinary vision of an imagined chef and restaurant.
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              These menus are more than lists of dishes. Each one features a chef, a restaurant name and location, a complete tasting sequence, dish pricing, and a total price.
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              This website is the second version of the project. To learn more about the earlier version, visit the{' '}
              <Link to="/v1" className="font-semibold text-clay underline-offset-4 hover:underline">
                V1 page
              </Link>
              .
            </p>
          </section>

          <section className="rounded-lg border border-stone-200/80 bg-linen p-7 shadow-card sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">Visualizing the cuisine</h2>
            <p className="mt-4 leading-8 text-stone-600">
              To bring these AI-generated menus to life, we use the <strong className="text-ink">FLUX-DEV-1</strong> image generation model to create visuals of each dish. The images turn the menus into a more sensory experience.
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              The visual layer is central to the project because it shows how AI can push the boundaries of creativity, even in domains traditionally led by human craft and taste.
            </p>
          </section>

          <section className="rounded-lg border border-stone-200/80 bg-linen p-7 shadow-card sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">Our vision</h2>
            <p className="mt-4 leading-8 text-stone-600">
              The goal is to merge technology and creativity to explore new ways of imagining food, place, and presentation. Whether you are a technologist, a food lover, or simply curious, the site is built as a gallery of possible dining worlds.
            </p>
          </section>

          <section className="rounded-lg border border-stone-200/80 bg-linen p-7 shadow-card sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">The website</h2>
            <p className="mt-4 leading-8 text-stone-600">
              The site is built with Vite, React, and TailwindCSS, then hosted on GitHub Pages. The interface is designed to stay fast, responsive, and image-forward while preserving the original project data.
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              The current editorial design refresh was created with <strong className="text-ink">GPT-5.5</strong>, giving the project a warmer, more polished restaurant-guide presentation.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default About;
