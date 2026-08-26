'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    id: '01', title: 'Customer Contact', tagline: 'Multi-Channel Entry',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Customers initiate conversations across any channel — Voice, WhatsApp, Email, Live Chat, Social Media, SMS, and Video — all flowing into a single intelligent platform.',
    bullets: ['Voice, WhatsApp, Email, Chat, SMS, Video', 'Unified inbox — no channel switching', 'Instant AI response or human handoff', 'Complete customer context from first message'],
    channels: [{ icon: Phone, label: 'Voice' }, { icon: MessageSquare, label: 'WhatsApp' }, { icon: Mail, label: 'Email' }, { icon: Globe, label: 'Web Chat' }],
    view: 'workspace' as View,
  },
  {
    id: '02', title: 'AI & Human Collaboration', tagline: 'The Intelligence Hub',
    color: '#1d4ed8', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Inaipi AI Platform orchestrates every response. AI agents handle routine inquiries autonomously while human agents manage complex cases — with a real-time AI co-pilot at their side.',
    bullets: ['AI agents resolve routine inquiries autonomously', 'Human agents get real-time AI suggestions', 'Unified desktop — all channels in one view', 'Intelligent escalation based on sentiment & context'],
    channels: [{ icon: Cpu, label: 'AI Agent' }, { icon: Users, label: 'Human Agent' }, { icon: Zap, label: 'Co-Pilot' }, { icon: Target, label: 'Smart Routing' }],
    view: 'monitoring' as View,
  },
  {
    id: '03', title: 'Case & Ticket Management', tagline: 'Seamless Resolution',
    color: '#1e40af', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Every unresolved interaction automatically becomes a case. Intelligent routing assigns it to the right agent or AI — with SLA tracking, auto-classification, and full conversation context.',
    bullets: ['Automatic case creation from any interaction', 'Intelligent routing based on skills & workload', 'SLA tracking with automated alerts & escalation', 'AI resolves routine cases autonomously in background'],
    channels: [{ icon: Layers, label: 'Case Board' }, { icon: Target, label: 'Smart Route' }, { icon: Zap, label: 'Auto Classify' }, { icon: Check, label: 'SLA Track' }],
    view: 'cases' as View,
  },
  {
    id: '04', title: 'Surveys & Campaigns', tagline: 'Proactive Engagement',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: "After every resolved case, the platform automatically sends satisfaction surveys via the customer's preferred channel. AI voice agents run outbound campaigns at unlimited scale.",
    bullets: ['Automated CSAT / NPS surveys after case resolution', 'AI voice agents for outbound calls at scale', 'WhatsApp, SMS & email campaign automation', 'Real-time sentiment analysis & escalation triggers'],
    channels: [{ icon: Star, label: 'CSAT Survey' }, { icon: Phone, label: 'AI Voice' }, { icon: MessageSquare, label: 'WhatsApp' }, { icon: TrendingUp, label: 'Analytics' }],
    view: 'survey' as View,
  },
];

// ─────────────────────────────────────────────
// Stacking card
// ─────────────────────────────────────────────
const CARD_TOP = 72;
const CARD_OFFSET = 12;

function StageCard({ stage, index, total }: { stage: typeof stages[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.6]);

  return (
    <div ref={cardRef} className="sticky px-6" style={{ top: `${CARD_TOP + index * CARD_OFFSET}px`, zIndex: 10 + index }}>
      <motion.div style={{ scale, opacity, transformOrigin: 'top center' }} className="container mx-auto max-w-6xl">
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
                  {b}
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
      </motion.div>
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
          Every stage of the customer journey — from first contact to proactive engagement — connected through one AI-native engine.
        </motion.p>
      </div>

      <div>
        {stages.map((stage, i) => (
          <StageCard key={stage.id} stage={stage} index={i} total={stages.length} />
        ))}
      </div>
    </section>
  );
}
