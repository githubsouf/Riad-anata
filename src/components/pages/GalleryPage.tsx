import { img } from '@/content/media';
import { GalleryGrid } from '../GalleryGrid';
import { galleryCats } from '@/content/gallery';
import { PageHero, CtaBand } from '../Sections';
import type { Locale, T } from '@/lib/i18n';

export function GalleryPage({ locale, t }: { locale: Locale; t: T }) {
  const catLabels = Object.fromEntries(
    galleryCats.map((c) => [c, t(`gal.${c}`)]),
  ) as Record<string, string>;
  return (
    <main id="main">
      <PageHero
        image={img.preview}
        title={t('gal.t')}
        sub={t('gal.sub')}
        crumb={t('nav.gal')}
        locale={locale}
        t={t}
      />
      <section className="section">
        <div className="wrap">
          <GalleryGrid catLabels={catLabels} />
        </div>
      </section>
      <CtaBand image={img.door} locale={locale} t={t} />
    </main>
  );
}
