'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/* Logos come from the admin (settings-backed) customer logo list. The customer
   supplies the artwork; until then the strip renders without items. */
type Logo = { url: string; name: string };

/* The marquee loops by translating one third of the track, so it always needs
   three identical copies. Short lists are padded first so a single logo still
   fills the strip instead of leaving a gap. */
function buildTrack(logos: Logo[]): Logo[] {
  if (logos.length === 0) return [];
  const reps = Math.max(1, Math.ceil(10 / logos.length));
  const base = Array.from({ length: reps }, () => logos).flat();
  return [...base, ...base, ...base];
}

/* Each logo sits on a white chip: it gives the artwork breathing room, keeps a
   consistent footprint across mismatched source files, and means the client can
   upload ordinary colour logos later without them disappearing into the blue. */
const Item = ({ logo, onBroken }: { logo: Logo; onBroken: (url: string) => void }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    src={logo.url}
    alt={logo.name || 'Customer logo'}
    loading="lazy"
    onError={() => onBroken(logo.url)}
    className="select-none shrink-0"
    style={{
      boxSizing: 'border-box',
      height: 'clamp(38px, 5vw, 46px)',
      width: 'auto',
      maxWidth: 168,
      objectFit: 'contain',
      background: '#fff',
      borderRadius: 10,
      padding: '7px 14px',
      boxShadow: '0 2px 10px rgba(8,32,92,0.16)',
    }}
  />
);

const PAGE_BG = '#f8faff';

const BRACKET_FILL = '#1447d4';

const RightBracket = () => (
  <svg width="20" height="100" viewBox="0 0 28 130" fill="none" style={{ flexShrink: 0, display: 'block', marginRight: '-1px' }}>
    <rect width="28" height="130" fill={PAGE_BG} />
    <path
      d="M4 4 C4 4 20 4 20 4 C24 4 26 8 26 13 L26 117 C26 122 24 126 20 126 C20 126 4 126 4 126 C4 126 12 116 12 65 C12 14 4 4 4 4 Z"
      fill={BRACKET_FILL}
    />
  </svg>
);

const LeftBracket = () => (
  <svg width="20" height="100" viewBox="0 0 28 130" fill="none" style={{ flexShrink: 0, display: 'block', marginLeft: '-1px' }}>
    <rect width="28" height="130" fill={PAGE_BG} />
    <path
      d="M24 4 C24 4 8 4 8 4 C4 4 2 8 2 13 L2 117 C2 122 4 126 8 126 C8 126 24 126 24 126 C24 126 16 116 16 65 C16 14 24 4 24 4 Z"
      fill={BRACKET_FILL}
    />
  </svg>
);

export default function TrustMarquee() {
  const [logos, setLogos] = useState<Logo[]>([]);
  /* A logo whose file 404s is dropped rather than left as a broken image. */
  const [broken, setBroken] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    fetch('/api/customer-logos')
      .then(r => r.json())
      .then(d => { if (alive) setLogos(Array.isArray(d?.logos) ? d.logos : []); })
      .catch(() => { if (alive) setLogos([]); });
    return () => { alive = false; };
  }, []);

  const usable = logos.filter(l => l?.url && !broken.includes(l.url));
  const track = buildTrack(usable);
  const markBroken = (url: string) => setBroken(b => (b.includes(url) ? b : [...b, url]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ background: '#f8faff' }}
      className="relative py-14 lg:py-16"
    >
      {/* Headline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-12"
      >
        Trusted by{' '}
        <span className="text-[#1447d4]">500+ enterprise customers</span>
        {' '}across the region
      </motion.p>

      {/* Strip — overflow visible so brackets protrude above & below */}
      <div className="relative w-full" style={{ height: 'clamp(64px, 10vw, 88px)', overflow: 'visible' }}>

        {/* Strip background */}
        <div className="absolute inset-0" style={{ background: '#1447d4' }} />

        {/* LEFT half — scrolls → center */}
        <div className="absolute left-0 top-0 bottom-0 overflow-hidden" style={{ right: '50%' }}>
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #1447d4 30%, transparent)' }} />
          <div className="flex h-full items-center">
            <div
              className="flex shrink-0 gap-16 items-center pl-8"
              style={{ animation: 'marquee-left 38s linear infinite', willChange: 'transform' }}
            >
              {track.map((logo, i) => <Item key={`l${i}`} logo={logo} onBroken={markBroken} />)}
            </div>
          </div>
        </div>

        {/* RIGHT half — scrolls ← center */}
        <div className="absolute right-0 top-0 bottom-0 overflow-hidden" style={{ left: '50%' }}>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #1447d4 30%, transparent)' }} />
          <div className="flex h-full items-center">
            <div
              className="flex shrink-0 gap-16 items-center"
              style={{ animation: 'marquee-right 38s linear infinite', willChange: 'transform' }}
            >
              {track.map((logo, i) => <Item key={`r${i}`} logo={logo} onBroken={markBroken} />)}
            </div>
          </div>
        </div>

        {/* Centre — brackets + counter, overflowing strip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 flex items-center select-none pointer-events-none"
        >
          <RightBracket />
          {/* page-color box hides strip behind the number */}
          <div style={{ background: PAGE_BG, height: 'clamp(64px, 10vw, 88px)', display: 'flex', alignItems: 'center', padding: '0 clamp(12px, 3vw, 32px)' }}>
            <span style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, color: '#1447d4', whiteSpace: 'nowrap', letterSpacing: '-0.03em', fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}>
              500+
            </span>
          </div>
          <LeftBracket />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </motion.div>
  );
}
