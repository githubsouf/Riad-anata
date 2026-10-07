#!/usr/bin/env node
/**
 * Pulls the WordPress media into this repo.
 *
 *   npm run sync:media              # the files the site actually uses
 *   npm run sync:media -- --all     # plus everything else in the library
 *   npm run sync:media -- --dims    # dimensions only, no downloads
 *
 * The files the site needs are read straight out of src/content, so the
 * download never depends on the REST API paginating correctly — some WordPress
 * installs cap per_page and silently return a short list. The API is used only
 * to discover EXTRA files for --all; dimensions are measured from the bytes we
 * downloaded, which is authoritative.
 *
 * Afterwards set NEXT_PUBLIC_MEDIA_SOURCE=local in .env.local.
 */
import { mkdir, writeFile, readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.env.MEDIA_BASE ?? 'https://www.riad-anata.com/wp-content/uploads/').replace(/\/?$/, '/');
const API = process.env.MEDIA_API ?? 'https://www.riad-anata.com/wp-json/wp/v2/media';
const OUT = join(ROOT, 'public/media');
const DIMS = join(ROOT, 'src/content/dimensions.json');
const MAX_WIDTH = 2400;

const args = process.argv.slice(2);
const ALL = args.includes('--all');
const DIMS_ONLY = args.includes('--dims');
const log = (...a) => console.log(...a);

/* ------------------------------------------------------------------ helpers */

/** Every uploads-relative path referenced anywhere in src/content. */
async function referencedPaths() {
  const dir = join(ROOT, 'src/content');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.ts'));
  const found = new Set();
  const re = /"(\d{4}\/\d{2}\/[^"]+\.(?:jpe?g|png|webp|gif|mp4|mp3|avif))"/gi;
  for (const f of files) {
    const text = await readFile(join(dir, f), 'utf8');
    for (const m of text.matchAll(re)) found.add(m[1]);
  }
  return [...found].sort();
}

const urlFor = (path) => BASE + path.split('/').map(encodeURIComponent).join('/');

/** Walk the REST API properly, using its own page-count header. */
async function libraryPaths() {
  const out = new Set();
  let pages = 1;
  for (let page = 1; page <= pages && page <= 100; page++) {
    const url = `${API}?per_page=100&page=${page}&_fields=source_url`;
    const res = await fetch(url);
    if (!res.ok) {
      log(`  ! API page ${page} → ${res.status}, stopping there`);
      break;
    }
    if (page === 1) {
      pages = Number(res.headers.get('x-wp-totalpages') || 1) || 1;
      const total = res.headers.get('x-wp-total');
      log(`  library reports ${total ?? '?'} items across ${pages} page(s)`);
    }
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const item of batch) {
      const i = String(item.source_url ?? '').indexOf('/wp-content/uploads/');
      if (i !== -1) out.add(decodeURIComponent(item.source_url.slice(i + 20)));
    }
    log(`  page ${page}: ${batch.length} item(s), ${out.size} known so far`);
  }
  return [...out];
}

async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default ?? mod;
  } catch {
    return null;
  }
}

/* --------------------------------------------------------------------- main */

async function main() {
  const wanted = await referencedPaths();
  log(`The site references ${wanted.length} file(s).`);

  let targets = wanted;
  if (ALL) {
    log('\nAsking the media library for anything else…');
    const extra = await libraryPaths();
    targets = [...new Set([...wanted, ...extra])];
    log(`${targets.length} file(s) in total.`);
  }

  const dims = existsSync(DIMS)
    ? JSON.parse(await readFile(DIMS, 'utf8') || '{}')
    : {};
  const sharp = await loadSharp();
  if (!sharp && !DIMS_ONLY) log('sharp unavailable — saving originals without resizing.');

  await mkdir(OUT, { recursive: true });
  let saved = 0, skipped = 0, failed = [], bytes = 0;

  for (const path of targets) {
    const dest = join(OUT, path);
    const isImage = /\.(jpe?g|png|webp|avif)$/i.test(path);

    if (existsSync(dest) && !DIMS_ONLY) {
      if (isImage && sharp && !dims[path]) {
        try {
          const meta = await sharp(dest).metadata();
          if (meta.width && meta.height) dims[path] = { w: meta.width, h: meta.height };
        } catch {}
      }
      skipped++;
      continue;
    }

    let res;
    try {
      res = await fetch(urlFor(path));
    } catch (e) {
      failed.push([path, e.message]);
      continue;
    }
    if (!res.ok) {
      failed.push([path, `HTTP ${res.status}`]);
      log(`  ! ${path} → ${res.status}`);
      continue;
    }
    let buf = Buffer.from(await res.arrayBuffer());

    if (isImage && sharp) {
      try {
        const img = sharp(buf);
        const meta = await img.metadata();
        if ((meta.width ?? 0) > MAX_WIDTH) {
          buf = await img
            .resize({ width: MAX_WIDTH })
            .jpeg({ quality: 82, mozjpeg: true })
            .toBuffer();
          const after = await sharp(buf).metadata();
          dims[path] = { w: after.width, h: after.height };
        } else if (meta.width && meta.height) {
          dims[path] = { w: meta.width, h: meta.height };
        }
      } catch {
        /* keep the original bytes */
      }
    }

    if (!DIMS_ONLY) {
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, buf);
    }
    saved++;
    bytes += buf.length;
    log(`  · ${path} ${(buf.length / 1024).toFixed(0)} kB`);
  }

  await writeFile(DIMS, JSON.stringify(dims, null, 2) + '\n');

  log(`\nDone. ${saved} downloaded, ${skipped} already present, ` +
      `${(bytes / 1024 / 1024).toFixed(1)} MB. Dimensions known for ${Object.keys(dims).length} file(s).`);

  if (failed.length) {
    log(`\n${failed.length} file(s) could NOT be fetched — the site will fall back to`);
    log('the WordPress URL for these, so check them before going live:');
    for (const [p, why] of failed) log(`  ✗ ${p} (${why})`);
    process.exitCode = 1;
  } else if (!DIMS_ONLY) {
    log('\nEvery referenced file is now local. Set this in .env.local:');
    log('  NEXT_PUBLIC_MEDIA_SOURCE=local');
  }
}

main().catch((e) => {
  console.error('\nFailed:', e.message);
  process.exit(1);
});
