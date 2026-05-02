import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that observes elements and toggles
 * 'io-hidden' / 'io-visible' classes for scroll-triggered
 * entrance animations.
 *
 * @param {object}  options
 * @param {string}  options.threshold  - IntersectionObserver threshold (0-1)
 * @param {string}  options.rootMargin - margin around the root
 * @returns {React.RefObject} ref to attach to the container element
 */
export default function useIntersectionFadeIn({ threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('io-visible');
            entry.target.classList.remove('io-hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    // Observe all children with the data-animate attribute
    const targets = el.querySelectorAll('[data-animate]');
    targets.forEach((target) => {
      target.classList.add('io-hidden');
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Hook variant that returns a ref for a single element
 * (not children), toggling io-hidden / io-visible on itself.
 */
export function useSingleFadeIn({ threshold = 0.15, rootMargin = '0px 0px -30px 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
