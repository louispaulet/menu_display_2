/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdAttachMoney, MdLocalBar } from 'react-icons/md';
import ProgressiveImage from '../ProgressiveImage';
import { linkifyWineText } from '../../lib/wineLinksRenderer';
import { useSingleFadeIn } from '../../lib/useIntersectionFadeIn';

export default function CourseItem({
  item,
  index,
  accent,
  imageUrl,
  recipeLink,
  wineLinkContext,
}) {
  const isEven = index % 2 === 1;
  const { ref, visible } = useSingleFadeIn();

  return (
    <section
      ref={ref}
      id={`course-${index + 1}`}
      className={`content-card scroll-mt-28 io-hidden ${visible ? 'io-visible' : ''} ${isEven ? 'lg:bg-white/70' : ''}`}
    >
      <div className={`grid lg:grid-cols-2 ${isEven ? 'lg:[&>div:first-child]:order-2' : ''}`}>
        <div className="relative aspect-[4/3] bg-stone-100 lg:aspect-auto overflow-hidden">
          <ProgressiveImage
            src={imageUrl}
            alt={`${item.course}: ${item.description}`}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="h-full w-full"
            imageClassName="h-full w-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-35`} />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <p className="page-kicker">Course {index + 1}</p>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[0.7rem] font-bold text-stone-600">
              ${item.price}
            </span>
          </div>
          <h3 className="mt-3 font-playfair text-3xl font-semibold leading-tight text-ink sm:text-4xl">{item.course}</h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">{item.description}</p>
          <div className="mt-6 grid gap-3 border-y border-stone-200/80 py-5 text-sm font-semibold text-stone-700 sm:grid-cols-[0.35fr_0.65fr]">
            <p className="flex items-center gap-2">
              <MdAttachMoney className={`h-4 w-4 ${accent.text}`} />
              ${item.price}
            </p>
            <p className="flex items-start gap-2">
              <MdLocalBar className={`mt-1 h-4 w-4 shrink-0 ${accent.text}`} />
              <span className={`leading-6 rounded-md bg-stone-50 px-2 py-0.5 ${accent.text}`}>
                {linkifyWineText(item.wine_pairing, wineLinkContext)}
              </span>
            </p>
          </div>
          <Link
            to={recipeLink}
            className={`action-pill mt-6 ${accent.border} ${accent.wash} ${accent.text} hover:border-clay hover:bg-clay hover:text-white`}
          >
            View recipe
          </Link>
        </div>
      </div>
    </section>
  );
}
