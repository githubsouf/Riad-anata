import { Ornament } from '../Ornament';
import { Rich } from '../Rich';
import { Check } from '../Icons';
import type { T } from '@/lib/i18n';

const keys = ['c.1', 'c.2', 'c.3', 'c.4', 'c.5', 'c.6'];

/** The "good to know" block, shared by the rooms index and every room page. */
export function Conditions({ t }: { t: T }) {
  return (
    <section className="section bg-cream zellige">
      <div className="wrap">
        <div className="shead center reveal">
          <Rich as="h2" className="h2 display" html={t('cond.t')} />
          <Ornament />
        </div>
        <div className="feats reveal" data-d="1">
          {keys.map((k) => (
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
  );
}
