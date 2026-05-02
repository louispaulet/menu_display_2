import { useState, useMemo } from 'react';
import HotSaucePreview from '../components/HotSaucePreview';
import { hotSauceList, sortSauces } from '../lib/hotSauceUtils';
import HotSauceFilter from '../components/HotSauce/HotSauceFilter';

function HotSaucePage() {
  const [sortBy, setSortBy] = useState('name-asc');
  const hotSauces = sortSauces(hotSauceList, sortBy);

  const stats = useMemo(() => {
    const avg = Math.round(hotSauceList.reduce((acc, s) => acc + s.hotness_level, 0) / hotSauceList.length);
    const maxHeat = Math.max(...hotSauceList.map((s) => s.hotness_level));
    const avgPrice = Math.round(hotSauceList.reduce((acc, s) => acc + s.price, 0) / hotSauceList.length);
    return { total: hotSauceList.length, avg, maxHeat, avgPrice };
  }, []);

  return (
    <div className="page-shell">
      <header className="mx-auto mb-8 max-w-4xl text-center animate-fade-in-up">
        <p className="page-kicker">Condiment cellar</p>
        <h1 className="page-title">Artisanal hot sauces with a chef&apos;s point of view.</h1>
        <p className="page-lede">
          Explore heat levels, tasting notes, and small-batch bottlings designed to sharpen the menus.
        </p>
      </header>

      {/* Stats row */}
      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="stat-tile p-4 text-center">
          <p className="stat-label">Total sauces</p>
          <p className="stat-value text-2xl">{stats.total}</p>
        </div>
        <div className="stat-tile p-4 text-center">
          <p className="stat-label">Avg heat</p>
          <p className="stat-value text-2xl">{stats.avg}/10</p>
        </div>
        <div className="stat-tile p-4 text-center">
          <p className="stat-label">Max heat</p>
          <p className="stat-value text-2xl">{stats.maxHeat}/10</p>
        </div>
        <div className="stat-tile p-4 text-center">
          <p className="stat-label">Avg price</p>
          <p className="stat-value text-2xl">${stats.avgPrice}</p>
        </div>
      </div>

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
