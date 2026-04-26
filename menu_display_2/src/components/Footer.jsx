// src/components/Footer.jsx

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-stone-200/80 bg-linen/80">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'url("/branding/greek_mosaic.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '220px auto',
          backgroundPosition: 'center',
          filter: 'saturate(0.88) contrast(1.04)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-linen/40 via-linen/72 to-linen/92" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/55 bg-white/60 px-5 py-4 text-sm text-stone-600 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-6">&copy; {currentYear} Exquisite Menus V3. All rights reserved.</p>
          <p className="font-semibold text-stone-700">Made by Exquisite Menus Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
