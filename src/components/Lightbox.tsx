'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { mediaUrl } from '@/lib/media';
import { Close, Prev, Next } from './Icons';

type Item = { src: string; alt: string };

/** Full-screen viewer for every <Figure /> on the page. */
export function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchX = useRef(0);

  useEffect(() => setMounted(true), []);

  const collect = useCallback(() => {
    return Array.from(
      document.querySelectorAll<HTMLElement>('figure[data-lb]:not(.is-hidden)'),
    ).map((el) => ({
      src: el.dataset.src ?? '',
      alt: el.querySelector('img')?.alt ?? '',
    }));
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const fig = (e.target as HTMLElement).closest<HTMLElement>('figure[data-lb]');
      if (!fig) return;
      e.preventDefault();
      const list = collect();
      const i = list.findIndex((it) => it.src === fig.dataset.src);
      setItems(list);
      setIndex(Math.max(0, i));
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [collect]);

  const move = useCallback(
    (delta: number) => setIndex((i) => (i + delta + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
    };
  }, [open, move]);

  if (!mounted) return null;
  const current = items[index];

  return createPortal(
    <div
      className={open ? 'lb is-open' : 'lb'}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) move(dx > 0 ? -1 : 1);
      }}
    >
      <div className="lb__bar">
        <span className="lb__count">
          {items.length ? `${index + 1} / ${items.length}` : ''}
        </span>
        <button className="lb__btn lb__close" onClick={() => setOpen(false)} aria-label="Close">
          <Close />
        </button>
      </div>
      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="lb__img" src={mediaUrl(current.src)} alt={current.alt} />
      )}
      <button className="lb__btn lb__nav lb__prev" onClick={() => move(-1)} aria-label="Previous">
        <Prev />
      </button>
      <button className="lb__btn lb__nav lb__next" onClick={() => move(1)} aria-label="Next">
        <Next />
      </button>
    </div>,
    document.body,
  );
}
