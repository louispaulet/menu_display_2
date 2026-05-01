/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import ProgressiveImage from './ProgressiveImage';
import WineImageZoomModal from './WineImageZoomModal';

function WineImageZoom({ src, alt, className = '', appearance = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMuseum = appearance === 'museum';

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function openZoom() {
    setIsOpen(true);
  }

  function closeZoom() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openZoom}
        className={`group relative block w-full overflow-hidden text-left transition focus:outline-none focus:ring-2 focus:ring-clay/30 ${
          isMuseum
            ? 'shadow-[0_18px_50px_rgba(55,38,19,0.12)] hover:shadow-[0_22px_60px_rgba(55,38,19,0.16)]'
            : 'rounded-lg border border-stone-200 bg-white shadow-sm hover:border-clay/40 hover:shadow-lg'
        } ${className}`}
        aria-label="Open larger bottle image"
      >
        <div
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-600 opacity-0 shadow-sm transition group-hover:opacity-100 ${
            isMuseum ? 'backdrop-blur-sm' : ''
          }`}
        >
          <MagnifyingGlassPlusIcon className="h-5 w-5" />
        </div>
        <div className={isMuseum ? 'aspect-square bg-transparent' : 'aspect-square bg-white'}>
          <ProgressiveImage
            src={src}
            alt={alt}
            loading="eager"
            className="h-full w-full"
            imageClassName={`h-full w-full object-contain transition duration-200 group-hover:scale-[1.01] ${
              isMuseum ? 'p-0' : 'p-4'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <WineImageZoomModal src={src} alt={alt} closeZoom={closeZoom} />
      )}
    </>
  );
}

export default WineImageZoom;
