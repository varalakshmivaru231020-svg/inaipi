'use client';

import { motion } from 'framer-motion';

const customers = [
  'Aldar Properties', 'Emirates NBD', 'Etisalat', 'du Telecom', 'ADNOC',
  'Mashreq Bank', 'DEWA', 'Aster DM Healthcare', 'Landmark Group', 'Majid Al Futtaim',
  'Carrefour UAE', 'Noon.com', 'Emaar Properties', 'FAB Bank', 'Damac Properties',
  'Al Futtaim Group', 'Jumeirah Group', 'RTA Dubai', 'Tabreed', 'Abu Dhabi Islamic Bank',
];

const leftTrack  = [...customers, ...customers, ...customers];
const rightTrack = [...customers, ...customers, ...customers];

const Item = ({ name }: { name: string }) => (
  <span className="flex items-center gap-3 text-base font-bold text-white/75 whitespace-nowrap select-none cursor-default tracking-wide">
    <span className="w-1.5 h-1.5 rounded-full bg-white/35 shrink-0" />
    {name}
  </span>
);

const PAGE_BG = '#f8faff';

const BRACKET_FILL = '#1447d4';

const RightBracket = () => (
  <svg width="28" height="130" viewBox="0 0 28 130" fill="none" style={{ flexShrink: 0, display: 'block', marginRight: '-1px' }}>
    <rect width="28" height="130" fill={PAGE_BG} />
    <path
      d="M4 4 C4 4 20 4 20 4 C24 4 26 8 26 13 L26 117 C26 122 24 126 20 126 C20 126 4 126 4 126 C4 126 12 116 12 65 C12 14 4 4 4 4 Z"
      fill={BRACKET_FILL}
    />
  </svg>
);

const LeftBracket = () => (
  <svg width="28" height="130" viewBox="0 0 28 130" fill="none" style={{ flexShrink: 0, display: 'block', marginLeft: '-1px' }}>
    <rect width="28" height="130" fill={PAGE_BG} />
    <path
      d="M24 4 C24 4 8 4 8 4 C4 4 2 8 2 13 L2 117 C2 122 4 126 8 126 C8 126 24 126 24 126 C24 126 16 116 16 65 C16 14 24 4 24 4 Z"
      fill={BRACKET_FILL}
    />
  </svg>
);

export default function TrustMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ background: '#f8faff' }}
      className="relative py-20"
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
      <div className="relative w-full" style={{ height: '88px', overflow: 'visible' }}>

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
              {leftTrack.map((name, i) => <Item key={i} name={name} />)}
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
              {rightTrack.map((name, i) => <Item key={i} name={name} />)}
            </div>
          </div>
        </div>

        {/* Centre — brackets + counter, overflowing strip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 flex items-center select-none pointer-events-none"
        >
          <RightBracket />
          {/* page-color box hides strip behind the number */}
          <div style={{ background: PAGE_BG, height: '88px', display: 'flex', alignItems: 'center', padding: '0 32px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#1447d4', whiteSpace: 'nowrap', letterSpacing: '-0.03em', fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}>
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
