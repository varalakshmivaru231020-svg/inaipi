/**
 * Site images live under /client-assets/images/ so the whole set can be handed
 * over in one folder. Paths saved before that move — in the settings store
 * (the customer logo strip), the SiteImage table, older content, and anything
 * the client has bookmarked — still point at the old locations, so every one
 * of them is mapped here.
 *
 * These are afterFiles rewrites: they only run when nothing on disk matches,
 * so a real file always wins and the mapping costs nothing once the old URLs
 * fall out of use.
 */
const IMAGES = '/client-assets/images';

const moved = {
  '/logo.png': `${IMAGES}/brand/logo.png`,
  '/hero.png': `${IMAGES}/hero/hero.png`,
  '/hero-center.webp': `${IMAGES}/hero/hero-center.webp`,
  '/hero-av1.webp': `${IMAGES}/hero/hero-av1.webp`,
  '/hero-av2.webp': `${IMAGES}/hero/hero-av2.webp`,
  '/hero-av3.webp': `${IMAGES}/hero/hero-av3.webp`,
  '/hero-ct1.webp': `${IMAGES}/hero/hero-ct1.webp`,
  '/hero-ct2.webp': `${IMAGES}/hero/hero-ct2.webp`,
  '/hero-ct3.webp': `${IMAGES}/hero/hero-ct3.webp`,
  '/hero-ct4.webp': `${IMAGES}/hero/hero-ct4.webp`,
  '/about-hero.jpg': `${IMAGES}/about/about-hero.jpg`,
  '/global1.jpeg': `${IMAGES}/about/global1.jpeg`,
  '/arch1.png': `${IMAGES}/architecture/arch1.png`,
};

/** @type {import("next").NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        ...Object.entries(moved).map(([source, destination]) => ({ source, destination })),
        // whole folders that moved intact
        { source: '/team/:file', destination: `${IMAGES}/team/:file` },
        { source: '/demo-logos/:file', destination: `${IMAGES}/logos/:file` },
        // the icon every browser asks for without being told to
        { source: '/favicon.ico', destination: '/api/favicon' },
      ],
    };
  },
};

export default nextConfig;
