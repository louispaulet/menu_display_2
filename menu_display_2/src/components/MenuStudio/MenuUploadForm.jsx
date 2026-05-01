/* eslint-disable react/prop-types */
import { MdUploadFile, MdErrorOutline, MdCheckCircle, MdDelete } from 'react-icons/md';

export default function MenuUploadForm({
  handleSubmit,
  handleFileChange,
  handleClear,
  inputRef,
  fileStatus,
  error,
  isRestored,
  isSubmitting,
}) {
  return (
    <section className="soft-panel p-6 sm:p-7 lg:sticky lg:top-24 lg:self-start">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="page-kicker">Source</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold text-ink">Menu image</h2>
        </div>

        <label
          htmlFor="menuImage"
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-clay/40 bg-linen/70 px-5 py-9 text-center transition hover:border-clay hover:bg-white"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-clay/25 bg-white text-clay">
            <MdUploadFile className="h-6 w-6" />
          </span>
          <span className="font-semibold text-ink">Choose image</span>
          <span className="text-sm leading-6 text-stone-500">JPEG, PNG, or WebP · max 10MB</span>
          <input
            ref={inputRef}
            id="menuImage"
            name="menuImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        <div className="rounded-lg border border-stone-200 bg-white/80 px-4 py-3 text-sm font-semibold text-stone-600">
          {fileStatus}
        </div>

        {error && (
          <div className="flex gap-3 rounded-lg border border-clay/30 bg-clay/10 p-4 text-sm leading-6 text-clay">
            <MdErrorOutline className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isRestored && (
          <div className="flex gap-3 rounded-lg border border-olive/30 bg-olive/10 p-4 text-sm leading-6 text-olive">
            <MdCheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>Restored saved menu</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-pill border-clay bg-clay text-white hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-200 disabled:text-stone-500"
          >
            <MdUploadFile className="h-5 w-5" />
            {isSubmitting ? 'Extracting...' : 'Extract menu'}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="action-pill border-stone-200 bg-white text-ink hover:border-clay hover:text-clay"
          >
            <MdDelete className="h-5 w-5" />
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}
