import HotSaucePreview from '../components/HotSaucePreview';
import hotSauceData from '../hotsauceData';

function HotSaucePage() {
  return (
    <div className="page-shell">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <p className="page-kicker">Condiment cellar</p>
        <h1 className="page-title">Artisanal hot sauces with a chef’s point of view.</h1>
        <p className="page-lede">
          Explore heat levels, tasting notes, and small-batch bottlings designed to sharpen the menus without overwhelming them.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.values(hotSauceData).map((sauce, index) => (
          <HotSaucePreview
            key={index}
            id={index}
            name={sauce.name}
            hotnessLevel={sauce.hotness_level}
            bottlingDate={sauce.bottling_date}
            description={sauce.description}
          />
        ))}
      </section>
    </div>
  );
}

export default HotSaucePage;
