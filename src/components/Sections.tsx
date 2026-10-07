import Link from 'next/link';
import { Img } from './Img';
import { Ornament } from './Ornament';
import { Rich } from './Rich';
import { Arrow } from './Icons';
import { site } from '@/content/site';
import { path } from '@/content/routes';
import type { Locale, T } from '@/lib/i18n';

/** Hero banner for inner pages. */
export function PageHero({
  image,
  title,
  sub,
  crumb,
  locale,
  t,
}: {
  image: string;
  title: string;
  sub: string;
  crumb: string;
  locale: Locale;
  t: T;
}) {
  return (
    <section className="phero">
      <div className="phero__media">
        <Img src={image} alt="" priority sizes="100vw" />
      </div>
      <div className="phero__inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href={path(locale, 'home')}>{t('nav.home')}</Link>
          <span>/</span>
          <span>{crumb}</span>
        </nav>
        <Rich as="h1" className="phero__title" html={title} />
        <Rich as="p" className="phero__sub" html={sub} />
      </div>
    </section>
  );
}

/** Centred section heading with eyebrow and ornament. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'shead center reveal' : 'shead reveal'}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Rich as="h2" className="h2 display" html={title} />
      <Ornament left={!center} />
      {lede && <Rich as="p" className="lede" html={lede} />}
    </div>
  );
}

/** Framed image with the Moorish arch treatment. */
export function Frame({
  src,
  alt,
  variant = 'arch',
  tag,
  priority,
}: {
  src: string;
  alt: string;
  variant?: 'arch' | 'land' | 'sq';
  tag?: string;
  priority?: boolean;
}) {
  const cls = `frame frame--${variant}`;
  const ratio = variant === 'land' ? '5 / 4' : variant === 'sq' ? '1' : '4 / 5';
  return (
    <div className={cls} style={{ position: 'relative' }}>
      <div
        className="reveal-img"
        style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden' }}
      >
        <Img src={src} alt={alt} priority={priority} sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      {tag && <span className="frame__tag">{tag}</span>}
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({ image, locale, t }: { image: string; locale: Locale; t: T }) {
  return (
    <section className="cta-band zellige-dark on-dark">
      <div className="cta-band__bg">
        <Img src={image} alt="" sizes="100vw" />
      </div>
      <div className="wrap cta-band__inner reveal">
        <Rich as="h2" className="display" html={t('band.t')} />
        <Ornament />
        <Rich as="p" className="lede narrow" html={t('band.p')} />
        <div className="hero__cta">
          <a className="btn btn--brass" href={site.booking} target="_blank" rel="noopener">
            {t('cta.book')}
          </a>
          <Link className="btn btn--light" href={path(locale, 'contact')}>
            {t('cta.enquire')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LinkArrow({ href, label }: { href: string; label: string }) {
  return (
    <Link className="link-u" href={href}>
      <span>{label}</span>
      <Arrow />
    </Link>
  );
}
