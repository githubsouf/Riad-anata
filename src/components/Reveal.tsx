'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Scroll-in animations for every .reveal / .reveal-img on the page. */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-img'),
    );
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    // Safety net: anything already in view on load is revealed on the next frame,
    // so a missed observer callback can never leave an image permanently hidden.
    requestAnimationFrame(() => {
      nodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) n.classList.add('is-in');
      });
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
