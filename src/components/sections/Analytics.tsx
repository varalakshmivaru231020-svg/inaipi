'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Zap, Clock, BarChart2, Activity, ArrowUpRight } from 'lucide-react';

// ── helpers ──────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

// ── data ────────────────────────────────────────────────
const KPI = [
  { label: 'Total Interactions', value: 48247, suffix: '', prefix: '', icon: Activity,  color: '#2563eb', trend: '+12.4%' },
  { label: 'AI Automation Rate', value: 67,    suffix: '%', prefix: '', icon: Zap,       color: '#059669', trend: '+8.2%'  },
  { label: 'Customer Satisfaction',value:4.6,  suffix: '★', prefix: '', icon: TrendingUp,color: '#f59e0b', trend: '+0.4'   },
  { label: 'Avg Response Time',   value: 42,   suffix: 's', prefix: '', icon: Clock,     color: '#7c3aed', trend: '-18s'   },
];

const BARS = [
  { label: 'Mon', ai: 72, human: 28 },
  { label: 'Tue', ai: 68, human: 32 },
  { label: 'Wed', ai: 75, human: 25 },
  { label: 'Thu', ai: 80, human: 20 },
  { label: 'Fri', ai: 65, human: 35 },
  { label: 'Sat', ai: 83, human: 17 },
  { label: 'Sun', ai: 78, human: 22 },
];

const CHANNELS = [
  { label: 'WhatsApp', pct: 38, color: '#059669' },
  { label: 'Voice',    pct: 28, color: '#2563eb' },
  { label: 'Email',    pct: 20, color: '#7c3aed' },
  { label: 'Social',   pct: 14, color: '#f59e0b' },
];

const SENTIMENT = [
  { label: 'Positive', pct: 72, color: '#10b981' },
  { label: 'Neutral',  pct: 22, color: '#94a3b8' },
  { label: 'Negative', pct: 6,  color: '#f43f5e' },
];

const IMPACT = [
  { label: 'Monthly Cost Savings',   value: '$427,500', sub: 'from automation alone' },
  { label: 'Cost Per Interaction',   value: '−62%',     sub: 'vs. industry average'  },
  { label: 'Agent Efficiency Gain',  value: '+45%',     sub: 'handle time improvement'},
  { label: 'Revenue Impact',         value: '$1.2M',    sub: 'upsell & churn prevention'},
];

// Donut arc helper
function donutPath(pct: number, r = 36): string {
  const circ = 2 * Math.PI * r;
  return `${(pct / 100) * circ} ${circ}`;
}

