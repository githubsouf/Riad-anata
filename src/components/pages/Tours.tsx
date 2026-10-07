import { img } from '@/content/media';
import { Img } from '../Img';
import { Rich } from '../Rich';
import { PageHero, SectionHead, CtaBand } from '../Sections';
import { Car, Pin } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

const tours: { k: string; image: string }[] = [
  { k: 'tr.1', image: img.fes2 },
  { k: 'tr.2', image: img.tour_hero },
  { k: 'tr.3', image: img.addr_3 },
  { k: 'tr.4', image: img.addr_8 },
];

export function Tours({ locale, t }: { locale: Locale; t: T }) {
  return (
    <main id="main">
      <PageHero
        image={img.tour_hero}
        title={t('tr.t')}
        sub={t('tr.sub')}
        crumb={t('nav.e1')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap grid grid-2">
          <div className="card reveal" style={{ padding: 'clamp(1.8rem,3.4vw,2.6rem)' }}>
            <Car />
            <Rich as="h3" className="h3 display" html={t('tr.air')} />
            <Rich as="p" className="card__text" html={t('tr.air.d')} />
          </div>
          <div className="card reveal" data-d="1" style={{ padding: 'clamp(1.8rem,3.4vw,2.6rem)' }}>
            <Pin />
            <Rich as="h3" className="h3 display" html={t('tr.med')} />
            <Rich as="p" className="card__text" html={t('tr.med.d')} />
          </div>
        </div>
      </section>

      <section className="section bg-cream zellige">
        <div className="wrap">
          <SectionHead eyebrow={t('tr.k')} title={t('tr.t2')} />
          <div className="grid grid-2">
            {tours.map((x, i) => (
              <article className="card reveal" data-d={(i % 2) + 1} key={x.k}>
                <div className="card__media" style={{ aspectRatio: '16 / 10' }}>
                  <Img src={x.image} alt="" sizes="(max-width: 680px) 100vw, 50vw" />
                  <span className="card__badge">{t(`${x.k}.tag`)}</span>
                </div>
                <div className="card__body">
                  <Rich as="h3" className="card__title" html={t(x.k)} />
                  <Rich as="p" className="card__text" html={t(`${x.k}.d`)} />
                </div>
              </article>
            ))}
          </div>
          <p className="center form-note reveal" style={{ marginTop: '2.4rem' }}>
            {t('tr.note')}
          </p>
        </div>
      </section>

      <CtaBand image={img.fes} locale={locale} t={t} />
    </main>
  );
}
