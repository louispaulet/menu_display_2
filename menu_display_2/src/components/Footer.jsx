// src/components/Footer.jsx

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-stone-200/80 bg-linen/80 py-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: 'url("/branding/footer-pattern.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px auto',
          backgroundPosition: 'center',
          filter: 'saturate(1.05) contrast(1.1) brightness(0.98)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-linen/75 via-linen/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-linen/75 via-linen/40 to-transparent" />
      <div className="relative my-4 w-full border-y border-white/45 bg-white/68 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-sm text-stone-700 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="leading-6">&copy; {currentYear} Exquisite Menus V3. All rights reserved.</p>
          <p className="font-semibold text-stone-700">Made by Exquisite Menus Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
