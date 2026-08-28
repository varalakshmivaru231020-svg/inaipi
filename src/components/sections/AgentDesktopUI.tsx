'use client';

/**
 * Inaipi Agent Desktop — product mock used as the homepage showcase.
 * Ported from the Claude Design file "Inaipi Agent Desktop.dc.html".
 *
 * The mock is authored at a fixed 1360×880 canvas (same as the design) and the
 * section wrapper scales it down to fit, so proportions never break on mobile.
 */

import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { OutreachView, ChatView, SurveysView, VoiceView, MentionsView } from './AgentDesktopViews';

const P = 'var(--font-poppins), Poppins, sans-serif';

export const DESIGN_W = 1360;
export const DESIGN_H = 880;

export type View = 'workspace' | 'monitoring' | 'cases' | 'survey' | 'analytics' | 'outreach' | 'chat' | 'surveys' | 'voice' | 'mentions';
type Conv = 'voice' | 'wa' | 'chat';

/* How long each view stays on screen while auto-playing */
const VIEW_ORDER: View[] = ['workspace', 'monitoring', 'cases', 'survey', 'analytics'];
const VIEW_MS: Record<View, number> = { workspace: 14000, monitoring: 10000, cases: 10000, survey: 10000, analytics: 10000, outreach: 10000, chat: 10000, surveys: 10000, voice: 10000, mentions: 10000 };

/* ── shared tokens ── */
const CARD: CSSProperties = { background: '#fff', border: '1px solid #E3EAF5', borderRadius: 16 };
const LABEL: CSSProperties = { fontSize: 10, fontWeight: 800, color: '#8FA1BE', letterSpacing: '0.6px' };

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const navStyle = (on: boolean): CSSProperties => ({
  border: 'none',
  background: on ? '#2A63F6' : 'transparent',
  color: on ? '#fff' : '#41537A',
  fontFamily: P, fontWeight: 700, fontSize: 14,
  padding: '8px 16px', borderRadius: 9, cursor: 'pointer',
  transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: on ? '0 6px 14px -6px rgba(42,99,246,.5)' : 'none',
});

const convStyle = (on: boolean): CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 8,
  border: on ? '1px solid #2A63F6' : '1px solid #E3EAF5',
  background: on ? '#fff' : '#F1F5FC',
  color: on ? '#0B1B3A' : '#5B6B87',
  fontFamily: P, fontWeight: 700, fontSize: 12.5,
  padding: '9px 15px', borderRadius: 11, cursor: 'pointer', whiteSpace: 'nowrap',
  transition: 'all 0.3s ease',
  boxShadow: on ? '0 6px 16px -10px rgba(42,99,246,.5)' : 'none',
});

const pillStyle = (on: boolean): CSSProperties => ({
  border: 'none',
  background: on ? '#0B1B3A' : 'transparent',
  color: on ? '#fff' : '#5B6B87',
  fontFamily: P, fontWeight: 800, fontSize: 12,
  padding: '8px 14px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap',
  transition: 'all 0.25s ease',
});

const viewBtnStyle = (on: boolean): CSSProperties => ({
  border: on ? '1px solid #2A63F6' : '1px solid transparent',
  background: on ? '#EAF0FE' : 'transparent',
  color: on ? '#2A63F6' : '#5B6B87',
  fontFamily: P, fontWeight: 800, fontSize: 12,
  padding: '8px 16px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap',
  transition: 'all 0.25s ease',
});

/* ── data ── */
const QUEUE = [
  { name: 'James Cooper',       channel: 'Email',    chGlyph: '✉',  chBg: '#FEF3E2', chColor: '#B7791F', preview: 'Refund request for invoice #INV-2291…', wait: '4m',   sentiment: 'Neutral',  sentColor: '#F59E0B' },
  { name: '+971 55 210 4478',   channel: 'Voice',    chGlyph: '📞', chBg: '#EAF0FE', chColor: '#2A63F6', preview: 'Billing queue · IVR path 2-1',           wait: '0:38', sentiment: '-',        sentColor: '#CBD8EC' },
  { name: 'Lena Ortiz',         channel: 'Instagram',chGlyph: '◎',  chBg: '#FDEBF3', chColor: '#DB2777', preview: 'DM: Is the blue variant back in stock?', wait: '6m',   sentiment: 'Positive', sentColor: '#16A34A' },
  { name: 'Rakesh Kumar',       channel: 'WhatsApp', chGlyph: '💬', chBg: '#E9F9EF', chColor: '#1FA855', preview: 'Sent a photo of the damaged package',    wait: '2m',   sentiment: 'Negative', sentColor: '#E5484D' },
  { name: 'Live visitor #8812', channel: 'Web Chat', chGlyph: '💬', chBg: '#EAF0FE', chColor: '#2A63F6', preview: 'Browsing pricing page for 3 min',        wait: '1m',   sentiment: '-',        sentColor: '#CBD8EC' },
  { name: 'Noura H.',           channel: 'X',        chGlyph: '𝕏',  chBg: '#F1F5FC', chColor: '#0B1B3A', preview: '@inaipi mentioned in a public post',     wait: '9m',   sentiment: 'Negative', sentColor: '#E5484D' },
];

const TRANSCRIPT = [
  { who: 'Agent',    tagBg: '#F1F5FC', tagColor: '#41537A', text: 'Thank you for calling Inaipi support, this is Mariam. How can I help you today?', time: '00:04' },
  { who: 'Customer', tagBg: '#EAF0FE', tagColor: '#2A63F6', text: 'Hi, I was charged twice for my order last Friday. AED 249, two times, same day.', time: '00:19' },
  { who: 'Agent',    tagBg: '#F1F5FC', tagColor: '#41537A', text: "I'm sorry about that, Ahmed. Let me pull up the transactions on your account right now.", time: '00:41' },
  { who: 'Customer', tagBg: '#EAF0FE', tagColor: '#2A63F6', text: "This is the second time it's happened. Honestly it's really frustrating.", time: '01:12' },
  { who: 'Agent',    tagBg: '#F1F5FC', tagColor: '#41537A', text: "I completely understand. I can see the duplicate charge. I'm issuing a full refund to your card ending 4417 right now.", time: '02:03' },
  { who: 'Customer', tagBg: '#EAF0FE', tagColor: '#2A63F6', text: "Okay, that's great. How long will the refund take to appear?", time: '03:47' },
];

type Bubble = { justify: string; bg: string; color: string; border: string; radius: string; text: string; time: string; att?: string };
const bubble = (mine: boolean, text: string, time: string, brand?: string): Bubble => ({
  justify: mine ? 'flex-end' : 'flex-start',
  bg: mine ? brand || '#2A63F6' : '#fff',
  color: mine ? '#fff' : '#22314F',
  border: mine ? 'transparent' : '#E3EAF5',
  radius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
  text, time,
});

const CHAT_THREAD: Bubble[] = [
  bubble(false, "Your bot couldn't help. I've been going in circles for 10 minutes.", '14:21'),
  bubble(true,  'Sorry about that, Priya. I have the full context from the assistant. You need to change the billing address on your subscription, correct?', '14:22'),
  bubble(false, 'Yes. And I want it applied before the next invoice.', '14:23'),
];

const mkBars = (hs: number[], color: string) => hs.map((h, i) => ({ h: `${h}%`, bg: i === hs.length - 1 ? color : '#E6EDF9' }));

const FEED_ALL = [
  { t: 'just now', glyph: '📞', bg: '#EAF0FE', color: '#2A63F6', text: 'Fatima answered a voice call from +971 50 442 8817' },
  { t: '12s ago',  glyph: '✦',  bg: '#F3EDFE', color: '#7C3AED', text: 'AI agent resolved a WhatsApp query, no handoff needed' },
  { t: '31s ago',  glyph: '⚠',  bg: '#FEF3E2', color: '#B7791F', text: 'Voice queue wait exceeded 60s, SLA warning raised' },
  { t: '1m ago',   glyph: '💬', bg: '#E9F9EF', color: '#1FA855', text: 'Jonathan accepted a 3rd concurrent WhatsApp chat' },
  { t: '2m ago',   glyph: '★',  bg: '#FEF3E2', color: '#B7791F', text: 'CSAT 5/5 received for Grace Njeri: order change' },
  { t: '3m ago',   glyph: '◎',  bg: '#FDEBF3', color: '#DB2777', text: 'Instagram DM auto-assigned to Jonathan Reyes' },
  { t: '4m ago',   glyph: '⇄',  bg: '#E7F6FD', color: '#0E7490', text: 'Priyanka picked up web chat escalated from AI with summary' },
];

const ch = (name: string, glyph: string, bg: string, color: string, count: number) => ({ name, glyph, bg, color, count });
const voice = (c: number) => ch('Voice', '📞', '#EAF0FE', '#2A63F6', c);
const wa    = (c: number) => ch('WhatsApp', '💬', '#E9F9EF', '#1FA855', c);
const mail  = (c: number) => ch('Email', '✉', '#FEF3E2', '#B7791F', c);
const soc   = (c: number) => ch('Social', '◎', '#FDEBF3', '#DB2777', c);
const aiCh  = (c: number) => ch('AI assist', '✦', '#F3EDFE', '#7C3AED', c);

const ST: Record<string, { bg: string; color: string; dot: string }> = {
  'On Call':    { bg: '#EAF0FE', color: '#2A63F6', dot: '#2A63F6' },
  'On Chat':    { bg: '#E9F9EF', color: '#1FA855', dot: '#1FA855' },
  'Available':  { bg: '#EAF6EE', color: '#166534', dot: '#16A34A' },
  'After-Call': { bg: '#FEF3E2', color: '#B7791F', dot: '#F59E0B' },
  'Break':      { bg: '#F1F5FC', color: '#5B6B87', dot: '#8FA1BE' },
};

