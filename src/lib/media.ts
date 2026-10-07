/**
 * Images are addressed by their path inside the WordPress uploads folder,
 * e.g. "2016/10/RiadAnata1.jpg".
 *
 * NEXT_PUBLIC_MEDIA_SOURCE decides where they are served from:
 *   remote (default) → the existing WordPress media library
 *   local            → /public/media, after running `npm run sync:media`
 *
 * Either way next/image optimises them (AVIF/WebP, responsive sizes).
 */
const REMOTE_BASE = 'https://www.riad-anata.com/wp-content/uploads/';
const LOCAL_BASE = '/media/';

export const mediaSource =
  process.env.NEXT_PUBLIC_MEDIA_SOURCE === 'local' ? 'local' : 'remote';

export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, '');
  if (mediaSource === 'local') {
    return LOCAL_BASE + clean.split('/').map(encodeURIComponent).join('/');
  }
  return REMOTE_BASE + clean.split('/').map(encodeURIComponent).join('/');
}
