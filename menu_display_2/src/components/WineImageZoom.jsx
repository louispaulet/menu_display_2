/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import ProgressiveImage from './ProgressiveImage';

function WineImageZoom({ src, alt, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`group relative block w-full overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:border-clay/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-clay/40 ${className}`}
        aria-label="Open larger bottle image"
      >
        <div className="absolute right-4 top-4 z-10 rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-stone-500 opacity-0 shadow-sm transition group-hover:opacity-100">
          Zoom
        </div>
        <div className="aspect-square bg-white">
          <ProgressiveImage
            src={src}
            alt={alt}
            loading="eager"
            className="h-full w-full"
            imageClassName="h-full w-full object-contain p-4 transition duration-200 group-hover:scale-[1.01]"
            placeholderClassName="bg-white"
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pb-4 pt-24 backdrop-blur-sm sm:pt-28"
          onClick={closeZoom}
          role="presentation"
        >
          <div
            className="relative flex h-[calc(100vh-7rem)] w-full max-w-6xl flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-stone-950 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Large bottle image preview"
          >
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={5}
              centerOnInit
              limitToBounds
              doubleClick={{ disabled: false, step: 0.7, mode: 'zoomIn' }}
              wheel={{ step: 0.08 }}
              pinch={{ step: 5 }}
              panning={{ velocityDisabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">Large bottle preview</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => zoomOut()}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                        aria-label="Zoom out"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => resetTransform()}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                        aria-label="Reset zoom"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => zoomIn()}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
                        aria-label="Zoom in"
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

                  <div className="min-h-0 flex-1 overflow-hidden rounded-[1.25rem] bg-white">
                    <div className="flex h-full w-full items-center justify-center bg-white">
                      <TransformComponent
                        wrapperClass="h-full w-full"
                        contentClass="h-full w-full"
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        contentStyle={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={src}
                          alt={alt}
                          className="select-none"
                          style={{
                            display: 'block',
                            maxWidth: 'min(100%, 1000px)',
                            maxHeight: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </TransformComponent>
                    </div>
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </>
  );
}

export default WineImageZoom;
