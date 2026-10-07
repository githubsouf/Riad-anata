# Riad Anata — site web

Next.js 16 (App Router), TypeScript, rendu entièrement statique (SSG).
14 pages × 2 langues = 28 pages pré-rendues.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
```

---

## Les URL

**L'anglais vit à la racine, aux slugs exacts de l'ancien WordPress.** C'est
délibéré : le site a des backlinks (Telegraph, Guardian, une quinzaine de blogs
voyage) et les conserver sans redirection préserve le référencement acquis.

| Page | Anglais | Français |
| --- | --- | --- |
| Accueil | `/` | `/fr/` |
| Chambres | `/rooms/` | `/fr/chambres/` |
| Chambre Azure | `/azure-room/` | `/fr/chambre-azure/` |
| Chambre Verte | `/green-room/` | `/fr/chambre-verte/` |
| Chambre Rouge | `/red-room/` | `/fr/chambre-rouge/` |
| Chambre Orange | `/orange-room/` | `/fr/chambre-orange/` |
| Chambre Blanche | `/white-room/` | `/fr/chambre-blanche/` |
| Location exclusive | `/full-renting/` | `/fr/location-exclusive/` |
| Cours de cuisine | `/cooking-class/` | `/fr/cours-de-cuisine/` |
| Galerie | `/photos/` | `/fr/galerie/` |
| Visites | `/tour/` | `/fr/excursions/` |
| Nos adresses | `/our-top-addresses/` | `/fr/nos-adresses/` |
| Presse | `/press/` | `/fr/presse/` |
| Contact | `/contact/` | `/fr/contact/` |

Les anciens alias (`/gallery`, `/tours`, `/addresses`, `/cooking`, `/blue-room`,
`/home`) sont redirigés en 301 dans `next.config.mjs`.

Toute la table de routage est dans **`src/content/routes.ts`** : ajouter une page
ou changer un slug se fait là, et la navigation, le sitemap et les `hreflang`
suivent automatiquement.

## Les langues

Deux arbres d'URL réels, pas une bascule JavaScript — c'est ce qui rend le
français indexable. Chaque page porte :

- `<html lang>` correct (deux layouts racines, `src/app/(en)/` et `src/app/(fr)/`)
- `<link rel="canonical">`
- `<link rel="alternate" hreflang>` pour `en`, `fr` et `x-default`
- un `sitemap.xml` bilingue avec les alternances déclarées
- des données structurées `LodgingBusiness` (schema.org)

**Tous les textes** sont dans `src/content/messages/en.json` et `fr.json`
(336 clés chacun). Les deux fichiers ont rigoureusement les mêmes clés ; si une
traduction manque, le texte anglais est utilisé plutôt qu'une page cassée.

Modifier un texte = éditer les deux JSON. Rien à recompiler, `npm run dev`
recharge à chaud.

## Les images

Par défaut, les images sont servies depuis la médiathèque WordPress existante et
optimisées à la volée par `next/image` (AVIF/WebP, tailles responsives).

**Pour rendre le site indépendant de WordPress :**

```bash
npm run sync:media          # seulement les 130 fichiers utilisés par le site
npm run sync:media -- --all # toute la médiathèque
npm run sync:media -- --dims # dimensions seules, sans téléchargement
```

Le script fait deux choses :

1. écrit `src/content/dimensions.json` avec les dimensions réelles de chaque
   image, lues depuis l'API REST WordPress — c'est ce qui donne les bons ratios
   dans la galerie et supprime tout décalage au chargement ;
2. télécharge les fichiers dans `public/media/` (redimensionnés à 2400 px max si
   `sharp` est installé).

Ensuite, dans `.env.local` :

```
NEXT_PUBLIC_MEDIA_SOURCE=local
```

À lancer **avant** de couper l'hébergement WordPress — sinon le site perd ses
photos.

Les chemins d'images sont des chaînes relatives au dossier `uploads`
(`2016/10/RiadAnata1.jpg`), listées dans `src/content/media.ts`,
`rooms.ts` et `gallery.ts`. `src/lib/media.ts` les résout vers l'une ou l'autre
source.

## Avant la première mise en ligne

Quatre points, dans cet ordre. Les trois premiers sont bloquants.

1. **Rapatrier les images.** `npm run sync:media`, puis `NEXT_PUBLIC_MEDIA_SOURCE=local`.
   Tant que les images viennent du WordPress, l'optimiseur va les chercher à chaque
   fois et abandonne au bout de sept secondes — sur un serveur lent, le visiteur
   voit des trous à la place des photos.
2. **Vérifier que `public/media/` part bien dans le dépôt.** Ces fichiers ne sont
   pas ignorés : s'ils manquent, l'hébergeur build sans aucune photo.
3. **Déclarer les variables d'environnement chez l'hébergeur.** `.env.local` n'est
   jamais versionné. Sur Vercel : *Settings → Environment Variables*.
   - `NEXT_PUBLIC_MEDIA_SOURCE` = `local`
   - `NEXT_PUBLIC_SITE_URL` = l'URL réelle du site
   - `NEXT_PUBLIC_BOOKING_MODE` = `message` (ou `api` avec `RESEND_API_KEY`)
4. **Relire le contenu avec la propriétaire.** Certains textes sont des
   reconstitutions à valider : les avis clients de la page d'accueil, la mention
   « Depuis 2010 », et les descriptions de chambres. Les tarifs, horaires,
   conditions, excursions et adresses viennent du site existant et sont fidèles.

## Déploiement

Recommandé : **Vercel** (zéro configuration, optimisation d'images incluse).

1. `git init && git add . && git commit -m "Nouveau site"` puis pousser sur GitHub.
2. Sur Vercel : *New Project* → importer le dépôt. Le framework est détecté seul.
3. Variables d'environnement du projet :
   - `NEXT_PUBLIC_SITE_URL` = `https://www.riad-anata.com`
   - `NEXT_PUBLIC_MEDIA_SOURCE` = `remote` (puis `local` après la migration)
