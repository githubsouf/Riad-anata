#!/usr/bin/env node
/**
 * One command to get the site online.
 *
 *   npm run ship
 *
 * Downloads the media, points the site at the local copies, builds, commits and
 * pushes. It stops at the first thing that would put a broken site in front of
 * a client — a missing image, a failed build — rather than pushing anyway.
 *
 *   npm run ship -- --no-push    stop after the commit
 */
import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REMOTE = process.env.SHIP_REMOTE ?? 'https://github.com/githubsouf/Riad-anata.git';
const NO_PUSH = process.argv.includes('--no-push');

let step = 0;
const title = (t) => console.log(`\n\u001b[36m── ${++step}. ${t}\u001b[0m`);
const ok = (t) => console.log(`\u001b[32m✓\u001b[0m ${t}`);
const die = (t, hint) => {
  console.error(`\n\u001b[31m✗ ${t}\u001b[0m`);
  if (hint) console.error(`  ${hint}`);
  process.exit(1);
};

const run = (cmd, opts = {}) =>
  spawnSync(cmd, { cwd: ROOT, shell: true, stdio: 'inherit', ...opts });
const quiet = (cmd) => {
  try {
    return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
};

/* 1 ─ media ---------------------------------------------------------------- */
title('Downloading the photos from WordPress');
if (run('node scripts/sync-media.mjs').status !== 0) {
  die(
    'Some files could not be downloaded (listed above).',
    'Those images would fall back to the WordPress host and time out for visitors.\n' +
    '  Fix or remove them, then run `npm run ship` again.',
  );
}
ok('Every referenced file is local.');

/* 2 ─ switch the site over -------------------------------------------------- */
title('Pointing the site at the local photos');
const envPath = join(ROOT, '.env.local');
let env = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
env = /^NEXT_PUBLIC_MEDIA_SOURCE=/m.test(env)
  ? env.replace(/^NEXT_PUBLIC_MEDIA_SOURCE=.*$/m, 'NEXT_PUBLIC_MEDIA_SOURCE=local')
  : env.replace(/\n*$/, '\n') + 'NEXT_PUBLIC_MEDIA_SOURCE=local\n';
writeFileSync(envPath, env);
ok('.env.local → NEXT_PUBLIC_MEDIA_SOURCE=local');

/* 3 ─ build ---------------------------------------------------------------- */
title('Building');
if (run('npm run build').status !== 0) die('The build failed — nothing was committed.');
ok('Build clean.');

/* 4 ─ commit ---------------------------------------------------------------- */
title('Committing');
if (!existsSync(join(ROOT, '.git'))) {
  run('git init -q');
  ok('Repository created.');
}
if (!quiet('git config user.email')) {
  die(
    'git has no identity on this machine.',
    'Run:  git config --global user.name "Your Name"\n' +
    '      git config --global user.email "you@example.com"',
  );
}
run('git add -A');

// core.quotepath off: accented filenames would otherwise come back quoted
// and escaped, and the photo count below would silently undercount them.
const staged = quiet('git -c core.quotepath=false diff --cached --name-only').split('\n').filter(Boolean);
const media = staged.filter((f) => f.startsWith('public/media/')).length;
if (media === 0) die('No photo is staged.', 'public/media/ must not be ignored — check .gitignore.');
if (quiet('git ls-files --error-unmatch .env.local')) die('.env.local is about to be committed.', 'It holds configuration and must stay out of the repository.');
ok(`${staged.length} files staged, ${media} of them photos.`);

if (quiet('git diff --cached --quiet || echo changed')) {
  run('git commit -q -m "Riad Anata — new site"');
  ok('Commit created.');
} else {
  ok('Nothing new to commit.');
}

/* 5 ─ push ------------------------------------------------------------------ */
if (NO_PUSH) {
  console.log('\n--no-push given: stopping before the push.');
  process.exit(0);
}
title('Pushing to GitHub');
if (!quiet('git remote get-url origin')) run(`git remote add origin ${REMOTE}`);
run('git branch -M main');
if (run('git push -u origin main').status !== 0) {
  die(
    'The push failed.',
    'Usually authentication. Push once by hand so Windows stores the credential:\n' +
    '  git push -u origin main',
  );
}
ok('Pushed.');

console.log(`
\u001b[36mNext, on Vercel\u001b[0m
  1. Import  ${REMOTE.replace(/\.git$/, '')}
  2. BEFORE the first build, add these in Settings → Environment Variables:
       NEXT_PUBLIC_MEDIA_SOURCE = local
       NEXT_PUBLIC_SITE_URL     = the .vercel.app URL it gives you
       NEXT_PUBLIC_BOOKING_MODE = message
  3. Deploy, then open the link on your own phone before sending it on.
`);
