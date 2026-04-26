// src/components/Footer.jsx

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-linen/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="space-y-2 text-sm text-stone-500">
          <p>&copy; {currentYear} Exquisite Menus V3. All rights reserved.</p>
          <p className="font-semibold text-stone-600">Made by Exquisite Menus Team</p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-full border border-stone-200/80 bg-white/60 px-3 py-2 shadow-sm backdrop-blur-sm lg:self-auto">
          <div className="h-14 w-20 overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-100 shadow-inner">
            <img
              src="/branding/greek_mosaic.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-85 saturate-90 contrast-105"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
