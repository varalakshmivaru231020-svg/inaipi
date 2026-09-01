'use client';

import { motion } from 'framer-motion';
import { PhoneCall, FileText, BarChart2, MessageSquare, XCircle, Lightbulb } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getLenis } from '@/lib/lenis';

const painPoints = [
  {
    number: '01',
    icon: PhoneCall,
    tag: 'Customer Outreach',
    pill: 'When Customers Contact You',
    title: 'Disconnected Customer Channels',
    problems: [
      'Voice, chat, email, and messaging operate separately',
      'Customer context gets scattered across channels',
      'Agents switch between systems to understand one customer',
      'Customers repeat information when conversations move between channels',
    ],
    gap: "Customer interactions start in one system and continue in another. Without shared context, agents spend time finding information instead of resolving the customer's need.",
  },
  {
    number: '02',
    icon: FileText,
    tag: 'Customer Follow-Up',
    pill: 'When Customers Need Follow-Up',
    title: 'Follow-Up Falls Between Systems',
    problems: [
      'Contact center, CRM, and ticketing systems hold separate context',
      'Manual case creation separates the conversation from the case',
      'Handoffs depend on people instead of connected workflows',
      'Callbacks, commitments, and SLAs are tracked across separate tools',
    ],
    gap: 'When context does not follow the customer, follow-up becomes manual. Teams spend time reconstructing what happened before they can decide what happens next.',
  },
  {
    number: '03',
    icon: BarChart2,
    tag: 'Customer Feedback',
    pill: 'When Customers Share Feedback',
    title: 'Feedback Without Context',
    problems: [
      'Survey tools operate separately from customer interactions',
      'Feedback is often collected after the interaction',
      'Feedback often lacks the context of the original interaction',
      'Teams struggle to connect feedback with the interaction, issue, or outcome',
    ],
    gap: 'A satisfaction score tells you what happened. Connected customer context helps you understand why, where, and what to do next.',
  },
  {
    number: '04',
    icon: MessageSquare,
    tag: 'Campaign Management',
    pill: 'When Businesses Run Campaigns',
    title: 'Outbound Without Customer Context',
    problems: [
      'Campaign tools operate separately from customer interactions',
      'Teams spend time managing lists, dialing, and follow-ups manually',
      'Campaign data and customer history remain disconnected',
      'Teams lack a complete view of who to contact, when, and why',
    ],
    gap: 'When campaign decisions are separated from customer history, outreach becomes less relevant. Teams cannot easily connect the latest customer signal to the next action.',
  },
];

const results = [
  'Higher Cost to Serve',
  'Inconsistent Customer Experiences',
  'More Manual Work',
  'Missed Engagement Opportunities',
  'Limited Visibility Across the Journey',
];

const BG = '#f8faff';

const LAST = painPoints.length - 1;
const COOLDOWN_MS = 520;   // one tab change per gesture; also lets the fade finish
const TOUCH_STEP = 46;     // px of swipe that counts as one tab step
const ENGAGE_BAND = 150;   // how far past the pin-top a downward gesture can still latch

/* Phones get a sticky track instead of the wheel lock below. */
const MOBILE_Q = '(max-width: 1023px)';

