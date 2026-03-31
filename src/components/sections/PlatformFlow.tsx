'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone, MessageSquare, Mail, Globe, Cpu, Users, Zap, Layers, Target,
  Star, TrendingUp, Check, BarChart2, Eye, PhoneOff,
  Search, Filter, ChevronDown, Clock, CheckCircle2, Send, Bell,
} from 'lucide-react';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Shared nav bar
// ─────────────────────────────────────────────
function MockupNav({ active }: { active: string }) {
  const navItems = ['Monitoring', 'Interactions', 'Campaign', 'Analytics'];
  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-slate-100 shrink-0">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Inaipi" width={52} height={16} className="object-contain" />
        <div className="flex items-center gap-0.5">
          {navItems.map(item => (
            <span
              key={item}
              className={`px-2 py-1 rounded-md text-[8px] font-black transition-colors ${
                item === active ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
          <Bell className="w-2.5 h-2.5 text-slate-400" />
        </div>
        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-black text-[8px]">6</span>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-slate-700 leading-none">6013</p>
          <p className="text-[7px] text-blue-400 font-bold">Available</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 01 — Monitoring Center
// ─────────────────────────────────────────────
const AGENTS = [
  { name: 'Fatima', dept: 'Front Office', ext: '6014', status: 'active', hasCall: true },
  { name: '6012',   dept: 'Support',      ext: '6012', status: 'busy',      hasCall: false },
  { name: '6004',   dept: 'Support',      ext: '6004', status: 'offline',   hasCall: false },
  { name: '8003',   dept: 'Sales',        ext: 'Demo22', status: 'available', hasCall: false },
  { name: '8004',   dept: 'Sales',        ext: 'Demo22', status: 'available', hasCall: false },
  { name: 'Jonathan', dept: 'Sales',      ext: '2309', status: 'available', hasCall: false },
];
const STATUS_DOT: Record<string, string> = {
  active: 'bg-blue-500', busy: 'bg-blue-300', offline: 'bg-slate-300', available: 'bg-blue-400',
};

function MonitoringMockup() {
  const [tick, setTick] = useState(86);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(tick / 60)).padStart(2, '0');
  const s = String(tick % 60).padStart(2, '0');

  return (
    <div className="w-full h-full bg-white flex flex-col text-[10px] overflow-hidden select-none">
      <MockupNav active="Monitoring" />

      {/* Sub-header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 shrink-0 bg-slate-50/60">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#0f172a] flex items-center justify-center shrink-0">
            <Phone className="w-2.5 h-2.5 text-white" />
          </div>
          <div>
            <p className="font-black text-[9px] text-[#0f172a] leading-none">Interaction Monitoring Center</p>
            <p className="text-slate-400 text-[7px]">Real-time omnichannel agent monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 font-black text-[7px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />Live
          </span>
          <span className="px-1.5 py-0.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-black text-[7px]">4 Human</span>
          <span className="px-1.5 py-0.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-black text-[7px]">1 AI</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 px-3 py-2 border-b border-slate-100 shrink-0">
        {[
          { label: 'Active Agents',       value: '5/5',   color: 'text-blue-600' },
          { label: 'Interactions Today',  value: '1',     color: 'text-slate-700' },
          { label: 'Queue',               value: '0',     color: 'text-slate-700' },
          { label: 'Completion Rate',     value: '400%',  color: 'text-blue-600' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-2 border border-slate-100">
            <p className="text-slate-400 text-[7px] font-bold uppercase tracking-wide leading-none">{s.label}</p>
            <p className={`text-sm font-black leading-none mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-1 flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <Search className="w-2.5 h-2.5 text-slate-400" />
          <span className="text-slate-300 text-[8px]">Search agents...</span>
        </div>
        {['All Status', 'All Agents'].map((f, i) => (
          <div key={i} className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <span className="text-slate-500 text-[8px] font-bold">{f}</span>
            <ChevronDown className="w-2 h-2 text-slate-400" />
          </div>
        ))}
      </div>

      {/* Agent grid */}
      <div className="flex-1 p-2.5 grid grid-cols-3 gap-2 overflow-hidden">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border bg-white p-2.5 flex flex-col gap-1.5 shadow-sm ${agent.hasCall ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100'}`}
          >
            <div className="flex items-center gap-1.5">
              <div className="relative w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-white font-black text-[9px]">{agent.name[0]}</span>
                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${STATUS_DOT[agent.status]}`} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-[9px] text-slate-700 leading-none truncate">{agent.name}</p>
                <p className="text-slate-400 text-[7px]">{agent.dept}</p>
              </div>
            </div>
            <p className="text-[7px] text-blue-600 font-bold flex items-center gap-0.5">
              <Phone className="w-2 h-2" /> Ext: {agent.ext}
            </p>
            {agent.hasCall && (
              <div className="bg-blue-600 rounded-lg px-2 py-1 flex items-center justify-between">
                <span className="text-white text-[7px] font-black">Agent05</span>
                <span className="text-white text-[8px] font-black tabular-nums">{m}:{s}</span>
                <Eye className="w-2.5 h-2.5 text-white/80" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 02 — Agent Desktop / Active Call
// ─────────────────────────────────────────────
function AgentDesktopMockup() {
  const [seconds, setSeconds] = useState(49);
  const [activeTab, setActiveTab] = useState('Customer');
  const tabs = ['Customer', 'Journey', 'Copilot', 'Tickets', 'Survey'];

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden select-none text-[10px]">
      <MockupNav active="Interactions" />
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar */}
        <div className="w-[90px] shrink-0 border-r border-slate-100 flex flex-col">
          <div className="px-2 py-2 border-b border-slate-100">
            <span className="font-black text-[8px] text-slate-700">Active <span className="bg-blue-600 text-white rounded-full px-1 ml-0.5">1</span></span>
          </div>
          <div className="flex gap-1.5 px-2 py-1.5 text-[7px] text-slate-400 font-bold border-b border-slate-100">
            <span>1/5</span><span>0/5</span><span>0/5</span>
          </div>
          <div className="p-2">
            <div className="p-2 rounded-xl border border-blue-100 bg-blue-50 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-blue-600 shrink-0" />
              <div>
                <p className="font-black text-[8px] text-blue-700">6014</p>
                <p className="text-[7px] text-slate-400 tabular-nums">{m}:{s}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 flex flex-col border-r border-slate-100">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Phone className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="font-black text-[9px] text-slate-700">6014</p>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-black text-[7px]">● Connected</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[7px]">Outbound</span>
                </div>
              </div>
            </div>
            <span className="text-[8px] text-slate-400">Ext: 6013</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-4">
            <motion.p
              key={seconds}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-4xl font-black text-blue-600 tabular-nums"
            >
              {m}:{s}
            </motion.p>
            <div className="flex items-center gap-3">
              {[
                { seed: 'Fatima',   label: 'Mute',     bg: 'b6e3f4', active: true  },
                { seed: 'Marco',    label: 'Hold',     bg: 'c0aede', active: false },
                { seed: 'Alex',     label: 'Add',      bg: 'd1f4d1', active: false },
                { seed: 'Jonathan', label: 'Transfer', bg: 'ffd5c8', active: false },
              ].map((btn, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 overflow-hidden ${btn.active ? 'border-blue-400 ring-2 ring-blue-200' : 'border-slate-200'}`}>
                    <img
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${btn.seed}&backgroundColor=${btn.bg}`}
                      alt={btn.seed}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[7px] text-slate-400">{btn.label}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 bg-red-500 text-white rounded-xl px-4 py-1.5 font-black text-[9px]">
              <PhoneOff className="w-3 h-3" /> End Call
            </button>
            <div className="w-full rounded-xl border border-blue-200 bg-blue-50/60 p-2.5">
              <p className="font-black text-[8px] text-blue-700 mb-2 flex items-center gap-1">
                <Send className="w-2.5 h-2.5" /> Transfer to Messaging
              </p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-1 bg-white border border-slate-100 rounded-lg py-1.5 px-2 justify-center">
                  <MessageSquare className="w-2.5 h-2.5 text-slate-500" />
                  <span className="text-[8px] font-bold text-slate-600">WhatsApp</span>
                </div>
                <div className="flex-1 flex items-center gap-1 bg-white border border-slate-100 rounded-lg py-1.5 px-2 justify-center">
                  <Globe className="w-2.5 h-2.5 text-slate-500" />
                  <span className="text-[8px] font-bold text-slate-600">Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[150px] shrink-0 flex flex-col">
          <div className="flex overflow-x-auto scrollbar-none border-b border-slate-100 shrink-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1.5 text-[7px] font-black whitespace-nowrap shrink-0 border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 p-2.5 flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-white font-black text-[9px]">BC</span>
              </div>
              <div>
                <p className="font-black text-[9px] text-slate-700">bGPPL Customer</p>
                <p className="text-[7px] text-slate-400">6014</p>
              </div>
            </div>
            <p className="text-[8px] font-black text-slate-500 flex items-center gap-1">
              <BarChart2 className="w-2.5 h-2.5" /> Customer Insights
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="rounded-lg bg-blue-700 p-2">
                <p className="text-blue-200 text-[7px] font-black uppercase">Interactions</p>
                <p className="text-white font-black text-lg leading-none">17</p>
              </div>
              <div className="rounded-lg bg-blue-500 p-2">
                <p className="text-blue-100 text-[7px] font-black uppercase">Sentiment</p>
                <p className="text-white font-black text-sm leading-none">positive</p>
              </div>
              <div className="rounded-lg bg-blue-400 p-2">
                <p className="text-blue-100 text-[7px] font-black uppercase">Last Contact</p>
                <p className="text-white font-black text-sm leading-none">Mar 23</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 03 — Case Management Board
// ─────────────────────────────────────────────
const CASES = [
  { id: 'CSE-1041', customer: 'Sarah K.',  issue: 'Order #1224 delayed',      channel: 'WhatsApp', priority: 'High',   status: 'open',        sla: '2h 14m' },
  { id: 'CSE-1042', customer: 'Marco R.',  issue: 'Billing dispute',           channel: 'Voice',    priority: 'Medium', status: 'in-progress', sla: '4h 00m' },
  { id: 'CSE-1043', customer: 'Alex L.',   issue: 'API integration help',      channel: 'Email',    priority: 'Low',    status: 'resolved',    sla: '—' },
  { id: 'CSE-1044', customer: 'Priya N.',  issue: 'Service delay complaint',   channel: 'Chat',     priority: 'High',   status: 'open',        sla: '1h 05m' },
  { id: 'CSE-1045', customer: 'James T.',  issue: 'Password reset issue',      channel: 'Email',    priority: 'Low',    status: 'in-progress', sla: '5h 30m' },
];
const PRIORITY_COLOR: Record<string, string> = {
  High: 'bg-blue-100 text-blue-700', Medium: 'bg-blue-50 text-blue-500', Low: 'bg-slate-100 text-slate-500',
};
const STATUS_BADGE: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700', 'in-progress': 'bg-blue-50 text-blue-600', resolved: 'bg-slate-100 text-slate-500',
};

function CaseManagementMockup() {
  const [resolving, setResolving] = useState<string | null>(null);
  useEffect(() => {
    const id = setInterval(() => {
      const open = CASES.filter(c => c.status !== 'resolved');
      if (open.length > 0) {
        const r = open[Math.floor(Math.random() * open.length)];
        setResolving(r.id);
        setTimeout(() => setResolving(null), 1200);
      }
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#f8fafc] flex flex-col text-[10px] overflow-hidden select-none">
      <MockupNav active="Monitoring" />

      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-slate-100 shrink-0">
        <div>
          <p className="font-black text-[9px] text-[#0f172a]">Case & Ticket Management</p>
          <p className="text-[7px] text-slate-400">Auto-classified · SLA tracked · AI-assisted</p>
        </div>
        <div className="flex gap-1">
          <span className="px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-black text-[7px]">Open: 2</span>
          <span className="px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-black text-[7px]">In Progress: 2</span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-black text-[7px]">Resolved: 1</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-1 flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <Search className="w-2.5 h-2.5 text-slate-400" />
          <span className="text-slate-300 text-[8px]">Search cases...</span>
        </div>
        <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
          <Filter className="w-2.5 h-2.5 text-slate-400" />
          <span className="text-slate-500 text-[8px] font-bold">All Priority</span>
        </div>
      </div>

      <div className="grid grid-cols-6 px-3 py-1 border-b border-slate-100 bg-white shrink-0">
        {['Case ID', 'Customer', 'Issue', 'Priority', 'SLA', 'Status'].map(h => (
          <p key={h} className="text-[7px] font-black uppercase tracking-wide text-slate-400">{h}</p>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col divide-y divide-slate-100">
        {CASES.map(c => (
          <motion.div
            key={c.id}
            animate={{ backgroundColor: resolving === c.id ? '#eff6ff' : '#ffffff' }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-6 items-center px-3 py-1.5 shrink-0"
          >
            <span className="font-black text-[8px] text-blue-700">{c.id}</span>
            <div>
              <p className="font-bold text-[8px] text-slate-700 truncate">{c.customer}</p>
              <p className="text-[7px] text-slate-400">{c.channel}</p>
            </div>
            <p className="text-[8px] text-slate-500 truncate">{c.issue}</p>
            <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full w-fit ${PRIORITY_COLOR[c.priority]}`}>{c.priority}</span>
            <div className="flex items-center gap-0.5">
              <Clock className={`w-2.5 h-2.5 ${c.status === 'resolved' ? 'text-slate-300' : 'text-blue-500'}`} />
              <span className={`text-[8px] font-bold ${c.status === 'resolved' ? 'text-slate-300' : 'text-blue-600'}`}>{c.sla}</span>
            </div>
            <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full w-fit ${STATUS_BADGE[c.status]}`}>{c.status}</span>
          </motion.div>
        ))}
      </div>

      <div className="shrink-0 px-3 py-2 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
        <Cpu className="w-3 h-3 text-blue-600 shrink-0" />
        <p className="text-[8px] font-black text-blue-700">AI Agent resolving routine cases in background</p>
        <motion.div
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="ml-auto h-1 bg-blue-300 rounded-full"
          style={{ width: 60 }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 04 — Surveys & Campaigns
// ─────────────────────────────────────────────
const WEEK = [
  { label: 'Mon', csat: 4.2, sent: 120 },
  { label: 'Tue', csat: 4.5, sent: 145 },
  { label: 'Wed', csat: 4.3, sent: 98  },
  { label: 'Thu', csat: 4.7, sent: 167 },
  { label: 'Fri', csat: 4.6, sent: 201 },
  { label: 'Sat', csat: 4.8, sent: 88  },
  { label: 'Sun', csat: 4.9, sent: 72  },
];
const MAX_SENT = Math.max(...WEEK.map(d => d.sent));

function CampaignMockup() {
  const [sent, setSent] = useState(1247);
  const [csat, setCsat] = useState(4.7);
  useEffect(() => {
    const id = setInterval(() => setSent(c => c + Math.floor(Math.random() * 3 + 1)), 2000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setCsat(s => parseFloat(Math.min(5, s + 0.01).toFixed(2))), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#f8fafc] flex flex-col text-[10px] overflow-hidden select-none">
      <MockupNav active="Campaign" />

      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-slate-100 shrink-0">
        <div>
          <p className="font-black text-[9px] text-[#0f172a]">Surveys & Campaign Analytics</p>
          <p className="text-[7px] text-slate-400">Automated CSAT · Outbound AI · Campaign tracking</p>
        </div>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-black text-[7px]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />Auto-refresh
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-1.5 px-3 pt-2 shrink-0">
        {[
          { label: 'Surveys Sent',  value: sent.toLocaleString(), icon: Send,      color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100' },
          { label: 'CSAT Score',    value: csat.toFixed(1)+'/5',  icon: Star,      color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'AI Voice Calls',value: '3,841',               icon: Phone,     color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Response Rate', value: '68.4%',               icon: TrendingUp,color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
        ].map((kpi, i) => (
          <div key={i} className={`${kpi.bg} border ${kpi.border} rounded-xl p-2`}>
            <kpi.icon className={`w-3 h-3 ${kpi.color} mb-1`} />
            <motion.p key={kpi.value} initial={{ scale: 1.05, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className={`font-black text-sm leading-none ${kpi.color}`}>
              {kpi.value}
            </motion.p>
            <p className="text-[7px] text-slate-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 px-3 py-2 flex flex-col min-h-0">
        <p className="text-[8px] font-black text-slate-500 mb-2">Survey Responses — This Week</p>
        <div className="flex items-end gap-1.5 flex-1 min-h-0">
          {WEEK.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <p className="text-[7px] font-black text-slate-500">{d.csat}</p>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.sent / MAX_SENT) * 80}%` }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                className="w-full rounded-t-lg"
                style={{ background: 'linear-gradient(to top, #1d4ed8, #60a5fa)' }}
              />
              <p className="text-[7px] text-slate-400 shrink-0">{d.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign list */}
      <div className="shrink-0 px-3 pb-2 flex flex-col gap-1">
        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Campaigns</p>
        {[
          { name: 'Post-call CSAT Survey',   channel: 'WhatsApp', sent: 847,  status: 'running' },
          { name: 'NPS Follow-up Campaign',  channel: 'SMS',      sent: 2103, status: 'running' },
          { name: 'Renewal Reminder AI Call',channel: 'Voice AI', sent: 521,  status: 'scheduled' },
        ].map((camp, i) => (
          <div key={i} className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3 h-3 shrink-0 ${camp.status === 'running' ? 'text-blue-500' : 'text-slate-300'}`} />
              <div>
                <p className="font-black text-[8px] text-slate-700">{camp.name}</p>
                <p className="text-[7px] text-slate-400">{camp.channel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-[9px] text-slate-700">{camp.sent.toLocaleString()}</p>
              <p className="text-[7px] text-slate-400">sent</p>
            </div>
          </div>
        ))}
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
    Mockup: MonitoringMockup,
  },
  {
    id: '02', title: 'AI & Human Collaboration', tagline: 'The Intelligence Hub',
    color: '#1d4ed8', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Inaipi AI Platform orchestrates every response. AI agents handle routine inquiries autonomously while human agents manage complex cases — with a real-time AI co-pilot at their side.',
    bullets: ['AI agents resolve routine inquiries autonomously', 'Human agents get real-time AI suggestions', 'Unified desktop — all channels in one view', 'Intelligent escalation based on sentiment & context'],
    channels: [{ icon: Cpu, label: 'AI Agent' }, { icon: Users, label: 'Human Agent' }, { icon: Zap, label: 'Co-Pilot' }, { icon: Target, label: 'Smart Routing' }],
    Mockup: AgentDesktopMockup,
  },
  {
    id: '03', title: 'Case & Ticket Management', tagline: 'Seamless Resolution',
    color: '#1e40af', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: 'Every unresolved interaction automatically becomes a case. Intelligent routing assigns it to the right agent or AI — with SLA tracking, auto-classification, and full conversation context.',
    bullets: ['Automatic case creation from any interaction', 'Intelligent routing based on skills & workload', 'SLA tracking with automated alerts & escalation', 'AI resolves routine cases autonomously in background'],
    channels: [{ icon: Layers, label: 'Case Board' }, { icon: Target, label: 'Smart Route' }, { icon: Zap, label: 'Auto Classify' }, { icon: Check, label: 'SLA Track' }],
    Mockup: CaseManagementMockup,
  },
  {
    id: '04', title: 'Surveys & Campaigns', tagline: 'Proactive Engagement',
    color: '#2563eb', bgLight: '#eff6ff', borderColor: '#bfdbfe',
    description: "After every resolved case, the platform automatically sends satisfaction surveys via the customer's preferred channel. AI voice agents run outbound campaigns at unlimited scale.",
    bullets: ['Automated CSAT / NPS surveys after case resolution', 'AI voice agents for outbound calls at scale', 'WhatsApp, SMS & email campaign automation', 'Real-time sentiment analysis & escalation triggers'],
    channels: [{ icon: Star, label: 'CSAT Survey' }, { icon: Phone, label: 'AI Voice' }, { icon: MessageSquare, label: 'WhatsApp' }, { icon: TrendingUp, label: 'Analytics' }],
    Mockup: CampaignMockup,
  },
];

// ─────────────────────────────────────────────
// Stacking card
// ─────────────────────────────────────────────
const CARD_TOP = 80;
const CARD_OFFSET = 16;

function StageCard({ stage, index, total }: { stage: typeof stages[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.6]);

  return (
    <div ref={cardRef} className="sticky px-6" style={{ top: `${CARD_TOP + index * CARD_OFFSET}px`, zIndex: 10 + index }}>
      <motion.div style={{ scale, opacity, transformOrigin: 'top center' }} className="container mx-auto max-w-6xl">
        <div
          className="rounded-3xl overflow-hidden border shadow-2xl grid lg:grid-cols-2 lg:min-h-[520px]"
          style={{ backgroundColor: stage.bgLight, borderColor: stage.borderColor }}
        >
          {/* Text side */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white text-base font-black mb-6 shrink-0 shadow-lg" style={{ backgroundColor: stage.color }}>
              {stage.id}
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.35em] mb-4" style={{ color: stage.color }}>{stage.tagline}</p>
            <h3 className="text-[22px] font-bold font-figtree text-[#0f172a] mb-6 leading-tight">{stage.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-8">{stage.description}</p>
            <ul className="space-y-3 mb-8">
              {stage.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-3.5 text-slate-600 leading-relaxed font-medium">
                  <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: stage.color }}>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2.5">
              {stage.channels.map((ch, j) => (
                <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border text-[11px] font-black uppercase tracking-wider shadow-sm" style={{ borderColor: stage.borderColor, color: stage.color }}>
                  <ch.icon className="w-3.5 h-3.5" />
                  {ch.label}
                </div>
              ))}
            </div>
          </div>

          {/* Mockup side */}
          <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden rounded-r-3xl border-l" style={{ borderColor: stage.borderColor }}>
            <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: `inset 0 0 60px 0 ${stage.color}18` }} />
            <div className="absolute inset-3 rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white">
              <stage.Mockup />
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
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', top: '-200px', right: '-280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '34vw', height: '34vw', bottom: '-160px', left: '-180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-3xl text-center pt-24 pb-16">
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
          One platform powering the <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">entire customer lifecycle.</span>
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

      <div className="pb-32">
        {stages.map((stage, i) => (
          <StageCard key={stage.id} stage={stage} index={i} total={stages.length} />
        ))}
      </div>
    </section>
  );
}
