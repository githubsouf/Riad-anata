import Link from 'next/link';
import { rooms, type Room as RoomType } from '@/content/rooms';
import { img } from '@/content/media';
import { site } from '@/content/site';
import { path } from '@/content/routes';
import { Img } from '../Img';
import { Figure } from '../Figure';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { Frame, PageHero, CtaBand } from '../Sections';
import { Conditions } from './Conditions';
import { Check } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

const amenityKeys = ['ra.1', 'ra.2', 'ra.3', 'ra.4', 'ra.5', 'ra.6'];

export function Room({ room, locale, t }: { room: RoomType; locale: Locale; t: T }) {
  const i = rooms.findIndex((r) => r.slug === room.slug);
  const prev = rooms[(i - 1 + rooms.length) % rooms.length];
  const next = rooms[(i + 1) % rooms.length];
  const k = room.key;

  return (
    <main id="main">
      <PageHero
        image={room.main}
        title={t(`room.${k}.name`)}
        sub={t(`room.${k}.blurb`)}
        crumb={t('nav.rooms')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap split">
          <div className="split__body reveal">
            <span className="eyebrow">{t(`room.${k}.loc`)}</span>
            <Rich as="h2" className="h2 display" html={t(`room.${k}.name`)} />
            <Ornament left />
            <p className="lede">{t(`room.${k}.long`)}</p>
            <p className="form-note" style={{ marginTop: '1.2rem' }}>
              {t('room.bedding')}
            </p>
            {room.extra && (
              <p className="form-note" style={{ marginTop: '1rem' }}>
                {t('room.extra')}
              </p>
            )}
            <table className="ptable" style={{ marginTop: '2.2rem' }}>
              <tbody>
                <tr>
                  <th>{t('rate.std')}</th>
                  <td>
                    <span className="price">
                      {room.rate} €<small>{t('unit.night')}</small>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>{t('rate.nr')}</th>
                  <td>
                    <span className="price">
                      {room.nonref} €<small>{t('unit.night')}</small>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="form-note" style={{ marginTop: '.9rem' }}>
              {t('rate.note')}
            </p>
            <div className="hero__cta" style={{ justifyContent: 'flex-start', marginTop: '2.2rem' }}>
              <a className="btn btn--solid" href={site.booking} target="_blank" rel="noopener">
                {t('cta.book')}
              </a>
              <Link className="btn" href={path(locale, 'contact')}>
                {t('cta.enquire')}
              </Link>
            </div>
          </div>
          <div className="split__media reveal" data-d="1">
            <Frame src={room.main} alt={t(`room.${k}.name`)} priority />
          </div>
        </div>
      </section>

      <section className="section bg-teal zellige-dark on-dark">
        <div className="wrap narrow center">
          <span className="eyebrow">{t('room.amen')}</span>
          <Rich as="h2" className="h2 display" html={t(`room.${k}.amen_t`)} />
          <Ornament />
          <ul className="ticks" style={{ textAlign: 'left', maxWidth: 460, marginInline: 'auto' }}>
            {amenityKeys.map((a) => (
              <li key={a}>
                <Check />
                <Rich as="span" html={t(a)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="shead center reveal">
            <Rich as="h2" className="h2 display" html={t('room.gal')} />
            <Ornament />
          </div>
          <div className="strip reveal" data-d="1">
            {room.gallery.map((g, n) => (
              <Figure
                key={g}
                src={g}
                alt={t(`room.${k}.name`)}
                ratio={1}
                index={n}
                sizes="(max-width: 680px) 50vw, 220px"
              />
            ))}
          </div>
        </div>
      </section>

      <Conditions t={t} />

      <section className="section">
        <div className="wrap grid grid-2">
          {[
            { r: prev, label: t('room.prev'), d: undefined },
            { r: next, label: t('room.next'), d: '1' },
          ].map(({ r, label, d }) => (
            <Link className="card reveal" data-d={d} href={path(locale, 'room', r.slug)} key={r.slug}>
              <div className="card__media" style={{ aspectRatio: '16 / 9' }}>
                <Img src={r.main} alt="" sizes="(max-width: 680px) 100vw, 50vw" />
              </div>
              <div className="card__body">
                <p className="card__meta">{label}</p>
                <h3 className="card__title">{t(`room.${r.key}.name`)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand image={img.rooftop} locale={locale} t={t} />
    </main>
  );
}
