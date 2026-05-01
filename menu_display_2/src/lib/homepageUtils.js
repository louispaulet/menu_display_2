export function scrollToZone(zoneId) {
  const target = document.getElementById(zoneId);
  if (!target) return;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 112);
  window.scrollTo({ top: targetTop, behavior: 'auto' });

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
}
