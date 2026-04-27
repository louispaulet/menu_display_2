function VersionOnePage() {
  return (
    <div className="page-shell">
      <article className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <p className="page-kicker">Archive</p>
          <h1 className="page-title">Exquisite Menus V1</h1>
          <p className="page-lede">The previous version, made with Stable Diffusion 1.5 and a simpler JavaScript stack.</p>
          <a
            href="https://exquisite-menus-old.thefrenchartist.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-linen hover:bg-clay"
          >
            Visit Exquisite Menus V1
          </a>
        </header>

        <div className="space-y-8">
          <section className="soft-panel p-7 sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">Image generation with Stable Diffusion 1.5</h2>
            <p className="mt-4 leading-8 text-stone-600">
              In V1, the project used Stable Diffusion 1.5 to generate menu imagery. It provided a useful foundation for visualizing AI-generated dishes, while the current version uses FLUX-DEV-1 for richer, more refined output.
            </p>
          </section>

          <section className="soft-panel p-7 sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">Simpler development with JavaScript</h2>
            <p className="mt-4 leading-8 text-stone-600">
              The first version was developed with simple JavaScript rather than the modern Vite and React tooling used today. It served as a functional prototype for the core concept.
            </p>
          </section>

          <section className="soft-panel p-7 sm:p-9">
            <h2 className="font-playfair text-3xl font-semibold">Styling with Bootstrap</h2>
            <p className="mt-4 leading-8 text-stone-600">
              V1 used Bootstrap for layout and styling. The current TailwindCSS version gives the interface more flexibility and a more distinctive editorial identity.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default VersionOnePage;
