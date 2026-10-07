import { img } from '@/content/media';
import { Img } from '../Img';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { PageHero, CtaBand } from '../Sections';
import type { Locale, T } from '@/lib/i18n';

const groups: { k: string; items: { k: string; image: string }[] }[] = [
  {
    k: 'ad.g1',
    items: [
      { k: 'ad.1', image: img.addr_4 },
      { k: 'ad.2', image: img.addr_5 },
      { k: 'ad.3', image: img.addr_6 },
    ],
  },
  {
    k: 'ad.g2',
    items: [
      { k: 'ad.4', image: img.addr_1 },
      { k: 'ad.5', image: img.addr_2 },
      { k: 'ad.6', image: img.addr_7 },
      { k: 'ad.7', image: img.addr_3 },
      { k: 'ad.8', image: img.addr_8 },
    ],
  },
];

export function Addresses({ locale, t }: { locale: Locale; t: T }) {
  return (
    <main id="main">
      <PageHero
        image={img.addr_1}
        title={t('ad.t')}
        sub={t('ad.sub')}
        crumb={t('nav.e2')}
        locale={locale}
        t={t}
      />
      <section className="section">
        <div className="wrap">
          {groups.map((g) => (
            <div key={g.k} style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
              <div className="shead reveal">
                <Rich as="h2" className="h2 display" html={t(`${g.k}.h`)} />
                <Ornament left />
              </div>
              <div className="grid grid-3">
                {g.items.map((x, i) => (
                  <article className="card reveal" data-d={(i % 3) + 1} key={x.k}>
                    <div className="card__media">
                      <Img src={x.image} alt="" />
                    </div>
                    <div className="card__body">
                      <Rich as="h3" className="card__title" html={t(x.k)} />
                      <Rich as="p" className="card__text" html={t(`${x.k}.d`)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand image={img.boutique} locale={locale} t={t} />
    </main>
  );
}
