'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, FileText, BarChart2, MessageSquare, XCircle, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const painPoints = [
  {
    number: '01',
    icon: PhoneCall,
    tag: 'Reaching You',
    title: 'Fragmented Communication Systems',
    color: 'blue',
    gradientStyle: { background: 'linear-gradient(135deg, #2563eb, #3b82f6)' },
    tagStyle: { backgroundColor: '#eff6ff', color: '#2563eb' },
    accentColor: '#2563eb',
    problems: [
      'Long wait times during peak hours (often 8–15 minutes)',
      'Channel silos — voice, chat, email, and messaging operate independently',
      'Customers must repeat information when switching channels',
      'Inconsistent service quality across agents and channels',
    ],
    gap: 'Without AI-powered copilots, agents manually search knowledge bases and internal systems — increasing response time and reducing service quality.',
  },
  {
    number: '02',
    icon: FileText,
    tag: 'Follow-Up',
    title: 'No Continuity in Customer Support',
    color: 'purple',
    gradientStyle: { background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' },
    tagStyle: { backgroundColor: '#f5f3ff', color: '#7c3aed' },
    accentColor: '#7c3aed',
    problems: [
      'Contact center platforms and ticketing systems operate separately',
      'Manual case creation loses conversation context',
      'Basic round-robin routing instead of intelligent assignment',
      'SLA tracking handled in spreadsheets or fragmented systems',
    ],
    gap: 'Agents spend valuable time searching for previous conversations and case history. AI-powered assistance enables instant access to full context and knowledge recommendations.',
  },
  {
    number: '03',
    icon: BarChart2,
    tag: 'Measuring Satisfaction',
    title: 'Feedback That Arrives Too Late',
    color: 'orange',
    gradientStyle: { background: 'linear-gradient(135deg, #f97316, #fbbf24)' },
    tagStyle: { backgroundColor: '#fff7ed', color: '#f97316' },
    accentColor: '#f97316',
    problems: [
      'Survey tools disconnected from contact center systems',
      'Surveys sent manually or in delayed batches',
      'Low response rates — surveys arrive days later',
      'Satisfaction scores cannot be linked to specific interactions or agents',
    ],
    gap: 'Traditional tools cannot measure the end-to-end customer experience journey. AI-powered insights detect sentiment in real time and trigger proactive escalation.',
  },
  {
    number: '04',
    icon: MessageSquare,
    tag: 'Running Campaigns',
    title: 'Outbound Engagement Without Intelligence',
    color: 'green',
    gradientStyle: { background: 'linear-gradient(135deg, #059669, #10b981)' },
    tagStyle: { backgroundColor: '#ecfdf5', color: '#059669' },
    accentColor: '#059669',
    problems: [
      'Dialer platforms disconnected from contact center systems',
      'Manual dialing wastes agent productivity',
      'Outbound campaign data lives in separate systems',
      'Limited scalability due to dependence on human agents',
    ],
    gap: 'Without AI, campaigns cannot determine the best time, best channel, or best message for each customer. AI-driven engagement reaches customers at optimal moments, at unlimited scale.',
  },
];

const results = [
  'Rising operational costs',
  'Poor customer satisfaction scores',
  'Agent inefficiency & burnout',
  'Lost revenue opportunities',
  'No visibility into the true customer experience',
];

