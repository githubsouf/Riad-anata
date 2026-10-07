import { notFound } from 'next/navigation';
import { href, resolve, type RouteDef } from '@/content/routes';
import { roomBySlug } from '@/content/rooms';
import { buildNav } from '@/content/nav';
import { site } from '@/content/site';
import { createT, locales, type Locale } from '@/lib/i18n';

import { Header } from './Header';
import { Footer } from './Footer';
import { BookBar } from './BookBar';
import { Lightbox } from './Lightbox';
import { Reveal } from './Reveal';

import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { Room } from './pages/Room';
import { FullRenting } from './pages/FullRenting';
import { Cooking } from './pages/Cooking';
import { GalleryPage } from './pages/GalleryPage';
import { Tours } from './pages/Tours';
import { Addresses } from './pages/Addresses';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';

/** Resolve the slug of a locale-scoped route group to a route definition. */
export function lookup(locale: Locale, slug: string[] | undefined) {
  const segments = locale === 'fr' ? ['fr', ...(slug ?? [])] : (slug ?? []);
  return resolve(segments);
}

export function Site({ locale, route }: { locale: Locale; route: RouteDef }) {
  const t = createT(locale);
  const nav = buildNav(locale);

  const labels: Record<string, string> = {};
  for (const item of nav) {
    labels[item.labelKey] = t(item.labelKey);
    item.children?.forEach((c) => {
      labels[c.labelKey] = t(c.labelKey);
    });
  }
  const alternates = Object.fromEntries(
    locales.map((l) => [l, href(route, l)]),
  ) as Record<Locale, string>;

  let body: React.ReactNode = null;
  switch (route.id) {
    case 'home':
      body = <Home locale={locale} t={t} />;
      break;
    case 'rooms':
      body = <Rooms locale={locale} t={t} />;
      break;
    case 'room': {
      const room = roomBySlug(route.roomSlug!);
      if (!room) notFound();
      body = <Room room={room} locale={locale} t={t} />;
      break;
    }
    case 'full':
      body = <FullRenting locale={locale} t={t} />;
      break;
    case 'cooking':
      body = <Cooking locale={locale} t={t} />;
      break;
    case 'gallery':
      body = <GalleryPage locale={locale} t={t} />;
      break;
    case 'tours':
      body = <Tours locale={locale} t={t} />;
      break;
    case 'addresses':
      body = <Addresses locale={locale} t={t} />;
      break;
    case 'press':
      body = <Press locale={locale} t={t} />;
      break;
    case 'contact':
      body = <Contact locale={locale} t={t} />;
      break;
  }

  return (
    <>
      <a className="sr-only" href="#main">
        Skip to content
      </a>
      <Header
        nav={nav}
        labels={labels}
        locale={locale}
        alternates={alternates}
        bookLabel={t('cta.book_short')}
        bookLongLabel={t('cta.book')}
        whatsappLabel={t('cta.whatsapp')}
      />
      {body}
      <Footer locale={locale} t={t} />
      <BookBar label={t('book.bar')} cta={t('cta.book_short')} />
      <Lightbox />
      <Reveal />
      <LodgingSchema locale={locale} />
    </>
  );
}

/** Structured data so search engines treat the riad as a place to stay. */
function LodgingSchema({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: site.name,
    url: site.url + (locale === 'fr' ? '/fr/' : '/'),
    telephone: site.phone,
    email: site.email,
    priceRange: `€${site.priceFrom}–€625`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    numberOfRooms: site.rooms,
    sameAs: [site.instagram, site.facebook],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
