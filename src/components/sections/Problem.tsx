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

const BG = '#f8faff';

export default function Problem() {
  const [active, setActive] = useState(0);
  const current = painPoints[active];

  return (
    <>
      <section className="py-20 lg:py-24 overflow-hidden relative" style={{ background: BG }}>
        {/* Background blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(ellipse, rgba(20,71,212,0.08) 0%, transparent 65%)' }} />
          <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(0,231,255,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <span className="section-eyebrow">The Problem</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold font-figtree tracking-[-0.025em] leading-[1.2] mb-5">
              <span className="block text-[#0f172a]">Enterprises invest millions.</span>
              <span className="block">
                <span className="text-[#0f172a]">Customers still get </span>
                <span className="text-[#1447d4]">broken experiences.</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
              Disconnected tools and siloed systems break the journey at every stage.
              Bolting on AI doesn't fix it — it creates yet another silo.
            </p>
          </motion.div>

          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:flex w-full border border-slate-200 sm:border-0 sm:border-b rounded-2xl sm:rounded-none overflow-hidden mb-8 bg-white sm:bg-transparent"
          >
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative flex flex-1 items-center justify-center gap-2 py-3.5 sm:py-4 px-3 sm:px-4 text-[12px] sm:text-[13px] font-bold tracking-wide font-figtree transition-colors duration-200 min-h-[52px] border-b sm:border-b-0 border-slate-100 last:border-b-0 ${
                    i % 2 === 0 ? 'border-r sm:border-r-0 border-slate-100' : ''
                  } ${isActive ? 'text-[#1447d4] bg-blue-50 sm:bg-transparent' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {isActive && (
                    <motion.div layoutId="tab-line"
                      className="absolute bottom-0 sm:top-0 left-0 right-0 h-[2px] sm:h-[2px] z-10 rounded-full hidden sm:block" style={{ background: '#1447d4' }}
                    />
                  )}
                  <Icon className="w-4 h-4 shrink-0 relative z-10" />
                  <span className="relative z-10">{p.tag}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Content panel */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5"
            >
              {/* Left — problems */}
              <div
                className="col-span-1 lg:col-span-3 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col"
                style={{ background: '#1447d4' }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6 bg-white/15 text-white border border-white/25 self-start font-figtree">
                  <current.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="hidden sm:inline">When Customers Are </span>{current.tag}
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
                    <span className="text-white/90 text-[9px] sm:text-xs font-bold uppercase tracking-widest font-figtree">AI can solve this natively</span>
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
          </AnimatePresence>
        </div>
      </section>

      {/* Result Banner */}
      <div className="py-20 lg:py-24 relative z-10" style={{ background: BG }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] overflow-hidden relative"
            style={{ background: '#1447d4' }}
          >
            <motion.div animate={{ opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none z-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.2px, transparent 1.2px)', backgroundSize: '18px 18px' }} />

            <div className="grid lg:grid-cols-2 gap-0 relative z-10">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="p-10 sm:p-14 border-b lg:border-b-0 lg:border-r border-white/20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-5">The Result</p>
                <h3 className="text-xl font-bold text-white leading-tight mb-8">
                  Without a unified intelligent platform, organisations face:
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
                    Most platforms treat AI as an add-on. When AI is plugged in after the platform was built,
                    it runs in a separate silo — disconnected from routing, cases, analytics, and real-time customer context.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4 relative z-10">The Inaipi Way</p>
                  <p className="text-white/95 leading-relaxed text-sm mb-5 font-medium relative z-10">
                    Inaipi is AI-native — intelligence is embedded into every layer from day one. One platform.
                    One governance layer. Predictable costs. Zero customer data exposure.
                  </p>
                  <p className="text-white font-black text-sm italic relative z-10">
                    "Inaipi doesn't add AI to a contact centre.<br />Inaipi is an AI platform that runs a contact centre."
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
