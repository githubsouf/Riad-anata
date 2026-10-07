import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const s = (props: P) => ({ 'aria-hidden': true as const, ...props });

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...s(p)}>
    <path d="M12 1.6l2.6 3.4 4.3-.8-.8 4.3 3.4 2.6-3.4 2.6.8 4.3-4.3-.8L12 22.4l-2.6-3.4-4.3.8.8-4.3L2.5 12.9 5.9 10.3l-.8-4.3 4.3.8z" />
  </svg>
);
export const Arrow = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...s(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Chevron = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...s(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...s(p)}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);
export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...s(p)}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
export const Prev = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...s(p)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const Next = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...s(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
export const Zoom = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8.5v5M8.5 11h5" />
  </svg>
);
export const SoundOn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...s(p)}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 010 7" />
  </svg>
);
export const SoundOff = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...s(p)}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M17 10l4 4M21 10l-4 4" />
  </svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M5 3h4l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
  </svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" />
  </svg>
);
export const Wifi = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M2.5 9a16 16 0 0119 0M6 12.8a11 11 0 0112 0M9.4 16.4a6 6 0 015.2 0" />
    <circle cx="12" cy="19.6" r="1.1" fill="currentColor" />
  </svg>
);
export const Ac = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
  </svg>
);
export const Bed = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M3 18V7M3 12h18v6M7 12V9h5v3" />
  </svg>
);
export const Towel = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M4 4v16M20 4v16M4 8h16M4 14h16" />
  </svg>
);
export const Baby = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);
export const Pool = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M2 17c2 0 2 1.6 4 1.6S8 17 10 17s2 1.6 4 1.6S16 17 18 17s2 1.6 4 1.6" />
    <path d="M7 14V5a2 2 0 014 0v9M13 14V5a2 2 0 014 0v9" />
  </svg>
);
export const Sun = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </svg>
);
export const Cup = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M4 8h13v7a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" /><path d="M17 10h2a2.5 2.5 0 010 5h-2" />
  </svg>
);
export const Chef = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M6 13a4 4 0 112-7.5 4 4 0 018 0A4 4 0 1118 13v6H6v-6z" /><path d="M6 16h12" />
  </svg>
);
export const Car = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <path d="M4 16v-3l2-5h12l2 5v3" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" />
  </svg>
);
export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...s(p)}>
    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V14h2.7v8z" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...s(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...s(p)}>
    <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6 0a6.5 6.5 0 01-3.2-2.8c-.2-.4 0-.6.2-.8l.4-.5a2 2 0 00.3-.4.5.5 0 000-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3A2.9 2.9 0 006 9.8c0 1.7 1.3 3.4 1.4 3.6s2.4 3.8 5.9 5.2a6.4 6.4 0 002.8.5 2.4 2.4 0 001.6-1.1 2 2 0 00.1-1.1c0-.1-.2-.2-.4-.3z" />
  </svg>
);
export const Clock = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...s(p)}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5.5l3.5 2" />
  </svg>
);

export const amenityIcons = { Pool, Sun, Cup, Chef, Wifi, Ac, Car, Baby, Bed, Towel, Check, Clock };