const AV = [
  'linear-gradient(135deg,#2A63F6,#6C9BFF)',
  'linear-gradient(135deg,#0B1B3A,#41537A)',
  'linear-gradient(135deg,#7C3AED,#A78BFA)',
  'linear-gradient(135deg,#0E7490,#22D3EE)',
  'linear-gradient(135deg,#B7791F,#F0B95B)',
  'linear-gradient(135deg,#DB2777,#F472B6)',
];

const RAW_AGENTS = [
  { name: 'Fatima Zahra',   team: 'Front Office', ext: '6014', status: 'On Call',    channels: [voice(1), wa(2), aiCh(1)],   current: 'Voice · Ahmed Al Rashid', currentTime: '',      occupancy: 82, handled: 34, aht: '3:12', csat: '4.8' },
  { name: 'Mariam A.',      team: 'Billing',      ext: '6013', status: 'On Call',    channels: [voice(1), wa(1), aiCh(1)],   current: 'Voice · billing dispute', currentTime: '02:41', occupancy: 76, handled: 29, aht: '4:05', csat: '4.6' },
  { name: 'Jonathan Reyes', team: 'Sales',        ext: '2309', status: 'On Chat',    channels: [wa(3), soc(1)],              current: 'WhatsApp · 3 concurrent', currentTime: '11:05', occupancy: 64, handled: 41, aht: '2:48', csat: '4.7' },
  { name: 'Priyanka Desai', team: 'Support',      ext: '6012', status: 'On Chat',    channels: [wa(2), mail(1), aiCh(1)],    current: 'Web chat · escalation',   currentTime: '05:22', occupancy: 71, handled: 26, aht: '5:10', csat: '4.4' },
  { name: 'Omar Haddad',    team: 'Support',      ext: '6004', status: 'Available',  channels: [voice(0), wa(0)],            current: '',                        currentTime: '',      occupancy: 38, handled: 18, aht: '3:40', csat: '4.5' },
  { name: 'Grace Njeri',    team: 'Sales',        ext: '8003', status: 'After-Call', channels: [voice(1), mail(2)],          current: 'Wrap-up · order change',  currentTime: '00:48', occupancy: 57, handled: 22, aht: '3:55', csat: '5.0' },
];

const CH: Record<string, { glyph: string; bg: string; color: string }> = {
  Voice:       { glyph: '📞', bg: '#EAF0FE', color: '#2A63F6' },
  WhatsApp:    { glyph: '💬', bg: '#E9F9EF', color: '#1FA855' },
  'Web Chat':  { glyph: '🖥',  bg: '#E7F6FD', color: '#0E7490' },
  Email:       { glyph: '✉',  bg: '#FEF3E2', color: '#B7791F' },
  Instagram:   { glyph: '◎',  bg: '#FDEBF3', color: '#DB2777' },
  X:           { glyph: '𝕏',  bg: '#F1F5FC', color: '#0B1B3A' },
};
const PR: Record<string, { bg: string; color: string }> = {
  High:   { bg: '#FEF1F1', color: '#E5484D' },
  Medium: { bg: '#FEF3E2', color: '#B7791F' },
  Low:    { bg: '#F1F5FC', color: '#5B6B87' },
};
const CS: Record<string, { bg: string; color: string }> = {
  Open:          { bg: '#EAF0FE', color: '#2A63F6' },
  'In Progress': { bg: '#FEF3E2', color: '#B7791F' },
  Waiting:       { bg: '#F3EDFE', color: '#7C3AED' },
  Resolved:      { bg: '#EAF6EE', color: '#166534' },
};

const CASE_DATA = [
  { id: 'CSE-1048', customer: 'Noura H.',        channel: 'X',         subject: 'Public complaint mention on X',       prio: 'High',   status: 'Open',        sla: '0h 55m', assignee: 'Unassigned',      updated: '5m ago'   },
  { id: 'CSE-1046', customer: 'Ahmed Al Rashid', channel: 'Voice',     subject: 'Duplicate charge refund: AED 249',   prio: 'High',   status: 'In Progress', sla: '0h 41m', assignee: 'Fatima Zahra',    updated: 'just now' },
  { id: 'CSE-1041', customer: 'Sarah K.',        channel: 'WhatsApp',  subject: 'Order #1224 delayed in transit',      prio: 'High',   status: 'Open',        sla: '2h 14m', assignee: 'Priyanka Desai',  updated: '8m ago'   },
  { id: 'CSE-1044', customer: 'Priya N.',        channel: 'Web Chat',  subject: 'Service delay complaint',             prio: 'High',   status: 'Open',        sla: '1h 05m', assignee: 'Unassigned',      updated: '14m ago'  },
  { id: 'CSE-1042', customer: 'Marco R.',        channel: 'Voice',     subject: 'Billing dispute: duplicate invoice', prio: 'Medium', status: 'In Progress', sla: '4h 00m', assignee: 'Mariam A.',       updated: '22m ago'  },
  { id: 'CSE-1045', customer: 'James T.',        channel: 'Email',     subject: 'Password reset issue',                prio: 'Low',    status: 'In Progress', sla: '5h 30m', assignee: 'Omar Haddad',     updated: '38m ago'  },
  { id: 'CSE-1047', customer: 'Lena Ortiz',      channel: 'Instagram', subject: 'Stock inquiry: blue variant',        prio: 'Low',    status: 'Waiting',     sla: '6h 20m', assignee: 'Jonathan Reyes',  updated: '46m ago'  },
  { id: 'CSE-1043', customer: 'Alex L.',         channel: 'Email',     subject: 'API integration help',                prio: 'Low',    status: 'Resolved',    sla: '-',      assignee: 'Omar Haddad',     updated: '1h ago'   },
];

const slaColor = (sla: string) => (sla === '-' ? '#8FA1BE' : sla.startsWith('0h') ? '#E5484D' : parseInt(sla, 10) <= 2 ? '#B7791F' : '#41537A');
const initialsOf = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const CASE_KPIS = [
  { label: 'OPEN CASES',     value: '4',      delta: '+2 today', icon: '📥', iconBg: '#EAF0FE', color: '#2A63F6', deltaColor: '#8FA1BE' },
  { label: 'IN PROGRESS',    value: '3',      delta: '',         icon: '🔧', iconBg: '#FEF3E2', color: '#0B1B3A', deltaColor: '#8FA1BE' },
  { label: 'SLA AT RISK',    value: '2',      delta: '< 1 hour', icon: '⚠',  iconBg: '#FEF1F1', color: '#E5484D', deltaColor: '#E5484D' },
  { label: 'RESOLVED TODAY', value: '12',     delta: '+3 by AI', icon: '✓',  iconBg: '#EAF6EE', color: '#166534', deltaColor: '#7C3AED' },
  { label: 'AVG RESOLUTION', value: '4h 06m', delta: '−32m',     icon: '⏱',  iconBg: '#F3EDFE', color: '#0B1B3A', deltaColor: '#16A34A' },
];

const AN_KPIS = [
  { label: 'TOTAL INTERACTIONS', value: '1,842', delta: '+14% wk',   color: '#0B1B3A', deltaColor: '#16A34A', icon: '🔁', iconBg: '#EAF0FE' },
  { label: 'FIRST CONTACT RES.', value: '81%',   delta: '+3%',       color: '#0B1B3A', deltaColor: '#16A34A', icon: '🎯', iconBg: '#E9F9EF' },
  { label: 'AVG HANDLE TIME',    value: '3:38',  delta: '−0:22',     color: '#0B1B3A', deltaColor: '#16A34A', icon: '⏱',  iconBg: '#FEF3E2' },
  { label: 'SLA COMPLIANCE',     value: '94%',   delta: 'target 90%',color: '#16A34A', deltaColor: '#8FA1BE', icon: '✓',  iconBg: '#EAF6EE' },
  { label: 'AI CONTAINMENT',     value: '68%',   delta: '+9%',       color: '#7C3AED', deltaColor: '#16A34A', icon: '✦',  iconBg: '#F3EDFE' },
];

const HOURLY_RAW: [number, number, string][] = [
  [22, 8, '8a'], [38, 14, '9a'], [52, 20, '10a'], [61, 26, '11a'], [55, 30, '12p'], [44, 28, '1p'],
  [58, 32, '2p'], [66, 35, '3p'], [70, 38, '4p'], [54, 30, '5p'], [36, 22, '6p'], [24, 16, '7p'],
];
const HOURLY = HOURLY_RAW.map(([h, a, label]) => ({ human: `${Math.round((h / 108) * 100)}%`, ai: `${Math.round((a / 108) * 100)}%`, label }));

const MIX = [
  { name: 'Voice',    glyph: '📞', color: '#2A63F6', count: 512, pct: '28%' },
  { name: 'WhatsApp', glyph: '💬', color: '#1FA855', count: 460, pct: '25%' },
  { name: 'Web Chat', glyph: '🖥',  color: '#0E7490', count: 331, pct: '18%' },
  { name: 'Email',    glyph: '✉',  color: '#B7791F', count: 258, pct: '14%' },
  { name: 'Social',   glyph: '◎',  color: '#DB2777', count: 165, pct: '9%'  },
  { name: 'SMS',      glyph: '✆',  color: '#41537A', count: 116, pct: '6%'  },
];

