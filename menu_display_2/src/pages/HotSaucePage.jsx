import { useState } from 'react';
import HotSaucePreview from '../components/HotSaucePreview';
import { hotSauceList, sortSauces } from '../lib/hotSauceUtils';
import HotSauceFilter from '../components/HotSauce/HotSauceFilter';

function HotSaucePage() {
  const [sortBy, setSortBy] = useState('name-asc');
  const hotSauces = sortSauces(hotSauceList, sortBy);

  return (
    <div className="page-shell">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <p className="page-kicker">Condiment cellar</p>
        <h1 className="page-title">Artisanal hot sauces with a chef’s point of view.</h1>
        <p className="page-lede">
          Explore heat levels, tasting notes, and small-batch bottlings designed to sharpen the menus.
        </p>
      </header>

      <HotSauceFilter sortBy={sortBy} setSortBy={setSortBy} />

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotSauces.map((sauce) => (
          <HotSaucePreview
            key={sauce.name}
            id={sauce.id}
            name={sauce.name}
            hotnessLevel={sauce.hotness_level}
            bottlingDate={sauce.bottling_date}
            price={sauce.price}
            scovilleUnits={sauce.scoville_units}
            ageMonths={sauce.age_months}
            batchSize={sauce.batch_size}
            description={sauce.description}
          />
        ))}
      </section>
    </div>
  );
}

export default HotSaucePage;
