'use client';
import { useEffect, useState } from 'react';

export function Testimonials({ quotes }: { quotes: { text: string; who: string }[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 7000);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <div className="quote">
      <div className="quote-track">
        {quotes.map((q, n) => (
          <figure key={q.text} className={n === i ? 'quote is-active' : 'quote'}>
            <blockquote>{q.text}</blockquote>
            <figcaption>{q.who}</figcaption>
          </figure>
        ))}
      </div>
      <div className="quote-dots">
        {quotes.map((q, n) => (
          <button
            key={q.text}
            type="button"
            aria-pressed={n === i}
            aria-label={`${n + 1}`}
            onClick={() => setI(n)}
          />
        ))}
      </div>
    </div>
  );
}
