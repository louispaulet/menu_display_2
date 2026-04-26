/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function WineImageZoom({ src, alt, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

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
    setScale(1);
    setIsOpen(true);
  }

  function closeZoom() {
    setIsOpen(false);
  }

  function adjustScale(delta) {
    setScale((current) => Math.min(2.5, Math.max(1, Number((current + delta).toFixed(2)))));
  }

  return (
    <>
      <button
        type="button"
        onClick={openZoom}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:border-clay/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-clay/40 ${className}`}
        aria-label="Open larger bottle image"
      >
        <div className="absolute right-4 top-4 z-10 rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-stone-500 opacity-0 shadow-sm transition group-hover:opacity-100">
          Zoom
        </div>
        <div className="aspect-square bg-white">
          <img
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
            className="h-full w-full object-contain p-4 transition duration-200 group-hover:scale-[1.01]"
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={closeZoom}
          role="presentation"
        >
          <div
            className="relative flex w-full max-w-6xl flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-stone-950 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Large bottle image preview"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Large bottle preview</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustScale(-0.15)}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setScale(1)}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => adjustScale(0.15)}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={closeZoom}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                  aria-label="Close large bottle image preview"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex min-h-[65vh] items-center justify-center overflow-auto rounded-[1.25rem] bg-white p-4">
              <img
                src={src}
                alt={alt}
                className="origin-center select-none"
                style={{
                  transform: `scale(${scale})`,
                  transition: 'transform 160ms ease',
                  maxHeight: 'none',
                  maxWidth: 'none',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WineImageZoom;
