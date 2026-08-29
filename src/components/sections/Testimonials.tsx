'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';

/* ── Single unified card color — clean white with blue accent ── */
const CARD = {
  bg:     '#ffffff',
  accent: '#1447d4',
  border: 'rgba(20,71,212,0.15)',
  glow:   'rgba(20,71,212,0.20)',
  text:   '#0f172a',
  sub:    '#64748b',
  quote:  '#1e293b',
};

type Testimonial = { id: string; name: string; role: string; stars: number; quote: string; avatar: string; stat: string; statLabel: string };

const AVATARS = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=16',
];

const FLAGS = [
  { src: 'https://flagcdn.com/w160/ae.png', alt: 'UAE' },
  { src: 'https://flagcdn.com/w160/us.png', alt: 'USA' },
  { src: 'https://flagcdn.com/w160/gb.png', alt: 'UK' },
  { src: 'https://flagcdn.com/w160/in.png', alt: 'India' },
  { src: 'https://flagcdn.com/w160/sa.png', alt: 'Saudi Arabia' },
  { src: 'https://flagcdn.com/w160/au.png', alt: 'Australia' },
  { src: 'https://flagcdn.com/w160/de.png', alt: 'Germany' },
  { src: 'https://flagcdn.com/w160/sg.png', alt: 'Singapore' },
];

const CARD_GAP = 24;
const SPEED    = 0.55; // px per frame

