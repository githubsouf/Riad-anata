'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  booking,
  emptyDraft,
  lineItems,
  total,
  cooks,
  guests,
  firstBookableDay,
  toISO,
  type ClassType,
  type Draft,
} from '@/content/booking';
import { site } from '@/content/site';
import { Check, Prev, Next, Chef, Clock, Cup } from './Icons';
import { Ornament } from './Ornament';

type Labels = Record<string, string>;
type Mode = 'api' | 'message';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Cooking-class booking flow.
 *
 * It works with no backend at all: the request is handed to WhatsApp or email
 * with everything pre-filled. Set NEXT_PUBLIC_BOOKING_MODE=api once the riad
 * has a mail key and the same flow posts to /api/booking instead — no change
 * to this component.
 */
export function BookingWidget({ labels, locale }: { labels: Labels; locale: string }) {
  const l = (k: string) => labels[k] ?? k;
  const mode: Mode = process.env.NEXT_PUBLIC_BOOKING_MODE === 'api' ? 'api' : 'message';

  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Dates are resolved after mount so the server and the client never disagree.
  const [minDay, setMinDay] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null);

  useEffect(() => {
    const min = firstBookableDay();
    setMinDay(min);
    const d = new Date(min);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  }, []);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [k]: v }));

  const maxDay = useMemo(() => {
    if (!minDay) return null;
    const d = new Date(minDay);
    d.setMonth(d.getMonth() + booking.maxMonthsAhead);
    return toISO(d);
  }, [minDay]);

  const money = useMemo(
    () => new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
    }),
    [locale],
  );

  const longDate = (iso: string) =>
    new Date(iso + 'T12:00:00').toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

  /* ------------------------------------------------------------- validation */
  function validate(upTo: number): string[] {
    const e: string[] = [];
    if (upTo >= 0) {
      if (!draft.date) e.push(l('bk.errDate'));
      if (!draft.slot) e.push(l('bk.errSlot'));
    }
    if (upTo >= 1 && cooks(draft) < 1) e.push(l('bk.errParty'));
    if (upTo >= 2) {
      if (draft.name.trim().length < 2) e.push(l('bk.errName'));
      if (!EMAIL_RE.test(draft.email)) e.push(l('bk.errEmail'));
    }
    return e;
  }

  function go(next: number) {
    if (next > step) {
      const e = validate(step);
      setErrors(e);
      if (e.length) return;
    }
    setErrors([]);
    setStep(next);
  }

  /* ------------------------------------------------------------- submission */
  function summaryText() {
    const lines = [
      l('bk.request'),
      '',
      `${l('bk.type')}: ${draft.classType === 'private' ? l('bk.private') : l('bk.group')}`,
      `${l('bk.date')}: ${draft.date ? longDate(draft.date) : '—'} ${l('bk.at')} ${draft.slot}`,
      `${l('bk.cooking')}: ${draft.adults} + ${draft.children}`,
      draft.mealAdults + draft.mealChildren > 0
        ? `${l('bk.mealOnly')}: ${draft.mealAdults} + ${draft.mealChildren}`
        : null,
      draft.vegetarian ? `${l('bk.veg')}: ✓` : null,
      `${l('bk.totalLabel')}: ${money.format(total(draft))}`,
      '',
      `${l('bk.name')}: ${draft.name}`,
      `${l('bk.email')}: ${draft.email}`,
      draft.phone ? `${l('bk.phone')}: ${draft.phone}` : null,
      draft.notes ? `${l('bk.notes')}: ${draft.notes}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  }

  async function submit() {
    const e = validate(2);
    setErrors(e);
    if (e.length) return;

    if (mode === 'api') {
      setSending(true);
      try {
        const res = await fetch('/api/booking/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...draft, locale, total: total(draft) }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setDone(true);
      } catch {
        setErrors([l('bk.errSend')]);
      } finally {
        setSending(false);
      }
      return;
    }
    // No backend: the guest carries the request over in one tap.
    setDone(true);
    window.open(
      `${site.whatsappHref}?text=${encodeURIComponent(summaryText())}`,
      '_blank',
      'noopener',
    );
  }

  function downloadIcs() {
    if (!draft.date || !draft.slot) return;
    const [h, m] = draft.slot.split(':').map(Number);
    const start = new Date(`${draft.date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
    const end = new Date(start.getTime() + 4 * 3600 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Riad Anata//Cooking Class//EN',
      'BEGIN:VEVENT', `UID:${Date.now()}@riad-anata.com`, `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
      'SUMMARY:Riad Anata — Cooking class',
      `LOCATION:${site.address.street}\\, ${site.address.city}\\, ${site.address.country}`,
      'DESCRIPTION:' + summaryText().replace(/\n/g, '\\n'),
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    a.download = 'riad-anata-cooking-class.ics';
    a.click();
  }

  /* ------------------------------------------------------------------- bits */
  function stepper({
    field, label, hint, min = 0,
  }: { field: keyof Draft; label: string; hint: string; min?: number }) {
    const value = draft[field] as number;
    return (
      <div className="bk-count">
        <div>
          <b>{label}</b>
          <span>{hint}</span>
        </div>
        <div className="bk-count__ctrl">
          <button
            type="button"
            onClick={() => set(field, Math.max(min, value - 1) as never)}
            disabled={value <= min}
            aria-label={`− ${label}`}
          >−</button>
          <output>{value}</output>
          <button
            type="button"
            onClick={() => set(field, Math.min(booking.maxPerField, value + 1) as never)}
            disabled={value >= booking.maxPerField}
            aria-label={`+ ${label}`}
          >+</button>
        </div>
      </div>
    );
  }

  function calendar() {
    if (!cursor || !minDay || !maxDay) return <div className="bk-cal bk-cal--idle" />;
    const first = new Date(cursor.y, cursor.m, 1);
    const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // weeks start on Monday
    const loc = locale === 'fr' ? 'fr-FR' : 'en-GB';
    const monthName = first.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
    const dow = Array.from({ length: 7 }, (_, i) =>
      new Date(2024, 0, 1 + i).toLocaleDateString(loc, { weekday: 'short' }).slice(0, 2),
    );
    const shift = (n: number) => {
      const d = new Date(cursor.y, cursor.m + n, 1);
      setCursor({ y: d.getFullYear(), m: d.getMonth() });
    };
    const canBack = toISO(new Date(cursor.y, cursor.m, 1)) > minDay;
    const canFwd = toISO(new Date(cursor.y, cursor.m + 1, 1)) <= maxDay;

    return (
      <div className="bk-cal">
        <div className="bk-cal__head">
          <button type="button" onClick={() => shift(-1)} disabled={!canBack} aria-label="←">
            <Prev />
          </button>
          <strong>{monthName}</strong>
          <button type="button" onClick={() => shift(1)} disabled={!canFwd} aria-label="→">
            <Next />
          </button>
        </div>
        <div className="bk-cal__dow">
          {dow.map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="bk-cal__grid">
          {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: days }, (_, i) => {
            const iso = toISO(new Date(cursor.y, cursor.m, i + 1));
            const off = iso < minDay || iso > maxDay;
            return (
              <button
                key={iso}
                type="button"
                className="bk-cal__day"
                disabled={off}
                aria-pressed={draft.date === iso}
                onClick={() => set('date', iso)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- summary */
  const items = lineItems(draft);
  const Summary = (
    <aside className="bk__aside">
      <div className="bk-recap">
        <p className="eyebrow">{l('bk.summary')}</p>
        {draft.date && (
          <p className="bk-recap__when">
            {longDate(draft.date)}
            {draft.slot ? ` · ${draft.slot}` : ''}
          </p>
        )}
        <ul className="bk-recap__lines">
          {items.length === 0 && <li className="bk-recap__empty">{l('bk.empty')}</li>}
          {items.map((it) => (
            <li key={it.key}>
              <span>
                {l(`bk.${it.key}`)} <i>× {it.qty}</i>
              </span>
              <b>{money.format(it.qty * it.unit)}</b>
            </li>
          ))}
        </ul>
        <div className="bk-recap__total">
          <span>{l('bk.totalLabel')}</span>
          <b>{money.format(total(draft))}</b>
        </div>
        <p className="bk-recap__tax">{l('bk.tax')}</p>
      </div>
    </aside>
  );

  /* --------------------------------------------------------------- render */
  if (done) {
    return (
      <div className="bk bk--done">
        <div className="bk-done">
          <span className="bk-done__mark"><Check /></span>
          <h3 className="h3 display">{l('bk.okTitle')}</h3>
          <Ornament />
          <p className="lede">{l('bk.okBody')}</p>
          <pre className="bk-done__recap">{summaryText()}</pre>
          <div className="bk-done__cta">
            {mode === 'message' && (
              <a
                className="btn btn--solid"
                href={`${site.whatsappHref}?text=${encodeURIComponent(summaryText())}`}
                target="_blank"
                rel="noopener"
              >
                {l('bk.okWhatsapp')}
              </a>
            )}
            <a
              className="btn"
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                'Cooking class — ' + (draft.date ?? ''),
              )}&body=${encodeURIComponent(summaryText())}`}
            >
              {l('bk.okEmail')}
            </a>
            <button className="btn" type="button" onClick={downloadIcs}>
              {l('bk.okIcs')}
            </button>
          </div>
          <button
            className="link-u"
            type="button"
            onClick={() => { setDraft(emptyDraft); setStep(0); setDone(false); }}
          >
            {l('bk.okAgain')}
          </button>
        </div>
      </div>
    );
  }

  const stepLabels = [l('bk.step1'), l('bk.step2'), l('bk.step3')];

  return (
    <div className="bk">
      <div className="bk__main">
        <ol className="bk-steps" aria-label={l('bk.title')}>
          {stepLabels.map((s, i) => (
            <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>
              <button type="button" onClick={() => i < step && go(i)} disabled={i > step}>
                <i>{i + 1}</i>
                <span>{s}</span>
              </button>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="bk-panel">
            <fieldset className="bk-choice">
              <legend>{l('bk.type')}</legend>
              {(['group', 'private'] as ClassType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className="bk-choice__opt"
                  aria-pressed={draft.classType === t}
                  onClick={() => set('classType', t)}
                >
                  {t === 'group' ? <Chef /> : <Cup />}
                  <b>{l(`bk.${t}`)}</b>
                  <span>{l(`bk.${t}.d`)}</span>
                  <em>{money.format(booking.prices[t])} <small>/ pers.</small></em>
                </button>
              ))}
            </fieldset>

            <div className="bk-when">
              <div className="bk-field">
                <p className="bk-label">{l('bk.date')}</p>
                {calendar()}
              </div>

              <div className="bk-field">
                <p className="bk-label">{l('bk.slot')}</p>
                <div className="bk-slots">
                  {booking.slots.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      className="bk-slot"
                      aria-pressed={draft.slot === s}
                      onClick={() => set('slot', s)}
                    >
                      <Clock />
                      <b>{s}</b>
                      <span>{i === 0 ? l('bk.morning') : l('bk.afternoon')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bk-panel">
            <p className="bk-label">{l('bk.party')}</p>
            <div className="bk-counts">
              {stepper({ field: 'adults', label: l('bk.adults'), hint: l('bk.adults.d') })}
              {stepper({ field: 'children', label: l('bk.children'), hint: l('bk.children.d') })}
              {stepper({ field: 'mealAdults', label: l('bk.mealAdults'), hint: l('bk.mealAdults.d') })}
              {stepper({ field: 'mealChildren', label: l('bk.mealChildren'), hint: l('bk.mealChildren.d') })}
            </div>
            <label className="bk-check">
              <input
                type="checkbox"
                checked={draft.vegetarian}
                onChange={(e) => set('vegetarian', e.target.checked)}
              />
              <span><b>{l('bk.veg')}</b><i>{l('bk.veg.d')}</i></span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="bk-panel">
            <p className="bk-label">{l('bk.you')}</p>
            <div className="bk-grid">
              <div className="field">
                <label htmlFor="bk-name">{l('bk.name')}</label>
                <input id="bk-name" value={draft.name} autoComplete="name"
                  onChange={(e) => set('name', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="bk-email">{l('bk.email')}</label>
                <input id="bk-email" type="email" value={draft.email} autoComplete="email"
                  onChange={(e) => set('email', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="bk-phone">{l('bk.phone')}</label>
                <input id="bk-phone" type="tel" value={draft.phone} autoComplete="tel"
                  onChange={(e) => set('phone', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="bk-notes">{l('bk.notes')}</label>
              <textarea id="bk-notes" value={draft.notes} placeholder={l('bk.notes.ph')}
                onChange={(e) => set('notes', e.target.value)} />
            </div>
            <p className="form-note">{l('bk.requestNote')}</p>
          </div>
        )}

        {errors.length > 0 && (
          <ul className="bk-errors" role="alert">
            {errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        )}

        <div className="bk-nav">
          {step > 0 && (
            <button className="btn" type="button" onClick={() => go(step - 1)}>
              {l('bk.back')}
            </button>
          )}
          {step < 2 ? (
            <button className="btn btn--solid" type="button" onClick={() => go(step + 1)}>
              {l('bk.next')}
            </button>
          ) : (
            <button className="btn btn--solid" type="button" onClick={submit} disabled={sending}>
              {sending ? l('bk.sending') : l('bk.send')}
            </button>
          )}
        </div>
      </div>

      {Summary}
    </div>
  );
}
