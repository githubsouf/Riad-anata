import { img } from '@/content/media';
import { site } from '@/content/site';
import { Figure } from '../Figure';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { PageHero, SectionHead, CtaBand } from '../Sections';
import { Check } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

const included = ['fr.1', 'fr.2', 'fr.3', 'fr.4', 'fr.5', 'fr.6'];

export function FullRenting({ locale, t }: { locale: Locale; t: T }) {
  return (
    <main id="main">
      <PageHero
        image={img.full}
        title={t('full.t')}
        sub={t('full.sub')}
        crumb={t('nav.r6')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap narrow center reveal">
          <span className="eyebrow">{t('full.k')}</span>
          <Rich as="h2" className="h2 display" html={t('full.t2')} />
          <Ornament />
          <Rich as="p" className="lede" html={t('full.p')} />
          <p className="form-note" style={{ marginTop: '1.4rem' }}>
            {t('full.tax')}
          </p>
          <div className="hero__cta" style={{ marginTop: '2.4rem' }}>
            <a
              className="btn btn--solid"
              href={`mailto:${site.email}?subject=${encodeURIComponent('Exclusive rental enquiry')}`}
            >
              {t('cta.enquire')}
            </a>
            <a className="btn" href={`tel:${site.phoneHref}`}>
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-cream zellige">
        <div className="wrap">
          <SectionHead title={t('full.t3')} />
          <div className="feats reveal" data-d="1">
            {included.map((k) => (
              <div className="feat" key={k}>
                <Check />
                <div>
                  <Rich as="b" html={t(k)} />
                  <Rich as="span" html={t(`${k}.d`)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-3">
          <Figure src={img.patio} alt="Patio" ratio={4 / 5} />
          <Figure src={img.salon} alt="Moroccan salon" ratio={4 / 5} />
          <Figure src={img.rooftop} alt="Rooftop terrace" ratio={4 / 5} />
        </div>
      </section>

      <CtaBand image={img.terrace} locale={locale} t={t} />
    </main>
  );
}
