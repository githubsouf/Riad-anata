import Link from 'next/link';
import { site } from '@/content/site';
import { path } from '@/content/routes';
import { Wordmark } from './Wordmark';
import { Instagram, Facebook, WhatsApp } from './Icons';
import type { Locale, T } from '@/lib/i18n';

export function Footer({ locale, t }: { locale: Locale; t: T }) {
  const explore = [
    { href: path(locale, 'home'), label: t('nav.home') },
    { href: path(locale, 'rooms'), label: t('nav.rooms') },
    { href: path(locale, 'gallery'), label: t('nav.gal') },
    { href: path(locale, 'cooking'), label: t('nav.cook') },
  ];
  const stay = [
    { href: path(locale, 'tours'), label: t('nav.e1') },
    { href: path(locale, 'addresses'), label: t('nav.e2') },
    { href: path(locale, 'full'), label: t('nav.r6') },
    { href: path(locale, 'press'), label: t('nav.e3') },
  ];

  return (
    <footer className="footer">
      <div className="footer__top zellige-dark">
        <div className="wrap footer__grid">
          <div className="footer__brand">
            <Wordmark title={site.name} />
            {/* The lockup's own line — part of the mark, so it is not translated. */}
            <p className="brand__tag">Soulful stays &amp; cooking classes</p>
            <p>{t('foot.tag')}</p>
            <div className="socials">
              <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                <Instagram />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                <Facebook />
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp">
                <WhatsApp />
              </a>
            </div>
          </div>

          <div>
            <h4>{t('foot.explore')}</h4>
            <ul>
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('foot.stay')}</h4>
            <ul>
              {stay.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('foot.contact')}</h4>
            <ul>
              <li>
                <a href={site.maps} target="_blank" rel="noopener">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.whatsappHref} target="_blank" rel="noopener">
                  WhatsApp {site.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap footer__bar">
        <p>
          © {new Date().getFullYear()} {site.name} — {t('foot.rights')}
        </p>
        <p>{t('foot.credit')}</p>
      </div>
    </footer>
  );
}
