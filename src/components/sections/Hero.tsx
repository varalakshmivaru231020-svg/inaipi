'use client';

import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   The approved hero, rebuilt as markup.

   It is laid out on a fixed 1672×941 canvas — the size of the artwork it was
   drawn at — and the whole canvas is scaled as one piece to whatever width it
   is given. Nothing reflows, wraps or re-orders at any screen size, so the
   composition on screen is always the composition that was signed off: same
   headline, same disc, same seven cards in the same places, same spacing.

   The centre disc, the small avatars and the wordmark are cut straight out of
   the supplied artwork rather than redrawn. Everything else is markup so that
   the parts that were asked to move — the chatbot conversation, the survey
   controls, the card activity — can actually move.
   ═══════════════════════════════════════════════════════════════════════════ */

const DW = 1672;
const DH = 941;

/* The block above the artwork — headline, the two lines of copy and the calls
   to action. The artwork is pushed down by exactly this much and nothing inside
   it moves, so every card, connector and the disc keep the coordinates they
   were drawn at. */
const HEAD = 166;
const CH = DH + HEAD;

/* Ink lifted from the artwork itself rather than guessed at. */
const BLUE = '#0559f5';
const BLUE_SOFT = '#2f7bff';
const INK = '#0b0f19';
const SLATE = '#3b4a79';
const BODY = '#1f2937';
const MUTED = '#8b98ae';
const LINE = '#eef2f9';
const PANEL = '#fdfeff';

/* ── Typewriter ──
   The hero's original: it types the line out and blinks a caret while it goes.
   Untyped text stays in the DOM but transparent, so the whole sentence is in
   the page exactly once — server HTML, copy and paste, screen readers — and
   its width is reserved, which is what stops the wrapped line reflowing on
   every keystroke. The caret is taken out of the flow for the same reason.
   A reader who has asked for less motion simply gets the finished line. */
function Typewriter({ text, delay, speed = 60 }: { text: string; delay: number; speed?: number }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay, reduced]);
  useEffect(() => {
    if (reduced || !started || shown >= text.length) return;
    const t = setTimeout(() => setShown(n => n + 1), speed);
    return () => clearTimeout(t);
  }, [reduced, started, shown, text, speed]);

  if (reduced) return <>{text}</>;
  const typing = started && shown < text.length;
  return (
    <>
      {text.slice(0, shown)}
      {typing && (
        <span style={{ position: 'relative', display: 'inline-block', width: 0 }}>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[3px] bg-blue-500 align-middle"
            style={{ position: 'absolute', left: 2, top: '0.08em', height: '0.85em' }}
          />
        </span>
      )}
      <span className="opacity-0">{text.slice(shown)}</span>
    </>
  );
}

/* ── little shared pieces ─────────────────────────────────────────────── */

type Box = { x: number; y: number; w: number; h: number };

