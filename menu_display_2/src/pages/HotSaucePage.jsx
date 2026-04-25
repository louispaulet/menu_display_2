import { useState } from 'react';
import HotSaucePreview from '../components/HotSaucePreview';
import hotSauceData from '../hotsauceData';

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function HotSaucePage() {
  const [hotSauces] = useState(() =>
    shuffleArray(
      Object.values(hotSauceData).map((sauce, id) => ({
        ...sauce,
        id,
      })),
    ),
  );

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
        {hotSauces.map((sauce) => (
          <HotSaucePreview
            key={sauce.name}
            id={sauce.id}
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
