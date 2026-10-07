import type { MetadataRoute } from 'next';
import { routes, href } from '@/content/routes';
import { locales } from '@/lib/i18n';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: site.url + href(route, locale),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route.id === 'home' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, site.url + href(route, l)]),
        ),
      },
    })),
  );
}
