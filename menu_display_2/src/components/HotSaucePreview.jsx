/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPepperHot } from 'react-icons/fa';

function HotSaucePreview({ name, hotnessLevel, bottlingDate, description, id, medalFrame }) {
  const generateImageUrl = (name) => {
    const nameEncoded = encodeURIComponent(name.replace(/ /g, '_'));
    return `/sauce_pictures/${nameEncoded}.webp`;
  };

  return (
    <Link to={`/hot-sauce/${id}`} className="editorial-card group block">
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-stone-100 p-5">
        <img
          src={generateImageUrl(name)}
          alt={`${name} bottle`}
          className={`relative z-10 h-full w-full object-contain transition duration-500 group-hover:scale-105 ${
            medalFrame ? 'scale-[0.9]' : ''
          }`}
          loading="lazy"
        />
        {medalFrame ? (
          <img
            src={medalFrame}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="page-kicker text-[0.65rem]">Small batch sauce</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold leading-tight text-ink">{name}</h2>
        </div>
        <div className="space-y-2">
          <p className="meta-row">
            <FaPepperHot className="meta-icon" /> <span>Heat level {hotnessLevel}/10</span>
          </p>
          <p className="meta-row">
            <FaCalendarAlt className="meta-icon" /> <span>Bottled {bottlingDate}</span>
          </p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-stone-600">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default HotSaucePreview;
