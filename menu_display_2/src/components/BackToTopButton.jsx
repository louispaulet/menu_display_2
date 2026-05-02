import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
      className={[
        'fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-saffron/30 bg-white/95 px-3.5 py-2.5 text-sm font-semibold text-ink shadow-[0_12px_30px_rgba(37,32,25,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/60 hover:bg-linen sm:bottom-6 sm:right-6 sm:px-4',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      ].join(' ')}
    >
      <MdKeyboardArrowUp className="h-5 w-5 text-clay" />
      Top
    </button>
  );
}

export default BackToTopButton;