const LEADERS = [
  { rank: '1', rankColor: '#B7791F', name: 'Jonathan Reyes', handled: 41, aht: '2:48', csat: '4.7', initials: 'JR', bg: AV[2] },
  { rank: '2', rankColor: '#8FA1BE', name: 'Fatima Zahra',   handled: 34, aht: '3:12', csat: '4.8', initials: 'FZ', bg: AV[0] },
  { rank: '3', rankColor: '#8FA1BE', name: 'Mariam A.',      handled: 29, aht: '4:05', csat: '4.6', initials: 'MA', bg: AV[1] },
  { rank: '4', rankColor: '#8FA1BE', name: 'Priyanka Desai', handled: 26, aht: '5:10', csat: '4.4', initials: 'PD', bg: AV[3] },
  { rank: '5', rankColor: '#8FA1BE', name: 'Grace Njeri',    handled: 22, aht: '3:55', csat: '5.0', initials: 'GN', bg: AV[4] },
];

const CSAT_TREND = ([['Mon', 4.2], ['Tue', 4.5], ['Wed', 4.4], ['Thu', 4.7], ['Fri', 4.6], ['Sat', 4.8], ['Sun', 4.6]] as [string, number][])
  .map(([label, v]) => ({ label, val: v.toFixed(1), h: `${Math.round(((v - 3.5) / 1.5) * 100)}%`, color: v >= 4.5 ? '#16A34A' : '#F59E0B' }));

/* ── Survey view — static rows ── */
const SV_QUESTIONS: [string, number, string][] = [
  ['How satisfied were you with the resolution?', 4.6, '#16A34A'],
  ['Was your issue resolved on the first contact?', 4.3, '#2A63F6'],
  ['How easy was it to reach an agent?', 3.9, '#F59E0B'],
  ["How would you rate the agent's knowledge?", 4.7, '#16A34A'],
  ['How helpful was the AI assistant before the agent?', 4.1, '#7C3AED'],
];
const SV_RESPONSES = [
  { name: 'Ahmed Al Rashid', chGlyph: '📞', chBg: '#EAF0FE', chColor: '#2A63F6', score: 5, comment: 'Refund handled on the call, no repeating myself. Exactly what I needed.' },
  { name: 'Sarah Mitchell',  chGlyph: '💬', chBg: '#E9F9EF', chColor: '#1FA855', score: 4, comment: 'Fast reply on WhatsApp, tracking link arrived as promised.' },
  { name: 'Priya Nair',      chGlyph: '💬', chBg: '#EAF0FE', chColor: '#2A63F6', score: 2, comment: 'The bot looped me for ten minutes before I got a person.' },
  { name: 'James Cooper',    chGlyph: '✉', chBg: '#FEF3E2', chColor: '#B7791F', score: 5, comment: 'Invoice corrected same day. Clear, polite follow-up email.' },
  { name: 'Lena Ortiz',      chGlyph: '◎', chBg: '#FDEBF3', chColor: '#DB2777', score: 3, comment: 'Answer was right but I waited two hours for the DM reply.' },
];
const SV_FOLLOWUPS = [
  { score: '2/5', name: 'Priya Nair',  reason: 'Web chat · bot handover complaint' },
  { score: '1/5', name: 'Marco R.',    reason: 'Voice · duplicate invoice, unresolved' },
  { score: '3/5', name: 'Lena Ortiz',  reason: 'Instagram · slow DM response' },
];

/* ═══════════════════════════════════════════ */

