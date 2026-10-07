'use client';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';

export function BookBar({ label, cta }: { label: string; cta: string }) {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const onScroll = () => setUp(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={up ? 'bookbar is-up' : 'bookbar'}>
      <span>{label}</span>
      <a className="btn btn--brass btn--sm" href={site.booking} target="_blank" rel="noopener">
        {cta}
      </a>
    </div>
  );
}
