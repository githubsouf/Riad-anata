import type { Metadata } from 'next';
import { href, type RouteDef } from '@/content/routes';
import { createT, locales, type Locale } from '@/lib/i18n';
import { site } from '@/content/site';
import { img } from '@/content/media';
import { mediaUrl } from '@/lib/media';

/** Title, description, canonical and hreflang for one route in one locale. */
export function metadataFor(locale: Locale, route: RouteDef): Metadata {
  const t = createT(locale);
  const title = t(`meta.title.${route.metaKey}`);
  const description = t(`meta.desc.${route.metaKey}`);
  const languages = Object.fromEntries(locales.map((l) => [l, href(route, l)]));

  return {
    title,
    description,
    alternates: {
      canonical: href(route, locale),
      languages: { ...languages, 'x-default': href(route, 'en') },
    },
    openGraph: {
      title,
      description,
      url: href(route, locale),
      siteName: site.name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      type: 'website',
      images: [{ url: mediaUrl(img.hero_poster) }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
