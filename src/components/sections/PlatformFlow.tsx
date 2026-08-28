'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate, type PanInfo } from 'framer-motion';
import {
  Phone, MessageSquare, Mail, Globe, Cpu, Users, Zap, Layers, Target,
  Star, TrendingUp, Check,
} from 'lucide-react';
import AgentDesktopUI, { DESIGN_W, DESIGN_H, View } from './AgentDesktopUI';

// ─────────────────────────────────────────────
// Embedded Inaipi Agent Desktop design — fills the column width at the design's
// true aspect ratio, so the WHOLE screen shows (nothing cropped on the right) with
// no empty bottom space. Non-interactive: the mock's tabs can't be clicked so each
// step stays locked to its own view.
// ─────────────────────────────────────────────
function DesktopMock({ view }: { view: View }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // cover-fit: fill the panel in BOTH dimensions (aspect preserved). The panel
    // is kept close to the design's ratio (wide right column) so the crop is tiny.
    const measure = () => setScale(Math.max(el.clientWidth / DESIGN_W, el.clientHeight / DESIGN_H));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#f2f6fc]" style={{ pointerEvents: 'none' }}>
      <div style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <AgentDesktopUI playing={inView} fixedView={view} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stage data
// ─────────────────────────────────────────────
const stages = [
  {
    id: '01', title: 'One conversation. Any channel.', tagline: 'Omnichannel Digital Contact Center',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Customers connect through: Voice | WhatsApp | Email | Chat | Social Media | Video | SMS',
    bullets: [
      { label: 'Unified workspace', text: 'Agents manage every interaction without switching between channels.' },
      { label: 'AI + Human', text: 'AI responds instantly. Humans step in when needed.' },
      { label: 'Complete context', text: 'Customer history and journey stay connected across interactions.' },
    ],
    channels: [{ icon: Phone, label: 'Voice' }, { icon: MessageSquare, label: 'WhatsApp' }, { icon: Mail, label: 'Email' }, { icon: Globe, label: 'Chat' }],
    view: 'workspace' as View,
  },
  {
    id: '02', title: 'Turn customer signals into actionable decisions.', tagline: 'Conversation Intelligence',
    color: '#1d4ed8', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Listen across: Social Media | CRM | Website | CX | Blogs | Forums',
    bullets: [
      { label: 'Intelligent Listening', text: 'AI identifies conversations, signals, trends, sentiment and emerging opportunities.' },
      { label: 'Decision Intelligence', text: 'Convert customer signals into insights, actions and prioritized opportunities.' },
      { label: 'From Signal to Action', text: 'Connect intelligence to the right workflow, team or customer engagement.' },
    ],
    channels: [{ icon: Star, label: 'Social Media' }, { icon: Layers, label: 'CRM' }, { icon: Globe, label: 'Website' }, { icon: Users, label: 'Forums' }],
    view: 'mentions' as View,
  },
  {
    id: '03', title: 'Turn customer opportunities into proactive engagement.', tagline: 'Proactive Outreach Manager',
    color: '#1e40af', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Reach customers before they need to reach you: Campaigns | Notifications | Reminders | Follow-ups | Proactive Outreach',
    bullets: [
      { label: 'Intelligent outreach', text: 'Target the right customers with the right message at the right time.' },
      { label: 'AI or Human', text: 'Connect customers directly to an AI Voice Agent or human agent.' },
      { label: 'Automated orchestration', text: 'Manage campaigns, dialing, connections, escalation and follow-up from one workflow.' },
    ],
    channels: [{ icon: TrendingUp, label: 'Campaigns' }, { icon: Zap, label: 'Notifications' }, { icon: Check, label: 'Reminders' }, { icon: Target, label: 'Follow-ups' }],
    view: 'outreach' as View,
  },
  {
    id: '04', title: 'Automate voice conversations without losing the human option.', tagline: 'AI Voice Agents',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'AI Voice Agent handle customer conversations across: Inbound | Outbound | Notifications | Reminders | Verification | Follow-ups',
    bullets: [
      { label: 'Natural conversations', text: 'AI understands customer intent and responds in real time.' },
      { label: 'Execute, not just answer', text: 'AI Voice Agents can collect information, perform pre-defined tasks and move conversations forward.' },
      { label: 'Human handoff', text: 'Escalate to an agent with the relevant customer context when human intervention is needed.' },
    ],
    channels: [{ icon: Phone, label: 'Inbound' }, { icon: Zap, label: 'Outbound' }, { icon: Check, label: 'Verification' }, { icon: Target, label: 'Follow-ups' }],
    view: 'voice' as View,
  },
  {
    id: '05', title: 'Give customers instant answers across digital channels.', tagline: 'AI Chat Agents',
    color: '#1d4ed8', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'AI-powered conversations across: WhatsApp | Website | Mobile | Social | Messaging',
    bullets: [
      { label: 'Instant response', text: 'Answer questions and provide self-service support 24/7.' },
      { label: 'Context-aware conversations', text: 'Use customer information and conversation history to provide relevant responses.' },
      { label: 'AI + Human', text: 'Escalate complex conversations to agents without losing context.' },
    ],
    channels: [{ icon: MessageSquare, label: 'WhatsApp' }, { icon: Globe, label: 'Website' }, { icon: Star, label: 'Social' }, { icon: Mail, label: 'Messaging' }],
    view: 'chat' as View,
  },
  {
    id: '06', title: 'Turn every interaction into customer intelligence.', tagline: 'Surveys',
    color: '#1e40af', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Capture feedback across: IVR | SMS | Email | Social Media | Digital Channels',
    bullets: [
      { label: 'Automated feedback', text: 'Trigger surveys automatically after customer interactions.' },
      { label: 'Measure what matters', text: 'Capture CSAT, NPS and customer feedback.' },
      { label: 'Close the loop', text: 'Use customer feedback to identify service gaps and improve customer experience.' },
    ],
    channels: [{ icon: Phone, label: 'IVR' }, { icon: MessageSquare, label: 'SMS' }, { icon: Mail, label: 'Email' }, { icon: Star, label: 'Social Media' }],
    view: 'surveys' as View,
  },
  {
    id: '07', title: 'Turn customer conversations into accountable work.', tagline: 'Ticketing',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Capture and manage requests from: Voice | Chat | WhatsApp | Email | Social | Digital Channels',
    bullets: [
      { label: 'Create automatically', text: 'Convert customer issues into structured tickets.' },
      { label: 'Route and escalate', text: 'Send requests to the right team based on business rules and priority.' },
      { label: 'Track to resolution', text: 'Maintain the request, knowledge and escalation history until closure.' },
    ],
    channels: [{ icon: Phone, label: 'Voice' }, { icon: MessageSquare, label: 'Chat' }, { icon: Mail, label: 'Email' }, { icon: Layers, label: 'Digital' }],
    view: 'cases' as View,
  },
];

// ─────────────────────────────────────────────
// Slide card — one stage. Markup is unchanged from the stacked version; only
// the wrapper differs (a full-width slide instead of a sticky stacking layer).
// Slides are laid out with items-start so each card keeps its own natural
// height — stretching them to a common height would change every panel's
// aspect ratio and re-crop the cover-fit dashboards.
// ─────────────────────────────────────────────
function StageCard({ stage }: { stage: typeof stages[0] }) {
  return (
    <div className="shrink-0 w-full px-6">
      <div className="container mx-auto max-w-6xl">
        <div
          className="rounded-3xl overflow-hidden border shadow-2xl grid lg:grid-cols-[38fr_62fr]"
          style={{ backgroundColor: stage.bgLight, borderColor: stage.borderColor }}
        >
          {/* Text side */}
          <div className="p-6 sm:p-7 lg:px-8 lg:py-6 flex flex-col justify-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-black mb-3 shrink-0 shadow-lg" style={{ backgroundColor: stage.color }}>
              {stage.id}
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: stage.color }}>{stage.tagline}</p>
            <h3 className="text-[19px] font-bold font-figtree text-[#0f172a] mb-2.5 leading-tight">{stage.title}</h3>
            <p className="text-[13.5px] text-slate-600 leading-snug mb-4">{stage.description}</p>
            <ul className="space-y-1.5 mb-3.5">
              {stage.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[13.5px] text-slate-600 leading-snug font-medium">
                  <div className="mt-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: stage.color }}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span>
                    <span className="font-bold text-[#0f172a]">{b.label}</span>
                    <span className="text-slate-500">: {b.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {stage.channels.map((ch, j) => (
                <div key={j} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/60 backdrop-blur-sm border text-[11px] font-black uppercase tracking-wider shadow-sm" style={{ borderColor: stage.borderColor, color: stage.color }}>
                  <ch.icon className="w-3.5 h-3.5" />
                  {ch.label}
                </div>
              ))}
            </div>
          </div>

          {/* Mockup side — live design inset 10px inside the panel */}
          <div className="relative aspect-[136/88] lg:aspect-auto rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl border-t lg:border-t-0 lg:border-l overflow-hidden" style={{ borderColor: stage.borderColor, backgroundColor: stage.bgLight }}>
            <div className="absolute inset-2.5 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <DesktopMock view={stage.view} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Horizontal carousel — auto-advances and supports swipe/drag
// ─────────────────────────────────────────────
/* Dwell per slide, and the glide between them. Deliberately unhurried: the
   dwell restarts on every index change (see below) so a slide is always shown
   for the full duration, even right after a dot click or a swipe. */
const AUTO_MS = 6500;
const GLIDE = { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const };

function PlatformCarousel() {
  const total = stages.length;
  /* A clone of slide 1 sits after slide 7. Advancing 7 -> clone is an ordinary
     forward glide; once it lands we jump the track back to slide 1 with no
     animation. Because the clone and slide 1 are identical, the swap is
     invisible — the loop never rewinds or fast-forwards through the deck. */
  const slides = [...stages, stages[0]];
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reduced, setReduced] = useState(false);
  const x = useMotionValue(0);

  /* Slide width follows the viewport so the track stays aligned on resize. */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setSlideW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* Continuous auto-advance, held only while the visitor is dragging. Keyed on
     `index` so the timer restarts after every move — a free-running interval
     could otherwise fire straight after a manual jump and skip a slide.
     No timer runs while the clone is showing: that beat is consumed by the
     silent reset below, and slide 1 then gets its own full dwell. */
  useEffect(() => {
    if (dragging || reduced || !slideW || index >= total) return;
    const t = setTimeout(() => setIndex(i => i + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, dragging, reduced, slideW, total]);

  /* Glide to the active slide unless the pointer is holding the track. When the
     glide lands on the clone, reset to slide 1 instantly — same pixels, so
     nothing moves on screen. */
  useEffect(() => {
    if (dragging || !slideW) return;
    const settle = () => {
      if (index === total) { x.set(0); setIndex(0); }
    };
    const controls = animate(x, -index * slideW, {
      ...(reduced ? { duration: 0 } : GLIDE),
      onComplete: settle,
    });
    return () => controls.stop();
  }, [index, slideW, dragging, reduced, x, total]);

  /* The clone is never a destination for manual navigation. */
  const active = index % total;
  const go = (i: number) => setIndex(((i % total) + total) % total);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    setDragging(false);
    const throw_ = info.offset.x + info.velocity.x * 0.18;
    const steps = Math.round(-throw_ / Math.max(slideW, 1));
    const next = Math.min(Math.max(index + steps, 0), total);
    setIndex(next);
  };

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        className="overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Inaipi platform stages"
      >
        <motion.div
          className="flex items-start cursor-grab active:cursor-grabbing"
          style={{ x, touchAction: 'pan-y' }}
          drag="x"
          dragConstraints={{ left: -slideW * total, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {slides.map((stage, i) => (
            <div
              key={i}
              className="shrink-0 w-full"
              role={i < total ? 'group' : undefined}
              aria-roledescription={i < total ? 'slide' : undefined}
              aria-label={i < total ? `${i + 1} of ${total}: ${stage.tagline}` : undefined}
              aria-hidden={i !== index}
            >
              <StageCard stage={stage} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide indicators — same pill language as the testimonial carousel */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {stages.map((stage, i) => (
          <motion.button
            key={stage.id}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}: ${stage.tagline}`}
            aria-current={i === active}
            animate={{ width: i === active ? 36 : 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 10,
              borderRadius: 5,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === active ? '#1447d4' : 'rgba(20,71,212,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function PlatformFlow() {
  return (
    <section id="platform" className="py-14 lg:py-16 relative overflow-hidden" style={{ background: '#f8faff' }}>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes pfwave{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}' }} />
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', top: '-200px', right: '-280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '34vw', height: '34vw', bottom: '-160px', left: '-180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-3xl text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-eyebrow"
        >
          Platform Architecture
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5"
        >
          One platform powering the <span className="text-[#1447d4]">entire customer lifecycle.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed"
        >
          Every stage of the customer journey, from first contact to proactive engagement, connected through one AI-native engine.
        </motion.p>
      </div>

      <PlatformCarousel />
    </section>
  );
}
