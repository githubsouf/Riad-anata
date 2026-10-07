'use client';
import { useState } from 'react';
import { Figure } from './Figure';
import { gallery, galleryCats } from '@/content/gallery';

export function GalleryGrid({ catLabels }: { catLabels: Record<string, string> }) {
  const [cat, setCat] = useState<string>('all');
  return (
    <>
      <div className="gal-filter reveal">
        {galleryCats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {catLabels[c]}
          </button>
        ))}
      </div>
      <div className="masonry reveal" data-d="1">
        {gallery.map((shot, i) => (
          <Figure
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            cat={shot.cat}
            index={i}
            className={cat === 'all' || cat === shot.cat ? undefined : 'is-hidden'}
            sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ))}
      </div>
    </>
  );
}
