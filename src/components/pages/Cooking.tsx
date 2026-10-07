import { img } from '@/content/media';
import { site } from '@/content/site';
import { BK_KEYS } from '@/content/booking';
import { BookingWidget } from '../BookingWidget';
import { Figure } from '../Figure';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { Frame, PageHero, SectionHead, CtaBand } from '../Sections';
import { Check } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

const steps = ['ck.1', 'ck.2', 'ck.3', 'ck.4'];
const prices: [string, string, string][] = [
  ['cp.1', '50 €', '/ pers.'],
  ['cp.2', '80 €', '/ pers.'],
  ['cp.3', '40 €', '/ pers.'],
  ['cp.4', '25 €', '/ pers.'],
  ['cp.5', '15 €', '/ pers.'],
];
const ingredients = Array.from({ length: 13 }, (_, i) => `ing.${i}`);
const shots = [
  img.cook_market, img.cook_1, img.cook_2, img.cook_3,
  img.cook_4, img.cook_5, img.cook_6, img.cook_7, img.cook_8,
];

export function Cooking({ locale, t }: { locale: Locale; t: T }) {
  // The widget is a client component, so it gets plain strings, not the translator.
  const bk = Object.fromEntries(BK_KEYS.map((k) => [k, t(k)]));

  return (
    <main id="main">
      <PageHero
        image={img.cook_hero}
        title={t('ck.t')}
        sub={t('ck.sub')}
        crumb={t('nav.cook')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap split">
          <div className="split__body reveal">
            <span className="eyebrow">{t('ck.k')}</span>
            <Rich as="h2" className="h2 display" html={t('ck.t2')} />
            <Ornament left />
            <Rich as="p" className="lede" html={t('ck.p1')} />
            <Rich as="p" html={t('ck.p2')} />
            <div className="stat-row">
              <div className="stat"><b>4h</b><span>{t('ck.s1')}</span></div>
              <div className="stat"><b>3</b><span>{t('ck.s2')}</span></div>
              <div className="stat"><b>50 €</b><span>{t('ck.s3')}</span></div>
            </div>
          </div>
          <div className="split__media reveal" data-d="1">
            <Frame src={img.cook_market} alt="" priority />
          </div>
        </div>
      </section>

      <section className="section bg-cream zellige">
        <div className="wrap">
          <SectionHead eyebrow={t('ck.k2')} title={t('ck.t3')} />
          <div className="narrow steps">
            {steps.map((k) => (
              <div className="step reveal" key={k}>
                <div>
                  <Rich as="h3" html={t(k)} />
                  <Rich as="p" html={t(`${k}.d`)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal zellige-dark on-dark">
        <div className="wrap split">
          <div className="split__body reveal">
            <span className="eyebrow">{t('ck.k3')}</span>
            <Rich as="h2" className="h2 display" html={t('ck.t4')} />
            <Ornament left />
            <table className="ptable">
              <tbody>
                {prices.map(([k, price, unit]) => (
                  <tr key={k}>
                    <th>{t(k)}</th>
                    <td>
                      <span className="price">
                        {price}
                        <small>{unit}</small>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Rich as="p" className="form-note" html={t('ck.note')} />
            <div className="hero__cta" style={{ justifyContent: 'flex-start', marginTop: '2rem' }}>
              <a className="btn btn--brass" href="#reserver">
                {t('cta.bookclass')}
              </a>
              <a className="btn btn--light" href={site.whatsappHref} target="_blank" rel="noopener">
                {t('cta.whatsapp')}
              </a>
            </div>
          </div>
          <div className="split__media reveal" data-d="1">
            <Frame src={img.cook_8} alt="" variant="land" />
          </div>
        </div>
      </section>

      <section className="section" id="reserver">
        <div className="wrap">
          <SectionHead title={t('bk.title')} lede={t('bk.lede')} />
          <BookingWidget labels={bk} locale={locale} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={t('ck.k4')} title={t('ck.t5')} lede={t('ck.p3')} />
          <div className="split narrow" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
            <div className="reveal">
              <Rich as="h3" className="h3 display" html={t('ck.ing')} />
              <ul className="ticks" style={{ marginTop: '1.2rem' }}>
                {ingredients.map((k) => (
                  <li key={k}>
                    <Check />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" data-d="1">
              <Rich as="h3" className="h3 display" html={t('ck.met')} />
              {['ck.m1', 'ck.m2', 'ck.m3', 'ck.m4'].map((k) => (
                <Rich as="p" key={k} html={t(k)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <SectionHead title={t('ck.t6')} />
          <div className="strip reveal" data-d="1">
            {shots.map((s, i) => (
              <Figure key={s} src={s} alt={t('ck.t')} ratio={1} index={i} sizes="(max-width: 680px) 50vw, 220px" />
            ))}
          </div>
        </div>
      </section>

      <CtaBand image={img.breakfast} locale={locale} t={t} />
    </main>
  );
}
