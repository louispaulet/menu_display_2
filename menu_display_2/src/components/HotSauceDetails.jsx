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
      <article className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-stone-200/80 bg-linen shadow-editorial lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[520px] items-center justify-center bg-gradient-to-b from-white to-stone-100 p-8 sm:p-12">
          <img
            src={`https://raw.githubusercontent.com/louispaulet/menu_display_2/main/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.jpg`}
            alt={`${sauce.name} bottle`}
            className="max-h-[680px] w-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
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
