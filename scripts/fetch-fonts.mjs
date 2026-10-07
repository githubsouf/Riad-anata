#!/usr/bin/env node
/**
 * Downloads the two Google Fonts into public/fonts/ so the site can serve them
 * itself. Run once, then follow README → "Self-hosting the fonts".
 *
 *   npm run fetch:fonts
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'public/fonts');

const FAMILIES = [
  'Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400',
  'Jost:wght@200;300;400;500',
];

// A modern UA makes Google serve woff2 rather than ttf.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/125.0 Safari/537.36';

async function main() {
  await mkdir(OUT, { recursive: true });
  let css = '';

  for (const family of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    css += await res.text();
  }

  const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
  const unique = [...new Set(urls)];
  console.log(`Found ${unique.length} font files.`);

  let localCss = css;
  for (const url of unique) {
    const name = url.split('/').slice(-3).join('-');
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(resolve(OUT, name), buf);
    localCss = localCss.split(url).join(`/fonts/${name}`);
    console.log('  ·', name, `${(buf.length / 1024).toFixed(0)} kB`);
  }

  await writeFile(resolve(OUT, 'fonts.css'), localCss);
  console.log(`\nWrote public/fonts/fonts.css — see README → "Self-hosting the fonts".`);
}

main().catch((e) => {
  console.error('\nFailed:', e.message);
  process.exit(1);
});
