import HotSaucePreview from '../components/HotSaucePreview';
import hotSauceData from '../hotsauceData';

function HotSaucePage() {
  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="font-montserrat text-4xl font-bold mb-2">🔥 Hot Sauces Collection</h1>
        <p className="text-lg text-gray-600">Explore our artisanal hot sauces crafted to elevate your culinary experience.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