/* ── Animated progress dot ── */
function ProgressDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!active) { progress.set(0); return; }
    progress.set(0);
    const duration = ((420 + CARD_GAP) / SPEED) / 60 / 1000; // rough cycle ms→s
    const ctrl = animate(progress, 1, { duration, ease: 'linear' });
    return () => ctrl.stop();
  }, [active, progress]);

  return (
    <motion.button
      onClick={onClick}
      animate={{ width: active ? 36 : 10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: 10, borderRadius: 5, border: 'none', cursor: 'pointer', padding: 0, background: active ? CARD.accent : 'rgba(20,71,212,0.15)', position: 'relative', overflow: 'hidden' }}
    >
      {active && (
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 5, background: CARD.accent, scaleX: progress, originX: 0 }} />
      )}
    </motion.button>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    let alive = true;
    let attempt = 0;
    const load = () => {
      /* no-store: never let a cached empty response stand in for real data */
      fetch('/api/testimonials', { cache: 'no-store' })
        .then(r => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
        .then(d => {
          if (!alive) return;
          // Only ever trust an array, so an error payload cannot break the section.
          if (!Array.isArray(d)) throw new Error('unexpected payload');
          setTestimonials(d);
        })
        .catch(() => {
          if (!alive) return;
          // One retry covers a transient hiccup; after that fall back to the
          // existing empty state rather than showing a broken section.
          if (attempt++ < 1) setTimeout(load, 1500);
          else setTestimonials([]);
        });
    };
    load();
    return () => { alive = false; };
  }, []);

  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef(false);
  const xRef      = useRef(0);

  const [centerIdx, setCenterIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const cardWRef = useRef(420);
  const [cardW, setCardW] = useState(420);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth < 640 ? Math.min(window.innerWidth - 48, 320) : 420;
      cardWRef.current = w;
      setCardW(w);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const n = testimonials.length;
  const triple = [...testimonials, ...testimonials, ...testimonials];
  const totalW = n * (cardW + CARD_GAP); // width of ONE set

  /* The rAF loop is created once and never re-created, so it has to read the
     live count through a ref. Capturing `n` in its closure pinned it at 0 (the
     list is empty on mount and arrives from the API a moment later): the loop
     then computed a set width of 0, the wrap condition never fired, and the
     track slid left forever until every card was off-screen — the section going
     blank on its own was this, not missing data. */
  const nRef = useRef(0);
  useEffect(() => { nRef.current = n; }, [n]);

  /* Re-centre whenever the data or the card width changes, using the real set
     width so the first card starts centred one set in. */
  useEffect(() => {
    if (!n) { xRef.current = 0; return; }
    const cw = cardWRef.current;
    const tw = n * (cw + CARD_GAP);
    const vw = wrapRef.current ? wrapRef.current.getBoundingClientRect().width : 0;
    xRef.current = vw / 2 - cw / 2 - tw;
  }, [n, cardW]);

  /* ── rAF loop ── */
  useEffect(() => {
    const tick = () => {
      const count = nRef.current;
      if (!trackRef.current || count === 0) { rafRef.current = requestAnimationFrame(tick); return; }
      const cw = cardWRef.current;
      const tw = count * (cw + CARD_GAP);

      if (!pausedRef.current) {
        xRef.current -= SPEED;

        /* Seamless loop: when we've scrolled a full set, reset by one set width */
        if (Math.abs(xRef.current) >= tw * 2) {
          xRef.current += tw;
        }
      }

      trackRef.current.style.transform = `translateX(${xRef.current}px)`;

      /* Detect which card is nearest center */
      if (wrapRef.current) {
        const vCenter = wrapRef.current.getBoundingClientRect().width / 2;
        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < count * 3; i++) {
          const cardCenter = xRef.current + i * (cw + CARD_GAP) + cw / 2;
          const dist = Math.abs(cardCenter - vCenter);
          if (dist < minDist) { minDist = dist; closest = i % count; }
        }
        setCenterIdx(closest);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="py-14 lg:py-16 relative overflow-hidden"
      style={{ background: '#f8faff' }}>

      {/* ── Glow behind slider ── */}
      <div className="pointer-events-none absolute inset-0">
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '15%', width: 500, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 text-center px-6 md:px-16">
        <span className="section-eyebrow wow wow-d1">What Our Clients Say</span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5 wow wow-d2">
          Trusted by CX leaders<br className="hidden sm:block" /> <span className="text-[#1447d4]">worldwide.</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed wow wow-d3">
          Real results from healthcare, insurance, hospitality and government. See what AI-native CX looks like in practice.
        </p>
      </div>

      {/* ── Pill + Flags ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className={`relative z-10 flex items-center justify-between flex-wrap gap-4 mt-8 sm:mt-10 ${n > 0 ? 'mb-8 sm:mb-10' : 'mb-0'} px-6 md:px-16`}>
        {/* Pill */}
        <div className="flex items-center rounded-full"
          style={{ background: 'rgba(20,71,212,0.07)', border: '1px solid rgba(20,71,212,0.18)', padding: '0.5rem 1rem 0.5rem 1rem', gap: '0.75rem' }}>
          <div className="flex items-center">
            {AVATARS.slice(0, 4).map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(20,71,212,0.25)', marginLeft: i === 0 ? 0 : -8, objectFit: 'cover' }} />
            ))}
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(20,71,212,0.12)', border: '2px solid rgba(20,71,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#1447d4', marginLeft: -8, flexShrink: 0 }}>+</div>
          </div>
          <div className="flex flex-col gap-0.5">
            <strong className="text-sm font-bold text-[#0f172a] leading-tight">669k+ Active</strong>
            <span className="text-xs text-slate-600 whitespace-nowrap leading-tight">users world-wide</span>
          </div>
          <motion.a href="#" whileHover={{ x: 4 }}
            style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(20,71,212,0.1)', border: '1px solid rgba(20,71,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1447d4', textDecoration: 'none', fontSize: '0.9rem', flexShrink: 0 }}>→</motion.a>
        </div>

        {/* Flags */}
        <div className="flex items-center flex-wrap gap-2">
          {FLAGS.map((f, i) => (
            <motion.img key={i} src={f.src} alt={f.alt}
              initial={{ opacity: 0, scale: 0.4, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.18, y: -4, transition: { duration: 0.2 } }}
              style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid rgba(20,71,212,0.18)', cursor: 'pointer' }} />
          ))}
        </div>
      </motion.div>

      {n > 0 && (<>
      {/* ── Infinite scroll track ── */}
      <div
        ref={wrapRef}
        className="relative z-[5] overflow-hidden"
        style={{ padding: '2rem 0', cursor: 'default' }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: CARD_GAP, willChange: 'transform', alignItems: 'center' }}
        >
          {triple.map((t, i) => {
            const realIdx = i % n;
            const isCenter = realIdx === centerIdx;

            return (
              <div
                key={i}
                style={{
                  width: cardW,
                  minWidth: cardW,
                  minHeight: 340,
                  flexShrink: 0,
                  background: CARD.bg,
                  border: `1.5px solid ${isCenter ? CARD.accent + '80' : CARD.border}`,
                  borderRadius: 20,
                  padding: '2rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isCenter ? 'scale(1.03) translateY(-6px)' : 'scale(0.97) translateY(2px)',
                  opacity: isCenter ? 1 : 0.7,
                  boxShadow: isCenter
                    ? `0 20px 56px ${CARD.glow}, 0 4px 16px rgba(0,0,0,0.08)`
                    : '0 2px 10px rgba(0,0,0,0.06)',
                  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
                  zIndex: isCenter ? 10 : 1,
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  borderRadius: '22px 22px 0 0',
                  background: CARD.accent,
                  opacity: isCenter ? 1 : 0.25,
                  transform: `scaleX(${isCenter ? 1 : 0.4})`,
                  transformOrigin: 'left',
                  transition: 'opacity 0.45s, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  zIndex: 2,
                }} />

                {/* Corner glow — subtle on white card */}
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${CARD.accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

                {/* Watermark ❝ */}
                <div style={{ position: 'absolute', top: 12, right: 18, fontSize: '4rem', fontWeight: 900, color: `${CARD.accent}10`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>❝</div>

                {/* Name + role */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: CARD.text, marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: '0.875rem', color: CARD.sub, lineHeight: 1.4 }}>{t.role}</div>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, position: 'relative', zIndex: 3 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} style={{
                      color: '#1447d4', display: 'inline-flex',
                      transform: isCenter ? 'scale(1.1)' : 'scale(1)',
                      transition: `transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${si * 0.05}s`,
                    }}><Star size={15} fill="#1447d4" strokeWidth={0} /></span>
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '1rem', fontStyle: 'italic', fontWeight: 450,
                  lineHeight: 1.75, color: isCenter ? CARD.quote : CARD.sub,
                  margin: 0, flex: 1, position: 'relative', zIndex: 3,
                  transition: 'color 0.45s', fontFamily: 'var(--font-figtree), Figtree, sans-serif',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Stat badge */}
                <div style={{
                  position: 'relative', zIndex: 3,
                  opacity: isCenter ? 1 : 0,
                  transform: isCenter ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s',
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${CARD.accent}12`, border: `1px solid ${CARD.accent}30`, borderRadius: 9, padding: '0.25rem 0.8rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: CARD.accent, fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}>{t.stat}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: CARD.sub, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}>{t.statLabel}</span>
                  </div>
                </div>

                {/* Avatar + quote icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${CARD.accent}15`, paddingTop: '1.1rem', position: 'relative', zIndex: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img src={t.avatar} alt={t.name}
                      style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${isCenter ? CARD.accent : 'rgba(37,99,235,0.15)'}`, flexShrink: 0, transition: 'border-color 0.45s' }} />
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: CARD.accent, opacity: isCenter ? 1 : 0.2, boxShadow: isCenter ? `0 0 6px ${CARD.accent}` : 'none', transition: 'opacity 0.45s, box-shadow 0.45s' }} />
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${CARD.accent}10`, border: `1px solid ${CARD.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD.accent, fontSize: '1rem' }}>❝</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dots ── */}
      <div className="relative z-10 flex justify-center items-center gap-2 mt-2">
        {testimonials.map((_, i) => (
          <ProgressDot key={i} active={i === centerIdx} onClick={() => {}} />
        ))}
      </div>
      </>)}

      {/* ── Bottom strip ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent 0%, ${CARD.accent} 30%, ${CARD.accent} 70%, transparent 100%)`, zIndex: 20 }} />

    </section>
  );
}
