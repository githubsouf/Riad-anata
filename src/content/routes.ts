import { rooms } from './rooms';
import type { Locale } from '@/lib/i18n';

/**
 * English pages keep the exact slugs the WordPress site used, at the root,
 * so existing backlinks and rankings carry over untouched. French gets its
 * own indexable tree under /fr with translated slugs.
 */
export type PageId =
  | 'home' | 'rooms' | 'room' | 'full' | 'cooking'
  | 'gallery' | 'tours' | 'addresses' | 'press' | 'contact';

export type RouteDef = {
  id: PageId;
  /** English path, no leading slash. '' is the home page. */
  en: string;
  /** French path, no leading slash and no 'fr' prefix. */
  fr: string;
  /** Only for id === 'room'. */
  roomSlug?: string;
  /** Key used for meta.title.* / meta.desc.* lookups. */
  metaKey: string;
};

const staticRoutes: RouteDef[] = [
  { id: 'home',      en: '',                   fr: '',                   metaKey: 'home' },
  { id: 'rooms',     en: 'rooms',              fr: 'chambres',           metaKey: 'rooms' },
  { id: 'full',      en: 'full-renting',       fr: 'location-exclusive', metaKey: 'full' },
  { id: 'cooking',   en: 'cooking-class',      fr: 'cours-de-cuisine',   metaKey: 'cooking' },
  { id: 'gallery',   en: 'photos',             fr: 'galerie',            metaKey: 'gallery' },
  { id: 'tours',     en: 'tour',               fr: 'excursions',         metaKey: 'tours' },
  { id: 'addresses', en: 'our-top-addresses',  fr: 'nos-adresses',       metaKey: 'addresses' },
  { id: 'press',     en: 'press',              fr: 'presse',             metaKey: 'press' },
  { id: 'contact',   en: 'contact',            fr: 'contact',            metaKey: 'contact' },
];

const frRoomSlug: Record<string, string> = {
  'azure-room': 'chambre-azure',
  'green-room': 'chambre-verte',
  'red-room': 'chambre-rouge',
  'orange-room': 'chambre-orange',
  'white-room': 'chambre-blanche',
};

const roomRoutes: RouteDef[] = rooms.map((r) => ({
  id: 'room' as const,
  en: r.slug,
  fr: frRoomSlug[r.slug] ?? r.slug,
  roomSlug: r.slug,
  metaKey: `room-${r.key}`,
}));

export const routes: RouteDef[] = [...staticRoutes, ...roomRoutes];

/** Full href for a route in a given locale, e.g. '/fr/chambres/' or '/rooms/'. */
export function href(route: RouteDef, locale: Locale): string {
  const path = locale === 'fr' ? route.fr : route.en;
  const prefix = locale === 'fr' ? '/fr' : '';
  return path ? `${prefix}/${path}/` : `${prefix}/` || '/';
}

export function routeById(id: PageId, roomSlug?: string): RouteDef {
  const found = routes.find(
    (r) => r.id === id && (id !== 'room' || r.roomSlug === roomSlug),
  );
  if (!found) throw new Error(`Unknown route: ${id} ${roomSlug ?? ''}`);
  return found;
}

/** Convenience for building links in components. */
export function path(locale: Locale, id: PageId, roomSlug?: string): string {
  return href(routeById(id, roomSlug), locale);
}

/** Resolve an incoming URL segment array to a route. */
export function resolve(segments: string[]): { locale: Locale; route: RouteDef } | null {
  let locale: Locale = 'en';
  let rest = segments;
  if (segments[0] === 'fr') {
    locale = 'fr';
    rest = segments.slice(1);
  }
  const key = rest.join('/');
  const route = routes.find((r) => (locale === 'fr' ? r.fr : r.en) === key);
  return route ? { locale, route } : null;
}

/** Every static path the site builds. */
export function allParams(): { slug?: string[] }[] {
  const out: { slug?: string[] }[] = [];
  for (const r of routes) {
    out.push(r.en ? { slug: r.en.split('/') } : { slug: [] });
    out.push({ slug: r.fr ? ['fr', ...r.fr.split('/')] : ['fr'] });
  }
  return out;
}
