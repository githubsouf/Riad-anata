import { img } from '@/content/media';
import { site } from '@/content/site';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { PageHero, SectionHead } from '../Sections';
import type { Locale, T } from '@/lib/i18n';

const press = ['Bontena', 'The Telegraph', 'The Guardian', "L'Eventail"];
const blogs = [
  "Pépites d'Amour", 'Camilla Mount', 'Anousha Probyn', 'Fleur Sophia', 'Travel Mag',
  'Brussels Kitchen', 'Sugar and Stamps', 'The Brussels Sprouts', 'Svadore', 'Maroc Mama',
  'Valises en Famille', 'Passageiro de Primeira', 'Local Hideaways', 'Packing My Suitcase',
];

function Wall({ names }: { names: string[] }) {
  return (
    <ul className="grid grid-4">
      {names.map((n) => (
        <li className="card reveal" key={n} style={{ padding: '1.5rem 1.2rem', textAlign: 'center' }}>
          <span className="display" style={{ fontSize: '1.3rem' }}>
            {n}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Press({ locale, t }: { locale: Locale; t: T }) {
  return (
    <main id="main">
      <PageHero
        image={img.press_hero}
        title={t('pr.t')}
        sub={t('pr.sub')}
        crumb={t('nav.e3')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap narrow center reveal">
          <span className="eyebrow">{t('pr.k')}</span>
          <Rich as="h2" className="h2 display" html={t('pr.t2')} />
          <Ornament />
          <Rich as="p" className="lede" html={t('pr.p')} />
        </div>
        <div className="wrap" style={{ marginTop: '3rem' }}>
          <Wall names={press} />
        </div>
      </section>

      <section className="section bg-cream zellige">
        <div className="wrap">
          <SectionHead title={t('pr.t3')} />
          <Wall names={blogs} />
        </div>
      </section>

      <section className="section bg-teal zellige-dark on-dark">
        <div className="wrap narrow center reveal">
          <Rich as="h2" className="h2 display" html={t('pr.t4')} />
          <Ornament />
          <Rich as="p" className="lede" html={t('pr.p2')} />
          <div className="hero__cta">
            <a
              className="btn btn--brass"
              href={`mailto:${site.email}?subject=${encodeURIComponent('Press enquiry')}`}
            >
              {t('cta.press')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
