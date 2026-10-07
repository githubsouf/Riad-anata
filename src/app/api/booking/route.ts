import { booking, lineItems, type Draft } from '@/content/booking';
import { site } from '@/content/site';

/**
 * Cooking-class booking requests.
 *
 * Dormant until the riad has a mail key. Set RESEND_API_KEY and
 * NEXT_PUBLIC_BOOKING_MODE=api and the widget posts here instead of handing
 * the request to WhatsApp. No database: the two emails are the record.
 *
 * To use another provider, replace sendMail() — nothing else changes.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 10;

function clean(v: unknown, max = 400) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function count(v: unknown) {
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 && n <= MAX ? n : 0;
}

/** Never trust the total that came from the browser — recompute it. */
function priceOf(d: Draft) {
  return lineItems(d).reduce((s, l) => s + l.qty * l.unit, 0);
}

async function sendMail(to: string, subject: string, text: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM ?? 'Riad Anata <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`mail provider ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad_json' }, { status: 400 });
  }

  const draft: Draft = {
    classType: body.classType === 'private' ? 'private' : 'group',
    date: clean(body.date, 10) || null,
    slot: (booking.slots as readonly string[]).includes(clean(body.slot, 5))
      ? clean(body.slot, 5)
      : null,
    adults: count(body.adults),
    children: count(body.children),
    mealAdults: count(body.mealAdults),
    mealChildren: count(body.mealChildren),
    vegetarian: body.vegetarian === true,
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 60),
    notes: clean(body.notes, 1200),
  };

  const problems: string[] = [];
  if (!draft.date || !/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) problems.push('date');
  if (!draft.slot) problems.push('slot');
  if (draft.adults + draft.children < 1) problems.push('party');
  if (draft.name.length < 2) problems.push('name');
  if (!EMAIL_RE.test(draft.email)) problems.push('email');
  if (draft.date && draft.date < new Date().toISOString().slice(0, 10)) problems.push('past');
  if (problems.length) return Response.json({ error: 'invalid', problems }, { status: 422 });

  const amount = priceOf(draft);
  const locale = body.locale === 'fr' ? 'fr' : 'en';

  const recap = [
    `${draft.classType === 'private' ? 'Private' : 'Group'} class`,
    `${draft.date} at ${draft.slot}`,
    `Cooking: ${draft.adults} adult(s), ${draft.children} child(ren)`,
    `Meal only: ${draft.mealAdults} adult(s), ${draft.mealChildren} child(ren)`,
    draft.vegetarian ? 'Vegetarian menu requested' : null,
    `Estimated total: ${amount} EUR (city tax not included)`,
    '',
    `Name: ${draft.name}`,
    `Email: ${draft.email}`,
    draft.phone ? `Phone: ${draft.phone}` : null,
    draft.notes ? `Notes: ${draft.notes}` : null,
  ].filter(Boolean).join('\n');

  try {
    await sendMail(
      site.email,
      `Cooking class request — ${draft.date} ${draft.slot} — ${draft.name}`,
      recap,
      draft.email,
    );
    await sendMail(
      draft.email,
      locale === 'fr'
        ? 'Votre demande de cours de cuisine — Riad Anata'
        : 'Your cooking class request — Riad Anata',
      locale === 'fr'
        ? `Merci ${draft.name},\n\nNous avons bien reçu votre demande. Elle n'est pas encore confirmée : nous revenons vers vous très vite pour valider la disponibilité.\n\n${recap}\n\nRiad Anata — ${site.phone}`
        : `Thank you ${draft.name},\n\nWe have your request. It is not confirmed yet — we will come back to you shortly to confirm availability.\n\n${recap}\n\nRiad Anata — ${site.phone}`,
    );
  } catch (err) {
    console.error('[booking]', err);
    return Response.json({ error: 'mail_failed' }, { status: 502 });
  }

  return Response.json({ ok: true, total: amount });
}