/* A capability card. The float is per-card so they never breathe in unison. */
function Card({
  box, phase, drift, parallax, children,
}: {
  box: Box; phase: number; drift: boolean; parallax: { x: any; y: any } | null; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: drift ? [0, -6, 0] : 0 }}
      transition={{
        duration: 0.7, delay: 0.15 + phase * 0.08, ease: [0.22, 1, 0.36, 1],
        ...(drift ? { y: { duration: 7.5 + phase * 0.9, repeat: Infinity, ease: 'easeInOut', delay: 1.1 + phase * 0.6 } } : {}),
      }}
      style={{
        position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h,
        borderRadius: 20, background: '#ffffff',
        boxShadow: '0 18px 44px -18px rgba(15,42,97,0.20), 0 2px 10px -2px rgba(15,42,97,0.06)',
        ...(parallax ? { x: parallax.x, y: parallax.y } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}

/* The blue rounded tile every card is headed with. */
function Tile({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 52, height: 52, borderRadius: 15,
      background: `linear-gradient(150deg, ${BLUE_SOFT} 0%, ${BLUE} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 18px -6px rgba(5,89,245,0.55)',
    }}>{children}</div>
  );
}

function Title({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, fontSize: 13.5, fontWeight: 800, color: INK, letterSpacing: 0.3, lineHeight: '21px' }}>
      {lines.map(l => <div key={l}>{l}</div>)}
    </div>
  );
}

function Rule({ x, y, w }: { x: number; y: number; w: number }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: w, height: 1, background: LINE }} />;
}

/* Bar waveform, the shape the artwork uses. Heights come from a fixed formula
   so the server and the browser draw exactly the same bars. */
const waveHeights = (n: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = Math.abs(Math.sin((i + 1) * 0.7 * seed));
    const b = Math.abs(Math.sin((i + 1) * 0.23 * seed + 1.3));
    return 0.12 + Math.min(1, a * 0.65 + b * 0.5) * 0.88;
  });

function Wave({
  x, y, w, h, bars, seed, color, live,
}: { x: number; y: number; w: number; h: number; bars: number; seed: number; color: string; live: boolean }) {
  const hs = waveHeights(bars, seed);
  const gap = w / bars;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', alignItems: 'center', gap: 0 }}>
      {hs.map((v, i) => (
        <motion.span
          key={i}
          animate={live ? { scaleY: [v, Math.min(1, v * 1.5 + 0.1), v] } : { scaleY: v }}
          transition={live
            ? { duration: 1.5 + (i % 5) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: (i % 11) * 0.09 }
            : { duration: 0 }}
          style={{
            width: Math.max(1.4, gap * 0.5), height: h, marginRight: gap * 0.5,
            background: color, borderRadius: 2, transformOrigin: 'center', display: 'block',
          }}
        />
      ))}
    </div>
  );
}

/* ── the chatbot card's conversation ──────────────────────────────────── */

const BOT_CONVO: { role: 'bot' | 'user'; text: string }[] = [
  { role: 'bot', text: 'Hi! How can I\nassist you today?' },
  { role: 'user', text: 'I want to check\nmy reservation.' },
  { role: 'bot', text: 'Sure — booking\n#TK-1027 is confirmed.' },
  { role: 'user', text: 'Can I move it to\nFriday?' },
  { role: 'bot', text: 'Done. Moved to\nFriday, 6 PM.' },
];
const BOT_WINDOW = 2;

function ChatbotFeed({ reduced }: { reduced: boolean }) {
  const [feed, setFeed] = useState<{ m: (typeof BOT_CONVO)[number]; id: number }[]>(
    () => BOT_CONVO.slice(0, BOT_WINDOW).map((m, id) => ({ m, id })),
  );
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (reduced) { setTyping(true); return; }
    let timer: ReturnType<typeof setTimeout>;
    let n = BOT_WINDOW;
    const step = () => {
      setTyping(true);
      timer = setTimeout(() => {
        const m = BOT_CONVO[n % BOT_CONVO.length];
        const id = n;
        n += 1;
        setFeed(prev => [...prev, { m, id }].slice(-BOT_WINDOW));
        setTyping(false);
        timer = setTimeout(() => { setTyping(true); timer = setTimeout(step, 900); }, 1500);
      }, 1400);
    };
    timer = setTimeout(step, 2600);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <div style={{ position: 'absolute', left: 58, top: 58, width: 258, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, overflow: 'hidden' }}>
      <AnimatePresence initial={false}>
        {feed.map(({ m, id }) => (
          <motion.div
            key={id}
            layout
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', flexShrink: 0 }}
          >
            <div style={{
              maxWidth: 168, padding: '9px 13px', borderRadius: 15, fontSize: 12.5, lineHeight: '17px',
              fontWeight: 500, whiteSpace: 'pre-line',
              ...(m.role === 'user'
                ? { background: '#0261fe', color: '#fff', borderBottomRightRadius: 4 }
                : { background: '#eef2f8', color: '#334155', borderBottomLeftRadius: 4 }),
            }}>{m.text}</div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* the assistant thinking — the resting state the artwork shows */}
      <div style={{ height: 21, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              style={{ background: '#eef2f8', borderRadius: 999, padding: '6px 11px', display: 'flex', gap: 5, alignItems: 'center' }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={reduced ? { y: 0 } : { y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                  transition={reduced ? { duration: 0 } : { duration: 0.9, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
                  style={{ width: 5, height: 5, borderRadius: 999, background: '#9aa7bd', display: 'block' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── glyphs, drawn to match the artwork's tiles ───────────────────────── */
const GChat = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 3C7 3 3 6.4 3 10.6c0 2.4 1.3 4.5 3.4 5.9l-.7 3.1a.5.5 0 0 0 .74.55l3.5-2a11 11 0 0 0 2.06.2c5 0 9-3.4 9-7.75S17 3 12 3z" /></svg>);
const GChart = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><rect x="3" y="12" width="4" height="9" rx="1.2" /><rect x="10" y="7" width="4" height="14" rx="1.2" /><rect x="17" y="3" width="4" height="18" rx="1.2" /></svg>);
const GMic = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><path d="M12 18v3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>);
const GSend = () => (<svg width="23" height="23" viewBox="0 0 24 24" fill="#fff"><path d="M21.4 2.6 2.9 9.9c-.9.4-.8 1.7.1 1.9l5.6 1.6 1.6 5.6c.2.9 1.5 1 1.9.1l7.3-18.5c.3-.7-.3-1.3-1-1z" /></svg>);
const GTicket = () => (<svg width="23" height="23" viewBox="0 0 24 24" fill="#fff"><path d="M11 3.2 3.2 11a2 2 0 0 0 0 2.8l7 7a2 2 0 0 0 2.8 0l7.8-7.8a2 2 0 0 0 .6-1.6l-.4-5.6a2 2 0 0 0-1.9-1.9l-5.6-.4a2 2 0 0 0-1.5.7z" /><circle cx="16" cy="8" r="1.7" fill={BLUE} /></svg>);
const GClipboard = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><rect x="4" y="4" width="16" height="18" rx="2.4" /><rect x="8.5" y="2" width="7" height="4" rx="1.4" fill="#fff" stroke={BLUE} strokeWidth="1.4" /><rect x="7.5" y="10" width="9" height="1.7" rx="0.85" fill={BLUE} /><rect x="7.5" y="14" width="6" height="1.7" rx="0.85" fill={BLUE} /></svg>);

const IcPhone = ({ c = BLUE }: { c?: string }) => (<svg width="21" height="21" viewBox="0 0 24 24" fill={c}><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>);
const IcChat = ({ c = BLUE }: { c?: string }) => (<svg width="21" height="21" viewBox="0 0 24 24" fill={c}><path d="M4 4h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 16H9l-4.2 3.6A.6.6 0 0 1 4 19.1V16a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 4z" /></svg>);
const IcWhats = () => (<svg width="21" height="21" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a13 13 0 0 1-5.7-4.6c-.4-.6-.9-1.5-.9-2.4s.5-1.4.7-1.6c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.8 1.8c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1 1 2 1.3 2.3 1.4.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.3v.9z" /></svg>);
const IcMail = ({ c = '#ef4444' }: { c?: string }) => (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9"><rect x="2.5" y="5" width="19" height="14" rx="2.2" /><path d="m3 7 9 6 9-6" /></svg>);
const IcInsta = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#f09433" /><stop offset="0.5" stopColor="#dc2743" /><stop offset="1" stopColor="#bc1888" /></linearGradient></defs>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="12" cy="12" r="4.3" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="url(#ig)" />
  </svg>
);
const IcSmile = () => (<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.7"><circle cx="12" cy="12" r="9.2" /><circle cx="9" cy="10" r="1.1" fill={BLUE} stroke="none" /><circle cx="15" cy="10" r="1.1" fill={BLUE} stroke="none" /><path d="M8.2 14.4a4.6 4.6 0 0 0 7.6 0" strokeLinecap="round" /></svg>);

/* ═══════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const reducedRaw = useReducedMotion();
  const reduced = !!reducedRaw;
  const move = !reduced;

  /* ── fit the canvas to whatever width we are given ── */
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [band, setBand] = useState(DH);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fit = () => {
      const w = wrapRef.current?.clientWidth || window.innerWidth;
      const s = Math.min(1, w / DW);
      setScale(s);
      /* On a narrow screen the canvas scales right down, and letting the section
         collapse to that height left the hero a thin strip and pulled the rest
         of the page up around it. Keep a sensible band and sit the composition
         in the middle of it. */
      /* Desktop keeps the band it always had. On a phone the composition scales
         right down, and that same band left a few hundred pixels of empty space
         under the artwork — so there the section is only a little taller than
         the artwork itself, enough that it does not read as a hairline strip. */
      setMobile(w < 900);
      setBand(w < 900
        ? Math.max(CH * s + 48, Math.min(360, Math.round(window.innerHeight * 0.42)))
        : Math.max(CH * s, Math.min(620, Math.round(window.innerHeight * 0.72))));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* ── restrained depth: the columns lean a few pixels with the pointer ── */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 55, damping: 20, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const leftX = useTransform(sx, [-1, 1], [9, -9]);
  const leftY = useTransform(sy, [-1, 1], [5, -5]);
  const rightX = useTransform(sx, [-1, 1], [-9, 9]);
  const rightY = useTransform(sy, [-1, 1], [-5, 5]);
  const midX = useTransform(sx, [-1, 1], [-3.5, 3.5]);
  const midY = useTransform(sy, [-1, 1], [-2.5, 2.5]);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const b = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - b.left) / b.width) * 2 - 1);
    py.set(((e.clientY - b.top) / b.height) * 2 - 1);
  };
  const onLeave = () => { px.set(0); py.set(0); };
  const L = move ? { x: leftX, y: leftY } : null;
  const R = move ? { x: rightX, y: rightY } : null;
  const M = move ? { x: midX, y: midY } : null;

  /* ── card activity, each on its own unrelated beat ── */
  const [inboundRow, setInboundRow] = useState(-1);
  const [surveyHint, setSurveyHint] = useState(-1);
  const [contacts, setContacts] = useState(reduced ? 2431 : 0);
  const [progress, setProgress] = useState(reduced ? 68 : 0);

  useEffect(() => {
    if (reduced) return;
    const a = setInterval(() => setInboundRow(i => (i + 1) % 4), 2300);
    return () => clearInterval(a);
  }, [reduced]);

  /* The survey runs a light pass across 1–5 and settles back on the 5 the
     design selected, so the control reads as live without ever contradicting
     the "Excellent" it is labelled with. */
  useEffect(() => {
    if (reduced) return;
    let step = 0;
    let t: ReturnType<typeof setTimeout>;
    const run = () => {
      step += 1;
      if (step <= 5) { setSurveyHint(step - 1); t = setTimeout(run, 260); }
      else { setSurveyHint(-1); step = 0; t = setTimeout(run, 5200); }
    };
    t = setTimeout(run, 3400);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const c = animate(0, 2431, { duration: 1.5, delay: 1.1, ease: 'easeOut', onUpdate: v => setContacts(Math.round(v)) });
    const p = animate(0, 68, { duration: 1.4, delay: 1.2, ease: 'easeOut', onUpdate: v => setProgress(v) });
    return () => { c.stop(); p.stop(); };
  }, [reduced]);

  const nodes: [number, number][] = [[543, 276], [458, 484], [518, 670], [1127, 276], [1210, 484], [1146, 673]];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(168deg, #ecf0fd 0%, #f6f9ff 42%, #fbfdfe 100%)' }}
    >
      {/* the artwork's faint dot field, kept to the outer edges as drawn */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.16) 1.1px, transparent 1.1px)',
          backgroundSize: '34px 34px',
          maskImage: 'linear-gradient(90deg, black 0%, transparent 16%, transparent 84%, black 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, transparent 16%, transparent 84%, black 100%)',
          opacity: 0.6,
        }}
      />

      {/* The site's navbar is fixed over the top of the page, so the canvas
          starts below it rather than under it. The composition itself is
          untouched — it is only pushed clear. */}
      <div ref={wrapRef} className="relative w-full" style={mobile ? { marginTop: 84 } : { height: band, marginTop: 88 }}>
        <div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            ...(mobile ? {
              position: 'relative', width: '100%', padding: '0 16px 4px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            } : {
              position: 'absolute', top: Math.max(0, (band - CH * scale) / 2), left: '50%',
              width: DW, height: CH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center',
            }),
          }}
        >

          {/* ── headline ── */}
          {/* Same type, same two lines, same ink — it simply starts at the top of
              the band now that the wordmark and the badge are gone. The motion
              added here is only the two lines arriving one just behind the other
              instead of as a single slab, and a slow drift across the blue half
              between the two blues the artwork already uses. Both are off under
              prefers-reduced-motion. */}
          <h1
            style={{
              ...(mobile
                ? { position: 'relative', width: '100%', textAlign: 'center', fontSize: 30, lineHeight: '38px', marginTop: 4 }
                : { position: 'absolute', left: 0, top: 40, width: DW, textAlign: 'center', fontSize: 58, lineHeight: '58px', margin: 0 }),
              fontWeight: 800, letterSpacing: '-0.022em', color: INK,
            }}
            className="font-figtree"
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              From Customer Interaction
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block', marginTop: mobile ? 2 : 12 }}
            >
              to{' '}
              {/* #0559f5 → #2f7bff → #0559f5, drifting across the words over 14s,
                  so the blue is never anything the artwork does not already use.
                  The padding only widens the box the gradient is clipped to, so
                  ascenders and descenders keep their colour — it does not move
                  the text, and nothing follows it in flow. */}
              <motion.span
                animate={move ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : undefined}
                transition={move ? { duration: 14, repeat: Infinity, ease: 'easeInOut' } : undefined}
                style={{
                  display: 'inline-block', padding: '0.18em 0 0.22em',
                  backgroundImage: `linear-gradient(100deg, ${BLUE} 0%, ${BLUE_SOFT} 45%, ${BLUE} 100%)`,
                  backgroundSize: '220% 100%', backgroundPosition: '0% 50%',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', color: 'transparent',
                }}
              >Intelligent Action.</motion.span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={mobile
              ? { position: 'relative', width: '100%', textAlign: 'center', fontSize: 17, lineHeight: '25px', fontWeight: 500, color: SLATE, margin: '12px 0 0' }
              : { position: 'absolute', left: 0, top: 186, width: DW, textAlign: 'center', fontSize: 21, fontWeight: 500, color: SLATE, margin: 0 }}
          >
            7 connected and independent capabilities.
          </motion.p>

          {/* ── what Inaipi is ──
              The supporting paragraph the hero has always carried. It went
              missing when the artwork replaced the old hero; it belongs above
              the artwork, with the badge and the buttons, and nothing inside
              the artwork moves to make room for it. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
            style={{
              ...(mobile
                ? { position: 'relative', width: '100%', maxWidth: 480, textAlign: 'center', fontSize: 16, lineHeight: '26px', margin: '10px 0 0' }
                : { position: 'absolute', left: (DW - 880) / 2, top: 222, width: 880, textAlign: 'center', fontSize: 19, lineHeight: '28px', margin: 0 }),
              fontWeight: 400, color: '#64748b',
            }}
          >
            <Typewriter
              text="Inaipi is an AI-native, cloud-first customer experience platform, with Sovereign Cloud options that keep data resident, compliant and fully under your control."
              delay={0.55}
              speed={18}
            />
          </motion.p>

          {/* ── calls to action ── */}
          {/* the same two buttons, with the same hover treatment, as before */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={mobile
              ? { position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '18px 0 2px', flexWrap: 'wrap' }
              : { position: 'absolute', left: 0, top: 302, width: DW, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}
          >
            {/* Primary — full hover treatment */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96, y: 0 }}>
              <a
                href="#"
                aria-label="Get started free"
                className="relative group overflow-hidden bg-[#2563eb] hover:bg-[#1d4ed8] text-white min-h-[44px] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 whitespace-nowrap"
              >
                {/* Shimmer fires on hover */}
                <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.25)' }} />
                <span className="relative z-10">Get Started Free</span>
                {/* Arrow shoots out and re-enters */}
                <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                  <ArrowRight className="w-2.5 h-2.5 text-white translate-x-0 group-hover:translate-x-4 transition-transform duration-200 ease-in" />
                  <ArrowRight className="w-2.5 h-2.5 text-white absolute -translate-x-4 group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                </span>
              </a>
            </motion.div>

            {/* Secondary — border/text turns blue on hover */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96, y: 0 }}>
              <a
                href="#"
                aria-label="Watch product demo"
                className="relative group text-[11px] font-black text-[#0f172a] hover:text-[#2563eb] hover:border-[#2563eb] hover:shadow-md hover:shadow-blue-500/15 transition-all duration-200 uppercase tracking-[0.15em] flex items-center justify-center gap-2 border-2 border-[#0f172a]/40 min-h-[44px] px-5 py-2.5 rounded-full whitespace-nowrap"
              >
                Watch Demo
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </motion.div>
          </motion.div>

          {/* ══ the approved artwork, exactly as drawn ══
              Everything below is one block, moved down by HEAD and by nothing
              else. The disc, the connector lines and all seven cards keep the
              coordinates they were signed off at, so nothing inside the artwork
              has shifted relative to anything else in it. */}
          <div style={mobile ? { position: 'relative', width: '100%', height: DH * scale, marginTop: 10 } : undefined}>
          {/* Nothing in the artwork is interactive, and its box reaches up over
              the buttons — so it let the pointer through rather than swallowing
              it. That is what stopped the calls to action lighting up on hover;
              the pointer never reached them. Parallax still gets the movement,
              because it listens on the canvas underneath. */}
          <div style={mobile
            ? { position: 'absolute', top: 0, left: '50%', width: DW, height: DH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center', pointerEvents: 'none' }
            : { position: 'absolute', left: 0, top: HEAD, width: DW, height: DH, pointerEvents: 'none' }}>

          {/* ── connectors: the disc's ring nodes and the lines out to the cards ── */}
          <svg width={DW} height={DH} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
            <g fill="none" stroke="#bfd4f7" strokeWidth="1.3">
              {/* the faint ring the connector nodes sit on */}
              <ellipse cx="833.5" cy="494" rx="381" ry="286" opacity="0.55" />
              <path d="M468 252 C 502 254, 522 264, 543 276" />
              <path d="M425 484 C 438 484, 448 484, 458 484" />
              <path d="M462 698 C 486 690, 502 681, 518 670" />
              <path d="M1208 252 C 1174 254, 1150 264, 1127 276" />
              <path d="M1243 484 C 1230 484, 1220 484, 1210 484" />
              <path d="M1188 698 C 1170 690, 1158 681, 1146 673" />
            </g>
            {nodes.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="7.5" fill="#ffffff" stroke="#9fc0f2" strokeWidth="1.3" />
                <motion.circle
                  cx={x} cy={y} r="3.6" fill={BLUE}
                  animate={move ? { opacity: [0.55, 1, 0.55] } : { opacity: 1 }}
                  transition={move ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 } : { duration: 0 }}
                />
              </g>
            ))}
          </svg>

          {/* ── centre disc, cut from the approved artwork ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1, ...(move ? { y: [0, -5, 0] } : {}) }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1], ...(move ? { y: { duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } } : {}) }}
            style={{ position: 'absolute', left: 475, top: 229, width: 717, height: 530, ...(M ? { x: M.x } : {}) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-center.webp"
              alt="A contact centre agent working alongside an AI assistant, with a live conversation showing the customer's request, the AI voicebot's reply, and the detected intent: Reservation Change, 92% confidence."
              style={{ width: 717, height: 530, borderRadius: '50%', display: 'block' }}
            />
          </motion.div>
          {/* the disc's caption is inside the artwork; repeat it for readers and search */}
          <p className="sr-only">Human + AI working together. Better decisions. Better outcomes.</p>

          {/* ═══ 1 · INBOUND DIGITAL CONTACT CENTER ═══ */}
          <Card box={{ x: 148, y: 148, w: 320, h: 242 }} phase={0} drift={move} parallax={L}>
            <Tile x={12} y={12}><GChat /></Tile>
            <Title x={84} y={20} lines={['INBOUND DIGITAL', 'CONTACT CENTER']} />
            <div style={{ position: 'absolute', left: 12, top: 80, width: 296, height: 150, borderRadius: 13, background: PANEL, border: `1px solid ${LINE}` }}>
              <div style={{ position: 'absolute', left: 12, top: 8, fontSize: 11.5, color: MUTED, fontWeight: 500 }}>Active (32)</div>
              {[
                { n: 'Sarah Johnson', t: '10:21 AM', av: '/hero-av1.webp' },
                { n: 'Michael Lee', t: '10:19 AM', av: '/hero-av2.webp' },
                { n: 'Priya Sharma', t: '10:18 AM', av: '/hero-av3.webp' },
              ].map((r, i) => (
                <motion.div
                  key={r.n}
                  animate={{ opacity: inboundRow === -1 || inboundRow === i ? 1 : 0.74 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: 10, top: 26 + i * 32, width: 276, height: 28, display: 'flex', alignItems: 'center' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.av} alt="" style={{ width: 25, height: 25, borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 600, color: BODY }}>{r.n}</span>
                  <span style={{ position: 'absolute', left: 165, fontSize: 11.5, color: '#9aa7bd' }}>{r.t}</span>
                  <span style={{ position: 'absolute', left: 240, display: 'flex', alignItems: 'center' }}>
                    {i === 0 && (
                      <motion.span
                        animate={move ? { scale: inboundRow === 0 ? 1.07 : 1 } : { scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: BLUE, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '3px 11px', display: 'inline-block' }}
                      >Chat</motion.span>
                    )}
                    {i === 1 && <IcPhone c="#22c55e" />}
                    {i === 2 && <IcMail c="#334155" />}
                  </span>
                </motion.div>
              ))}
              <Rule x={10} y={122} w={276} />
              <div style={{ position: 'absolute', left: 18, top: 130, width: 262, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IcPhone /><IcChat /><IcWhats /><IcMail /><IcInsta />
              </div>
            </div>
          </Card>

          {/* ═══ 2 · CONVERSATION INTELLIGENCE ═══ */}
          <Card box={{ x: 100, y: 410, w: 325, h: 227 }} phase={1} drift={move} parallax={L}>
            <Tile x={13} y={13}><GChart /></Tile>
            <Title x={81} y={20} lines={['CONVERSATION', 'INTELLIGENCE']} />
            <Rule x={10} y={78} w={305} />
            <Wave x={16} y={86} w={236} h={34} bars={54} seed={1.7} color="#2f7bff" live={move} />
            <div style={{ position: 'absolute', left: 262, top: 96, fontSize: 11.5, color: '#64748b', fontWeight: 500 }}>02:18</div>
            <Rule x={10} y={128} w={305} />
            <div style={{ position: 'absolute', left: 96, top: 132, width: 1, height: 54, background: LINE }} />
            <div style={{ position: 'absolute', left: 196, top: 132, width: 1, height: 54, background: LINE }} />
            {[
              { l: 'Sentiment', v: 'Positive', x: 14, dot: '#22c55e' },
              { l: 'Topic', v: 'Booking\nChange', x: 106 },
              { l: 'Intent', v: 'Change\nReservation', x: 206 },
            ].map(c => (
              <div key={c.l} style={{ position: 'absolute', left: c.x, top: 136 }}>
                <div style={{ fontSize: 10.5, color: MUTED, marginBottom: 6 }}>{c.l}</div>
                <div style={{ fontSize: 12, color: BODY, fontWeight: 600, whiteSpace: 'pre-line', lineHeight: '16px', display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                  {c.dot && (
                    <motion.span
                      animate={move ? { opacity: [0.55, 1, 0.55] } : { opacity: 1 }}
                      transition={move ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
                      style={{ width: 7, height: 7, borderRadius: 999, background: c.dot, display: 'block', marginTop: 4 }}
                    />
                  )}
                  <span>{c.v}</span>
                </div>
              </div>
            ))}
            <Rule x={10} y={194} w={305} />
            <div style={{ position: 'absolute', left: 14, top: 202, fontSize: 11, color: MUTED }}>Key Moment</div>
            <div style={{ position: 'absolute', left: 106, top: 202, fontSize: 11.5, color: '#334155', fontWeight: 500 }}>10:21</div>
          </Card>

          {/* ═══ 3 · AI VOICEBOT ═══ */}
          <Card box={{ x: 150, y: 660, w: 312, h: 218 }} phase={2} drift={move} parallax={L}>
            <Tile x={13} y={11}><GMic /></Tile>
            <Title x={82} y={26} lines={['AI VOICEBOT']} />
            <Rule x={12} y={76} w={288} />
            <div style={{ position: 'absolute', left: 26, top: 82, fontSize: 12.5, color: '#334155', fontWeight: 500 }}>Call in Progress</div>
            <div style={{ position: 'absolute', left: 250, top: 82, fontSize: 12, color: '#64748b', fontWeight: 500 }}>02:18</div>
            <Wave x={25} y={104} w={262} h={38} bars={58} seed={2.9} color="#2f7bff" live={move} />
            <Rule x={12} y={158} w={288} />
            <div style={{ position: 'absolute', left: 30, top: 168, display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 21, height: 21, borderRadius: 999, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, border: '2px solid #fff', display: 'block' }} />
              </span>
              <span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>AI Voicebot</span>
            </div>
            <div style={{ position: 'absolute', left: 196, top: 172, display: 'flex', alignItems: 'center', gap: 7 }}>
              <motion.span
                animate={move ? { opacity: [0.4, 1, 0.4], scale: [1, 1.18, 1] } : { opacity: 1 }}
                transition={move ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
                style={{ width: 8, height: 8, borderRadius: 999, background: '#22c55e', display: 'block' }}
              />
              <span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>Speaking...</span>
            </div>
          </Card>

          {/* ═══ 4 · OUTREACH MANAGER ═══ */}
          <Card box={{ x: 1208, y: 148, w: 322, h: 240 }} phase={3} drift={move} parallax={R}>
            <Tile x={12} y={12}><GSend /></Tile>
            <Title x={90} y={20} lines={['OUTREACH', 'MANAGER']} />
            <Rule x={12} y={80} w={298} />
            <div style={{ position: 'absolute', left: 22, top: 92, fontSize: 13.5, fontWeight: 700, color: BODY }}>Win-back Offer Campaign</div>
            <div style={{ position: 'absolute', left: 24, top: 128, fontSize: 11.5, color: MUTED }}>Progress</div>
            <div style={{ position: 'absolute', left: 24, top: 150, width: 223, height: 6, borderRadius: 3, background: '#eaeffb', overflow: 'hidden' }}>
              <motion.div style={{ width: `${progress}%`, height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${BLUE_SOFT}, ${BLUE})` }} />
            </div>
            <div style={{ position: 'absolute', left: 256, top: 141, fontSize: 14.5, fontWeight: 800, color: BODY }}>{Math.round(progress)}%</div>
            <div style={{ position: 'absolute', left: 24, top: 176, fontSize: 11.5, color: MUTED }}>Contacts</div>
            <div style={{ position: 'absolute', left: 24, top: 195, fontSize: 15.5, fontWeight: 800, color: BODY }}>{contacts.toLocaleString('en-US')}</div>
            <div style={{ position: 'absolute', left: 182, top: 190, display: 'flex', alignItems: 'center' }}>
              {['/hero-ct1.webp', '/hero-ct2.webp', '/hero-ct3.webp', '/hero-ct4.webp'].map((a, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={a} src={a} alt="" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: '1.6px solid #fff', marginLeft: i === 0 ? 0 : -6 }} />
              ))}
              <span style={{ marginLeft: 9, fontSize: 11, color: '#64748b', fontWeight: 600 }}>+68</span>
            </div>
          </Card>

          {/* ═══ 5 · AI CHATBOT ═══ */}
          <Card box={{ x: 1243, y: 415, w: 332, h: 222 }} phase={4} drift={move} parallax={R}>
            <Tile x={16} y={10}><GChat /></Tile>
            <Title x={88} y={26} lines={['AI CHATBOT']} />
            <ChatbotFeed reduced={reduced} />
          </Card>

          {/* ═══ 6 · TICKETING ═══ */}
          <Card box={{ x: 1188, y: 658, w: 340, h: 212 }} phase={5} drift={move} parallax={R}>
            <Tile x={21} y={8}><GTicket /></Tile>
            <Title x={92} y={24} lines={['TICKETING']} />
            <Rule x={22} y={68} w={296} />
            {[
              { l: 'Ticket', v: '#TK-1027', pill: 'In Progress' },
              { l: 'Issue', v: 'Reservation change' },
              { l: 'Priority', v: 'High', dot: '#ef4444' },
              { l: 'Updated', v: '2m ago' },
            ].map((r, i) => (
              <div key={r.l} style={{ position: 'absolute', left: 28, top: 82 + i * 31, width: 292, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#7b8aa3', width: 84 }}>{r.l}</span>
                <span style={{ fontSize: 12.5, color: BODY, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {r.dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: r.dot, display: 'block' }} />}
                  {r.v}
                </span>
                {r.pill && (
                  <motion.span
                    animate={move ? { opacity: [0.82, 1, 0.82] } : { opacity: 1 }}
                    transition={move ? { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.4 } : { duration: 0 }}
                    style={{ position: 'absolute', left: 204, background: '#ede9fe', color: '#6d28d9', fontSize: 11.5, fontWeight: 600, borderRadius: 999, padding: '4px 13px' }}
                  >{r.pill}</motion.span>
                )}
              </div>
            ))}
          </Card>

          {/* ═══ 7 · SURVEYS ═══ */}
          <Card box={{ x: 620, y: 755, w: 415, h: 158 }} phase={6} drift={move} parallax={M}>
            <Tile x={14} y={6}><GClipboard /></Tile>
            <Title x={82} y={22} lines={['SURVEYS']} />
            <div style={{ position: 'absolute', left: 12, top: 60, width: 391, height: 90, borderRadius: 13, background: PANEL, border: `1px solid ${LINE}` }}>
              <div style={{ position: 'absolute', left: 13, top: 12, fontSize: 12.5, color: '#475569' }}>How was your experience today?</div>
              {[1, 2, 3, 4, 5].map((n, i) => {
                const chosen = n === 5;
                const hinted = surveyHint === i;
                return (
                  <motion.div
                    key={n}
                    animate={{
                      scale: hinted && !chosen ? 1.1 : chosen && hinted ? 1.14 : 1,
                      background: chosen ? BLUE : hinted ? '#dbe7ff' : '#eef1f4',
                      color: chosen ? '#ffffff' : hinted ? '#1d4ed8' : '#64748b',
                      boxShadow: chosen ? '0 6px 16px -4px rgba(5,89,245,0.55)' : '0 0 0 0 rgba(5,89,245,0)',
                    }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', left: 20 + i * 49, top: 41, width: 34, height: 34, borderRadius: 999,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13.5, fontWeight: 600,
                    }}
                  >{n}</motion.div>
                );
              })}
              <div style={{ position: 'absolute', left: 266, top: 49, fontSize: 13.5, fontWeight: 700, color: BLUE }}>Excellent</div>
              <div style={{ position: 'absolute', left: 358, top: 47 }}><IcSmile /></div>
            </div>
          </Card>

          </div></div>{/* ── end of the artwork block ── */}

        </div>
      </div>
    </section>
  );
}
