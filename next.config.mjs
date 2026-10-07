/** @type {import('next').NextConfig} */

// Legacy WordPress URLs we must keep alive for SEO.
// English pages already live at the original slugs, so only the
// French query-string form and a couple of aliases need redirecting.
// The old WordPress site served its French version as a query string
// (/azure-room/?lang=fr). Those URLs are indexed, and without these rules they
// would 404 on the new site, throwing away whatever French equity exists.
const FR_SLUGS = [
  ['/', '/fr/'],
  ['/rooms', '/fr/chambres/'],
  ['/full-renting', '/fr/location-exclusive/'],
  ['/cooking-class', '/fr/cours-de-cuisine/'],
  ['/photos', '/fr/galerie/'],
  ['/tour', '/fr/excursions/'],
  ['/our-top-addresses', '/fr/nos-adresses/'],
  ['/press', '/fr/presse/'],
  ['/contact', '/fr/contact/'],
  ['/azure-room', '/fr/chambre-azure/'],
  ['/green-room', '/fr/chambre-verte/'],
  ['/red-room', '/fr/chambre-rouge/'],
  ['/orange-room', '/fr/chambre-orange/'],
  ['/white-room', '/fr/chambre-blanche/'],
];

const frQueryRedirects = FR_SLUGS.map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
  has: [{ type: 'query', key: 'lang', value: 'fr' }],
}));

const redirects = [
  { source: '/home', destination: '/', permanent: true },
  { source: '/index.php', destination: '/', permanent: true },
  { source: '/gallery', destination: '/photos', permanent: true },
  { source: '/galerie', destination: '/fr/galerie', permanent: true },
  { source: '/chambres', destination: '/fr/chambres', permanent: true },
  { source: '/tours', destination: '/tour', permanent: true },
  { source: '/addresses', destination: '/our-top-addresses', permanent: true },
  { source: '/cooking', destination: '/cooking-class', permanent: true },
  { source: '/blue-room', destination: '/azure-room', permanent: true },
];

const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this folder. Without it Next walks up the tree,
  // can pick up an unrelated lockfile (e.g. one sitting in your home folder)
  // and fails to parse it — the "Unexpected end of JSON input" in dev.
  outputFileTracingRoot: import.meta.dirname,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // While images still come from the WordPress host, cache an optimised copy
    // for a month: a slow upstream is then fetched once, not on every miss.
    // Irrelevant once `npm run sync:media` has brought the files local.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.riad-anata.com', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'riad-anata.com', pathname: '/wp-content/uploads/**' },
    ],
  },
  async redirects() {
    // Query-string rules first: they are more specific than the path rules.
    return [...frQueryRedirects, ...redirects];
  },
};

export default nextConfig;
