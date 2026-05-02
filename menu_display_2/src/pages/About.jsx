import { Link } from 'react-router-dom';

const sections = [
  {
    icon: '🎯',
    title: 'The project',
    content: [
      <>Using the advanced capabilities of <strong className="text-ink">GPT-4</strong>, we generate fictional yet captivating menus in JSON format, each one designed to reflect the culinary vision of an imagined chef and restaurant.</>,
      'These menus are more than lists of dishes. Each one features a chef, a restaurant name and location, a complete tasting sequence, dish pricing, and a total price.',
    ],
  },
  {
    icon: '🎨',
    title: 'Visualizing the cuisine',
    content: [
      <>The image system has evolved with the project. Version 1 used <strong className="text-ink">Stable Diffusion</strong> to picture the original menus, while version 2 moved to <strong className="text-ink">FLUX.DEV1</strong> for a richer, more polished visual language.</>,
      <>Version 3 is powered by <strong className="text-ink">OpenAI Image Generator v2.0</strong>. Everything in the refreshed website image set was generated with it: hot sauces, restaurants, menu items, supporting food imagery, and the rest of the visual library.</>,
      'The visual layer is central to the project because it shows how AI can push the boundaries of creativity, even in domains traditionally led by human craft and taste.',
    ],
  },
  {
    icon: '🔬',
    title: 'Our vision',
    content: [
      'The goal is to merge technology and creativity to explore new ways of imagining food, place, and presentation. Whether you are a technologist, a food lover, or simply curious, the site is built as a gallery of possible dining worlds.',
    ],
  },
  {
    icon: '⚡',
    title: 'The website',
    content: [
      'The site is built with Vite, React, and TailwindCSS, then hosted on GitHub Pages. The interface is designed to stay fast, responsive, and image-forward while preserving the original project data.',
      <>The v3 migration from FLUX.DEV1 to OpenAI Image Generator v2.0 was planned with <strong className="text-ink">GPT-5.5 in plan mode</strong>. It mapped the places that needed image updates, designed a PNG-to-WebP pipeline, added the Make command used for conversion, and archived the previous generated assets before the new set replaced them.</>,
      <>The full v3 image refresh cost <strong className="text-ink">$15</strong> in generation spend, covering the complete replacement set for the site.</>,
    ],
  },
];

function About() {
  return (
    <div className="page-shell">
      <article className="mx-auto max-w-4xl animate-fade-in-up">
        <header className="mb-12 text-center">
          <p className="page-kicker">About the project</p>
          <h1 className="page-title gradient-text">A culinary atlas made with AI imagination.</h1>
          <p className="page-lede">
            Exquisite Menus is an experiment at the intersection of technology, gastronomy, and visual storytelling.
          </p>
        </header>

        {/* Timeline-style progression */}
        <div className="relative space-y-6">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 bottom-8 hidden w-px bg-gradient-to-b from-clay/30 via-saffron/20 to-transparent sm:block" />

          {sections.map((section, index) => (
            <section
              key={section.title}
              className={`soft-panel relative p-7 sm:p-9 ${index % 2 === 1 ? 'sm:ml-14' : 'sm:ml-14'}`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.15rem] top-8 hidden h-5 w-5 items-center justify-center rounded-full border-2 border-clay/30 bg-linen text-xs sm:flex">
                {section.icon}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl sm:hidden">{section.icon}</span>
                <h2 className="font-playfair text-3xl font-semibold">{section.title}</h2>
              </div>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="mt-4 leading-8 text-stone-600">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {/* Archive panel */}
          <section className="relative rounded-lg border border-stone-200/80 bg-parchment p-7 shadow-card sm:ml-14 sm:p-9">
            <div className="absolute -left-[2.15rem] top-8 hidden h-5 w-5 items-center justify-center rounded-full border-2 border-stone-300 bg-linen text-xs sm:flex">
              📜
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:hidden">📜</span>
              <div>
                <p className="page-kicker">Archive</p>
                <h2 className="font-playfair text-3xl font-semibold">V1 still lives on</h2>
              </div>
            </div>
            <p className="mt-4 leading-8 text-stone-600">
              The original public version of Exquisite Menus is still available for posterity at the{' '}
              <Link to="/v1" className="font-semibold text-clay underline-offset-4 hover:underline">
                V1 page
              </Link>
              . It shows the project&apos;s first visual language, earlier stack, and the foundation that led to the current site.
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              Keeping that version accessible makes it easier to trace how the project evolved from the earliest experiment into the current atlas.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default About;
