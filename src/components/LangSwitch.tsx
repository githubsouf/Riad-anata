'use client';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

/**
 * EN/FR switch. Each locale is a real URL, so the choice is a navigation,
 * not a client-side swap — which is what makes both languages indexable.
 */
export function LangSwitch({
  locale,
  alternates,
}: {
  locale: Locale;
  alternates: Record<Locale, string>;
}) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {(['en', 'fr'] as const).map((l) => (
        <Link
          key={l}
          href={alternates[l]}
          hrefLang={l}
          aria-pressed={l === locale}
          aria-current={l === locale ? 'true' : undefined}
          prefetch={false}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