4. Vérifier l'aperçu `*.vercel.app` : les deux langues, les redirections, le
   formulaire, la galerie.
5. Ajouter le domaine `riad-anata.com` dans Vercel et basculer les DNS.
   **Garder le WordPress en ligne jusqu'à ce que la bascule soit confirmée.**
6. Après la bascule : soumettre `https://www.riad-anata.com/sitemap.xml` dans la
   Google Search Console et surveiller la couverture pendant deux ou trois
   semaines.

Cloudflare Pages et Netlify fonctionnent aussi ; sur un hébergement sans
optimiseur d'images, ajouter `images: { unoptimized: true }` dans
`next.config.mjs` après avoir lancé `sync:media`.

## Dépannage

**« Unexpected end of JSON input » au démarrage de `npm run dev`** — Next remonte
l'arborescence à la recherche de la racine du workspace et tombe sur un
`package-lock.json` étranger (typiquement un fichier vide dans `C:\Users\<vous>\`).
`outputFileTracingRoot` est déjà fixé dans `next.config.mjs` pour l'empêcher. Si
le message persiste, supprimez le `package-lock.json` orphelin de votre dossier
utilisateur — il n'appartient à aucun projet.

**Windows** — les commandes npm sont sensibles à la casse : `npm install`, pas
`NPM INSTALL`.

## Ce qui reste à brancher

- **Formulaire de contact** — il compose un e-mail (`mailto:`) côté visiteur.
  Pour un vrai envoi : créer `src/app/api/contact/route.ts` et remplacer le corps
  de `onSubmit` dans `src/components/ContactForm.tsx` par un `POST`. Resend ou
  Formspree font l'affaire en quelques lignes.
- **Réservation** — pointe vers le moteur Direct-Book existant
  (`src/content/site.ts`).
- **Carte** — iframe OpenStreetMap, sans clé API. Le bouton « Ouvrir dans Google
  Maps » utilise le vrai repère.

## Self-hosting des polices

Les polices viennent de Google Fonts avec `preconnect`. Pour les servir soi-même
(une requête tierce en moins, aucun décalage de rendu) :

```bash
npm run fetch:fonts
```

Puis dans `src/lib/rootLayout.tsx`, remplacer les trois `<link>` par :

```tsx
import { Cormorant_Garamond, Jost } from 'next/font/google';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});
// puis : <html lang={lang} className={`${display.variable} ${sans.variable}`}>
```

`globals.css` lit déjà `--font-display` et `--font-sans` avec un repli, donc
rien d'autre à changer. (`next/font` télécharge les polices au moment du build :
cela demande un accès réseau pendant `npm run build`.)

## Structure

```
src/
  app/
    (en)/layout.tsx            <html lang="en">
    (en)/[[...slug]]/page.tsx  toutes les pages anglaises
    (fr)/layout.tsx            <html lang="fr">
    (fr)/fr/[[...slug]]/page.tsx
    globals.css                design system complet (tokens en haut)
    sitemap.ts, robots.ts, not-found.tsx
  components/
    Site.tsx                   coquille commune (header, page, footer)
    pages/                     une par page
    …                          Header, Footer, Lightbox, GalleryGrid…
  content/
    routes.ts                  table de routage bilingue
    messages/{en,fr}.json      tous les textes
    rooms.ts, gallery.ts, media.ts, site.ts, nav.ts
    dimensions.json            rempli par sync:media
  lib/
    i18n.ts, media.ts, metadata.ts, rootLayout.tsx, dimensions.ts
scripts/
  sync-media.mjs               rapatriement de la médiathèque
  fetch-fonts.mjs              téléchargement des polices
```

## Design

Palette issue du logo : vert canard `#0e4049`, crème `#f2f0e2`, laiton `#c2a15c`.
Cormorant Garamond en titrage, Jost en texte. Motif zellige (étoile khatam à huit
branches) en SVG inline dans le CSS, arcs mauresques sur les images et les cartes
chambres. Tous les tokens sont en haut de `globals.css` — changer la palette se
fait en six lignes.