export default function AgentDesktopUI({ playing = true, fixedView }: { playing?: boolean; fixedView?: View }) {
  const [view, setView]   = useState<View>(fixedView ?? 'workspace');
  const [conv, setConv]   = useState<Conv>('voice');
  const [secs, setSecs]   = useState(272);
  const [tick, setTick]   = useState(0);
  const [caseView, setCaseView]         = useState<'table' | 'board'>('table');
  const [statusFilter, setStatusFilter] = useState('All');
  const [prioFilter, setPrioFilter]     = useState('All');
  const [range, setRange]               = useState('7 days');
  const [openCase, setOpenCase]         = useState<string | null>(null);

  /* Manual interaction pauses the auto-tour so the visitor stays in control. */
  const [manual, setManual] = useState(false);

  /* Clocks — only while the section is on screen. */
  useEffect(() => {
    if (!playing) return;
    const a = setInterval(() => setSecs(s => s + 1), 1000);
    const b = setInterval(() => setTick(t => t + 1), 2000);
    return () => { clearInterval(a); clearInterval(b); };
  }, [playing]);

  /* Auto-tour across the four views (skipped when locked to a fixed view). */
  useEffect(() => {
    if (!playing || manual || fixedView) return;
    const id = setTimeout(() => {
      setView(v => VIEW_ORDER[(VIEW_ORDER.indexOf(v) + 1) % VIEW_ORDER.length]);
      setOpenCase(null);
    }, VIEW_MS[view]);
    return () => clearTimeout(id);
  }, [playing, manual, view, fixedView]);

  /* Inside the workspace, rotate through the three live conversations. */
  useEffect(() => {
    if (!playing || manual || view !== 'workspace') return;
    const order: Conv[] = ['voice', 'wa', 'chat'];
    const id = setInterval(() => setConv(c => order[(order.indexOf(c) + 1) % order.length]), 4600);
    return () => clearInterval(id);
  }, [playing, manual, view]);

  /* Inside cases, flip table → board so both layouts get seen. */
  useEffect(() => {
    if (!playing || manual || view !== 'cases') { return; }
    setCaseView('table');
    const id = setTimeout(() => setCaseView('board'), 5200);
    return () => clearTimeout(id);
  }, [playing, manual, view]);

  /* ── derived, tick-driven ── */
  const rQ = tick % QUEUE.length;
  const queueVis      = useMemo(() => QUEUE.slice(rQ).concat(QUEUE.slice(0, rQ)), [rQ]);
  const transcriptVis = TRANSCRIPT.slice(0, 3 + (tick % (TRANSCRIPT.length - 2)));
  const sentPos       = `${62 + Math.round(14 * Math.sin(tick / 2))}%`;
  const rF = tick % FEED_ALL.length;
  const feed = useMemo(() => FEED_ALL.slice(rF).concat(FEED_ALL.slice(0, rF)).map((e, i) => ({ ...e, rowBg: i === 0 ? '#F3F7FE' : 'transparent' })), [rF]);

  const waThread: Bubble[] = [
    bubble(false, 'Hi! Where is my order #4521? It said delivery by Friday.', '12:02'),
    { ...bubble(false, "Here's my order confirmation 👇", '12:02'), att: 'order_confirmation_4521.pdf' },
    bubble(true, 'Hi Sarah! Let me check that for you right away 👋', '12:03', '#1FA855'),
    bubble(false, 'Thanks 🙏 I need it before the weekend.', '12:03'),
    bubble(true, "It left our warehouse this morning. You'll get a tracking link within the hour.", '12:05', '#1FA855'),
  ];

  const kpis = [
    { label: 'ACTIVE AGENTS',      value: '7/9',                              delta: '',        color: '#0B1B3A', deltaColor: '#16A34A', icon: '👥', iconBg: '#EAF0FE', bars: mkBars([45, 60, 55, 70, 60, 75, 70, 78], '#2A63F6') },
    { label: 'INTERACTIONS TODAY', value: String(247 + Math.floor(tick / 4)), delta: '+12%',    color: '#0B1B3A', deltaColor: '#16A34A', icon: '🔁', iconBg: '#E9F9EF', bars: mkBars([30, 42, 38, 55, 62, 58, 74, 88], '#1FA855') },
    { label: 'IN QUEUE',           value: '6',                                delta: '2 voice', color: '#2A63F6', deltaColor: '#8FA1BE', icon: '⏳', iconBg: '#EAF0FE', bars: mkBars([70, 55, 62, 40, 48, 35, 42, 50], '#2A63F6') },
    { label: 'AVG HANDLE TIME',    value: '3:42',                             delta: '−0:18',   color: '#0B1B3A', deltaColor: '#16A34A', icon: '⏱',  iconBg: '#FEF3E2', bars: mkBars([80, 74, 70, 66, 60, 58, 52, 46], '#B7791F') },
    { label: 'AI CONTAINMENT',     value: '68%',                              delta: '+5%',     color: '#7C3AED', deltaColor: '#16A34A', icon: '✦',  iconBg: '#F3EDFE', bars: mkBars([38, 44, 50, 55, 58, 62, 65, 68], '#7C3AED') },
    { label: 'CSAT TODAY',         value: '4.6',                              delta: 'of 5',    color: '#0B1B3A', deltaColor: '#8FA1BE', icon: '★',  iconBg: '#FEF3E2', bars: mkBars([76, 80, 78, 84, 82, 88, 86, 92], '#F59E0B') },
  ];

  const agents = RAW_AGENTS
    .filter(a => statusFilter === 'All' || a.status === statusFilter)
    .map((a, i) => {
      const st = ST[a.status];
      return {
        ...a,
        currentTime: a.name === 'Fatima Zahra' ? fmt(secs) : a.currentTime,
        initials: initialsOf(a.name),
        avatarBg: AV[i % AV.length],
        statusBg: st.bg, statusColor: st.color, dotColor: st.dot,
        occWidth: `${a.occupancy}%`,
        occColor: a.occupancy > 75 ? '#E5484D' : a.occupancy > 55 ? '#2A63F6' : '#16A34A',
      };
    });

  const deco = (c: (typeof CASE_DATA)[number]) => ({
    ...c,
    initials: initialsOf(c.customer),
    chGlyph: CH[c.channel].glyph, chBg: CH[c.channel].bg, chColor: CH[c.channel].color,
    prioBg: PR[c.prio].bg, prioColor: PR[c.prio].color,
    statusBg: CS[c.status].bg, statusColor: CS[c.status].color,
    slaColor: slaColor(c.sla),
  });
  const caseRows  = CASE_DATA.filter(c => prioFilter === 'All' || c.prio === prioFilter).map(deco);
  const boardCols = (['Open', 'In Progress', 'Waiting', 'Resolved'] as const).map(st => ({
    name: st, dot: CS[st].color,
    cases: caseRows.filter(c => c.status === st),
    count: caseRows.filter(c => c.status === st).length,
  }));

  const ac0 = CASE_DATA.find(c => c.id === openCase);
  const activeCase = ac0 && {
    ...deco(ac0),
    aiSummary: ac0.id === 'CSE-1046'
      ? 'Customer charged twice (AED 249) on Jul 17. Duplicate verified in billing system during live call. Refund initiated to card •••• 4417; ETA 3–5 business days. Goodwill expedited shipping offered on order #7789.'
      : `AI classified this case from the originating ${ac0.channel} interaction. Suggested category and priority applied automatically; full conversation context and customer history are attached.`,
    timeline: [
      { t: '09:12', text: `Case auto-created from ${ac0.channel} interaction` },
      { t: '09:12', text: `AI classified · priority ${ac0.prio} · SLA timer started` },
      { t: '09:15', text: ac0.assignee === 'Unassigned' ? `Routing: awaiting assignment (skill: ${ac0.channel})` : `Assigned to ${ac0.assignee} via skill-based routing` },
      { t: '10:02', text: `Customer notified via ${ac0.channel}` },
    ],
  };

  const timer = fmt(secs);

  /* ── Survey — tick-driven data ── */
  const T = tick;
  const wob = (b: number, a: number, p: number) => b + Math.round(a * Math.sin(T / 3 + p));
  const svKpis = [
    { label: 'RESPONSES TODAY', value: String(318 + T * 2),                delta: `+${4 + (T % 5)} live`, icon: '📝', iconBg: '#EAF0FE', color: '#0B1B3A', deltaColor: '#16A34A' },
    { label: 'RESPONSE RATE',   value: `${wob(46, 3, 0)}%`,               delta: '+2.4%',                icon: '📈', iconBg: '#E9F9EF', color: '#0B1B3A', deltaColor: '#16A34A' },
    { label: 'AVG CSAT',        value: (4.4 + 0.1 * Math.sin(T / 4)).toFixed(2), delta: 'of 5',          icon: '★',  iconBg: '#FEF3E2', color: '#0B1B3A', deltaColor: '#8FA1BE' },
    { label: 'NPS',             value: `+${wob(52, 3, 1.2)}`,             delta: '+6 wk',                icon: '◎',  iconBg: '#F3EDFE', color: '#7C3AED', deltaColor: '#16A34A' },
    { label: 'DETRACTORS',      value: String(wob(11, 2, 2.1)),          delta: 'follow-up due',        icon: '⚠',  iconBg: '#FEF1F1', color: '#E5484D', deltaColor: '#E5484D' },
  ];
  const npsScore = `+${wob(52, 3, 1.2)}`;
  const _pro = wob(64, 3, 0), _det = wob(12, 2, 2.1), _pas = 100 - _pro - _det;
  const npsBands = [
    { label: 'Promoters',  pct: `${_pro}%`, count: Math.round(_pro * 12.4), color: '#16A34A' },
    { label: 'Passives',   pct: `${_pas}%`, count: Math.round(_pas * 12.4), color: '#F59E0B' },
    { label: 'Detractors', pct: `${_det}%`, count: Math.round(_det * 12.4), color: '#E5484D' },
  ];
  const svCampaigns = [
    { name: 'Post-call CSAT (IVR)',   channel: 'Voice',    icon: '📞', bg: '#EAF0FE', color: '#2A63F6', sent: 640 + T, responses: 291 + T,       rate: `${wob(45, 2, 0)}%`, rateColor: '#2A63F6', score: (4.5 + 0.05 * Math.sin(T / 5)).toFixed(1) },
    { name: 'WhatsApp quick rating',  channel: 'WhatsApp', icon: '💬', bg: '#E9F9EF', color: '#1FA855', sent: 512 + T, responses: 318 + T,       rate: `${wob(62, 2, 1)}%`, rateColor: '#1FA855', score: (4.6 + 0.05 * Math.sin(T / 6)).toFixed(1) },
    { name: 'Web chat CES',           channel: 'Web Chat', icon: '💬', bg: '#EAF0FE', color: '#2A63F6', sent: 288,     responses: 121 + (T % 4), rate: `${wob(42, 2, 2)}%`, rateColor: '#2A63F6', score: (4.2 + 0.05 * Math.sin(T / 4)).toFixed(1) },
    { name: 'Email NPS (monthly)',    channel: 'Email',    icon: '✉', bg: '#FEF3E2', color: '#B7791F', sent: 1204,    responses: 402 + (T % 3), rate: `${wob(33, 2, 3)}%`, rateColor: '#B7791F', score: (4.1 + 0.05 * Math.sin(T / 7)).toFixed(1) },
  ];
  const svQuestions = SV_QUESTIONS.map(([text, base, color], i) => {
    const v = Math.min(5, Math.max(3.2, base + 0.08 * Math.sin(T / 4 + i)));
    return { text, score: v.toFixed(1), pct: `${Math.round((v / 5) * 100)}%`, color };
  });
  const _svk = T % SV_RESPONSES.length;
  const svResponses = SV_RESPONSES.slice(_svk).concat(SV_RESPONSES.slice(0, _svk)).map((r, i) => ({
    ...r,
    stars: '★'.repeat(r.score) + '☆'.repeat(5 - r.score),
    scoreColor: r.score >= 4 ? '#16A34A' : r.score === 3 ? '#F59E0B' : '#E5484D',
    ago: i === 0 ? 'just now' : `${i * 3 + (secs % 60 < 30 ? 1 : 2)}m ago`,
  }));
  const svThemes = [
    { name: 'Refund speed',    mentions: 84 + T,       trend: '↗ +12%', color: '#16A34A' },
    { name: 'Delivery timing', mentions: 61 + (T % 5), trend: '↘ −8%',  color: '#E5484D' },
    { name: 'Agent knowledge', mentions: 57 + (T % 3), trend: '↗ +5%',  color: '#16A34A' },
    { name: 'Bot handover',    mentions: 43 + (T % 4), trend: '↘ −3%',  color: '#F59E0B' },
  ];
  const svFollowUpCount = wob(6, 2, 1.4);
  const svRanges = ['24h', '7 days', '30 days'];

  return (
    <div
      style={{
        width: DESIGN_W, height: DESIGN_H, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        fontFamily: P, color: '#0B1B3A',
        background: 'linear-gradient(180deg,#E9EFF9 0%,#F2F6FC 100%)',
      }}
    >
      {/* ══════════ TOP BAR ══════════ */}
      <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #E3EAF5', display: 'flex', alignItems: 'center', gap: 24, padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 150 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="inaipi" style={{ height: 34, display: 'block' }} />
        </div>
        <nav style={{ display: 'flex', gap: 6, background: '#F1F5FC', padding: 5, borderRadius: 12 }}>
          <button onClick={() => { setManual(true); setView('workspace'); }} style={navStyle(view === 'workspace')}>Agent Workspace</button>
          <button onClick={() => { setManual(true); setView('monitoring'); }} style={navStyle(view === 'monitoring')}>Monitoring</button>
          <button onClick={() => { setManual(true); setView('cases'); }} style={navStyle(view === 'cases')}>Cases</button>
          <button onClick={() => { setManual(true); setView('survey'); }} style={navStyle(view === 'survey' || view === 'surveys')}>Survey</button>
          <button onClick={() => { setManual(true); setView('analytics'); }} style={navStyle(view === 'analytics')}>Analytics</button>
          {view === 'outreach' && <button style={navStyle(true)}>Outreach</button>}
          {view === 'chat' && <button style={navStyle(true)}>AI Chat</button>}
          {view === 'voice' && <button style={navStyle(true)}>AI Voice</button>}
          {view === 'mentions' && <button style={navStyle(true)}>Mentions</button>}
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EAF6EE', border: '1px solid #CBEBD6', borderRadius: 999, padding: '6px 14px 6px 8px' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#16A34A', marginLeft: 4 }} />
          <span style={{ fontWeight: 700, fontSize: 13, color: '#166534' }}>Available</span>
          <span style={{ color: '#8FA1BE', fontSize: 12 }}>·</span>
          <span style={{ fontWeight: 700, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{timer}</span>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid #E3EAF5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#41537A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span style={{ position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#E5484D', border: '2px solid #fff' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#2A63F6,#6C9BFF)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>MA</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>Mariam A.</div>
            <div style={{ fontSize: 11, color: '#5B6B87', fontWeight: 600 }}>Ext 6013</div>
          </div>
        </div>
      </header>

      {/* ══════════ AGENT WORKSPACE ══════════ */}
      {view === 'workspace' && (
        <div key="workspace" className="ad-rise" style={{ flex: 1, display: 'grid', gridTemplateColumns: '318px 1fr 344px', gap: 14, padding: 14, minHeight: 0 }}>

          {/* Left — omnichannel queue */}
          <aside style={{ ...CARD, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ padding: '16px 16px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>Interaction Queue</div>
                <span style={{ background: '#EAF0FE', color: '#2A63F6', fontWeight: 800, fontSize: 12, padding: '3px 9px', borderRadius: 999 }}>6 waiting</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                {['All', 'Voice', 'Chat', 'Social', 'AI'].map((f, i) => (
                  <span key={f} style={{ padding: '5px 11px', borderRadius: 999, background: i === 0 ? '#2A63F6' : '#F1F5FC', color: i === 0 ? '#fff' : '#41537A', fontWeight: 700, fontSize: 12 }}>{f}</span>
                ))}
              </div>
            </div>
            <div className="ad-scroll" style={{ flex: 1, overflowY: 'auto', padding: '6px 10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {queueVis.map((q, i) => (
                <div key={q.name} className="ad-queue ad-slide" style={{ animationDelay: `${i * 45}ms`, border: '1px solid #EDF2FA', borderRadius: 12, padding: '11px 12px', display: 'flex', gap: 10, cursor: 'pointer', background: '#fff', transition: 'background 0.2s ease, border-color 0.2s ease' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: q.chBg, color: q.chColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, fontWeight: 800 }}>{q.chGlyph}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#8FA1BE', flexShrink: 0 }}>{q.wait}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#5B6B87', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{q.preview}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: q.chColor, background: q.chBg, padding: '2px 8px', borderRadius: 999 }}>{q.channel}</span>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: q.sentColor }} />
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: '#8FA1BE' }}>{q.sentiment}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ border: '1px dashed #C7D8F9', borderRadius: 12, padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 10, background: '#F7FAFF' }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: '#F3EDFE', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✦</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#7C3AED' }}>AI Virtual Agent</div>
                  <div style={{ fontSize: 11.5, color: '#5B6B87', fontWeight: 600 }}>Handling 12 conversations · 68% contained</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center — active interaction */}
          <main style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, gap: 10 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setManual(true); setConv('voice'); }} style={convStyle(conv === 'voice')}>
                <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
                Ahmed Al Rashid · Voice <b style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{timer}</b>
              </button>
              <button onClick={() => { setManual(true); setConv('wa'); }} style={convStyle(conv === 'wa')}>Sarah Mitchell · WhatsApp</button>
              <button onClick={() => { setManual(true); setConv('chat'); }} style={convStyle(conv === 'chat')}>Priya Nair · Web Chat</button>
            </div>

            {/* VOICE */}
            {conv === 'voice' && (
              <div key="voice" className="ad-rise" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
                <div style={{ background: 'linear-gradient(120deg,#1E4FD0 0%,#2A63F6 55%,#4C82FF 100%)', borderRadius: 16, padding: '18px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 12px 28px -14px rgba(42,99,246,.55)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, border: '2px solid rgba(255,255,255,.4)' }}>AR</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 17 }}>Ahmed Al Rashid</div>
                    <div style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 600 }}>+971 50 442 8817 · Billing queue · Gold tier</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, marginLeft: 10 }}>
                    {[0, 0.15, 0.3, 0.45, 0.6].map(d => (
                      <span key={d} className="ad-wave" style={{ width: 4, height: '100%', background: 'rgba(255,255,255,.85)', borderRadius: 2, animationDelay: `${d}s` }} />
                    ))}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 22, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px' }}>{timer}</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🎙</span>
                    <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>II</span>
                    <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⇄</span>
                    <span style={{ height: 42, padding: '0 20px', borderRadius: 999, background: '#E5484D', display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: 13 }}>End</span>
                  </div>
                </div>

                <div style={{ ...CARD, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '13px 18px', borderBottom: '1px solid #EDF2FA', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5484D', animationDuration: '1.2s' }} />
                    <span style={{ fontWeight: 800, fontSize: 14 }}>Live Transcription</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: '#8FA1BE' }}>English · auto-detected</span>
                    <div style={{ flex: 1 }} />
                    <span style={{ background: '#F3EDFE', color: '#7C3AED', fontWeight: 800, fontSize: 11.5, padding: '4px 10px', borderRadius: 999 }}>✦ Intent: Billing dispute</span>
                  </div>
                  <div className="ad-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {transcriptVis.map(t => (
                      <div key={t.time} className="ad-rise" style={{ display: 'flex', gap: 12 }}>
                        <span style={{ flexShrink: 0, marginTop: 1, fontSize: 10.5, fontWeight: 800, padding: '3px 9px', borderRadius: 999, background: t.tagBg, color: t.tagColor, height: 'fit-content' }}>{t.who}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#22314F' }}>{t.text}</div>
                          <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700, marginTop: 3 }}>{t.time}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 12, opacity: 0.6 }}>
                      <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 800, padding: '3px 9px', borderRadius: 999, background: '#EAF0FE', color: '#2A63F6', height: 'fit-content' }}>Customer</span>
                      <div style={{ fontSize: 13.5, color: '#22314F' }}>speaking<span className="ad-pulse" style={{ animationDuration: '1s' }}>…</span></div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 18px', borderTop: '1px solid #EDF2FA', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1, border: '1px solid #E3EAF5', borderRadius: 11, padding: '11px 14px', fontSize: 13, background: '#F7FAFF', color: '#8FA1BE' }}>Add a note to this interaction…</div>
                    <span style={{ background: '#0B1B3A', color: '#fff', fontWeight: 800, fontSize: 13, padding: '11px 18px', borderRadius: 11 }}>Save note</span>
                  </div>
                </div>
              </div>
            )}

            {/* WHATSAPP */}
            {conv === 'wa' && (
              <Thread
                key="wa"
                initials="SM" avatarBg="#E9F9EF" avatarColor="#1FA855"
                name="Sarah Mitchell" sub="WhatsApp · online" subColor="#1FA855"
                sentimentDot="#F59E0B" sentiment="Neutral sentiment"
                messages={waThread} accent="#1FA855" placeholder="Reply on WhatsApp…"
                suggestions={['✦ Your order #4521 ships today: tracking link incoming', '✦ Offer 10% voucher for the delay']}
              />
            )}

            {/* WEB CHAT */}
            {conv === 'chat' && (
              <Thread
                key="chat"
                initials="PN" avatarBg="#EAF0FE" avatarColor="#2A63F6"
                name="Priya Nair" sub="Web Chat · escalated from AI agent" subColor="#2A63F6"
                sentimentDot="#E5484D" sentiment="Negative sentiment"
                messages={CHAT_THREAD} accent="#2A63F6" placeholder="Reply in chat…"
                banner="✦ AI agent handled 4 turns · handed off with summary"
              />
            )}
          </main>

          {/* Right — customer 360 + AI copilot */}
          <aside className="ad-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
            <div style={{ ...CARD, padding: 16, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#0B1B3A,#41537A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>AR</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>Ahmed Al Rashid</div>
                  <div style={{ fontSize: 11.5, color: '#5B6B87', fontWeight: 700 }}>Customer since 2021 · <span style={{ color: '#B7791F' }}>★ Gold</span></div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
                {[['23', 'ORDERS'], ['4.8', 'CSAT'], ['7', 'CONTACTS']].map(([v, l]) => (
                  <div key={l} style={{ background: '#F7FAFF', borderRadius: 11, padding: '9px 10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{v}</div>
                    <div style={{ ...LABEL, letterSpacing: '0.4px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...CARD, padding: 16, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Live Sentiment</div>
                <span style={{ background: '#EAF6EE', color: '#166534', fontWeight: 800, fontSize: 11.5, padding: '3px 10px', borderRadius: 999 }}>Improving ↗</span>
              </div>
              <div style={{ marginTop: 14, height: 10, borderRadius: 999, background: 'linear-gradient(90deg,#E5484D,#F59E0B,#16A34A)', position: 'relative' }}>
                <span style={{ position: 'absolute', left: sentPos, top: '50%', transition: 'left 1.2s ease', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '4px solid #0B1B3A' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, fontWeight: 800, color: '#8FA1BE' }}>
                <span>Negative</span><span>Neutral</span><span>Positive</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: '#5B6B87', fontWeight: 600, lineHeight: 1.5 }}>
                Frustration detected at 01:12 over duplicate charge, recovered after refund was confirmed.
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #DCCEFB', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ background: 'linear-gradient(120deg,#6D28D9,#8B5CF6)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#fff', fontSize: 15 }}>✦</span>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>AI Copilot</span>
                <div style={{ flex: 1 }} />
                <span className="ad-pulse" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: 10.5, fontWeight: 800, padding: '3px 9px', borderRadius: 999 }}>LIVE</span>
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ ...LABEL, fontSize: 11, letterSpacing: '0.5px' }}>NEXT BEST ACTION</div>
                <div style={{ border: '1px solid #EDE6FD', background: '#FBFAFF', borderRadius: 12, padding: '11px 13px', fontSize: 12.5, lineHeight: 1.55, color: '#22314F' }}>
                  <b>Confirm refund of AED 249</b> to card ending 4417, duplicate charge verified in billing system. Expected in 3–5 business days.
                </div>
                <div style={{ border: '1px solid #EDE6FD', background: '#FBFAFF', borderRadius: 12, padding: '11px 13px', fontSize: 12.5, lineHeight: 1.55, color: '#22314F' }}>
                  Offer <b>free expedited shipping</b> on his pending order #7789 as a goodwill gesture.
                </div>
                <div style={{ ...LABEL, fontSize: 11, letterSpacing: '0.5px', marginTop: 2 }}>KNOWLEDGE</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px solid #EDF2FA', borderRadius: 12, padding: '10px 13px', fontSize: 12.5, fontWeight: 700, color: '#2A63F6' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: '#EAF0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>📄</span>
                  Refund policy: duplicate transactions
                </div>
                <div style={{ background: '#6D28D9', color: '#fff', fontWeight: 800, fontSize: 13, padding: 12, borderRadius: 11, marginTop: 2, textAlign: 'center' }}>✦ Generate wrap-up summary</div>
              </div>
            </div>

            <div style={{ ...CARD, padding: 16, flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Recent Journey</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { g: '💬', bg: '#E9F9EF', c: '#1FA855', t: 'WhatsApp: delivery query', s: 'Resolved by AI · 2 days ago' },
                  { g: '📞', bg: '#EAF0FE', c: '#2A63F6', t: 'Voice: payment issue',     s: 'Resolved · CSAT 5 · last week' },
                  { g: '✉️', bg: '#FEF3E2', c: '#B7791F', t: 'Email: invoice request',   s: 'Resolved · 3 weeks ago' },
                ].map(j => (
                  <div key={j.t} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: j.bg, color: j.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{j.g}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5 }}>{j.t}</div>
                      <div style={{ fontSize: 11, color: '#8FA1BE', fontWeight: 700 }}>{j.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ══════════ MONITORING ══════════ */}
      {view === 'monitoring' && (
        <div key="monitoring" className="ad-rise ad-scroll" style={{ flex: 1, padding: '18px 22px 28px', width: '100%', minHeight: 0, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,#1E4FD0,#4C82FF)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 10px 22px -10px rgba(42,99,246,.6)' }}>📡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 21, letterSpacing: '-0.3px' }}>Interaction Monitoring Center</div>
              <div style={{ fontSize: 12.5, color: '#5B6B87', fontWeight: 600 }}>Real-time omnichannel supervision across voice, chat, social &amp; AI</div>
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E3EAF5', borderRadius: 999, padding: '8px 15px', fontWeight: 800, fontSize: 12.5 }}>
              <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />Live · refreshing every 2s
            </span>
            <span style={{ background: '#EAF0FE', color: '#2A63F6', borderRadius: 999, padding: '9px 15px', fontWeight: 800, fontSize: 12.5 }}>7 Human</span>
            <span style={{ background: '#F3EDFE', color: '#7C3AED', borderRadius: 999, padding: '9px 15px', fontWeight: 800, fontSize: 12.5 }}>✦ 3 AI</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 10 }}>
            {kpis.map(k => (
              <div key={k.label} className="ad-lift" style={{ ...CARD, borderRadius: 15, padding: '14px 15px 12px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{k.icon}</span>
                  <span style={LABEL}>{k.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 9 }}>
                  <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.5px', color: k.color }}>{k.value}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: k.deltaColor }}>{k.delta}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, marginTop: 10 }}>
                  {k.bars.map((b, i) => <span key={i} style={{ flex: 1, height: b.h, background: b.bg, borderRadius: '3px 3px 0 0', transition: 'height 0.8s ease' }} />)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, ...CARD, borderRadius: 12, padding: '0 14px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FA1BE" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ flex: 1, fontSize: 13.5, padding: '12px 0', color: '#8FA1BE' }}>Search agents, teams or extensions…</span>
            </div>
            <div style={{ display: 'flex', gap: 6, ...CARD, borderRadius: 12, padding: 5, flexShrink: 0 }}>
              {['All', 'On Call', 'On Chat', 'Available', 'Break'].map(f => (
                <button key={f} onClick={() => { setManual(true); setStatusFilter(f); }} style={pillStyle(statusFilter === f)}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 308px', gap: 14, alignItems: 'start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {agents.map((a, i) => (
                <div key={a.name} className="ad-lift ad-rise" style={{ animationDelay: `${i * 60}ms`, background: '#fff', border: '1px solid #E8EEF8', borderTop: `3px solid ${a.dotColor}`, borderRadius: 16, padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: a.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0, boxShadow: `0 0 0 2px #fff,0 0 0 4px ${a.dotColor}` }}>{a.initials}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: '#8FA1BE', fontWeight: 700 }}>{a.team} · Ext {a.ext}</div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: a.statusBg, color: a.statusColor, whiteSpace: 'nowrap' }}>{a.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {a.channels.map(c => (
                      <span key={c.name} title={c.name} style={{ display: 'flex', alignItems: 'center', gap: 5, background: c.bg, color: c.color, fontSize: 11, fontWeight: 800, padding: '4px 9px', borderRadius: 8 }}>{c.glyph} {c.count}</span>
                    ))}
                  </div>
                  {a.current && (
                    <div style={{ background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 11, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="ad-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#22314F', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.current}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{a.currentTime}</span>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                    {[[a.handled, 'HANDLED'], [a.aht, 'AHT'], [a.csat, 'CSAT']].map(([v, l]) => (
                      <div key={l} style={{ background: '#F7FAFF', borderRadius: 9, padding: '7px 4px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 800, fontSize: 13 }}>{v}</div>
                        <div style={{ fontSize: 9, fontWeight: 800, color: '#8FA1BE', letterSpacing: '0.4px' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 800, color: '#8FA1BE', marginBottom: 5 }}>
                      <span>OCCUPANCY</span><span style={{ color: '#41537A' }}>{a.occupancy}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: '#EDF2FA', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: a.occWidth, borderRadius: 999, background: a.occColor, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, borderTop: '1px solid #EDF2FA', paddingTop: 10 }}>
                    {[['👁 Listen', '#41537A', '#E3EAF5'], ['Whisper', '#41537A', '#E3EAF5'], ['Barge', '#E5484D', '#FBD9DA']].map(([l, c, b]) => (
                      <span key={l} style={{ flex: 1, border: `1px solid ${b}`, color: c, fontWeight: 800, fontSize: 11, padding: '7px 0', borderRadius: 9, textAlign: 'center' }}>{l}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'linear-gradient(120deg,#FFF7EA,#FFFDF8)', border: '1px solid #F5DFB8', borderRadius: 15, padding: '13px 15px', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: '#FEF3E2', color: '#B7791F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>⚠</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 12.5, color: '#92640D' }}>SLA warning: Voice queue</div>
                  <div style={{ fontSize: 11.5, color: '#A97F2E', fontWeight: 600 }}>Longest wait 1:12 · target is 0:60</div>
                </div>
              </div>
              <div style={{ ...CARD, overflow: 'hidden' }}>
                <div style={{ padding: '13px 16px', borderBottom: '1px solid #EDF2FA', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#2A63F6' }} />
                  <span style={{ fontWeight: 800, fontSize: 13.5 }}>Live Activity</span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: '#8FA1BE' }}>AUTO</span>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {feed.map((e, i) => (
                    <div key={e.text} className="ad-slide" style={{ animationDelay: `${i * 40}ms`, display: 'flex', gap: 10, padding: '8px 9px', borderRadius: 11, background: e.rowBg, transition: 'background 0.4s ease' }}>
                      <span style={{ width: 28, height: 28, borderRadius: 9, background: e.bg, color: e.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{e.glyph}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#22314F', lineHeight: 1.45 }}>{e.text}</div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#8FA1BE', marginTop: 2 }}>{e.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ══════════ CASES ══════════ */}
      {view === 'cases' && (
        <div key="cases" className="ad-rise ad-scroll" style={{ flex: 1, padding: '18px 22px 28px', width: '100%', minHeight: 0, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,#0B1B3A,#41537A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🗂</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 21, letterSpacing: '-0.3px' }}>Case &amp; Ticket Management</div>
              <div style={{ fontSize: 12.5, color: '#5B6B87', fontWeight: 600 }}>Auto-created from any channel · AI-classified · SLA tracked</div>
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F3EDFE', color: '#7C3AED', borderRadius: 999, padding: '8px 15px', fontWeight: 800, fontSize: 12.5 }}>✦ AI resolving 3 routine cases in background</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 16 }}>
            {CASE_KPIS.map(k => (
              <div key={k.label} className="ad-lift" style={{ ...CARD, borderRadius: 15, padding: '14px 15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{k.icon}</span>
                  <span style={LABEL}>{k.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 9 }}>
                  <span style={{ fontWeight: 800, fontSize: 23, letterSpacing: '-0.5px', color: k.color }}>{k.value}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: k.deltaColor }}>{k.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, ...CARD, borderRadius: 12, padding: '0 14px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8FA1BE" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ flex: 1, fontSize: 13.5, padding: '12px 0', color: '#8FA1BE' }}>Search cases, customers or assignees…</span>
            </div>
            <div style={{ display: 'flex', gap: 6, ...CARD, borderRadius: 12, padding: 5, flexShrink: 0 }}>
              {['All', 'High', 'Medium', 'Low'].map(f => (
                <button key={f} onClick={() => { setManual(true); setPrioFilter(f); }} style={pillStyle(prioFilter === f)}>{f}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, ...CARD, borderRadius: 12, padding: 5, flexShrink: 0 }}>
              <button onClick={() => { setManual(true); setCaseView('table'); }} style={viewBtnStyle(caseView === 'table')}>☰ Table</button>
              <button onClick={() => { setManual(true); setCaseView('board'); }} style={viewBtnStyle(caseView === 'board')}>▦ Board</button>
            </div>
          </div>

          {caseView === 'table' ? (
            <div key="table" className="ad-rise" style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '105px 1.6fr 2.1fr 92px 1.2fr 92px 112px 90px', gap: 10, padding: '12px 18px', borderBottom: '1px solid #EDF2FA', fontSize: 10.5, fontWeight: 800, color: '#8FA1BE', letterSpacing: '0.5px' }}>
                <span>CASE ID</span><span>CUSTOMER</span><span>SUBJECT</span><span>PRIORITY</span><span>ASSIGNEE</span><span>SLA LEFT</span><span>STATUS</span><span>UPDATED</span>
              </div>
              {caseRows.map(r => (
                <div key={r.id} className="ad-row" onClick={() => { setManual(true); setOpenCase(r.id); }} style={{ display: 'grid', gridTemplateColumns: '105px 1.6fr 2.1fr 92px 1.2fr 92px 112px 90px', gap: 10, padding: '13px 18px', borderBottom: '1px solid #F3F7FD', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s ease' }}>
                  <span style={{ fontWeight: 800, fontSize: 12.5, color: '#2A63F6' }}>{r.id}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 9, background: r.chBg, color: r.chColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{r.chGlyph}</span>
                    <span style={{ fontWeight: 700, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.customer}</span>
                  </span>
                  <span style={{ fontSize: 12.5, color: '#22314F', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.subject}</span>
                  <span><span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: r.prioBg, color: r.prioColor }}>{r.prio}</span></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#41537A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.assignee}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: r.slaColor }}>{r.sla}</span>
                  <span><span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: r.statusBg, color: r.statusColor, whiteSpace: 'nowrap' }}>{r.status}</span></span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#8FA1BE', whiteSpace: 'nowrap' }}>{r.updated}</span>
                </div>
              ))}
            </div>
          ) : (
            <div key="board" className="ad-rise" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, alignItems: 'start' }}>
              {boardCols.map(col => (
                <div key={col.name} style={{ background: '#EFF4FB', borderRadius: 15, padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 10px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.dot }} />
                    <span style={{ fontWeight: 800, fontSize: 12.5 }}>{col.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#8FA1BE' }}>{col.count}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {col.cases.map((c, i) => (
                      <div key={c.id} className="ad-lift ad-rise" onClick={() => { setManual(true); setOpenCase(c.id); }} style={{ animationDelay: `${i * 60}ms`, ...CARD, borderRadius: 12, padding: '12px 13px', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontWeight: 800, fontSize: 11.5, color: '#2A63F6' }}>{c.id}</span>
                          <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 999, background: c.prioBg, color: c.prioColor }}>{c.prio}</span>
                        </div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#22314F', lineHeight: 1.4, marginBottom: 8 }}>{c.subject}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ width: 24, height: 24, borderRadius: 8, background: c.chBg, color: c.chColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{c.chGlyph}</span>
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#5B6B87', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.customer}</span>
                          <span style={{ fontSize: 11, fontWeight: 800, color: c.slaColor }}>{c.sla}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCase && (
            <>
              <div onClick={() => setOpenCase(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(11,27,58,.38)', zIndex: 70 }} />
              <div className="ad-rise" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 432, background: '#fff', zIndex: 71, boxShadow: '-24px 0 60px rgba(11,27,58,.25)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '18px 20px', borderBottom: '1px solid #EDF2FA', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 12, color: '#2A63F6' }}>{activeCase.id}</div>
                    <div style={{ fontWeight: 800, fontSize: 16.5, lineHeight: 1.35, marginTop: 3 }}>{activeCase.subject}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 9 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: activeCase.statusBg, color: activeCase.statusColor }}>{activeCase.status}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: activeCase.prioBg, color: activeCase.prioColor }}>{activeCase.prio} priority</span>
                      <span style={{ fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: '#F1F5FC', color: activeCase.slaColor }}>SLA {activeCase.sla}</span>
                    </div>
                  </div>
                  <button onClick={() => setOpenCase(null)} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid #E3EAF5', background: '#fff', cursor: 'pointer', fontSize: 14, color: '#5B6B87', flexShrink: 0 }}>✕</button>
                </div>
                <div className="ad-scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 13, padding: '12px 14px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#0B1B3A,#41537A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{activeCase.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 13.5 }}>{activeCase.customer}</div>
                      <div style={{ fontSize: 11, color: '#8FA1BE', fontWeight: 700 }}>via {activeCase.channel} · assignee: {activeCase.assignee}</div>
                    </div>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: activeCase.chBg, color: activeCase.chColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{activeCase.chGlyph}</span>
                  </div>
                  <div style={{ border: '1px solid #DCCEFB', borderRadius: 13, overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(120deg,#6D28D9,#8B5CF6)', padding: '9px 14px', color: '#fff', fontWeight: 800, fontSize: 12.5 }}>✦ AI Case Summary</div>
                    <div style={{ padding: '12px 14px', fontSize: 12.5, lineHeight: 1.6, color: '#22314F' }}>{activeCase.aiSummary}</div>
                  </div>
                  <div>
                    <div style={{ ...LABEL, fontSize: 11, letterSpacing: '0.5px', marginBottom: 10 }}>TIMELINE</div>
                    {activeCase.timeline.map(ev => (
                      <div key={ev.text} style={{ display: 'flex', gap: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2A63F6', border: '2px solid #EAF0FE', flexShrink: 0, marginTop: 3 }} />
                          <span style={{ width: 2, flex: 1, background: '#EDF2FA' }} />
                        </div>
                        <div style={{ paddingBottom: 16 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#22314F', lineHeight: 1.45 }}>{ev.text}</div>
                          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#8FA1BE', marginTop: 2 }}>{ev.t}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '14px 20px', borderTop: '1px solid #EDF2FA', display: 'flex', gap: 8 }}>
                  <span style={{ flex: 1, background: '#16A34A', color: '#fff', fontWeight: 800, fontSize: 12.5, padding: '12px 0', borderRadius: 11, textAlign: 'center' }}>✓ Resolve</span>
                  <span style={{ flex: 1, border: '1px solid #E3EAF5', color: '#41537A', fontWeight: 800, fontSize: 12.5, padding: '12px 0', borderRadius: 11, textAlign: 'center' }}>Reassign</span>
                  <span style={{ flex: 1, border: '1px solid #FBD9DA', color: '#E5484D', fontWeight: 800, fontSize: 12.5, padding: '12px 0', borderRadius: 11, textAlign: 'center' }}>Escalate</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════ ANALYTICS ══════════ */}
      {view === 'analytics' && (
        <div key="analytics" className="ad-rise ad-scroll" style={{ flex: 1, padding: '18px 22px 28px', width: '100%', minHeight: 0, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,#6D28D9,#8B5CF6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📈</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 21, letterSpacing: '-0.3px' }}>Performance Analytics</div>
              <div style={{ fontSize: 12.5, color: '#5B6B87', fontWeight: 600 }}>Omnichannel volumes, agent performance &amp; AI impact</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 4, ...CARD, borderRadius: 12, padding: 5, flexShrink: 0 }}>
              {['Today', '7 days', '30 days'].map(f => (
                <button key={f} onClick={() => { setManual(true); setRange(f); }} style={pillStyle(range === f)}>{f}</button>
              ))}
            </div>
            <span style={{ border: '1px solid #E3EAF5', background: '#fff', color: '#41537A', fontWeight: 800, fontSize: 12.5, padding: '10px 16px', borderRadius: 11, flexShrink: 0 }}>⬇ Export</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 14 }}>
            {AN_KPIS.map(k => (
              <div key={k.label} className="ad-lift" style={{ ...CARD, borderRadius: 15, padding: '14px 15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{k.icon}</span>
                  <span style={LABEL}>{k.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 9 }}>
                  <span style={{ fontWeight: 800, fontSize: 23, letterSpacing: '-0.5px', color: k.color }}>{k.value}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: k.deltaColor }}>{k.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
            <div style={{ ...CARD, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Interaction Volume by Hour</div>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, fontWeight: 800, color: '#8FA1BE' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#2A63F6' }} />Human</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#C9B4F7' }} />AI handled</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180 }}>
                {HOURLY.map((h, i) => (
                  <div key={h.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, height: '100%' }}>
                    <div className="ad-rise" style={{ animationDelay: `${i * 45}ms`, height: h.ai, background: '#C9B4F7', borderRadius: '4px 4px 0 0' }} />
                    <div className="ad-rise" style={{ animationDelay: `${i * 45}ms`, height: h.human, background: '#2A63F6', borderRadius: '0 0 3px 3px' }} />
                    <div style={{ textAlign: 'center', fontSize: 9.5, fontWeight: 800, color: '#8FA1BE', marginTop: 4 }}>{h.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...CARD, padding: '16px 18px' }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>Channel Mix</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {MIX.map(c => (
                  <div key={c.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontWeight: 800, marginBottom: 4 }}>
                      <span style={{ color: '#22314F' }}>{c.glyph} {c.name}</span>
                      <span style={{ color: '#8FA1BE' }}>{c.count} · {c.pct}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: '#EDF2FA', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: c.pct, background: c.color, borderRadius: 999, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ ...CARD, padding: '16px 18px' }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Agent Leaderboard</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {LEADERS.map(l => (
                  <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 22, fontSize: 12, fontWeight: 800, color: l.rankColor }}>{l.rank}</span>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: l.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{l.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{l.name}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{l.handled} handled · AHT {l.aht}</div>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 13, color: '#B7791F' }}>★ {l.csat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #DCCEFB', borderRadius: 16, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <span style={{ color: '#7C3AED', fontSize: 14 }}>✦</span>
                <span style={{ fontWeight: 800, fontSize: 14 }}>AI Impact</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'conic-gradient(#7C3AED 0 68%,#EDE6FD 68% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 78, height: 78, borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: 19, color: '#7C3AED' }}>68%</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#8FA1BE', letterSpacing: '0.4px' }}>CONTAINED</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                  {[['1,204', 'RESOLVED BY AI THIS WEEK', '#0B1B3A'], ['312 hrs', 'AGENT TIME SAVED', '#0B1B3A'], ['+9%', 'CONTAINMENT VS LAST WEEK', '#16A34A']].map(([v, l, c]) => (
                    <div key={l}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: c }}>{v}</div>
                      <div style={{ fontSize: 10.5, fontWeight: 800, color: '#8FA1BE' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ ...CARD, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontWeight: 800, fontSize: 14 }}>CSAT Trend</span>
                <span style={{ background: '#EAF6EE', color: '#166534', fontWeight: 800, fontSize: 11, padding: '3px 10px', borderRadius: 999 }}>4.6 avg ↗</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 120 }}>
                {CSAT_TREND.map((d, i) => (
                  <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ textAlign: 'center', fontSize: 10, fontWeight: 800, color: '#41537A', marginBottom: 3 }}>{d.val}</div>
                    <div className="ad-rise" style={{ animationDelay: `${i * 60}ms`, height: d.h, background: d.color, borderRadius: '5px 5px 0 0' }} />
                    <div style={{ textAlign: 'center', fontSize: 9.5, fontWeight: 800, color: '#8FA1BE', marginTop: 4 }}>{d.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, borderTop: '1px solid #EDF2FA', paddingTop: 10, fontSize: 11.5, color: '#5B6B87', fontWeight: 600, lineHeight: 1.5 }}>
                ✦ AI insight: CSAT dips on Mondays correlate with voice queue waits over 60s. Consider shifting one agent to the morning block.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ SURVEY (CUSTOMER SURVEYS) ══════════ */}
      {view === 'survey' && (
        <div key="survey" className="ad-rise ad-scroll" style={{ flex: 1, padding: '14px 20px 14px', width: '100%', minHeight: 0, overflowY: 'auto' }}>
          <div style={{ maxWidth: 1520, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: '#7C3AED', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>★</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px' }}>Customer Surveys</div>
                  <div style={{ fontSize: 12.5, color: '#5B6B87', fontWeight: 600 }}>Post-interaction CSAT, CES and NPS feedback across every channel</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E3EAF5', borderRadius: 999, padding: '7px 14px' }}>
                  <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
                  <span style={{ fontWeight: 800, fontSize: 11.5, letterSpacing: '0.4px' }}>COLLECTING RESPONSES</span>
                </div>
                <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #E3EAF5', borderRadius: 11, padding: 4 }}>
                  {svRanges.map(r => (
                    <button key={r} onClick={() => { setManual(true); setRange(r); }} style={pillStyle(range === r)}>{r}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 11, marginBottom: 11 }}>
              {svKpis.map(k => (
                <div key={k.label} className="ad-lift" style={{ ...CARD, borderRadius: 14, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{k.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...LABEL, fontSize: 10, letterSpacing: '0.5px' }}>{k.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 21, color: k.color, fontVariantNumeric: 'tabular-nums' }}>{k.value}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: k.deltaColor }}>{k.delta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 11, alignItems: 'start' }}>
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ ...CARD, padding: '12px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>NPS Distribution</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>Live mix of promoters, passives and detractors</div>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 19, color: '#16A34A', fontVariantNumeric: 'tabular-nums' }}>{npsScore}</span>
                  </div>
                  <div style={{ display: 'flex', height: 16, borderRadius: 999, overflow: 'hidden', background: '#EEF3FB' }}>
                    {npsBands.map(n => <span key={n.label} style={{ width: n.pct, background: n.color, transition: 'width 0.6s ease' }} />)}
                  </div>
                  <div style={{ display: 'flex', gap: 22, marginTop: 10 }}>
                    {npsBands.map(n => (
                      <div key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: n.color, flexShrink: 0 }} />
                        <div style={{ whiteSpace: 'nowrap' }}>
                          <div style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87' }}>{n.label}</div>
                          <div style={{ fontWeight: 800, fontSize: 14, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{n.count} <span style={{ fontSize: 11, color: '#8FA1BE' }}>{n.pct}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ ...CARD, padding: '12px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>Survey Campaigns</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>Automatic surveys triggered after each interaction</div>
                    </div>
                    <span style={{ background: '#EAF0FE', color: '#2A63F6', fontWeight: 800, fontSize: 11, padding: '4px 11px', borderRadius: 999 }}>4 active</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.7fr .8fr .8fr .9fr .9fr .8fr', gap: 8, padding: '0 4px 9px', borderBottom: '1px solid #EDF2FA' }}>
                    {['SURVEY', 'CHANNEL', 'SENT', 'RESPONSES', 'RESP. RATE', 'SCORE'].map(h => <span key={h} style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.5px', color: '#8FA1BE' }}>{h}</span>)}
                  </div>
                  {svCampaigns.map(c => (
                    <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.7fr .8fr .8fr .9fr .9fr .8fr', gap: 8, padding: '8px 4px', alignItems: 'center', borderBottom: '1px solid #F5F8FD' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                        <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{c.icon}</span>
                        <span style={{ fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: c.color }}>{c.channel}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{c.sent}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#2A63F6' }}>{c.responses}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ flex: 1, height: 6, borderRadius: 999, background: '#EEF3FB', maxWidth: 58 }}><span style={{ display: 'block', height: '100%', borderRadius: 999, width: c.rate, background: c.rateColor, transition: 'width 0.6s ease' }} /></span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87', fontVariantNumeric: 'tabular-nums' }}>{c.rate}</span>
                      </span>
                      <span style={{ fontWeight: 800, fontSize: 12.5, color: '#B7791F' }}>★ {c.score}</span>
                    </div>
                  ))}
                </div>

                <div style={{ ...CARD, padding: '12px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>Question Breakdown</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>Average rating per question · last 500 responses</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#8FA1BE' }}>out of 5</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {svQuestions.map(q => (
                      <div key={q.text} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: '#41537A', minWidth: 0 }}>{q.text}</span>
                        <span style={{ width: 190, height: 9, borderRadius: 999, background: '#EEF3FB' }}><span style={{ display: 'block', height: '100%', borderRadius: 999, width: q.pct, background: q.color, transition: 'width 0.6s ease' }} /></span>
                        <span style={{ width: 34, textAlign: 'right', fontWeight: 800, fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}>{q.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ ...CARD, padding: '13px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>Live Responses</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: '#16A34A' }}><span className="ad-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A' }} />streaming</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {svResponses.slice(0, 3).map((r, i) => (
                      <div key={i} className="ad-slide" style={{ animationDelay: `${i * 40}ms`, border: '1px solid #EDF2FA', borderRadius: 11, padding: '9px 11px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <span style={{ width: 24, height: 24, borderRadius: 7, background: r.chBg, color: r.chColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{r.chGlyph}</span>
                          <span style={{ fontWeight: 800, fontSize: 12, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                          <span style={{ fontWeight: 800, fontSize: 11.5, color: r.scoreColor }}>{r.stars}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#B7C4D8' }}>{r.ago}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#5B6B87', fontWeight: 600, lineHeight: 1.4, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #DCCEFB', borderRadius: 16, padding: '13px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                    <span style={{ color: '#7C3AED', fontSize: 14 }}>✦</span>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>AI Theme Analysis</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {svThemes.map(t => (
                      <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: '#41537A' }}>{t.name}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 800, color: '#8FA1BE', fontVariantNumeric: 'tabular-nums' }}>{t.mentions}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: t.color }}>{t.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #FBD9C6', borderRadius: 16, padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: '#9A3412' }}>Low-Score Follow-ups</span>
                    <span style={{ background: '#FFF1EA', color: '#C2410C', fontWeight: 800, fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>{svFollowUpCount} open</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {SV_FOLLOWUPS.map(f => (
                      <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 28, height: 28, borderRadius: 9, background: '#FFF1EA', color: '#C2410C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{f.score}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                          <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{f.reason}</div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#2A63F6' }}>Call back</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'outreach' && <OutreachView />}
      {view === 'chat' && <ChatView />}
      {view === 'surveys' && <SurveysView />}
      {view === 'voice' && <VoiceView />}
      {view === 'mentions' && <MentionsView />}

    </div>
  );
}

/* ── Shared chat thread panel (WhatsApp + Web Chat) ── */
function Thread({
  initials, avatarBg, avatarColor, name, sub, subColor,
  sentimentDot, sentiment, messages, accent, placeholder, suggestions, banner,
}: {
  initials: string; avatarBg: string; avatarColor: string;
  name: string; sub: string; subColor: string;
  sentimentDot: string; sentiment: string;
  messages: Bubble[]; accent: string; placeholder: string;
  suggestions?: string[]; banner?: string;
}) {
  return (
    <div className="ad-rise" style={{ ...CARD, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ padding: '13px 18px', borderBottom: '1px solid #EDF2FA', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: avatarBg, color: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: subColor, fontWeight: 800 }}>{sub}</div>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: sentimentDot }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#8FA1BE' }}>{sentiment}</span>
      </div>

      <div className="ad-scroll" style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 10, background: '#F7FAFF' }}>
        {banner && (
          <div style={{ alignSelf: 'center', background: '#F3EDFE', color: '#7C3AED', fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 999 }}>{banner}</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className="ad-rise" style={{ animationDelay: `${i * 110}ms`, display: 'flex', justifyContent: m.justify }}>
            <div style={{ maxWidth: '68%', background: m.bg, color: m.color, border: `1px solid ${m.border}`, borderRadius: m.radius, padding: '10px 14px', fontSize: 13.5, lineHeight: 1.5 }}>
              {m.att && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(11,27,58,.07)', borderRadius: 9, padding: '8px 11px', marginBottom: 7, fontSize: 12, fontWeight: 700 }}>
                  📎 {m.att} <span style={{ fontWeight: 600, opacity: 0.6 }}>· 214 KB</span>
                </div>
              )}
              {m.text}
              <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 18px', borderTop: '1px solid #EDF2FA' }}>
        {suggestions && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            {suggestions.map(s => (
              <span key={s} style={{ border: '1px solid #D9C9FB', background: '#F9F6FF', color: '#6D28D9', fontWeight: 700, fontSize: 12, padding: '7px 12px', borderRadius: 999 }}>{s}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 42, height: 42, flexShrink: 0, border: '1px solid #E3EAF5', background: '#fff', borderRadius: 11, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😊</span>
          <span style={{ width: 42, height: 42, flexShrink: 0, border: '1px solid #E3EAF5', background: '#fff', borderRadius: 11, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📎</span>
          <div style={{ flex: 1, border: '1px solid #E3EAF5', borderRadius: 11, padding: '11px 14px', fontSize: 13, color: '#8FA1BE', background: '#fff' }}>{placeholder}</div>
          <span style={{ background: accent, color: '#fff', fontWeight: 800, fontSize: 13, padding: '11px 20px', borderRadius: 11, display: 'flex', alignItems: 'center' }}>Send</span>
        </div>
      </div>
    </div>
  );
}
