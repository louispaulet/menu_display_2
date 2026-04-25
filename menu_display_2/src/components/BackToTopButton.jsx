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

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-saffron/30 bg-linen px-4 py-3 text-sm font-semibold text-ink shadow-[0_12px_30px_rgba(37,32,25,0.14)] transition hover:-translate-y-0.5 hover:border-saffron/60 hover:bg-parchment"
    >
      <MdKeyboardArrowUp className="h-5 w-5 text-clay" />
      Top
    </button>
  );
}

export default BackToTopButton;
