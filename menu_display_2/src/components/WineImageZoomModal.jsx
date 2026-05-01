/* eslint-disable react/prop-types */
import { ArrowPathIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export default function WineImageZoomModal({ src, alt, closeZoom }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pb-4 pt-24 backdrop-blur-sm sm:pt-28"
      onClick={closeZoom}
      role="presentation"
    >
      <div
        className="relative flex h-[calc(100vh-7rem)] w-full max-w-6xl flex-col gap-4 rounded-lg border border-white/10 bg-stone-950 p-4 shadow-2xl"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Zoom out"
                    title="Zoom out"
                  >
                    <MagnifyingGlassMinusIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => resetTransform()}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Reset zoom"
                    title="Reset zoom"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => zoomIn()}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Zoom in"
                    title="Zoom in"
                  >
                    <MagnifyingGlassPlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={closeZoom}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Close large bottle image preview"
                    title="Close"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-white">
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
  );
}
