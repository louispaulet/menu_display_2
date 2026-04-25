import HotSaucePreview from '../components/HotSaucePreview';
import hotSauceData from '../hotsauceData';
import goldFrame from '../assets/hot_sauce_frames/gold_frame.webp';
import silverFrame from '../assets/hot_sauce_frames/silver_frame.webp';
import bronzeFrame from '../assets/hot_sauce_frames/bronze_frame.webp';

const medalFramesByName = {
  'Truffle Blaze': goldFrame,
  'Smoky Oak Inferno': silverFrame,
  'Pique de Azteca': bronzeFrame,
};

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
            key={sauce.name}
            id={index}
            name={sauce.name}
            hotnessLevel={sauce.hotness_level}
            bottlingDate={sauce.bottling_date}
            description={sauce.description}
            medalFrame={medalFramesByName[sauce.name]}
          />
        ))}
      </section>
    </div>
  );
}

export default HotSaucePage;