export default function Analytics() {
  const [inView, setInView] = useState(false);
  const [barsIn, setBarsIn] = useState(false);
  const [donutPct, setDonutPct] = useState(0);
  const [liveVal, setLiveVal] = useState(48247);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // KPI counters
  const c0 = useCountUp(48247, 2000, inView);
  const c1 = useCountUp(67,    1400, inView);
  const c3 = useCountUp(42,    1200, inView);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        setTimeout(() => setBarsIn(true), 400);
        // Donut animates in
        let p = 0;
        const id = setInterval(() => {
          p += 2;
          setDonutPct(Math.min(p, 72));
          if (p >= 72) clearInterval(id);
        }, 18);
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Live counter ticks
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v + Math.floor(Math.random() * 4 + 1)), 2200);
    return () => clearInterval(id);
  }, []);

  const tabs = ['Overview', 'Agents', 'Channels', 'Business Impact'];

  return (
    <section className="py-10 bg-[#0a0f1e] overflow-hidden relative" id="analytics" ref={ref}>
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-blue-600/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-blue-600/8 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-4">
            Unified Analytics
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.03em] text-white leading-[1.25] mb-5">
            Every metric. One dashboard.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-lg text-slate-400 leading-relaxed">
            Real-time visibility across contact centre, cases, surveys, and campaigns — AI and human metrics side by side.
          </motion.p>
        </div>

        {/* Dashboard shell */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] overflow-hidden border border-white/8 bg-[#0f172a] shadow-2xl"
        >
          {/* Top nav bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d1424]">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm font-bold">Inaipi Analytics</span>
              <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse inline-block" /> Live
              </span>
            </div>
            <div className="flex items-center gap-2">
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeTab === i ? 'bg-blue-600 text-white' : 'text-white/30 hover:text-white/60'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-white/30 font-mono hidden sm:block">Updated 30s ago</div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {KPI.map((k, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="bg-[#0f172a] p-6 group hover:bg-white/[0.03] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.color + '22' }}>
                    <k.icon className="w-4 h-4" style={{ color: k.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />{k.trend}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-figtree text-white mb-1">
                  {k.prefix}
                  {i === 0 ? (inView ? liveVal.toLocaleString() : '0') :
                   i === 1 ? c1 + k.suffix :
                   i === 2 ? '4.6★' :
                   c3 + k.suffix}
                </div>
                <p className="text-[11px] text-white/30 font-medium">{k.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Main charts row */}
          <div className="grid lg:grid-cols-3 gap-px bg-white/5">

            {/* AI vs Human bar chart — spans 2 cols */}
            <div className="lg:col-span-2 bg-[#0f172a] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white text-sm font-bold mb-1">AI vs Human Volume</p>
                  <p className="text-[11px] text-white/30">Last 7 days · interactions handled</p>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-white/50"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />AI Agent</span>
                  <span className="flex items-center gap-1.5 text-white/50"><span className="w-2.5 h-2.5 rounded-sm bg-white/20 inline-block" />Human</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-40">
                {BARS.map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5 h-32 justify-end">
                      {/* AI bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsIn ? { height: `${b.ai}%` } : { height: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full rounded-t-md bg-blue-500 origin-bottom"
                        style={{ height: `${b.ai * 0.32}rem` }}
                      />
                      {/* Human bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsIn ? { height: `${b.human}%` } : { height: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full rounded-b-sm bg-white/10 origin-bottom"
                        style={{ height: `${b.human * 0.12}rem` }}
                      />
                    </div>
                    <span className="text-[9px] text-white/30 font-bold">{b.label}</span>
                  </div>
                ))}
              </div>
              {/* Handle time comparison */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[{ label: 'AI Handle Time', value: '2m 15s', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'Human Handle Time', value: '8m 42s', color: 'text-white/50', bg: 'bg-white/5' }].map((h, i) => (
                  <div key={i} className={`flex items-center justify-between ${h.bg} rounded-xl px-4 py-3`}>
                    <span className="text-[11px] text-white/40">{h.label}</span>
                    <span className={`text-sm font-black ${h.color}`}>{h.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment donut */}
            <div className="bg-[#0f172a] p-6 flex flex-col">
              <p className="text-white text-sm font-bold mb-1">Customer Sentiment</p>
              <p className="text-[11px] text-white/30 mb-6">Based on all interactions</p>

              <div className="flex items-center justify-center flex-1">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                    {/* Track */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="10" />
                    {/* Positive arc */}
                    <motion.circle cx="50" cy="50" r="36" fill="none"
                      stroke="#10b981" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={donutPath(donutPct)}
                      strokeDashoffset="0"
                      style={{ transition: 'stroke-dasharray 0.05s linear' }}
                    />
                    {/* Neutral arc offset */}
                    <circle cx="50" cy="50" r="36" fill="none"
                      stroke="#94a3b8" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={donutPath(22)}
                      strokeDashoffset={`-${(72 / 100) * 2 * Math.PI * 36}`}
                    />
                    {/* Negative arc offset */}
                    <circle cx="50" cy="50" r="36" fill="none"
                      stroke="#f43f5e" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={donutPath(6)}
                      strokeDashoffset={`-${((72 + 22) / 100) * 2 * Math.PI * 36}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      key={donutPct}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-black text-white"
                    >{donutPct}%</motion.span>
                    <span className="text-[9px] text-white/30 uppercase tracking-wider">Positive</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {SENTIMENT.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-[11px] text-white/40 flex-1">{s.label}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.2 + 0.8 }}
                      className="text-xs font-black text-white/70"
                    >{s.pct}%</motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Channel + SLA row */}
          <div className="grid lg:grid-cols-3 gap-px bg-white/5">

            {/* Channel bars */}
            <div className="bg-[#0f172a] p-6">
              <p className="text-white text-sm font-bold mb-1">Channel Distribution</p>
              <p className="text-[11px] text-white/30 mb-5">Volume share by channel</p>
              <div className="space-y-3">
                {CHANNELS.map((c, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-white/50">{c.label}</span>
                      <span className="text-[11px] font-black text-white/70">{c.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${c.pct}%` } : {}}
                        transition={{ duration: 0.8, delay: i * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA gauge */}
            <div className="bg-[#0f172a] p-6 flex flex-col">
              <p className="text-white text-sm font-bold mb-1">SLA Compliance</p>
              <p className="text-[11px] text-white/30 mb-5">Target: 95.0%</p>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-32 h-16 overflow-hidden">
                  <svg viewBox="0 0 120 60" className="w-full">
                    <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="12" strokeLinecap="round" />
                    <motion.path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="#2563eb" strokeWidth="12" strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 0.942 } : {}}
                      transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="absolute bottom-0 w-full text-center">
                    <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
                      className="text-3xl font-black font-figtree text-white">94.2%</motion.p>
                  </div>
                </div>
                <p className="text-[11px] text-blue-300 mt-3 font-bold">0.8% below target</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[{ l: 'Resolved', v: '12,847' }, { l: 'Breached', v: '742' }].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-sm font-black text-white">{s.v}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey analytics */}
            <div className="bg-[#0f172a] p-6">
              <p className="text-white text-sm font-bold mb-1">Survey Response Rates</p>
              <p className="text-[11px] text-white/30 mb-5">By delivery channel</p>
              <div className="space-y-3">
                {[
                  { ch: 'AI Voice',  rate: 67, color: '#2563eb' },
                  { ch: 'WhatsApp',  rate: 51, color: '#059669' },
                  { ch: 'SMS',       rate: 38, color: '#7c3aed' },
                  { ch: 'Email',     rate: 24, color: '#f59e0b' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[11px] text-white/40 w-16 shrink-0">{s.ch}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.rate}%` } : {}}
                        transition={{ duration: 0.8, delay: i * 0.1 + 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                    <span className="text-[11px] font-black text-white/60 w-8 text-right">{s.rate}%</span>
                  </div>
                ))}
              </div>

              {/* NPS */}
              <div className="mt-5 bg-white/5 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">NPS Score</p>
                    <p className="text-3xl font-black font-figtree text-white">+72</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Promoters</p>
                    <p className="text-lg font-black text-blue-400">78%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business impact bottom bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {IMPACT.map((imp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.8 }}
                className="bg-[#0f172a] px-6 py-5 group hover:bg-white/[0.03] transition-colors"
              >
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">{imp.label}</p>
                <p className="text-2xl font-black font-figtree text-blue-400 mb-1">{imp.value}</p>
                <p className="text-[11px] text-white/20">{imp.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
