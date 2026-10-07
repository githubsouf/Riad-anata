import { path } from './routes';
import { rooms } from './rooms';
import type { Locale } from '@/lib/i18n';

export type NavItem = {
  href: string;
  labelKey: string;
  children?: { href: string; labelKey: string }[];
};

export function buildNav(locale: Locale): NavItem[] {
  const roomKeys = ['nav.r1', 'nav.r2', 'nav.r3', 'nav.r4', 'nav.r5'];
  return [
    { href: path(locale, 'home'), labelKey: 'nav.home' },
    {
      href: path(locale, 'rooms'),
      labelKey: 'nav.rooms',
      children: [
        ...rooms.map((r, i) => ({
          href: path(locale, 'room', r.slug),
          labelKey: roomKeys[i],
        })),
        { href: path(locale, 'full'), labelKey: 'nav.r6' },
      ],
    },
    { href: path(locale, 'cooking'), labelKey: 'nav.cook' },
    {
      href: path(locale, 'tours'),
      labelKey: 'nav.exp',
      children: [
        { href: path(locale, 'tours'), labelKey: 'nav.e1' },
        { href: path(locale, 'addresses'), labelKey: 'nav.e2' },
        { href: path(locale, 'press'), labelKey: 'nav.e3' },
      ],
    },
    { href: path(locale, 'gallery'), labelKey: 'nav.gal' },
    { href: path(locale, 'contact'), labelKey: 'nav.contact' },
  ];
}
