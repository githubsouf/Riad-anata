import en from '@/content/messages/en.json';
import fr from '@/content/messages/fr.json';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Record<string, string>> = { en, fr };

export function getMessages(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Translator. Falls back to English, then to the key itself. */
export function createT(locale: Locale) {
  const dict = getMessages(locale);
  const fallback = dictionaries[defaultLocale];
  return (key: string): string => dict[key] ?? fallback[key] ?? key;
}

export type T = ReturnType<typeof createT>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