export default function Problem() {
  const [active, setActive] = useState(0);
  const current = painPoints[active];

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Color overlays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_65%)] blur-[80px]" />
        <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07)_0%,transparent_70%)] blur-[90px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 60%, transparent 100%)'
          }}
        />
      </div>

      {/* ── Header ── */}
      <div className="container mx-auto px-6 text-center mb-20 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-eyebrow"
        >
          The Problem
        </motion.span>
        <div className="mb-5 flex flex-col items-center gap-1 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.03em] leading-[1.25]">
          <div className="block whitespace-nowrap">
            {['Enterprises', 'invest', 'millions.'].map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.18, 0.82, 0.41, 1] }}
                className="inline-block mr-[0.25em] last:mr-0 text-[#0f172a]">
                {word}
              </motion.span>
            ))}
          </div>
          <div className="block whitespace-nowrap">
            {['Customers', 'still', 'get'].map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: [0.18, 0.82, 0.41, 1] }}
                className="inline-block mr-[0.25em] text-[#0f172a]">
                {word}
              </motion.span>
            ))}
            <motion.span initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.52, ease: [0.18, 0.82, 0.41, 1] }}
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              broken experiences.
            </motion.span>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-lg text-slate-500 leading-relaxed"
        >
          Disconnected tools and siloed systems break the journey at every stage.
          Bolting on AI doesn't fix it — it creates yet another silo.
        </motion.p>
      </div>

      {/* ── Interactive Pain Point Explorer ── */}
      <div className="container mx-auto px-6 max-w-6xl mb-24">
        {/* Tab selector */}
        <div className="relative flex w-full mb-12 border-b border-slate-200">
          {painPoints.map((p, i) => {
            const Icon = p.icon;
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex flex-1 items-center justify-center gap-2 py-4 px-4 text-sm font-semibold transition-colors duration-200 min-h-[52px] ${
                  isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-box"
                    className="absolute inset-x-0 inset-y-0 bottom-[-1px] bg-white z-0"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="tab-top-line"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-blue-600 z-10"
                  />
                )}
                <Icon className="w-4 h-4 shrink-0 relative z-10" />
                <span className="relative z-10">{p.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.18, 0.82, 0.41, 1] }}
            className="grid lg:grid-cols-5 gap-6"
          >
            {/* Left — problems list (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.18, 0.82, 0.41, 1] }}
              className="lg:col-span-3 bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-gray-100"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 bg-blue-50 text-blue-600 border border-blue-100">
                <current.icon className="w-3.5 h-3.5" />
                When Customers Are {current.tag}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-figtree text-[#0f172a] mb-8 leading-snug">
                {current.title}
              </h3>
              <ul className="space-y-4">
                {current.problems.map((p, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.06, duration: 0.35, ease: [0.18, 0.82, 0.41, 1] }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-0.5 shrink-0">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-slate-600 leading-relaxed">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right — hidden gap (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.18, 0.82, 0.41, 1], delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Gradient accent card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.18, 0.82, 0.41, 1] }}
                className="rounded-3xl p-8 text-white flex-1 flex flex-col justify-between" style={{ background: 'linear-gradient(145deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-4">The Hidden Gap</p>
                  <p className="text-white leading-relaxed text-[15px]">{current.gap}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-white/70" />
                    <span className="text-white/70 text-xs font-bold uppercase tracking-widest">AI can solve this natively</span>
                  </div>
                </div>
              </motion.div>

              {/* Step indicator */}
              <div className="rounded-3xl bg-[#0f172a] p-6 flex items-center gap-5">
                <span className="text-4xl font-black font-figtree text-blue-400 opacity-40">{current.number}</span>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Problem</p>
                  <p className="text-white font-bold text-sm">{current.tag}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── The Result Banner ── */}
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2.5rem] overflow-hidden relative group"
          style={{ background: 'linear-gradient(145deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
        >
          {/* Industry-style dotted overlay with pulse */}
          <motion.div 
            animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none z-0" 
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.2px, transparent 1.2px)', backgroundSize: '18px 18px' }} 
          />
          
          {/* Animated gradient highlights */}
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6], x: [-30, 30, -30], y: [-15, 15, -15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
            style={{ background: 'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(255,255,255,0.15) 0%, transparent 40%)' }} 
          />

          <div className="grid lg:grid-cols-2 gap-0 relative z-10">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="p-10 sm:p-14 border-b lg:border-b-0 lg:border-r border-white/20"
            >
              <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }}
                className="text-xs font-black uppercase tracking-[0.35em] text-white/60 mb-5">The Result</motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.18, 0.82, 0.41, 1] }}
                className="text-xl sm:text-2xl font-bold font-figtree text-white leading-tight mb-8"
              >
                Without a unified intelligent platform, organisations face:
              </motion.h3>
              <ul className="space-y-4">
                {results.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.06, ease: [0.18, 0.82, 0.41, 1] }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 group/item cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-transform group-hover/item:scale-110">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover/item:bg-white transition-colors" />
                    </div>
                    <span className="text-slate-200 text-sm group-hover/item:text-white transition-colors">{r}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="p-10 sm:p-14 flex flex-col gap-6"
              >
                <div>
                  <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-7">The Root Cause</motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25, ease: [0.18, 0.82, 0.41, 1] }}
                    className="text-white/70 leading-relaxed text-sm font-medium"
                  >
                    Most platforms treat AI as an add-on. When AI is plugged in after the platform was built, it runs in a separate silo — disconnected from routing, cases, analytics, and real-time customer context.
                  </motion.p>
                </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/10 p-7 shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-sm relative group overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white/80 mb-4 relative z-10">The Inaipi Way</p>
                <p className="text-white/90 leading-relaxed text-sm mb-5 font-medium relative z-10">
                  Inaipi is AI-native — intelligence is embedded into every layer from day one. One platform.
                  One governance layer. Predictable costs. Zero customer data exposure.
                </p>
                <p className="text-white font-black text-sm italic opacity-100 relative z-10">
                  "Inaipi doesn't add AI to a contact centre.<br />Inaipi is an AI platform that runs a contact centre."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