export default function Problem() {
  const [active, setActive] = useState(0);
  const current = painPoints[active];

  /* ── Mobile: a sticky pin over a tall track ──────────────────────────
     The desktop behaviour hijacks the wheel and freezes the page. That could
     never work on a phone: it only engaged if the panel fitted under the navbar
     — and a real phone's browser chrome makes the viewport shorter than the
     panel — and it had to catch the section inside a 150px band, which a flick
     jumps straight over. Momentum scrolling cannot be cancelled once the finger
     is lifted either.

     So on a phone the section simply *is* several screens tall, with the panel
     stuck to the top of it. Scrolling through that track advances one state per
     screen, which is ordinary native scrolling: nothing to intercept, nothing
     to fight, and the section cannot be skipped because it genuinely occupies
     the scroll distance. After the last state the panel unsticks and the page
     carries on by itself. */
  const trackRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<{ top: number; seg: number; height: number } | null>(null);

  /* ── Scroll-driven tabs ──────────────────────────────────────────────
     Scrolling DOWN into the panel pins it and advances one tab per gesture;
     after the last tab the page is released to the next section. Scrolling UP
     never hijacks — it releases immediately and scrolls straight through,
     leaving the tab untouched. Falls back to normal scrolling when the panel
     can't fit the viewport (small screens) or reduced-motion is requested. */
  const pinRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const coolingRef = useRef(false);
  const touchYRef = useRef(0);
  const touchAccRef = useRef(0);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_Q);
    let ro: ResizeObserver | undefined;

    const measure = () => {
      const panel = pinRef.current;
      if (!mq.matches || !panel) { setPin(null); return; }
      const navH = document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
      const top = Math.round(navH + 8);
      const panelH = panel.offsetHeight;
      // How far the track scrolls per state, measured against what one swipe
      // actually travels on a phone.
      const seg = Math.min(420, Math.max(230, Math.round((window.innerHeight - top) * 0.45)));
      setPin({ top, seg, height: panelH + seg * LAST });
    };

    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', onResize);
    if (pinRef.current) { ro = new ResizeObserver(measure); ro.observe(pinRef.current); }
    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onResize);
      ro?.disconnect();
    };
  }, []);

  /* One deliberate swipe, exactly one state.

     What made this inconsistent was letting time or the browser's snap decide
     when a gesture was over. A flick outlasts any cooldown, so a second advance
     fired inside the same swipe and a state got skipped.

     So the gesture itself is the unit. A touch (or a wheel notch) arms one
     advance; crossing into the next state spends it and puts the scroll exactly
     on that state's boundary. Until the next touch, the track holds that
     position, which absorbs the rest of the fling however long it runs. The
     same hold is what stops the page leaving before the last state: there, an
     armed gesture releases it instead of advancing. Scrolling back up is never
     interfered with.

     Nothing is cancelled and no event is prevented — the page scrolls natively
     against a sticky panel, and this only decides where it comes to rest. */
  useEffect(() => {
    if (!pin) return;
    const track = trackRef.current;
    if (!track) return;

    const NUDGE = 24;        // ignore jitter around a boundary
    const MIN_GESTURE = 8;   // px of travel before a touch counts as a swipe

    let frame = 0;
    let armed = false;       // a fresh gesture is available to spend
    let lastGesture = 0;     // when the reader last touched or scrolled by hand
    let released = false;    // past the last state: stop holding
    let touchY = 0;
    let lastY = window.scrollY;

    /** document scroll position at which a state begins */
    const boundary = (i: number) =>
      window.scrollY + track.getBoundingClientRect().top + i * pin.seg - pin.top;
    const settle = (i: number) => window.scrollTo({ top: boundary(i), behavior: 'auto' });

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const goingUp = y < lastY;
      lastY = y;

      const passed = pin.top - track.getBoundingClientRect().top;
      const cur = activeRef.current;
      // Only hold against a hand: a scroll the page started itself - a footer
      // link heading for a section, say - has to be allowed through, or it gets
      // yanked back the moment it crosses this track.
      const byHand = performance.now() - lastGesture < 1200;

      // above the track, or on the way back up: follow the scroll, hold nothing
      if (passed < 0 || goingUp) {
        released = false;
        const idx = Math.min(LAST, Math.max(0, Math.floor(passed / pin.seg)));
        if (idx !== cur) { activeRef.current = idx; setActive(idx); }
        return;
      }

      if (cur < LAST) {
        if (passed >= (cur + 1) * pin.seg - NUDGE) {
          if (armed) {
            armed = false;
            const next = cur + 1;
            activeRef.current = next;
            setActive(next);
            settle(next);
          } else if (byHand) {
            // the rest of the same gesture: stay on the state it reached
            settle(cur);
          }
        }
        return;
      }

      // the last state: an armed gesture releases the page, otherwise hold
      if (passed > LAST * pin.seg + NUDGE) {
        if (armed) { armed = false; released = true; }
        if (!released && byHand) settle(LAST);
      }
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0]?.clientY ?? 0; lastGesture = performance.now(); };
    // arm only once the finger has actually travelled, so a tap or a stray
    // pixel of movement cannot advance anything
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (Math.abs(touchY - y) >= MIN_GESTURE) { armed = true; lastGesture = performance.now(); }
    };
    const onWheel = () => { armed = true; lastGesture = performance.now(); };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    const lenis = getLenis();
    lenis?.on('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', onWheel);
      lenis?.off('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pin]);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // phones use the sticky track above, so the two never run together
    if (window.matchMedia(MOBILE_Q).matches) return;

    const navH = () => document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
    const offset = () => navH() + 12;
    // Only hijack when the panel actually fits under the navbar; otherwise leave
    // native scrolling alone (very short viewports / large accessibility zoom).
    const fits = () => pin.offsetHeight <= window.innerHeight - navH() + 12;

    let cool: ReturnType<typeof setTimeout>;
    const startCooldown = () => {
      coolingRef.current = true;
      clearTimeout(cool);
      cool = setTimeout(() => { coolingRef.current = false; }, COOLDOWN_MS);
    };
    const advance = () => {
      const next = Math.min(LAST, activeRef.current + 1);
      activeRef.current = next;
      setActive(next);
      startCooldown();
    };

    /* Freeze the page (Lenis) and snap the panel just under the navbar. */
    const lock = () => {
      lockedRef.current = true;
      document.body.style.userSelect = 'none';
      const target = window.scrollY + pin.getBoundingClientRect().top - offset();
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
        lenis.scrollTo(target, { force: true, lock: true, duration: 0.35 });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    };
    const unlock = () => {
      lockedRef.current = false;
      document.body.style.userSelect = '';
      getLenis()?.start();
    };
    /* Release upward — smoothly scroll away above the section, tab untouched. */
    const releaseUp = () => {
      unlock();
      const to = Math.max(0, window.scrollY - Math.round(window.innerHeight * 0.85));
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(to, { duration: 0.6 });
      else window.scrollTo({ top: to, behavior: 'smooth' });
    };
    /* Release downward after the last tab — continue into the next section. */
    const releaseDown = () => {
      unlock();
      const lenis = getLenis();
      if (resultRef.current) {
        if (lenis) lenis.scrollTo(resultRef.current, { offset: -offset(), duration: 0.7 });
        else resultRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        const to = window.scrollY + Math.round(window.innerHeight * 0.85);
        if (lenis) lenis.scrollTo(to, { duration: 0.6 });
        else window.scrollTo({ top: to, behavior: 'smooth' });
      }
    };
    /* Is the panel sitting at the pin line while scrolling down? */
    const canEngage = () => {
      if (lockedRef.current || activeRef.current >= LAST || !fits()) return false;
      const off = offset();
      const top = pin.getBoundingClientRect().top;
      return top <= off + 6 && top >= off - ENGAGE_BAND;
    };

    // Engagement + reset ride on Lenis's per-frame scroll event (falls back to a
    // native scroll listener), so the pin latches precisely as the panel arrives.
    const onScrollFrame = () => {
      if (lockedRef.current) return;
      // Direction comes from the scroll position rather than from Lenis: on a
      // touch device Lenis is not driving the scroll, so lenis.direction stays
      // 0 and the panel never latched, which is why a phone scrolled straight
      // past the four states instead of stepping through them.
      const y = window.scrollY;
      const dir = y > lastY ? 1 : y < lastY ? -1 : 0;
      lastY = y;
      if (dir === 1) {
        if (canEngage()) lock();
      } else if (pin.getBoundingClientRect().top > window.innerHeight * 0.9 && activeRef.current !== 0) {
        activeRef.current = 0;
        setActive(0);
      }
    };
    let lastY = window.scrollY;

    // While locked the page is frozen; these gestures only step / release tabs.
    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      if (e.deltaY < 0) { releaseUp(); return; }
      if (activeRef.current >= LAST) { releaseDown(); return; }
      if (!coolingRef.current) advance();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
      touchAccRef.current = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      const y = e.touches[0].clientY;
      const dy = touchYRef.current - y;               // >0 → swipe up → scroll-down intent
      touchYRef.current = y;
      e.preventDefault();
      if (dy < -4) { releaseUp(); return; }
      if (activeRef.current >= LAST) { if (dy > 4) releaseDown(); return; }
      touchAccRef.current += dy;
      if (!coolingRef.current && touchAccRef.current > TOUCH_STEP) {
        advance();
        touchAccRef.current = 0;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey);
      const up = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
      if (down) {
        e.preventDefault();
        if (activeRef.current >= LAST) { releaseDown(); return; }
        if (!coolingRef.current) advance();
      } else if (up) {
        e.preventDefault();
        releaseUp();
      }
    };

    // Listen to both: Lenis drives the wheel, but a touch device scrolls
    // natively and Lenis emits nothing for it. The handler is idempotent, so
    // hearing the same scroll twice is harmless.
    const lenis = getLenis();
    if (lenis) lenis.on('scroll', onScrollFrame);
    window.addEventListener('scroll', onScrollFrame, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      if (lenis) lenis.off('scroll', onScrollFrame);
      window.removeEventListener('scroll', onScrollFrame);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
      clearTimeout(cool);
      getLenis()?.start();
      document.body.style.userSelect = '';
    };
  }, []);

  return (
    <>
      {/* overflow-x-clip, not overflow-hidden: `hidden` makes this a scroll
          container, which silently kills the sticky pin inside it. `clip` still
          keeps the blurred blobs from widening the page. */}
      <section className="py-14 lg:py-16 overflow-x-clip relative" style={{ background: BG }}>
        {/* Background blobs — promoted to their own GPU layer so the expensive
            blur is painted once and only composited (not repainted) during scroll */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(ellipse, rgba(20,71,212,0.08) 0%, transparent 65%)', transform: 'translateZ(0)' }} />
          <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.07) 0%, transparent 70%)', transform: 'translateZ(0)' }} />
          <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(0,231,255,0.05) 0%, transparent 70%)', transform: 'translateZ(0)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14 max-w-3xl mx-auto"
          >
            <span className="section-eyebrow">The Problem</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold font-figtree tracking-[-0.025em] leading-[1.2] mb-5">
              <span className="block text-[#0f172a]">Businesses invest heavily.</span>
              <span className="block">
                <span className="text-[#0f172a]">Customers still experience </span>
                <span className="text-[#1447d4]">disconnected journeys.</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
              Customer engagement spans voice, messaging, follow-ups, feedback, and campaigns.
              When these capabilities run across disconnected systems, teams spend their time
              connecting the gaps instead of serving the customer.
            </p>
          </motion.div>

          {/* Pinned block — tabs + content advance on scroll (see effects above).
              On a phone it sits in a track several screens tall and sticks to
              the top of it, so scrolling steps through the states; on desktop
              the track collapses and the wheel lock takes over. */}
          <div ref={trackRef} style={pin ? { position: 'relative', height: pin.height } : undefined}>
          <div ref={pinRef} style={pin ? { position: 'sticky', top: pin.top } : undefined}>
          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:flex w-full border border-slate-200 sm:border-0 sm:border-b rounded-2xl sm:rounded-none overflow-hidden mb-4 sm:mb-8 bg-white sm:bg-transparent"
          >
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  /* The label must stay on one line: "Customer Follow-Up" is the
                     longest and used to break after "Follow-". Below lg the type,
                     padding and gap step down just enough for it to fit the cell;
                     from lg up every value is what it always was. */
                  className={`relative flex flex-1 items-center justify-center gap-1.5 lg:gap-2 py-3.5 sm:py-4 px-2 sm:px-3 lg:px-4 text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-wide font-figtree transition-colors duration-200 min-h-[46px] sm:min-h-[52px] border-b sm:border-b-0 border-slate-100 last:border-b-0 ${
                    i % 2 === 0 ? 'border-r sm:border-r-0 border-slate-100' : ''
                  } ${isActive ? 'text-[#1447d4] bg-blue-50 sm:bg-transparent' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {isActive && (
                    <motion.div layoutId="tab-line"
                      className="absolute bottom-0 sm:top-0 left-0 right-0 h-[2px] sm:h-[2px] z-10 rounded-full hidden sm:block" style={{ background: '#1447d4' }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 relative z-10" />
                  <span className="relative z-10 whitespace-nowrap">{p.tag}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Content panel — keyed opacity fade (no AnimatePresence unmount) so the
              panel height never collapses to 0 between tabs, which caused the white
              gap / layout jump on mobile */}
          <div className="relative">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5"
            >
              {/* Left — problems */}
              <div
                className="col-span-1 lg:col-span-3 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col"
                style={{ background: '#1447d4' }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6 bg-white/15 text-white border border-white/25 self-start font-figtree">
                  <current.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  {current.pill}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-6 leading-tight font-figtree">{current.title}</h3>
                <ul className="space-y-2 sm:space-y-3.5">
                  {current.problems.map((p, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: j * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      <XCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white/50 mt-0.5 shrink-0" />
                      <span className="text-white/85 leading-snug text-[12px] sm:text-[14px] font-figtree">{p}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right — gap + step */}
              <div className="col-span-1 lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4">
                <div
                  className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white flex flex-col flex-1"
                  style={{ background: '#1447d4' }}
                >
                  <p className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-2 sm:mb-3 font-figtree">The Hidden Gap</p>
                  <p className="text-white/95 leading-relaxed text-[11px] sm:text-[14px] font-medium mb-3 sm:mb-6 font-figtree">{current.gap}</p>
                  <div className="pt-2 sm:pt-4 border-t border-white/20 flex items-center gap-2 sm:gap-3 mt-auto">
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-[#00e7ff] shrink-0" />
                    <span className="text-white/90 text-[9px] sm:text-xs font-bold uppercase tracking-widest font-figtree">The Gap</span>
                  </div>
                </div>
                <div className="rounded-2xl sm:rounded-3xl bg-[#0f172a] p-3 sm:p-5 flex items-center gap-3 sm:gap-5">
                  <span className="text-2xl sm:text-4xl font-black text-[#006fff] opacity-50 font-figtree">{current.number}</span>
                  <div>
                    <p className="text-white/50 text-[9px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-0.5 sm:mb-1 font-figtree">Problem</p>
                    <p className="text-white font-bold text-[11px] sm:text-sm font-figtree">{current.tag}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </div>
          </div>
        </div>
      </section>

      {/* Result Banner */}
      <div ref={resultRef} className="py-14 lg:py-16 relative z-10" style={{ background: BG }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] overflow-hidden relative"
            style={{ background: '#1447d4' }}
          >
            <div className="absolute inset-0 pointer-events-none z-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.2px, transparent 1.2px)', backgroundSize: '18px 18px', opacity: 0.1 }} />

            <div className="grid lg:grid-cols-2 gap-0 relative z-10">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="p-10 sm:p-14 border-b lg:border-b-0 lg:border-r border-white/20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-5">The Result</p>
                <h3 className="text-xl font-bold text-white leading-tight mb-8">
                  When customer engagement runs across disconnected systems, organisations face:
                </h3>
                <ul className="space-y-4">
                  {results.map((r, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.06, ease: [0.18, 0.82, 0.41, 1] }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      </div>
                      <span className="text-white/85 text-sm">{r}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="p-10 sm:p-14 flex flex-col gap-6"
              >
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-7">The Root Cause</p>
                  <p className="text-white/85 leading-relaxed text-sm font-medium">
                    Customer engagement has evolved by adding more tools. Voice, digital channels, CRM,
                    campaigns, cases, and feedback often operate separately. Each tool solves a task, but
                    the customer journey remains fragmented.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-40" />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4 relative z-10">The Inaipi Way</p>
                  <p className="text-white/95 leading-relaxed text-sm mb-5 font-medium relative z-10">
                    Inaipi brings customer engagement capabilities together in one modular platform, with AI
                    embedded where it creates value. It connects channels, workflows, customer context, and
                    automation without forcing a rip-and-replace.
                  </p>
                  <p className="text-white font-black text-sm italic relative z-10">
                    "Inaipi gives mid-market businesses enterprise customer engagement capabilities without enterprise complexity."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
