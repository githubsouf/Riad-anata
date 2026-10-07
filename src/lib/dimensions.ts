import dims from '@/content/dimensions.json';

type Dim = { w: number; h: number };
const table = dims as Record<string, Dim>;

/**
 * Real pixel dimensions for an uploads-relative path, when known.
 * The table is empty until `npm run sync:media` has run — it is filled from
 * the WordPress REST API, which is the only place that knows them.
 */
export function dimensionsFor(path: string): Dim | undefined {
  return table[path];
}

/** Deterministic fallback ratios so the layout never shifts before the sync. */
const FALLBACK = [3 / 4, 1, 4 / 5, 3 / 2, 4 / 5, 1];

export function aspectFor(path: string, index = 0): number {
  const d = dimensionsFor(path);
  if (d && d.w > 0 && d.h > 0) return d.w / d.h;
  return FALLBACK[index % FALLBACK.length];
}
