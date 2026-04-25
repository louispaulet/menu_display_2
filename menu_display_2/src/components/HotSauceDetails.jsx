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
      <article className="mx-auto grid max-w-6xl overflow-visible rounded-[2rem] border border-stone-200/80 bg-linen shadow-editorial lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="relative flex items-center justify-center overflow-visible bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(247,241,232,0.98)_58%,_rgba(239,229,215,1)_100%)] p-6 sm:p-10 lg:min-h-[42rem] lg:p-12">
          <div className="w-full max-w-[30rem]">
            <div className="relative aspect-[3/4] rounded-[2rem] border border-white/70 bg-gradient-to-b from-white via-white to-stone-100 p-6 shadow-[0_24px_60px_-34px_rgba(57,34,18,0.45)]">
              <img
                src={`/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.webp`}
                alt={`${sauce.name} bottle`}
                className="h-full w-full object-contain object-center drop-shadow-[0_18px_24px_rgba(57,34,18,0.14)]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center border-t border-stone-200/70 p-7 sm:p-10 lg:border-t-0 lg:border-l lg:border-stone-200/70 lg:p-12">
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
