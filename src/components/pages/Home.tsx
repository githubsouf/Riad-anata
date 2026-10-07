import Link from 'next/link';
import { img, asset } from '@/content/media';
import { rooms } from '@/content/rooms';
import { site } from '@/content/site';
import { path } from '@/content/routes';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { Img } from '../Img';
import { HeroVideo } from '../HeroVideo';
import { Testimonials } from '../Testimonials';
import { Frame, SectionHead, CtaBand, LinkArrow } from '../Sections';
import { Pool, Sun, Cup, Chef, Wifi, Ac, Car, Baby, Arrow } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

const amenities = [
  { Icon: Pool, k: 'am.1' },
  { Icon: Sun, k: 'am.2' },
  { Icon: Cup, k: 'am.3' },
  { Icon: Chef, k: 'am.4' },
  { Icon: Wifi, k: 'am.5' },
  { Icon: Ac, k: 'am.6' },
  { Icon: Car, k: 'am.7' },
  { Icon: Baby, k: 'am.8' },
];

export function Home({ locale, t }: { locale: Locale; t: T }) {
  const experiences = [
    { k: 'x.1', href: path(locale, 'cooking'), image: img.cook_hero },
    { k: 'x.2', href: path(locale, 'tours'), image: img.tour_hero },
    { k: 'x.3', href: path(locale, 'addresses'), image: img.addr_1 },
  ];
  // ⚠ PLACEHOLDER — q1/q2/q3 in messages/{en,fr}.json are invented reviews,
  // kept only so the owner can judge the layout. Replace them with real
  // Booking/TripAdvisor quotes (text + first name + country) or delete this
  // section before the site goes public. Publishing invented testimonials as
  // genuine is misleading to guests and a legal risk for the riad.
  const quotes = ['q1', 'q2', 'q3'].map((k) => ({ text: t(k), who: t(`${k}.c`) }));

  return (
    <main id="main">
      <section className="hero">
        <HeroVideo
          video={asset.heroVideo}
          poster={img.hero_poster}
          audio={asset.heroAudio}
          soundLabel="Ambience"
        />
        <div className="hero__inner">
          <span className="hero__eyebrow">{t('hero.eyebrow')}</span>
          <h1 className="hero__title">
            {site.name}
            <Rich as="em" html={t('hero.em')} />
          </h1>
          <Rich as="p" className="hero__sub" html={t('hero.sub')} />
          <div className="hero__cta">
            <a className="btn btn--brass" href={site.booking} target="_blank" rel="noopener">
              {t('cta.book')}
            </a>
            <Link className="btn btn--light" href={path(locale, 'rooms')}>
              {t('cta.rooms')}
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <span>{t('hero.scroll')}</span>
          <i />
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--wide-img">
          <div className="split__media reveal">
            <Frame src={img.patio} alt="" tag={t('home.tag1')} priority />
          </div>
          <div className="split__body reveal" data-d="1">
            <span className="eyebrow">{t('home.k1')}</span>
            <Rich as="h2" className="h2 display" html={t('home.t1')} />
            <Ornament left />
            <Rich as="p" className="lede" html={t('home.p1')} />
            <Rich as="p" html={t('home.p2')} />
            <div className="stat-row">
              <div className="stat"><b>{site.rooms}</b><span>{t('home.s1')}</span></div>
              <div className="stat"><b>{site.maxGuests}</b><span>{t('home.s2')}</span></div>
              <div className="stat"><b>25&rsquo;</b><span>{t('home.s3')}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream zellige">
        <div className="wrap">
          <SectionHead eyebrow={t('home.k2')} title={t('home.t2')} lede={t('home.p3')} />
          <div className="grid grid-3 cards-row">
            {rooms.slice(0, 3).map((r, i) => (
              <article className="card room-card reveal" data-d={i + 1} key={r.key}>
                <div className="card__media">
                  <Img src={r.main} alt={t(`room.${r.key}.name`)} />
                </div>
                <div className="card__body">
                  <p className="card__meta">{t(`room.${r.key}.loc`)}</p>
                  <h3 className="card__title">{t(`room.${r.key}.name`)}</h3>
                  <p className="card__text">{t(`room.${r.key}.blurb`)}</p>
                  <div className="card__foot">
                    <span className="price">
                      {r.rate} €<small>{t('unit.night')}</small>
                    </span>
                    <LinkArrow href={path(locale, 'room', r.slug)} label={t('cta.view')} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="center" style={{ marginTop: '3rem' }}>
            <Link className="btn" href={path(locale, 'rooms')}>
              {t('cta.allrooms')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-teal zellige-dark on-dark">
        <div className="wrap split reverse">
          <div className="split__media reveal">
            <Frame src={img.fes} alt="" variant="land" />
          </div>
          <div className="split__body reveal" data-d="1">
            <span className="eyebrow">{t('home.k3')}</span>
            <Rich as="h2" className="h2 display" html={t('home.t3')} />
            <Ornament left />
            <Rich as="p" className="lede" html={t('home.p4')} />
            <Rich as="p" html={t('home.p5')} />
            <div style={{ marginTop: '1.4rem' }}>
              <LinkArrow href={path(locale, 'addresses')} label={t('cta.addresses')} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={t('home.k4')} title={t('home.t4')} />
          <div className="feats reveal" data-d="1">
            {amenities.map(({ Icon, k }) => (
              <div className="feat" key={k}>
                <Icon />
                <div>
                  <Rich as="b" html={t(k)} />
                  <span>{t(`${k}.d`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <SectionHead eyebrow={t('home.k5')} title={t('home.t5')} />
          <div className="grid grid-3 cards-row">
            {experiences.map((x, i) => (
              <Link className="card reveal" data-d={i + 1} href={x.href} key={x.k}>
                <div className="card__media">
                  <Img src={x.image} alt="" />
                </div>
                <div className="card__body">
                  <Rich as="h3" className="card__title" html={t(x.k)} />
                  <p className="card__text">{t(`${x.k}.d`)}</p>
                  <span className="link-u">
                    <span>{t('cta.view')}</span>
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal-deep zellige-dark on-dark">
        <div className="wrap">
          <Testimonials quotes={quotes} />
        </div>
      </section>

      <CtaBand image={img.rooftop} locale={locale} t={t} />
    </main>
  );
}
