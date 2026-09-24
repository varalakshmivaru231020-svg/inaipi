/**
 * The site's images sit in named folders directly under public/ — brand, hero,
 * about, team, architecture, logos — so the whole set is visible at a glance
 * when the folder is handed over.
 *
 * They have been in two other places before this, and paths from both are
 * still in circulation: the customer logo strip's artwork is saved in the
 * settings store as /demo-logos/..., the architecture diagram in SiteImage as
 * /arch1.png, and /client-assets/images/... was live on the site until now, so
 * it may be cached or bookmarked. Every one of those is mapped below.
 *
 * These are afterFiles rewrites: they only run when nothing on disk matches,
 * so a real file always wins and the mapping costs nothing once the older
 * paths fall out of use.
 */

/** Paths from the original flat layout, before the images were grouped. */
const original = {
  '/logo.png': '/brand/logo.png',
  '/hero.png': '/hero/hero.png',
  '/hero-center.webp': '/hero/hero-center.webp',
  '/hero-av1.webp': '/hero/hero-av1.webp',
  '/hero-av2.webp': '/hero/hero-av2.webp',
  '/hero-av3.webp': '/hero/hero-av3.webp',
  '/hero-ct1.webp': '/hero/hero-ct1.webp',
  '/hero-ct2.webp': '/hero/hero-ct2.webp',
  '/hero-ct3.webp': '/hero/hero-ct3.webp',
  '/hero-ct4.webp': '/hero/hero-ct4.webp',
  '/about-hero.jpg': '/about/about-hero.jpg',
  '/global1.jpeg': '/about/global1.jpeg',
  '/arch1.png': '/architecture/arch1.png',
};

/** @type {import("next").NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        ...Object.entries(original).map(([source, destination]) => ({ source, destination })),
        // the logo strip's artwork, still saved under its first name
        { source: '/demo-logos/:file', destination: '/logos/:file' },
        // everything that was served from the client-assets folder
        { source: '/client-assets/images/:folder/:file', destination: '/:folder/:file' },
        { source: '/client-assets/README.md', destination: '/IMAGES-README.md' },
        // the icon every browser asks for without being told to
        { source: '/favicon.ico', destination: '/api/favicon' },
      ],
    };
  },
};

export default nextConfig;
