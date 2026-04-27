// src/components/Footer.jsx

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-stone-200/80 bg-linen/80 py-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'url("/branding/greek_mosaic.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '220px auto',
          backgroundPosition: 'center',
          filter: 'saturate(0.88) contrast(1.04)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-linen/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-linen/90 to-transparent" />
      <div className="relative my-4 w-full border-y border-white/55 bg-white/86 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="leading-6">&copy; {currentYear} Exquisite Menus V3. All rights reserved.</p>
          <p className="font-semibold text-stone-700">Made by Exquisite Menus Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
