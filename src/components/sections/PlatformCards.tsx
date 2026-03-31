'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Phone, MessageSquare, Mail, Brain,
  BarChart2, TrendingUp, Users, Zap,
  CheckCircle2, Clock, PhoneCall, Send,
  Activity, Target, ArrowUp, Megaphone,
} from 'lucide-react';

/* ── Card 1: Monitoring ── */
function MonitoringCard() {
  const agents = [
    { name: 'Fatima', ext: '6014', dept: 'Front Office', status: 'active', color: 'bg-blue-700' },
    { name: '6012',   ext: '6012', dept: 'Support',      status: 'idle',   color: 'bg-blue-600'   },
    { name: '6004',   ext: '6004', dept: 'Support',      status: 'idle',   color: 'bg-blue-600'   },
    { name: '8003',   ext: 'Demo22', dept: 'Sales',      status: 'away',   color: 'bg-blue-500'  },
  ];
  const stats = [
    { label: 'Active Agents',        value: '5/5',   icon: Users },
    { label: 'Interactions Today',   value: '1',     icon: Phone },
    { label: 'Satisfaction Score',   value: '20/5.0', icon: TrendingUp },
    { label: 'Completion Rate',      value: '400%',  icon: CheckCircle2 },
  ];
  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f172a] rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <Activity className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-[11px] font-bold">Interaction Monitoring Center</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-[9px] font-black uppercase tracking-wider">Live</span>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-white border-b border-gray-100">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
            <p className="text-[10px] text-slate-400 mb-0.5">{s.label}</p>
            <p className="text-sm font-black text-[#0f172a]">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Agent grid */}
      <div className="flex-1 p-3 bg-white rounded-b-2xl">
        <div className="grid grid-cols-2 gap-2">
          {agents.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl p-3 border ${a.status === 'active' ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center text-white text-[10px] font-black`}>
                  {a.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#0f172a]">{a.name}</p>
                  <p className="text-[9px] text-slate-400">{a.dept}</p>
                </div>
                <div className={`ml-auto w-2 h-2 rounded-full ${a.status === 'active' ? 'bg-blue-500 animate-pulse' : a.status === 'idle' ? 'bg-blue-300' : 'bg-slate-300'}`} />
              </div>
              {a.status === 'active' && (
                <div className="mt-1.5 bg-blue-600 rounded-lg px-2 py-1 flex items-center justify-between">
                  <span className="text-white text-[9px] font-bold">Active Call</span>
                  <span className="text-white/70 text-[9px]">1:26</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 2: Interactions / Agent Desktop ── */
function InteractionsCard() {
  const [tick, setTick] = useState(49);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(tick / 60)).padStart(2, '0');
  const ss = String(tick % 60).padStart(2, '0');
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      {/* Nav */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-b border-gray-100">
        {['Monitoring', 'Interactions', 'Campaign', 'Analytics'].map((t, i) => (
          <span key={i} className={`text-[10px] font-bold pb-1 ${i === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>{t}</span>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[8px] font-black">6</div>
          <span className="text-[9px] text-slate-500 font-bold">6013</span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-24 border-r border-gray-100 p-2 shrink-0">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 mb-2">
            <div className="flex items-center gap-1 mb-1">
              <Phone className="w-2.5 h-2.5 text-blue-600" />
              <span className="text-[9px] font-bold text-blue-600">6014</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-2 h-2 text-slate-400" />
              <span className="text-[8px] text-slate-400">00:49</span>
            </div>
          </div>
        </div>
        {/* Center */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black">● Connected</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black">Outbound</span>
            </div>
            <motion.p
              key={tick}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-black text-blue-600 font-mono mb-4"
            >
              {mm}:{ss}
            </motion.p>
            <div className="flex justify-center gap-4 mb-3">
              {['Mute', 'Hold', 'Transfer'].map((l, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-400" />
                  </div>
                  <span className="text-[8px] text-slate-400">{l}</span>
                </div>
              ))}
            </div>
            <button className="bg-red-500 text-white text-[10px] font-black px-5 py-1.5 rounded-full">End Call</button>
          </div>
        </div>
        {/* Right */}
        <div className="w-28 border-l border-gray-100 p-2 shrink-0">
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Insights</p>
          <div className="space-y-1.5">
            {[{ l: 'Interactions', v: '17', c: 'bg-blue-700' }, { l: 'Sentiment', v: 'Positive', c: 'bg-blue-500' }, { l: 'Last Contact', v: 'Mar 23', c: 'bg-blue-400' }].map((s, i) => (
              <div key={i} className={`${s.c} rounded-lg px-2 py-1.5`}>
                <p className="text-white/70 text-[7px] uppercase tracking-wider">{s.l}</p>
                <p className="text-white text-[10px] font-black">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card 3: Analytics ── */
function AnalyticsCard() {
  const bars = [40, 65, 55, 80, 70, 90, 75];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" />
          <span className="text-[11px] font-bold text-[#0f172a]">Analytics & Insights</span>
        </div>
        <span className="text-[9px] text-slate-400 bg-gray-100 px-2 py-0.5 rounded-full">This Week</span>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-3">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'CSAT Score', value: '4.8', trend: '+0.3', color: 'text-blue-600' },
            { label: 'Avg Handle', value: '1m42s', trend: '-12s', color: 'text-blue-600' },
            { label: 'Resolution', value: '94%', trend: '+6%', color: 'text-blue-600' },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
              <p className="text-[9px] text-slate-400 mb-1">{k.label}</p>
              <p className="text-sm font-black text-[#0f172a]">{k.value}</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <ArrowUp className="w-2.5 h-2.5 text-blue-500" />
                <span className={`text-[8px] font-bold ${k.color}`}>{k.trend}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Interaction Volume</p>
          <div className="flex items-end gap-2 h-16">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ originY: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="w-full rounded-t-lg"
                  style={{ height: `${h}%`, background: i === 5 ? '#2563eb' : '#e2e8f0' }}
                />
                <span className="text-[8px] text-slate-400">{days[i]}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Sentiment */}
        <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sentiment Distribution</p>
          </div>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1, delay: 0.3 }} className="bg-blue-500 rounded-l-full" />
            <motion.div initial={{ width: 0 }} animate={{ width: '22%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-blue-300" />
            <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.7 }} className="bg-red-400 rounded-r-full" />
          </div>
          <div className="flex gap-4 mt-1.5">
            {[['Positive', '68%', 'text-blue-600'], ['Neutral', '22%', 'text-blue-400'], ['Negative', '10%', 'text-slate-400']].map(([l, v, c], i) => (
              <div key={i} className="flex items-center gap-1">
                <span className={`text-[8px] font-bold ${c}`}>{v}</span>
                <span className="text-[8px] text-slate-400">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card 4: Campaign ── */
function CampaignCard() {
  const [sent, setSent] = useState(1242);
  useEffect(() => {
    const id = setInterval(() => setSent(s => s + Math.floor(Math.random() * 5 + 1)), 1400);
    return () => clearInterval(id);
  }, []);
  const campaigns = [
    { name: 'Q2 Renewal Drive',   channel: 'Voice',    progress: 72, color: 'bg-blue-500',   status: 'Running' },
    { name: 'WhatsApp Promo',     channel: 'WhatsApp', progress: 45, color: 'bg-blue-500',  status: 'Running' },
    { name: 'Email Re-engage',    channel: 'Email',    progress: 91, color: 'bg-blue-600', status: 'Complete' },
  ];
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-blue-600" />
          <span className="text-[11px] font-bold text-[#0f172a]">Campaign Manager</span>
        </div>
        <button className="text-[9px] font-black text-white bg-blue-600 px-2.5 py-1 rounded-full">+ New</button>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-3">
        {/* Live counter */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-[9px] uppercase tracking-widest">Messages Sent Today</p>
            <motion.p key={sent} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 0.3 }}
              className="text-2xl font-black text-white">{sent.toLocaleString()}</motion.p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
            <Zap className="w-3 h-3 text-blue-300" />
            <span className="text-white text-[9px] font-black">AI Optimised</span>
          </div>
        </div>
        {/* Campaign list */}
        <div className="flex-1 space-y-2">
          {campaigns.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gray-50 rounded-xl p-3 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[11px] font-bold text-[#0f172a]">{c.name}</p>
                  <p className="text-[9px] text-slate-400">{c.channel}</p>
                </div>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${c.status === 'Running' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-slate-500'}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.progress}%` }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${c.color}`}
                  />
                </div>
                <span className="text-[9px] font-black text-slate-500">{c.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[{ label: 'Open Rate', value: '38%' }, { label: 'Conversion', value: '12%' }, { label: 'Opted Out', value: '0.4%' }].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
              <p className="text-[9px] text-slate-400">{s.label}</p>
              <p className="text-xs font-black text-[#0f172a]">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
const cards = [
  {
    tag: 'Monitoring',
    title: 'Live Agent & Interaction Monitoring',
    desc: 'Supervisors get a real-time view of every agent, queue, and interaction — across all channels simultaneously.',
    accent: '#2563eb',
    tagBg: 'bg-blue-50 text-blue-600 border-blue-100',
    bg: 'bg-[#f0f7ff]',
    UI: MonitoringCard,
  },
  {
    tag: 'Interactions',
    title: 'Unified Agent Desktop',
    desc: 'Voice, chat, email and WhatsApp in one workspace. AI Co-Pilot surfaces context and suggestions in real time.',
    accent: '#7c3aed',
    tagBg: 'bg-blue-50 text-blue-600 border-blue-100',
    bg: 'bg-[#f5f3ff]',
    UI: InteractionsCard,
  },
  {
    tag: 'Analytics',
    title: 'Real-Time Intelligence & Reporting',
    desc: 'Live dashboards, sentiment tracking, and AI-powered insights — so you never miss a trend or service risk.',
    accent: '#0d9488',
    tagBg: 'bg-blue-50 text-blue-600 border-blue-100',
    bg: 'bg-[#f0fdfa]',
    UI: AnalyticsCard,
  },
  {
    tag: 'Campaigns',
    title: 'AI-Driven Outbound Campaigns',
    desc: 'Reach customers at the right time, on the right channel — with AI that optimises send time, message and reach.',
    accent: '#ea580c',
    tagBg: 'bg-blue-50 text-blue-600 border-blue-100',
    bg: 'bg-[#fff7ed]',
    UI: CampaignCard,
  },
];

export default function PlatformCards() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '50vw', height: '50vw', top: '-220px', left: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '36vw', height: '36vw', bottom: '-160px', right: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Header */}
      <div className="container mx-auto px-6 text-center pt-20 pb-16 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-eyebrow"
        >
          The Platform
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-5"
        >
          One platform. Every capability.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[16px] text-slate-500 leading-relaxed"
        >
          From live monitoring to outbound campaigns — every module is AI-native and connected through one intelligent core.
        </motion.p>
      </div>

      {/* Each card is sticky at the same top — stacks on top of previous */}
      <div className="relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className="sticky"
            style={{ top: '80px', zIndex: 10 + i }}
          >
            <div className="container mx-auto px-6 max-w-5xl">
              <div
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-2xl bg-white"
                style={{ marginTop: i === 0 ? 0 : '-60vh' }}
              >
                {/* UI mock */}
                <div style={{ height: 360 }}>
                  <card.UI />
                </div>
                {/* Label bar */}
                <div className="px-8 py-5 border-t border-gray-100 bg-white flex items-center justify-between">
                  <div>
                    <span className={`inline-block text-[9px] font-black uppercase tracking-[0.3em] border px-2.5 py-1 rounded-full mb-2 ${card.tagBg}`}>
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-bold font-figtree leading-tight text-[#0f172a]">{card.title}</h3>
                    <p className="text-[16px] text-slate-400 mt-1">{card.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-8" style={{ background: card.accent }}>
                    <span className="text-white font-black text-sm">0{i + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Scroll space — each card needs viewport height to trigger */}
        <div style={{ height: `${cards.length * 80}vh` }} />
      </div>
    </section>
  );
}
