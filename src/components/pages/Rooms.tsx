import { img } from '@/content/media';
import { rooms } from '@/content/rooms';
import { path } from '@/content/routes';
import { Img } from '../Img';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { Frame, PageHero, SectionHead, CtaBand, LinkArrow } from '../Sections';
import { Conditions } from './Conditions';
import type { Locale, T } from '@/lib/i18n';

export function Rooms({ locale, t }: { locale: Locale; t: T }) {
  return (
    <main id="main">
      <PageHero
        image={img.lounge}
        title={t('rooms.t')}
        sub={t('rooms.sub')}
        crumb={t('nav.rooms')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={t('rooms.k')} title={t('rooms.t2')} lede={t('rooms.p')} />
          <div className="grid grid-3">
            {rooms.map((r, i) => (
              <article className="card room-card reveal" data-d={(i % 3) + 1} key={r.key}>
                <div className="card__media">
                  <Img src={r.main} alt={t(`room.${r.key}.name`)} />
                  <span className="card__badge">{t(`room.${r.key}.loc`)}</span>
                </div>
                <div className="card__body">
                  <h3 className="card__title">{t(`room.${r.key}.name`)}</h3>
                  <p className="card__text">{t(`room.${r.key}.blurb`)}</p>
                  <div className="card__foot">
                    <span className="price">
                      <del>{r.rate} €</del>
                      {r.nonref} €<small>{t('unit.night')}</small>
                    </span>
                    <LinkArrow href={path(locale, 'room', r.slug)} label={t('cta.view')} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal zellige-dark on-dark">
        <div className="wrap split">
          <div className="split__media reveal">
            <Frame src={img.full} alt="" variant="land" />
          </div>
          <div className="split__body reveal" data-d="1">
            <span className="eyebrow">{t('rooms.k2')}</span>
            <Rich as="h2" className="h2 display" html={t('rooms.t3')} />
            <Ornament left />
            <Rich as="p" className="lede" html={t('rooms.p2')} />
            <div style={{ marginTop: '1.2rem' }}>
              <LinkArrow href={path(locale, 'full')} label={t('cta.full')} />
            </div>
          </div>
        </div>
      </section>

      <Conditions t={t} />
      <CtaBand image={img.night} locale={locale} t={t} />
    </main>
  );
}
