import { useParams } from 'react-router-dom';
import hotSauceData from '../hotsauceData';
import { FaCalendarAlt, FaPepperHot } from 'react-icons/fa';

function HotSauceDetails() {
  const { id } = useParams();
  const sauce = Object.values(hotSauceData)[id];

  if (!sauce) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-linen p-8 text-center shadow-card">
          <p className="page-kicker">Missing sauce</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold">Hot sauce not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <article className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-stone-200/80 bg-linen shadow-editorial lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.7fr)] lg:items-stretch">
        <div className="flex min-h-[420px] items-center justify-center bg-gradient-to-b from-white to-stone-100 p-8 sm:p-12 lg:min-h-[500px] lg:p-8 xl:min-h-[540px]">
          <img
            src={`/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.webp`}
            alt={`${sauce.name} bottle`}
            className="h-full w-full max-h-[420px] object-contain object-center lg:max-h-[500px] xl:max-h-[540px]"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:max-w-[28rem] lg:p-12">
          <p className="page-kicker">Small batch sauce</p>
          <h1 className="mt-3 font-playfair text-5xl font-semibold leading-tight text-ink">{sauce.name}</h1>

          <div className="mt-6 grid gap-3 border-y border-stone-200 py-6 text-stone-700 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaPepperHot className="h-4 w-4 text-clay" />
              Heat level {sauce.hotness_level}/10
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaCalendarAlt className="h-4 w-4 text-clay" />
              Bottled {sauce.bottling_date}
            </p>
          </div>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            {sauce.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default HotSauceDetails;
