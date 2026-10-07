'use client';
import { useState } from 'react';
import { site } from '@/content/site';

/**
 * No backend yet: the form composes a mail to the riad.
 * To use a real endpoint, replace the body of `onSubmit` with a POST
 * to /api/contact (or Formspree, Resend, etc.).
 */
export type FormLabels = Record<
  'name' | 'email' | 'arrival' | 'departure' | 'guests' | 'msg' | 'send' | 'ok' | 'note',
  string
>;

export function ContactForm({ labels }: { labels: FormLabels }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form"
      style={{ marginTop: '1.6rem' }}
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const body = [
          `Name: ${d.get('name') ?? ''}`,
          `Email: ${d.get('email') ?? ''}`,
          `Arrival: ${d.get('arrival') || '-'}`,
          `Departure: ${d.get('departure') || '-'}`,
          `Guests: ${d.get('guests') || '-'}`,
          '',
          String(d.get('message') ?? ''),
        ].join('\n');
        window.location.href =
          `mailto:${site.email}?subject=` +
          encodeURIComponent(`Website enquiry — ${d.get('name') ?? ''}`) +
          `&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="field">
        <label htmlFor="n">{labels.name}</label>
        <input id="n" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="e">{labels.email}</label>
        <input id="e" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid grid-2" style={{ gap: '1rem' }}>
        <div className="field">
          <label htmlFor="a">{labels.arrival}</label>
          <input id="a" name="arrival" type="date" />
        </div>
        <div className="field">
          <label htmlFor="d">{labels.departure}</label>
          <input id="d" name="departure" type="date" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="g">{labels.guests}</label>
        <input id="g" name="guests" type="number" min={1} max={site.maxGuests} defaultValue={2} />
      </div>
      <div className="field">
        <label htmlFor="m">{labels.msg}</label>
        <textarea id="m" name="message" required />
      </div>
      <button className="btn btn--solid" type="submit">
        {labels.send}
      </button>
      {sent && <p className="form-note">{labels.ok}</p>}
      <p className="form-note">{labels.note}</p>
    </form>
  );
}
