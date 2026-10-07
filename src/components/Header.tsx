'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';
import { Chevron } from './Icons';
import { Wordmark } from './Wordmark';
import { LangSwitch } from './LangSwitch';
import type { NavItem } from '@/content/nav';
import type { Locale } from '@/lib/i18n';

type Props = {
  nav: NavItem[];
  labels: Record<string, string>;
  locale: Locale;
  alternates: Record<Locale, string>;
  bookLabel: string;
  bookLongLabel: string;
  whatsappLabel: string;
};

export function Header({
  nav,
  labels,
  locale,
  alternates,
  bookLabel,
  bookLongLabel,
  whatsappLabel,
}: Props) {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      setHidden(y > 420 && y > lastY.current && !document.body.classList.contains('is-locked'));
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', drawer);
    return () => document.body.classList.remove('is-locked');
  }, [drawer]);

  useEffect(() => {
    setDrawer(false);
    setOpenSub(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isCurrent = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <>
      <header
        className={['header', stuck && 'is-stuck', hidden && 'is-hidden']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="wrap header__inner">
          <Link className="brand" href={alternates[locale]} aria-label={site.name}>
            <Wordmark title={site.name} />
          </Link>

          <nav aria-label="Main">
            <ul className="nav">
              {nav.map((item) => (
                <li className="nav__item" key={item.labelKey}>
                  <Link
                    className="nav__link"
                    href={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                  >
                    <span>{labels[item.labelKey]}</span>
                    {item.children && <Chevron />}
                  </Link>
                  {item.children && (
                    <ul className="nav__sub">
                      {item.children.map((c) => (
                        <li key={c.labelKey}>
                          <Link href={c.href}>{labels[c.labelKey]}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <LangSwitch locale={locale} alternates={alternates} />
            <a
              className="btn btn--brass btn--sm"
              href={site.booking}
              target="_blank"
              rel="noopener"
            >
              {bookLabel}
            </a>
            <button
              className="burger"
              aria-expanded={drawer}
              aria-label="Menu"
              aria-controls="drawer"
              onClick={() => setDrawer((d) => !d)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={drawer ? 'drawer is-open' : 'drawer'} id="drawer">
        <ul>
          {nav.map((item) =>
            item.children ? (
              <li key={item.labelKey}>
                <button
                  className="drawer__toggle"
                  aria-expanded={openSub === item.labelKey}
                  onClick={() =>
                    setOpenSub((o) => (o === item.labelKey ? null : item.labelKey))
                  }
                >
                  <span>{labels[item.labelKey]}</span>
                  <Chevron />
                </button>
                <ul
                  className="drawer__sub"
                  style={{ maxHeight: openSub === item.labelKey ? '420px' : 0 }}
                >
                  {item.children.map((c) => (
                    <li key={c.labelKey}>
                      <Link href={c.href}>{labels[c.labelKey]}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.labelKey}>
                <Link href={item.href}>{labels[item.labelKey]}</Link>
              </li>
            ),
          )}
        </ul>
        <div className="drawer__foot">
          <a className="btn btn--brass" href={site.booking} target="_blank" rel="noopener">
            {bookLongLabel}
          </a>
          <a className="btn btn--light" href={site.whatsappHref} target="_blank" rel="noopener">
            {whatsappLabel}
          </a>
        </div>
      </div>
    </>
  );
}
