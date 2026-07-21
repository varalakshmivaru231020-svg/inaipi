'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone, MessageSquare, Mail, Globe, Cpu, Users, Zap, Layers, Target,
  Star, TrendingUp, Check, Send, CheckCircle2, Bell,
} from 'lucide-react';
import Image from 'next/image';

// Font + palette from the "Inaipi Agent Desktop" Claude design
const FONT = "var(--font-poppins), 'Figtree', sans-serif";

// ─────────────────────────────────────────────
// Design top bar (shared by the 3 Agent-Desktop screens)
// ─────────────────────────────────────────────
function DesignTopBar({ active }: { active: string }) {
  const tabs = ['Agent Workspace', 'Monitoring', 'Cases'];
  return (
    <div style={{ fontFamily: FONT }} className="h-9 bg-white border-b border-[#E3EAF5] flex items-center gap-2 px-2.5 shrink-0">
      <Image src="/logo.png" alt="inaipi" width={44} height={14} className="object-contain shrink-0" />
      <div className="flex items-center gap-0.5 bg-[#F1F5FC] rounded-lg p-0.5 overflow-hidden">
        {tabs.map(t => (
          <span key={t} className="px-1.5 py-1 rounded-md text-[7.5px] font-bold whitespace-nowrap"
            style={active === t ? { background: '#2A63F6', color: '#fff' } : { color: '#41537A' }}>{t}</span>
        ))}
        <span className="px-1.5 py-1 text-[7.5px] font-bold text-[#8FA1BE] whitespace-nowrap hidden sm:inline">Analytics</span>
      </div>
      <div className="flex-1" />
      <div className="hidden sm:flex items-center gap-1 bg-[#EAF6EE] border border-[#CBEBD6] rounded-full px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
        <span className="text-[7.5px] font-bold text-[#166534]">Available</span>
      </div>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-black shrink-0" style={{ background: 'linear-gradient(135deg,#2A63F6,#6C9BFF)' }}>MA</div>
    </div>
  );
}

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// ─────────────────────────────────────────────
// MOCKUP 01 — Monitoring Center
// ─────────────────────────────────────────────
function MonitoringMockup() {
  const [tick, setTick] = useState(0);
  const [secs, setSecs] = useState(272);
  useEffect(() => {
    const a = setInterval(() => setTick(t => t + 1), 2000);
    const b = setInterval(() => setSecs(s => s + 1), 1000);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const kpis: { label: string; value: string; delta: string; color: string; dc: string; icon: string; ib: string; bars: number[]; bc: string }[] = [
    { label: 'ACTIVE', value: '7/9', delta: '', color: '#0B1B3A', dc: '#16A34A', icon: '👥', ib: '#EAF0FE', bars: [45, 60, 55, 70, 60, 75, 70, 78], bc: '#2A63F6' },
    { label: 'TODAY', value: String(247 + Math.floor(tick / 2)), delta: '+12%', color: '#0B1B3A', dc: '#16A34A', icon: '🔁', ib: '#E9F9EF', bars: [30, 42, 38, 55, 62, 58, 74, 88], bc: '#1FA855' },
    { label: 'IN QUEUE', value: '6', delta: '2 voice', color: '#2A63F6', dc: '#8FA1BE', icon: '⏳', ib: '#EAF0FE', bars: [70, 55, 62, 40, 48, 35, 42, 50], bc: '#2A63F6' },
    { label: 'AHT', value: '3:42', delta: '−0:18', color: '#0B1B3A', dc: '#16A34A', icon: '⏱', ib: '#FEF3E2', bars: [80, 74, 70, 66, 60, 58, 52, 46], bc: '#B7791F' },
    { label: 'AI CONTAIN', value: '68%', delta: '+5%', color: '#7C3AED', dc: '#16A34A', icon: '✦', ib: '#F3EDFE', bars: [38, 44, 50, 55, 58, 62, 65, 68], bc: '#7C3AED' },
    { label: 'CSAT', value: '4.6', delta: '/5', color: '#0B1B3A', dc: '#8FA1BE', icon: '★', ib: '#FEF3E2', bars: [76, 80, 78, 84, 82, 88, 86, 92], bc: '#F59E0B' },
  ];

  const agents: { initials: string; name: string; team: string; ext: string; status: string; sb: string; sc: string; dot: string; av: string; chans: [string, number][]; current: string; time: string; occ: number; oc: string }[] = [
    { initials: 'FZ', name: 'Fatima Zahra', team: 'Front Office', ext: '6014', status: 'On Call', sb: '#EAF0FE', sc: '#2A63F6', dot: '#2A63F6', av: 'linear-gradient(135deg,#2A63F6,#6C9BFF)', chans: [['📞', 1], ['💬', 2], ['✦', 1]], current: 'Voice · Ahmed Al Rashid', time: fmt(secs), occ: 82, oc: '#E5484D' },
    { initials: 'MA', name: 'Mariam A.', team: 'Billing', ext: '6013', status: 'On Call', sb: '#EAF0FE', sc: '#2A63F6', dot: '#2A63F6', av: 'linear-gradient(135deg,#0B1B3A,#41537A)', chans: [['📞', 1], ['💬', 1], ['✦', 1]], current: 'Voice · billing dispute', time: '02:41', occ: 76, oc: '#2A63F6' },
    { initials: 'JR', name: 'Jonathan Reyes', team: 'Sales', ext: '2309', status: 'On Chat', sb: '#E9F9EF', sc: '#1FA855', dot: '#1FA855', av: 'linear-gradient(135deg,#7C3AED,#A78BFA)', chans: [['💬', 3], ['◎', 1]], current: 'WhatsApp · 3 concurrent', time: '11:05', occ: 64, oc: '#2A63F6' },
    { initials: 'PD', name: 'Priyanka Desai', team: 'Support', ext: '6012', status: 'On Chat', sb: '#E9F9EF', sc: '#1FA855', dot: '#1FA855', av: 'linear-gradient(135deg,#0E7490,#22D3EE)', chans: [['💬', 2], ['✉', 1]], current: 'Web chat · escalation', time: '05:22', occ: 71, oc: '#2A63F6' },
  ];

  const feedAll: string[][] = [
    ['📞', '#EAF0FE', '#2A63F6', 'Fatima answered a voice call from +971 50 442 8817', 'just now'],
    ['✦', '#F3EDFE', '#7C3AED', 'AI agent resolved a WhatsApp query — no handoff', '12s ago'],
    ['⚠', '#FEF3E2', '#B7791F', 'Voice queue wait exceeded 60s — SLA warning', '31s ago'],
    ['💬', '#E9F9EF', '#1FA855', 'Jonathan accepted a 3rd concurrent WhatsApp chat', '1m ago'],
    ['★', '#FEF3E2', '#B7791F', 'CSAT 5/5 received for Grace Njeri', '2m ago'],
  ];
  const rF = tick % feedAll.length;
  const feed = feedAll.slice(rF).concat(feedAll.slice(0, rF));

  return (
    <div style={{ fontFamily: FONT, background: 'linear-gradient(180deg,#E9EFF9,#F2F6FC)' }} className="w-full h-full flex flex-col overflow-hidden select-none text-[#0B1B3A]">
      <DesignTopBar active="Monitoring" />
      <div className="flex-1 overflow-hidden p-2.5 flex flex-col gap-2 min-h-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0" style={{ background: 'linear-gradient(135deg,#1E4FD0,#4C82FF)' }}>📡</div>
          <div className="min-w-0">
            <p className="font-extrabold text-[9px] leading-none truncate">Interaction Monitoring Center</p>
            <p className="text-[6.5px] text-[#5B6B87] font-semibold truncate">Real-time omnichannel supervision</p>
          </div>
          <div className="flex-1" />
          <span className="flex items-center gap-1 bg-white border border-[#E3EAF5] rounded-full px-1.5 py-0.5 text-[6.5px] font-bold whitespace-nowrap"><span className="w-1 h-1 rounded-full bg-[#16A34A] animate-pulse" />Live</span>
          <span className="bg-[#EAF0FE] text-[#2A63F6] rounded-full px-1.5 py-0.5 text-[6.5px] font-bold whitespace-nowrap hidden sm:inline">7 Human</span>
          <span className="bg-[#F3EDFE] text-[#7C3AED] rounded-full px-1.5 py-0.5 text-[6.5px] font-bold whitespace-nowrap">✦ 3 AI</span>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5">
          {kpis.map((k, i) => (
            <div key={i} className="bg-white border border-[#E3EAF5] rounded-xl p-1.5">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-md flex items-center justify-center text-[7px] shrink-0" style={{ background: k.ib }}>{k.icon}</span>
                <span className="text-[5.5px] font-extrabold text-[#8FA1BE] tracking-wide truncate">{k.label}</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-extrabold text-[13px] leading-none" style={{ color: k.color }}>{k.value}</span>
                <span className="text-[6px] font-bold" style={{ color: k.dc }}>{k.delta}</span>
              </div>
              <div className="flex items-end gap-[1.5px] h-3 mt-1">
                {k.bars.map((h, j) => (<span key={j} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: j === k.bars.length - 1 ? k.bc : '#E6EDF9' }} />))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_130px] gap-2 min-h-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-1.5 content-start overflow-hidden">
            {agents.map((a, i) => (
              <div key={i} className="bg-white rounded-xl p-1.5 border border-[#E8EEF8] flex flex-col gap-1" style={{ borderTop: `2px solid ${a.dot}` }}>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-extrabold text-[7px] shrink-0" style={{ background: a.av }}>{a.initials}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-[8px] leading-none truncate">{a.name}</p>
                    <p className="text-[6px] text-[#8FA1BE] font-bold truncate">{a.team} · {a.ext}</p>
                  </div>
                  <span className="text-[5.5px] font-extrabold px-1 py-0.5 rounded-full whitespace-nowrap" style={{ background: a.sb, color: a.sc }}>{a.status}</span>
                </div>
                <div className="flex gap-0.5">
                  {a.chans.map(([g, c], j) => (<span key={j} className="flex items-center gap-0.5 rounded px-1 py-0.5 text-[6px] font-bold" style={{ background: '#EAF0FE', color: '#2A63F6' }}>{g} {c}</span>))}
                </div>
                <div className="bg-[#F7FAFF] border border-[#EDF2FA] rounded-md px-1 py-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                  <span className="text-[6px] font-semibold text-[#22314F] flex-1 truncate">{a.current}</span>
                  <span className="text-[6px] font-extrabold tabular-nums">{a.time}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[5.5px] font-extrabold text-[#8FA1BE] mb-0.5"><span>OCC</span><span style={{ color: '#41537A' }}>{a.occ}%</span></div>
                  <div className="h-1 rounded-full bg-[#EDF2FA] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${a.occ}%`, background: a.oc }} /></div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-col bg-white border border-[#E3EAF5] rounded-xl overflow-hidden">
            <div className="px-2 py-1 border-b border-[#EDF2FA] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A63F6] animate-pulse" />
              <span className="font-extrabold text-[7px]">Live Activity</span>
              <span className="ml-auto text-[5.5px] font-extrabold text-[#8FA1BE]">AUTO</span>
            </div>
            <div className="flex-1 p-1 flex flex-col gap-0.5 overflow-hidden">
              {feed.slice(0, 5).map((e, i) => (
                <div key={i} className="flex gap-1 p-1 rounded-md" style={{ background: i === 0 ? '#F3F7FE' : 'transparent' }}>
                  <span className="w-3.5 h-3.5 rounded-md flex items-center justify-center text-[7px] shrink-0" style={{ background: e[1], color: e[2] }}>{e[0]}</span>
                  <div className="min-w-0">
                    <p className="text-[6px] font-semibold text-[#22314F] leading-tight line-clamp-2">{e[3]}</p>
                    <p className="text-[5.5px] font-bold text-[#8FA1BE] mt-0.5">{e[4]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 02 — Agent Workspace (active voice interaction)
// ─────────────────────────────────────────────
function AgentDesktopMockup() {
  const [secs, setSecs] = useState(272);
  useEffect(() => { const id = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(id); }, []);

  const queue: string[][] = [
    ['✉', '#FEF3E2', '#B7791F', 'James Cooper', 'Email', 'Refund request · invoice #INV-2291'],
    ['📞', '#EAF0FE', '#2A63F6', '+971 55 210 4478', 'Voice', 'Billing queue · IVR path 2-1'],
    ['◎', '#FDEBF3', '#DB2777', 'Lena Ortiz', 'Instagram', 'DM: blue variant back in stock?'],
    ['💬', '#E9F9EF', '#1FA855', 'Rakesh Kumar', 'WhatsApp', 'Sent a photo of damaged package'],
  ];
  const transcript: string[][] = [
    ['Agent', '#F1F5FC', '#41537A', 'Thank you for calling Inaipi, this is Mariam. How can I help?', '00:04'],
    ['Customer', '#EAF0FE', '#2A63F6', 'I was charged twice for my order — AED 249, two times.', '00:19'],
    ['Agent', '#F1F5FC', '#41537A', "I'm sorry, Ahmed. Let me pull up the transactions now.", '00:41'],
    ['Customer', '#EAF0FE', '#2A63F6', "This is the second time. Honestly it's frustrating.", '01:12'],
  ];

  return (
    <div style={{ fontFamily: FONT, background: 'linear-gradient(180deg,#E9EFF9,#F2F6FC)' }} className="w-full h-full flex flex-col overflow-hidden select-none text-[#0B1B3A]">
      <DesignTopBar active="Agent Workspace" />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[95px_1fr_120px] gap-1.5 p-1.5 min-h-0 overflow-hidden">
        {/* queue */}
        <div className="hidden lg:flex flex-col bg-white border border-[#E3EAF5] rounded-xl overflow-hidden">
          <div className="px-1.5 pt-1.5 pb-1 flex items-center justify-between">
            <span className="font-extrabold text-[7px]">Queue</span>
            <span className="bg-[#EAF0FE] text-[#2A63F6] font-extrabold text-[5.5px] px-1 py-0.5 rounded-full">6</span>
          </div>
          <div className="flex-1 px-1 pb-1 flex flex-col gap-1 overflow-hidden">
            {queue.map((q, i) => (
              <div key={i} className="border border-[#EDF2FA] rounded-lg p-1 flex gap-1">
                <div className="w-4 h-4 rounded-md flex items-center justify-center text-[7px] shrink-0" style={{ background: q[1], color: q[2] }}>{q[0]}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[6.5px] leading-none truncate">{q[3]}</p>
                  <p className="text-[5.5px] text-[#5B6B87] truncate mt-0.5">{q[5]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* center — active voice */}
        <div className="flex flex-col gap-1 min-h-0 overflow-hidden">
          <div className="flex gap-1 shrink-0">
            <span className="flex items-center gap-1 border border-[#2A63F6] bg-white rounded-lg px-1.5 py-1 text-[6.5px] font-bold whitespace-nowrap"><span className="w-1 h-1 rounded-full bg-[#16A34A]" />Ahmed · Voice <b>{fmt(secs)}</b></span>
            <span className="border border-[#E3EAF5] bg-[#F1F5FC] text-[#5B6B87] rounded-lg px-1.5 py-1 text-[6.5px] font-bold whitespace-nowrap hidden sm:inline">Sarah · WhatsApp</span>
          </div>
          <div className="rounded-xl px-2 py-1.5 text-white flex items-center gap-1.5 shrink-0" style={{ background: 'linear-gradient(120deg,#1E4FD0,#2A63F6 55%,#4C82FF)' }}>
            <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-extrabold text-[7px] shrink-0">AR</div>
            <div className="min-w-0">
              <p className="font-extrabold text-[8px] leading-none truncate">Ahmed Al Rashid</p>
              <p className="text-[6px] opacity-85 truncate">Billing · Gold tier</p>
            </div>
            <div className="flex items-end gap-[1.5px] h-3 ml-0.5">
              {[0, 0.15, 0.3, 0.45].map((d, i) => (<span key={i} className="w-[2px] bg-white/85 rounded-full" style={{ height: '100%', animation: `pfwave 1s ${d}s infinite`, transformOrigin: 'bottom' }} />))}
            </div>
            <span className="font-extrabold text-[10px] tabular-nums ml-auto">{fmt(secs)}</span>
            <span className="bg-[#E5484D] rounded-full px-1.5 py-0.5 text-[6px] font-extrabold shrink-0">End</span>
          </div>
          <div className="flex-1 bg-white border border-[#E3EAF5] rounded-xl flex flex-col min-h-0 overflow-hidden">
            <div className="px-1.5 py-1 border-b border-[#EDF2FA] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#E5484D] animate-pulse" />
              <span className="font-extrabold text-[6.5px]">Live Transcription</span>
              <span className="ml-auto bg-[#F3EDFE] text-[#7C3AED] font-extrabold text-[5.5px] px-1 py-0.5 rounded-full whitespace-nowrap">✦ Billing dispute</span>
            </div>
            <div className="flex-1 p-1.5 flex flex-col gap-1 overflow-hidden">
              {transcript.map((t, i) => (
                <div key={i} className="flex gap-1">
                  <span className="text-[5.5px] font-extrabold px-1 py-0.5 rounded-full h-fit shrink-0" style={{ background: t[1], color: t[2] }}>{t[0]}</span>
                  <p className="text-[6.5px] leading-tight text-[#22314F] min-w-0">{t[3]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* copilot */}
        <div className="hidden lg:flex flex-col gap-1 overflow-hidden">
          <div className="bg-white border border-[#E3EAF5] rounded-xl p-1.5">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-extrabold text-[6.5px] shrink-0" style={{ background: 'linear-gradient(135deg,#0B1B3A,#41537A)' }}>AR</div>
              <div className="min-w-0"><p className="font-extrabold text-[7px] truncate">Ahmed Al Rashid</p><p className="text-[5.5px] text-[#5B6B87] font-bold">since 2021 · ★ Gold</p></div>
            </div>
            <div className="grid grid-cols-3 gap-0.5 mt-1">
              {[['23', 'ORDERS'], ['4.8', 'CSAT'], ['7', 'CONTACTS']].map(([v, l], i) => (<div key={i} className="bg-[#F7FAFF] rounded-md py-0.5 text-center"><div className="font-extrabold text-[8px]">{v}</div><div className="text-[5px] font-extrabold text-[#8FA1BE]">{l}</div></div>))}
            </div>
          </div>
          <div className="bg-white border border-[#DCCEFB] rounded-xl overflow-hidden">
            <div className="px-1.5 py-1 flex items-center gap-1" style={{ background: 'linear-gradient(120deg,#6D28D9,#8B5CF6)' }}>
              <span className="text-white text-[7px]">✦</span><span className="text-white font-extrabold text-[6.5px]">AI Copilot</span><span className="ml-auto bg-white/20 text-white text-[5px] font-extrabold px-1 py-0.5 rounded-full">LIVE</span>
            </div>
            <div className="p-1.5 flex flex-col gap-1">
              <div className="text-[5.5px] font-extrabold text-[#8FA1BE]">NEXT BEST ACTION</div>
              <div className="border border-[#EDE6FD] bg-[#FBFAFF] rounded-md p-1 text-[6px] leading-tight text-[#22314F]"><b>Confirm refund of AED 249</b> to card ending 4417 — duplicate verified.</div>
              <div className="border border-[#EDE6FD] bg-[#FBFAFF] rounded-md p-1 text-[6px] leading-tight text-[#22314F]">Offer <b>free expedited shipping</b> on order #7789.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 03 — Case & Ticket Management
// ─────────────────────────────────────────────
function CaseManagementMockup() {
  const [hl, setHl] = useState(1);
  useEffect(() => { const id = setInterval(() => setHl(h => (h + 1) % 6), 2500); return () => clearInterval(id); }, []);

  const kpis: string[][] = [
    ['📥', '#EAF0FE', 'OPEN', '4', '#2A63F6', '+2', '#8FA1BE'],
    ['🔧', '#FEF3E2', 'IN PROG', '3', '#0B1B3A', '', '#8FA1BE'],
    ['⚠', '#FEF1F1', 'SLA RISK', '2', '#E5484D', '<1h', '#E5484D'],
    ['✓', '#EAF6EE', 'RESOLVED', '12', '#166534', '+3 AI', '#7C3AED'],
    ['⏱', '#F3EDFE', 'AVG RES', '4h06', '#0B1B3A', '−32m', '#16A34A'],
  ];
  const PR: Record<string, string[]> = { High: ['#FEF1F1', '#E5484D'], Medium: ['#FEF3E2', '#B7791F'], Low: ['#F1F5FC', '#5B6B87'] };
  const CS: Record<string, string[]> = { Open: ['#EAF0FE', '#2A63F6'], 'In Progress': ['#FEF3E2', '#B7791F'], Resolved: ['#EAF6EE', '#166534'] };
  const CH: Record<string, string[]> = { Voice: ['📞', '#EAF0FE', '#2A63F6'], WhatsApp: ['💬', '#E9F9EF', '#1FA855'], Email: ['✉', '#FEF3E2', '#B7791F'], 'Web Chat': ['🖥', '#E7F6FD', '#0E7490'], X: ['𝕏', '#F1F5FC', '#0B1B3A'] };
  const rows: string[][] = [
    ['CSE-1048', 'Noura H.', 'X', 'Public complaint mention on X', 'High', 'Open', '0h55m'],
    ['CSE-1046', 'Ahmed Al Rashid', 'Voice', 'Duplicate charge refund — AED 249', 'High', 'In Progress', '0h41m'],
    ['CSE-1041', 'Sarah K.', 'WhatsApp', 'Order #1224 delayed in transit', 'High', 'Open', '2h14m'],
    ['CSE-1042', 'Marco R.', 'Voice', 'Billing dispute — duplicate invoice', 'Medium', 'In Progress', '4h00m'],
    ['CSE-1045', 'James T.', 'Email', 'Password reset issue', 'Low', 'In Progress', '5h30m'],
    ['CSE-1043', 'Alex L.', 'Email', 'API integration help', 'Low', 'Resolved', '—'],
  ];
  const cols = 'grid-cols-[1.3fr_1.5fr_2.3fr_0.8fr_0.8fr_1fr]';

  return (
    <div style={{ fontFamily: FONT, background: 'linear-gradient(180deg,#E9EFF9,#F2F6FC)' }} className="w-full h-full flex flex-col overflow-hidden select-none text-[#0B1B3A]">
      <DesignTopBar active="Cases" />
      <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-hidden min-h-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0" style={{ background: 'linear-gradient(135deg,#0B1B3A,#41537A)' }}>🗂</div>
          <div className="min-w-0"><p className="font-extrabold text-[9px] leading-none truncate">Case &amp; Ticket Management</p><p className="text-[6px] text-[#5B6B87] font-semibold truncate">Auto-created · AI-classified · SLA tracked</p></div>
          <span className="ml-auto flex items-center gap-1 bg-[#F3EDFE] text-[#7C3AED] rounded-full px-1.5 py-0.5 text-[6px] font-extrabold whitespace-nowrap">✦ AI resolving 3</span>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {kpis.map((k, i) => (
            <div key={i} className="bg-white border border-[#E3EAF5] rounded-lg p-1">
              <div className="flex items-center gap-0.5"><span className="w-3 h-3 rounded flex items-center justify-center text-[6px] shrink-0" style={{ background: k[1] }}>{k[0]}</span><span className="text-[5px] font-extrabold text-[#8FA1BE] truncate">{k[2]}</span></div>
              <div className="flex items-baseline gap-0.5 mt-0.5"><span className="font-extrabold text-[11px] leading-none" style={{ color: k[4] }}>{k[3]}</span><span className="text-[5px] font-bold" style={{ color: k[6] }}>{k[5]}</span></div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-white border border-[#E3EAF5] rounded-xl overflow-hidden flex flex-col min-h-0">
          <div className={`grid ${cols} gap-1 px-2 py-1 border-b border-[#EDF2FA] text-[5.5px] font-extrabold text-[#8FA1BE]`}>
            <span>CASE</span><span>CUSTOMER</span><span>SUBJECT</span><span>PRIO</span><span>SLA</span><span>STATUS</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {rows.map((r, i) => {
              const ch = CH[r[2]] ?? ['•', '#F1F5FC', '#5B6B87'];
              const pr = PR[r[4]] ?? ['#F1F5FC', '#5B6B87'];
              const cs = CS[r[5]] ?? ['#F1F5FC', '#5B6B87'];
              return (
                <div key={i} className={`grid ${cols} gap-1 px-2 py-1 items-center border-b border-[#F3F7FD]`} style={{ background: hl === i && r[5] !== 'Resolved' ? '#F0F5FF' : 'transparent', transition: 'background .4s' }}>
                  <span className="font-extrabold text-[6px] text-[#2A63F6] truncate">{r[0]}</span>
                  <span className="flex items-center gap-0.5 min-w-0"><span className="w-3.5 h-3.5 rounded flex items-center justify-center text-[6px] shrink-0" style={{ background: ch[1], color: ch[2] }}>{ch[0]}</span><span className="font-bold text-[6px] truncate">{r[1]}</span></span>
                  <span className="text-[6px] text-[#22314F] font-semibold truncate">{r[3]}</span>
                  <span><span className="text-[5px] font-extrabold px-1 py-0.5 rounded-full whitespace-nowrap" style={{ background: pr[0], color: pr[1] }}>{r[4]}</span></span>
                  <span className="text-[6px] font-extrabold tabular-nums" style={{ color: r[6].startsWith('0h') ? '#E5484D' : '#41537A' }}>{r[6]}</span>
                  <span><span className="text-[5px] font-extrabold px-1 py-0.5 rounded-full whitespace-nowrap" style={{ background: cs[0], color: cs[1] }}>{r[5]}</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Shared nav bar (used by the Campaign mockup, stage 04)
// ─────────────────────────────────────────────
function MockupNav({ active }: { active: string }) {
  const navItems = ['Monitoring', 'Interactions', 'Campaign', 'Analytics'];
  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-slate-100 shrink-0">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Inaipi" width={52} height={16} className="object-contain" />
        <div className="flex items-center gap-0.5">
          {navItems.map(item => (
            <span key={item} className={`px-2 py-1 rounded-md text-[8px] font-black transition-colors ${item === active ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>{item}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center"><Bell className="w-2.5 h-2.5 text-slate-400" /></div>
        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><span className="text-white font-black text-[8px]">6</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOCKUP 04 — Surveys & Campaigns (unchanged)
// ─────────────────────────────────────────────
const WEEK = [
  { label: 'Mon', csat: 4.2, sent: 120 },
  { label: 'Tue', csat: 4.5, sent: 145 },
  { label: 'Wed', csat: 4.3, sent: 98 },
  { label: 'Thu', csat: 4.7, sent: 167 },
  { label: 'Fri', csat: 4.6, sent: 201 },
  { label: 'Sat', csat: 4.8, sent: 88 },
  { label: 'Sun', csat: 4.9, sent: 72 },
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
          <p className="font-black text-[9px] text-[#0f172a]">Surveys &amp; Campaign Analytics</p>
          <p className="text-[7px] text-slate-400">Automated CSAT · Outbound AI · Campaign tracking</p>
        </div>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-black text-[7px]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />Auto-refresh
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 px-3 pt-2 shrink-0">
        {[
          { label: 'Surveys Sent', value: sent.toLocaleString(), icon: Send, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'CSAT Score', value: csat.toFixed(1) + '/5', icon: Star, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'AI Voice Calls', value: '3,841', icon: Phone, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Response Rate', value: '68.4%', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
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

      <div className="shrink-0 px-3 pb-2 flex flex-col gap-1">
        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Campaigns</p>
        {[
          { name: 'Post-call CSAT Survey', channel: 'WhatsApp', sent: 847, status: 'running' },
          { name: 'NPS Follow-up Campaign', channel: 'SMS', sent: 2103, status: 'running' },
          { name: 'Renewal Reminder AI Call', channel: 'Voice AI', sent: 521, status: 'scheduled' },
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
          className="rounded-3xl overflow-hidden border shadow-2xl grid lg:grid-cols-2 lg:min-h-[520px]"
          style={{ backgroundColor: stage.bgLight, borderColor: stage.borderColor }}
        >
          {/* Text side */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
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
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-0 overflow-hidden rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl border-t lg:border-t-0 lg:border-l" style={{ borderColor: stage.borderColor }}>
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
    <section id="platform" className="py-20 lg:py-24 relative overflow-hidden" style={{ background: '#f8faff' }}>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes pfwave{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}' }} />
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', top: '-200px', right: '-280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '34vw', height: '34vw', bottom: '-160px', left: '-180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-3xl text-center">
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

      <div className="pb-32">
        {stages.map((stage, i) => (
          <StageCard key={stage.id} stage={stage} index={i} total={stages.length} />
        ))}
      </div>
    </section>
  );
}
