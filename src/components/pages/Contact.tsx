import { img } from '@/content/media';
import { site } from '@/content/site';
import { ContactForm } from '../ContactForm';
import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { PageHero, CtaBand } from '../Sections';
import { Pin, Phone, Mail, WhatsApp } from '../Icons';
import type { Locale, T } from '@/lib/i18n';

export function Contact({ locale, t }: { locale: Locale; t: T }) {
  const formLabels = {
    name: t('f.name'),
    email: t('f.email'),
    arrival: t('f.arrival'),
    departure: t('f.departure'),
    guests: t('f.guests'),
    msg: t('f.msg'),
    send: t('f.send'),
    ok: t('f.ok'),
    note: t('f.note'),
  };
  const bbox = '-4.9865%2C34.0570%2C-4.9705%2C34.0680';
  const marker = `${site.address.lat}%2C${site.address.lng}`;

  return (
    <main id="main">
      <PageHero
        image={img.entrance}
        title={t('ct.t')}
        sub={t('ct.sub')}
        crumb={t('nav.contact')}
        locale={locale}
        t={t}
      />

      <section className="section">
        <div className="wrap info-tiles reveal">
          <div className="info-tile">
            <Pin />
            <p className="eyebrow">{t('ct.1')}</p>
            <a href={site.maps} target="_blank" rel="noopener">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </a>
          </div>
          <div className="info-tile">
            <Phone />
            <p className="eyebrow">{t('ct.2')}</p>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          </div>
          <div className="info-tile">
            <Mail />
            <p className="eyebrow">{t('ct.3')}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="info-tile">
            <WhatsApp />
            <p className="eyebrow">{t('ct.4')}</p>
            <a href={site.whatsappHref} target="_blank" rel="noopener">
              {site.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="split__body reveal">
            <span className="eyebrow">{t('ct.k')}</span>
            <Rich as="h2" className="h2 display" html={t('ct.t2')} />
            <Ornament left />
            <ContactForm labels={formLabels} />
          </div>
          <div className="split__media reveal" data-d="1">
            <div className="map-wrap">
              <iframe
                title="Riad Anata"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
              />
            </div>
            <a
              className="btn btn--sm"
              style={{ marginTop: '1.2rem' }}
              href={site.maps}
              target="_blank"
              rel="noopener"
            >
              {t('ct.open')}
            </a>
            <div style={{ marginTop: '2rem' }}>
              <Rich as="h3" className="h3 display" html={t('ct.park')} />
              <Rich as="p" className="card__text" html={t('ct.park.d')} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand image={img.stair} locale={locale} t={t} />
    </main>
  );
}
