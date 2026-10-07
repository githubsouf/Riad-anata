/**
 * Cooking-class booking configuration.
 *
 * Prices and times come from the riad's published rates. They live here so a
 * change is one edit, not a hunt through components.
 */
export const booking = {
  slots: ['10:00', '15:00'] as const,
  /** The chef shops at the market that morning, so same-day is not offered. */
  minDaysAhead: 1,
  maxMonthsAhead: 12,
  maxPerField: 10,
  prices: {
    group: 50,
    private: 80,
    child: 40,
    mealAdult: 25,
    mealChild: 15,
  },
} as const;

export type ClassType = 'group' | 'private';

export type Party = {
  adults: number;
  children: number;
  mealAdults: number;
  mealChildren: number;
};

export type Draft = Party & {
  classType: ClassType;
  date: string | null;
  slot: string | null;
  vegetarian: boolean;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export const emptyDraft: Draft = {
  classType: 'group',
  date: null,
  slot: null,
  adults: 2,
  children: 0,
  mealAdults: 0,
  mealChildren: 0,
  vegetarian: false,
  name: '',
  email: '',
  phone: '',
  notes: '',
};

export function lineItems(d: Draft) {
  const p = booking.prices;
  const rate = d.classType === 'private' ? p.private : p.group;
  return [
    { key: 'adults', qty: d.adults, unit: rate },
    { key: 'children', qty: d.children, unit: p.child },
    { key: 'mealAdults', qty: d.mealAdults, unit: p.mealAdult },
    { key: 'mealChildren', qty: d.mealChildren, unit: p.mealChild },
  ].filter((l) => l.qty > 0);
}

export const total = (d: Draft) =>
  lineItems(d).reduce((sum, l) => sum + l.qty * l.unit, 0);

export const cooks = (d: Draft) => d.adults + d.children;
export const guests = (d: Draft) => cooks(d) + d.mealAdults + d.mealChildren;

/** Earliest bookable day, as a yyyy-mm-dd string in local time. */
export function firstBookableDay(today = new Date()) {
  const d = new Date(today);
  d.setDate(d.getDate() + booking.minDaysAhead);
  return toISO(d);
}

export function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Translation keys the client widget needs. */
export const BK_KEYS = [
  'bk.title','bk.lede','bk.step1','bk.step2','bk.step3',
  'bk.type','bk.group','bk.group.d','bk.private','bk.private.d',
  'bk.date','bk.slot','bk.morning','bk.afternoon','bk.pickDate',
  'bk.party','bk.adults','bk.adults.d','bk.children','bk.children.d',
  'bk.mealAdults','bk.mealAdults.d','bk.mealChildren','bk.mealChildren.d',
  'bk.veg','bk.veg.d','bk.you','bk.name','bk.email','bk.phone','bk.notes','bk.notes.ph',
  'bk.summary','bk.totalLabel','bk.perPerson','bk.empty',
  'bk.next','bk.back','bk.send','bk.sending',
  'bk.request','bk.requestNote',
  'bk.okTitle','bk.okBody','bk.okWhatsapp','bk.okEmail','bk.okIcs','bk.okAgain',
  'bk.errName','bk.errEmail','bk.errDate','bk.errSlot','bk.errParty','bk.errSend',
  'bk.at','bk.for','bk.cooking','bk.mealOnly','bk.tax',
] as const;
