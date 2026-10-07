import type { Metadata, Viewport } from 'next';
import { site } from '@/content/site';
import type { Locale } from '@/lib/i18n';

/**
 * Fonts come from Google Fonts with preconnect. To self-host them instead,
 * run `npm run fetch:fonts` and follow README -> "Self-hosting the fonts".
 */
const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2' +
  '?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400' +
  '&family=Jost:wght@200;300;400;500&display=swap';

export const viewport: Viewport = {
  themeColor: '#0e4049',
  width: 'device-width',
  initialScale: 1,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  icons: {
    icon: [
      { url: '/brand/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
};

/** One root layout per locale, so <html lang> is right for each tree. */
export function RootShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    // data-scroll-behavior tells Next.js to suspend our smooth scrolling for the
    // duration of a route change. Next 15 did this on its own; Next 16 stopped,
    // which left the navigation scroll animating against the incoming page.
    <html lang={lang} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={GOOGLE_FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
