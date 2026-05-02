import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently visible in the viewport
 * and returns its id.
 *
 * @param {string[]} sectionIds - array of DOM element ids to observe
 * @param {object}   options
 * @param {string}   options.rootMargin
 * @returns {string|null} the id of the currently-active section
 */
export default function useScrollSpy(sectionIds, { rootMargin = '-20% 0px -70% 0px' } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
