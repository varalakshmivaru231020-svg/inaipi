'use client';

import { Glyph, Stars, Lead, ChannelIcon } from './dashboardIcons';

/**
 * Extra Agent Desktop views used by the PlatformFlow section for the
 * Proactive Outreach, AI Voice Agents, AI Chat Agents and Surveys stages.
 *
 * These follow the same visual language as the existing Survey view in
 * AgentDesktopUI (46px header mark, 5-up KPI row, 1.55fr/1fr card grid) and
 * are authored against the same fixed 1360x880 canvas. Figures are
 * illustrative product-mock data, exactly as in the existing views.
 */

import { CSSProperties } from 'react';

const CARD: CSSProperties = { background: '#fff', border: '1px solid #E3EAF5', borderRadius: 16 };
const LABEL: CSSProperties = { fontSize: 10, fontWeight: 800, color: '#8FA1BE', letterSpacing: '0.6px' };

/* ── shared chrome ── */
function ViewHead({ mark, markBg, title, sub, statusLabel }: {
  mark: string; markBg: string; title: string; sub: string; statusLabel: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: markBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}><Glyph g={mark} size={20} /></div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px' }}>{title}</div>
          <div style={{ fontSize: 12.5, color: '#5B6B87', fontWeight: 600 }}>{sub}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E3EAF5', borderRadius: 999, padding: '7px 14px' }}>
        <span className="ad-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
        <span style={{ fontWeight: 800, fontSize: 11.5, letterSpacing: '0.4px' }}>{statusLabel}</span>
      </div>
    </div>
  );
}

type Kpi = { label: string; value: string; delta: string; deltaColor: string; color: string; icon: string; iconBg: string };

function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 11, marginBottom: 11 }}>
      {items.map(k => (
        <div key={k.label} className="ad-lift" style={{ ...CARD, borderRadius: 14, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ width: 38, height: 38, borderRadius: 12, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}><Glyph g={k.icon} size={17} /></span>
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
  );
}

function PanelHead({ title, sub, badge, badgeBg, badgeColor }: {
  title: string; sub: string; badge?: string; badgeBg?: string; badgeColor?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{sub}</div>
      </div>
      {badge && <span style={{ background: badgeBg, color: badgeColor, fontWeight: 800, fontSize: 11, padding: '4px 11px', borderRadius: 999 }}>{badge}</span>}
    </div>
  );
}

const SHELL: CSSProperties = { flex: 1, padding: '14px 20px 14px', width: '100%', minHeight: 0, overflowY: 'auto' };
const INNER: CSSProperties = { maxWidth: 1520, margin: '0 auto' };
const GRID: CSSProperties = { display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 11, alignItems: 'start' };
const COL: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 11 };

/* ══════════════════════════════════════════════════
   Section 3 — Proactive Outreach Manager
   ══════════════════════════════════════════════════ */
const OUT_KPIS: Kpi[] = [
  { label: 'ACTIVE CAMPAIGNS', value: '6',      delta: '+2',    deltaColor: '#16A34A', color: '#2A63F6', icon: '📣', iconBg: '#EAF0FE' },
  { label: 'CUSTOMERS REACHED', value: '5,775', delta: '+14%',  deltaColor: '#16A34A', color: '#0B1B3A', icon: '🎯', iconBg: '#E9F8EF' },
  { label: 'CONNECT RATE',     value: '71%',    delta: '+6%',   deltaColor: '#16A34A', color: '#16A34A', icon: '🔗', iconBg: '#F3ECFF' },
  { label: 'HANDLED BY AI',    value: '4,110',  delta: '+9%',   deltaColor: '#16A34A', color: '#7C3AED', icon: '✦',  iconBg: '#FFF6E5' },
  { label: 'TO HUMAN AGENT',   value: '318',    delta: 'live',  deltaColor: '#8FA1BE', color: '#F59E0B', icon: '👤', iconBg: '#EAF6EE' },
];

const OUT_CAMPAIGNS = [
  { name: 'Renewal reminder',      type: 'Reminder',     channel: 'AI Voice', icon: '📞', bg: '#EAF0FE', color: '#2A63F6', targeted: '1,240', connected: '892',   rate: '72%', rateColor: '#16A34A', route: 'AI Agent' },
  { name: 'Delivery notification', type: 'Notification', channel: 'WhatsApp', icon: '💬', bg: '#E9F8EF', color: '#16A34A', targeted: '2,105', connected: '1,743', rate: '83%', rateColor: '#16A34A', route: 'AI Agent' },
  { name: 'Payment follow-up',     type: 'Follow-up',    channel: 'SMS',      icon: '✉',  bg: '#FFF6E5', color: '#B7791F', targeted: '860',   connected: '531',   rate: '62%', rateColor: '#F59E0B', route: 'Human' },
  { name: 'Win-back outreach',     type: 'Campaign',     channel: 'AI Voice', icon: '📞', bg: '#F3ECFF', color: '#7C3AED', targeted: '1,570', connected: '944',   rate: '60%', rateColor: '#F59E0B', route: 'Mixed' },
];

const OUT_STAGES = [
  { label: 'Targeted',  value: '5,775', color: '#2A63F6', pct: '100%' },
  { label: 'Dialing',   value: '412',   color: '#7C3AED', pct: '78%' },
  { label: 'Connected', value: '4,110', color: '#16A34A', pct: '71%' },
  { label: 'Escalated', value: '318',   color: '#F59E0B', pct: '32%' },
  { label: 'Follow-up', value: '196',   color: '#E5484D', pct: '18%' },
];

const OUT_ACTIVITY = [
  { icon: '📞', bg: '#EAF0FE', color: '#2A63F6', text: 'AI Voice Agent connected a renewal reminder to +971 55 210 4478', time: 'just now' },
  { icon: '👤', bg: '#FFF6E5', color: '#B7791F', text: 'Payment follow-up escalated to Mariam A. with full context', time: '2m ago' },
  { icon: '💬', bg: '#E9F8EF', color: '#16A34A', text: 'Delivery notification delivered on WhatsApp, read receipt confirmed', time: '4m ago' },
  { icon: '🔁', bg: '#F3ECFF', color: '#7C3AED', text: 'No answer on win-back outreach, follow-up scheduled automatically', time: '6m ago' },
];

export function OutreachView() {
  return (
    <div key="outreach" className="ad-rise ad-scroll" style={SHELL}>
      <div style={INNER}>
        <ViewHead mark="📣" markBg="#2A63F6" title="Proactive Outreach Manager"
          sub="Campaigns, notifications, reminders and follow-ups from one workflow" statusLabel="CAMPAIGNS RUNNING" />
        <KpiRow items={OUT_KPIS} />

        <div style={GRID}>
          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Outreach Campaigns" sub="Right customer, right message, right time" badge="6 active" badgeBg="#EAF0FE" badgeColor="#2A63F6" />
              <div style={{ display: 'grid', gridTemplateColumns: '1.7fr .9fr .8fr .9fr .9fr .8fr', gap: 8, padding: '0 4px 9px', borderBottom: '1px solid #EDF2FA' }}>
                {['OUTREACH', 'TYPE', 'TARGETED', 'CONNECTED', 'CONNECT RATE', 'ROUTED TO'].map(h => (
                  <span key={h} style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.5px', color: '#8FA1BE' }}>{h}</span>
                ))}
              </div>
              {OUT_CAMPAIGNS.map(c => (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.7fr .9fr .8fr .9fr .9fr .8fr', gap: 8, padding: '8px 4px', alignItems: 'center', borderBottom: '1px solid #F5F8FD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}><ChannelIcon name={c.channel} g={c.icon} size={12} /></span>
                    <span style={{ fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: c.color }}>{c.type}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{c.targeted}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#2A63F6' }}>{c.connected}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ flex: 1, height: 6, borderRadius: 999, background: '#EEF3FB', maxWidth: 58 }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: c.rate, background: c.rateColor, transition: 'width 0.6s ease' }} />
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87', fontVariantNumeric: 'tabular-nums' }}>{c.rate}</span>
                  </span>
                  <span style={{ fontWeight: 800, fontSize: 11.5, color: c.route === 'Human' ? '#B7791F' : '#7C3AED' }}>{c.route}</span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Automated Orchestration" sub="Dialing, connection, escalation and follow-up in one flow" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 9 }}>
                {OUT_STAGES.map(s => (
                  <div key={s.label} style={{ background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 12, padding: '10px 11px' }}>
                    <div style={{ ...LABEL, marginBottom: 5 }}>{s.label.toUpperCase()}</div>
                    <div style={{ fontWeight: 800, fontSize: 17, fontVariantNumeric: 'tabular-nums', color: s.color, marginBottom: 7 }}>{s.value}</div>
                    <span style={{ display: 'block', height: 5, borderRadius: 999, background: '#EEF3FB' }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: s.pct, background: s.color, transition: 'width 0.6s ease' }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="AI or Human" sub="Every connection routed to the right responder" />
              <div style={{ display: 'flex', height: 16, borderRadius: 999, overflow: 'hidden', background: '#EEF3FB', marginBottom: 10 }}>
                <span style={{ width: '73%', background: '#7C3AED' }} />
                <span style={{ width: '19%', background: '#2A63F6' }} />
                <span style={{ width: '8%', background: '#F59E0B' }} />
              </div>
              {[
                { label: 'AI Voice Agent', count: '4,110', pct: '73%', color: '#7C3AED' },
                { label: 'Human agent', count: '1,047', pct: '19%', color: '#2A63F6' },
                { label: 'Scheduled follow-up', count: '618', pct: '8%', color: '#F59E0B' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 800, color: '#5B6B87' }}>{r.label}</span>
                  <span style={{ fontWeight: 800, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{r.count}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#8FA1BE', width: 30, textAlign: 'right' }}>{r.pct}</span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Live Outreach Activity" sub="Connections, escalations and follow-ups" badge="streaming" badgeBg="#E9F8EF" badgeColor="#16A34A" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {OUT_ACTIVITY.map(a => (
                  <div key={a.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 9, background: a.bg, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}><Glyph g={a.icon} size={13} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#334267', lineHeight: 1.35 }}>{a.text}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700, marginTop: 2 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Section 5 — AI Chat Agents
   ══════════════════════════════════════════════════ */
const CHAT_KPIS: Kpi[] = [
  { label: 'ACTIVE CHATS',      value: '48',     delta: '+7',   deltaColor: '#16A34A', color: '#2A63F6', icon: '💬', iconBg: '#EAF0FE' },
  { label: 'ANSWERED BY AI',    value: '1,382',  delta: '+11%', deltaColor: '#16A34A', color: '#7C3AED', icon: '✦',  iconBg: '#F3ECFF' },
  { label: 'AVG FIRST REPLY',   value: '0:02',   delta: 'instant', deltaColor: '#16A34A', color: '#16A34A', icon: '⚡', iconBg: '#E9F8EF' },
  { label: 'SELF-SERVICE RATE', value: '74%',    delta: '+5%',  deltaColor: '#16A34A', color: '#0B1B3A', icon: '🎯', iconBg: '#FFF6E5' },
  { label: 'HANDED TO AGENT',   value: '184',    delta: 'live', deltaColor: '#8FA1BE', color: '#F59E0B', icon: '👤', iconBg: '#EAF6EE' },
];

const CHAT_CHANNELS = [
  { name: 'WhatsApp', icon: '💬', bg: '#E9F8EF', color: '#16A34A', chats: '624', ai: '486', esc: '61',  rate: '78%', rateColor: '#16A34A' },
  { name: 'Website',  icon: '🌐', bg: '#EAF0FE', color: '#2A63F6', chats: '448', ai: '331', esc: '52',  rate: '74%', rateColor: '#16A34A' },
  { name: 'Mobile',   icon: '📱', bg: '#F3ECFF', color: '#7C3AED', chats: '286', ai: '204', esc: '34',  rate: '71%', rateColor: '#F59E0B' },
  { name: 'Social',   icon: '★',  bg: '#FFF1EA', color: '#C2410C', chats: '198', ai: '138', esc: '25',  rate: '70%', rateColor: '#F59E0B' },
  { name: 'Messaging',icon: '✉',  bg: '#FFF6E5', color: '#B7791F', chats: '154', ai: '113', esc: '12',  rate: '73%', rateColor: '#16A34A' },
];

const CHAT_THREAD = [
  { who: 'c', text: 'Hi, can I change the delivery address on order #4521?', time: '14:02' },
  { who: 'a', text: 'Of course, I can see order #4521 is still in processing, so the address can be updated.', time: '14:02' },
  { who: 'c', text: 'Great, please send it to my office instead.', time: '14:03' },
  { who: 'a', text: 'Updated to your saved office address. You will get a confirmation on WhatsApp shortly.', time: '14:03' },
];

export function ChatView() {
  return (
    <div key="chat" className="ad-rise ad-scroll" style={SHELL}>
      <div style={INNER}>
        <ViewHead mark="💬" markBg="#7C3AED" title="AI Chat Agents"
          sub="Instant answers across WhatsApp, website, mobile, social and messaging" statusLabel="ANSWERING 24/7" />
        <KpiRow items={CHAT_KPIS} />

        <div style={GRID}>
          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Digital Channels" sub="AI-powered conversations across every digital entry point" badge="5 live" badgeBg="#EAF0FE" badgeColor="#2A63F6" />
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr .9fr 1fr .9fr 1fr', gap: 8, padding: '0 4px 9px', borderBottom: '1px solid #EDF2FA' }}>
                {['CHANNEL', 'CHATS', 'ANSWERED BY AI', 'TO AGENT', 'SELF-SERVICE'].map(h => (
                  <span key={h} style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.5px', color: '#8FA1BE' }}>{h}</span>
                ))}
              </div>
              {CHAT_CHANNELS.map(c => (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr .9fr 1fr .9fr 1fr', gap: 8, padding: '8px 4px', alignItems: 'center', borderBottom: '1px solid #F5F8FD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}><ChannelIcon name={c.name} g={c.icon} size={12} /></span>
                    <span style={{ fontWeight: 800, fontSize: 12.5 }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{c.chats}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#7C3AED' }}>{c.ai}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#B7791F' }}>{c.esc}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ flex: 1, height: 6, borderRadius: 999, background: '#EEF3FB', maxWidth: 58 }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: c.rate, background: c.rateColor, transition: 'width 0.6s ease' }} />
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87', fontVariantNumeric: 'tabular-nums' }}>{c.rate}</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Live Conversation" sub="AI answering on WhatsApp" badge="AI agent" badgeBg="#F3ECFF" badgeColor="#7C3AED" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHAT_THREAD.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.who === 'a' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '76%', padding: '8px 12px', borderRadius: 14,
                      background: m.who === 'a' ? '#16A34A' : '#F1F5FC',
                      color: m.who === 'a' ? '#fff' : '#233457',
                      borderBottomRightRadius: m.who === 'a' ? 4 : 14,
                      borderBottomLeftRadius: m.who === 'a' ? 14 : 4,
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>{m.text}</div>
                      <div style={{ fontSize: 9.5, fontWeight: 700, opacity: 0.65, marginTop: 3, textAlign: 'right' }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Conversation Context" sub="Customer information and history in every reply" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 11 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>SM</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>Sarah Mitchell</div>
                  <div style={{ fontSize: 11, color: '#5B6B87', fontWeight: 700 }}>WhatsApp · returning customer</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[['12', 'ORDERS'], ['4.7', 'CSAT'], ['5', 'CHATS']].map(([v, l]) => (
                  <div key={l} style={{ background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 11, padding: '9px 6px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#2A63F6', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                    <div style={{ ...LABEL, fontSize: 9 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 11, background: '#F3ECFF', border: '1px solid #E4D8FF', borderRadius: 11, padding: '9px 11px' }}>
                <div style={{ ...LABEL, color: '#7C3AED', marginBottom: 3 }}>USING HISTORY</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#4C1D95', lineHeight: 1.4 }}>Saved office address applied from the customer&apos;s previous order.</div>
              </div>
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Escalate to Agent" sub="Complex conversations handed over with full context" badge="184 today" badgeBg="#FFF6E5" badgeColor="#B7791F" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { t: 'Conversation transcript', s: 'Complete thread passed to the agent' },
                  { t: 'Customer profile', s: 'Identity, orders and prior contacts' },
                  { t: 'AI summary', s: 'What the customer asked and what AI already answered' },
                ].map(r => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF6EE', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{<Glyph g="✓" size={12} />}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{r.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Section 6 — Surveys
   ══════════════════════════════════════════════════ */
const SUR_KPIS: Kpi[] = [
  { label: 'SURVEYS SENT',   value: '3,788', delta: '+12%', deltaColor: '#16A34A', color: '#0B1B3A', icon: '📨', iconBg: '#EAF0FE' },
  { label: 'RESPONSE RATE',  value: '46%',   delta: '+3%',  deltaColor: '#16A34A', color: '#2A63F6', icon: '📈', iconBg: '#E9F8EF' },
  { label: 'CSAT',           value: '4.4',   delta: 'of 5', deltaColor: '#8FA1BE', color: '#16A34A', icon: '★',  iconBg: '#FFF6E5' },
  { label: 'NPS',            value: '+51',   delta: '+4',   deltaColor: '#16A34A', color: '#7C3AED', icon: '◎',  iconBg: '#F3ECFF' },
  { label: 'GAPS IDENTIFIED',value: '9',     delta: 'open', deltaColor: '#C2410C', color: '#E5484D', icon: '⚠',  iconBg: '#FFF1EA' },
];

const SUR_CHANNELS = [
  { name: 'IVR',              icon: '📞', bg: '#EAF0FE', color: '#2A63F6', sent: '1,120', resp: '482', rate: '43%', rateColor: '#F59E0B', score: '4.3' },
  { name: 'SMS',              icon: '✉',  bg: '#FFF6E5', color: '#B7791F', sent: '864',   resp: '423', rate: '49%', rateColor: '#16A34A', score: '4.4' },
  { name: 'Email',            icon: '📧', bg: '#F3ECFF', color: '#7C3AED', sent: '1,004', resp: '392', rate: '39%', rateColor: '#F59E0B', score: '4.2' },
  { name: 'Social Media',     icon: '★',  bg: '#FFF1EA', color: '#C2410C', sent: '412',   resp: '206', rate: '50%', rateColor: '#16A34A', score: '4.5' },
  { name: 'Digital Channels', icon: '🌐', bg: '#E9F8EF', color: '#16A34A', sent: '388',   resp: '221', rate: '57%', rateColor: '#16A34A', score: '4.6' },
];

const SUR_TRIGGERS = [
  { t: 'After a voice call', s: 'IVR survey plays at the end of the call', c: '#2A63F6', bg: '#EAF0FE', icon: '📞' },
  { t: 'After a chat',       s: 'Rating request sent in the conversation', c: '#16A34A', bg: '#E9F8EF', icon: '💬' },
  { t: 'After ticket closure', s: 'CSAT and NPS sent on the customer channel', c: '#7C3AED', bg: '#F3ECFF', icon: '✓' },
];

const SUR_GAPS = [
  { name: 'Wait time before an agent', score: '3.6', trend: '↘', color: '#E5484D' },
  { name: 'First-contact resolution',  score: '4.1', trend: '↗', color: '#16A34A' },
  { name: 'Clarity of the answer',     score: '4.5', trend: '↗', color: '#16A34A' },
];

export function SurveysView() {
  return (
    <div key="surveys" className="ad-rise ad-scroll" style={SHELL}>
      <div style={INNER}>
        <ViewHead mark="★" markBg="#16A34A" title="Surveys"
          sub="Automated feedback captured across IVR, SMS, email, social and digital channels" statusLabel="COLLECTING FEEDBACK" />
        <KpiRow items={SUR_KPIS} />

        <div style={GRID}>
          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Feedback by Channel" sub="Surveys captured wherever the customer already is" badge="5 channels" badgeBg="#EAF0FE" badgeColor="#2A63F6" />
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr .8fr .9fr 1fr .7fr', gap: 8, padding: '0 4px 9px', borderBottom: '1px solid #EDF2FA' }}>
                {['CHANNEL', 'SENT', 'RESPONSES', 'RESPONSE RATE', 'SCORE'].map(h => (
                  <span key={h} style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.5px', color: '#8FA1BE' }}>{h}</span>
                ))}
              </div>
              {SUR_CHANNELS.map(c => (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.6fr .8fr .9fr 1fr .7fr', gap: 8, padding: '8px 4px', alignItems: 'center', borderBottom: '1px solid #F5F8FD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}><ChannelIcon name={c.name} g={c.icon} size={12} /></span>
                    <span style={{ fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{c.sent}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#2A63F6' }}>{c.resp}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ flex: 1, height: 6, borderRadius: 999, background: '#EEF3FB', maxWidth: 58 }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: c.rate, background: c.rateColor, transition: 'width 0.6s ease' }} />
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87', fontVariantNumeric: 'tabular-nums' }}>{c.rate}</span>
                  </span>
                  <span style={{ fontWeight: 800, fontSize: 12.5, color: '#B7791F', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Glyph g="★" size={12} />{c.score}</span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Automated Triggers" sub="Surveys fire automatically after customer interactions" badge="auto" badgeBg="#E9F8EF" badgeColor="#16A34A" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                {SUR_TRIGGERS.map(t => (
                  <div key={t.t} style={{ background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 12, padding: '11px 12px' }}>
                    <span style={{ width: 28, height: 28, borderRadius: 9, background: t.bg, color: t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginBottom: 8 }}><Glyph g={t.icon} size={13} /></span>
                    <div style={{ fontWeight: 800, fontSize: 12.5, marginBottom: 3 }}>{t.t}</div>
                    <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700, lineHeight: 1.4 }}>{t.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="What Customers Rate" sub="CSAT and NPS across recent responses" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SUR_GAPS.map(g => (
                  <div key={g.name}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: '#334267' }}>{g.name}</span>
                      <span style={{ fontWeight: 800, fontSize: 12.5, color: g.color, fontVariantNumeric: 'tabular-nums' }}><Lead t={g.trend} size={12} /> {g.score}</span>
                    </div>
                    <span style={{ display: 'block', height: 7, borderRadius: 999, background: '#EEF3FB' }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: `${(parseFloat(g.score) / 5) * 100}%`, background: g.color, transition: 'width 0.6s ease' }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Close the Loop" sub="Feedback turned into service improvements" badge="9 open" badgeBg="#FFF1EA" badgeColor="#C2410C" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { t: 'Queue wait before agent', s: 'Service gap identified from low scores' },
                  { t: 'Routed to operations', s: 'Assigned for review and action' },
                  { t: 'Re-measured next cycle', s: 'Improvement tracked in the next survey' },
                ].map((r, i) => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#FFF1EA', color: '#C2410C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{r.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Section 4 — AI Voice Agents
   ══════════════════════════════════════════════════ */
const VOICE_KPIS: Kpi[] = [
  { label: 'CALLS IN PROGRESS', value: '32',    delta: '+6',      deltaColor: '#16A34A', color: '#2A63F6', icon: '📞', iconBg: '#EAF0FE' },
  { label: 'HANDLED BY AI',     value: '2,164', delta: '+13%',    deltaColor: '#16A34A', color: '#7C3AED', icon: '✦',  iconBg: '#F3ECFF' },
  { label: 'AVG HANDLE TIME',   value: '1:48',  delta: '−0:22',   deltaColor: '#16A34A', color: '#0B1B3A', icon: '⏱',  iconBg: '#E9F8EF' },
  { label: 'TASKS COMPLETED',   value: '1,905', delta: '+11%',    deltaColor: '#16A34A', color: '#16A34A', icon: '✓',  iconBg: '#FFF6E5' },
  { label: 'HANDED TO AGENT',   value: '259',   delta: 'live',    deltaColor: '#8FA1BE', color: '#F59E0B', icon: '👤', iconBg: '#EAF6EE' },
];

const VOICE_TYPES = [
  { name: 'Inbound',       icon: '📥', bg: '#EAF0FE', color: '#2A63F6', calls: '1,482', ai: '1,106', agent: '376', rate: '75%', rateColor: '#16A34A' },
  { name: 'Outbound',      icon: '📤', bg: '#F3ECFF', color: '#7C3AED', calls: '1,240', ai: '892',   agent: '348', rate: '72%', rateColor: '#16A34A' },
  { name: 'Notifications', icon: '🔔', bg: '#E9F8EF', color: '#16A34A', calls: '964',   ai: '918',   agent: '46',  rate: '95%', rateColor: '#16A34A' },
  { name: 'Reminders',     icon: '⏰', bg: '#FFF6E5', color: '#B7791F', calls: '812',   ai: '764',   agent: '48',  rate: '94%', rateColor: '#16A34A' },
  { name: 'Verification',  icon: '🔐', bg: '#FFF1EA', color: '#C2410C', calls: '506',   ai: '441',   agent: '65',  rate: '87%', rateColor: '#16A34A' },
  { name: 'Follow-ups',    icon: '🔁', bg: '#EAF6EE', color: '#166534', calls: '648',   ai: '512',   agent: '136', rate: '79%', rateColor: '#F59E0B' },
];

const VOICE_TURNS = [
  { who: 'c', text: 'Hi, I need to reschedule my service appointment for next week.', time: '00:04' },
  { who: 'a', text: 'Happy to help. I can see a service visit booked for Tuesday at 10am. What day suits you better?', time: '00:07' },
  { who: 'c', text: 'Thursday afternoon if possible.', time: '00:14' },
  { who: 'a', text: 'Thursday 2pm is available. I have moved the booking and sent the confirmation to your mobile.', time: '00:18' },
];

const VOICE_TASKS = [
  { t: 'Collect information', s: 'Captures the reason for the call and required details' },
  { t: 'Verify the customer', s: 'Confirms identity before acting on the account' },
  { t: 'Complete the action', s: 'Performs the pre-defined task and confirms the outcome' },
  { t: 'Schedule the follow-up', s: 'Books the next step and sends confirmation' },
];

/* Section 4 has the tallest left column, so its panel is narrower than the design
   ratio and the cover-fit mock crops ~89 canvas px off the right edge. Inset this
   view by that much so no content lands in the cropped strip. */
const VOICE_SHELL: CSSProperties = { ...SHELL, paddingRight: 110 };

export function VoiceView() {
  return (
    <div key="voice" className="ad-rise ad-scroll" style={VOICE_SHELL}>
      <div style={INNER}>
        <ViewHead mark="📞" markBg="#2A63F6" title="AI Voice Agents"
          sub="Inbound, outbound, notifications, reminders, verification and follow-ups" statusLabel="CALLS IN PROGRESS" />
        <KpiRow items={VOICE_KPIS} />

        <div style={GRID}>
          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Voice Conversations" sub="Every call type handled by the AI Voice Agent" badge="6 types" badgeBg="#EAF0FE" badgeColor="#2A63F6" />
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr .8fr 1fr .9fr 1fr', gap: 8, padding: '0 4px 9px', borderBottom: '1px solid #EDF2FA' }}>
                {['CONVERSATION TYPE', 'CALLS', 'HANDLED BY AI', 'TO AGENT', 'COMPLETED BY AI'].map(h => (
                  <span key={h} style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.5px', color: '#8FA1BE' }}>{h}</span>
                ))}
              </div>
              {VOICE_TYPES.map(v => (
                <div key={v.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr .8fr 1fr .9fr 1fr', gap: 8, padding: '7px 4px', alignItems: 'center', borderBottom: '1px solid #F5F8FD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: v.bg, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}><Glyph g={v.icon} size={12} /></span>
                    <span style={{ fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</span>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{v.calls}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#7C3AED' }}>{v.ai}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#B7791F' }}>{v.agent}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ flex: 1, height: 6, borderRadius: 999, background: '#EEF3FB', maxWidth: 58 }}>
                      <span style={{ display: 'block', height: '100%', borderRadius: 999, width: v.rate, background: v.rateColor, transition: 'width 0.6s ease' }} />
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6B87', fontVariantNumeric: 'tabular-nums' }}>{v.rate}</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Live Call" sub="AI understands intent and responds in real time" badge="◉ on call" badgeBg="#EAF6EE" badgeColor="#166534" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {VOICE_TURNS.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 8, flexShrink: 0, fontSize: 10, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: m.who === 'a' ? '#F3ECFF' : '#EAF0FE', color: m.who === 'a' ? '#7C3AED' : '#2A63F6',
                    }}>{m.who === 'a' ? 'AI' : <Glyph g="👤" size={13} />}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#334267', lineHeight: 1.4 }}>{m.text}</div>
                      <div style={{ fontSize: 10, color: '#8FA1BE', fontWeight: 700, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={COL}>
            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Task Execution" sub="Not just answering, completing the request" badge="1,905 done" badgeBg="#E9F8EF" badgeColor="#16A34A" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {VOICE_TASKS.map((r, i) => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF0FE', color: '#2A63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{r.s}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#16A34A', flexShrink: 0 }}>{<Glyph g="✓" size={13} />}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Human Handoff" sub="Escalated with the relevant customer context" badge="259 today" badgeBg="#FFF6E5" badgeColor="#B7791F" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 11, background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 12, padding: '10px 11px' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#2A63F6,#6C9BFF)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>MA</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 12.5 }}>Mariam A. · Ext 6013</div>
                  <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>Receiving the call with full context</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { t: 'Reason for the call', s: 'What the customer asked for' },
                  { t: 'What AI already did', s: 'Steps completed before the transfer' },
                  { t: 'Customer record', s: 'Identity, history and prior contacts' },
                ].map(r => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF6EE', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{<Glyph g="✓" size={12} />}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{r.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Section 2 — Conversation Intelligence
   Ported from the Claude Design project "Live mentions dashboard redesign"
   (Mentions Dashboard.dc.html). The .dc.html runs on the dc-runtime template
   engine; this is the same layout, palette and copy rebuilt as plain React so
   it renders inside the existing Agent Desktop shell. The design's own top nav
   is omitted because the shell already provides that exact chrome.
   ══════════════════════════════════════════════════ */
const MN = {
  bg: '#eef0f6', card: '#fff', line: '#eceef5', edge: '#e6e8f0',
  ink: '#1a1d29', ink2: '#2a2e40', ink3: '#3a3f52', muted: '#8a8fa3', faint: '#a2a7ba',
  purple: '#6d3ee6', purpleSoft: '#efeafd', green: '#16a34a', amber: '#f59e0b', red: '#ef4444',
  chip: '#f1f2f8', panel: '#f6f7fb',
};

type Brand = 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'google' | 'blogs' | 'news' | 'forums';

function BrandIcon({ platform, size }: { platform: Brand; size: number }) {
  const wrap = (background: string, child: React.ReactNode) => (
    <span style={{ width: size, height: size, borderRadius: '50%', background, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{child}</span>
  );
  const s = Math.round(size * 0.5);
  if (platform === 'twitter') return wrap('#1d9bf0', <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.7a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.5v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.6a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z" /></svg>);
  if (platform === 'facebook') return wrap('#1877f2', <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M15 3h3V0h-3c-2.8 0-5 2.2-5 5v3H7v3h3v13h3V11h3l1-3h-4V5c0-1.1.9-2 2-2z" /></svg>);
  if (platform === 'instagram') return wrap('linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', <svg width={Math.round(size * 0.52)} height={Math.round(size * 0.52)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="0.6" fill="#fff" /></svg>);
  if (platform === 'youtube') return wrap('#ff0000', <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>);
  if (platform === 'google') return wrap('#fff', (
    <svg width={Math.round(size * 0.55)} height={Math.round(size * 0.55)} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6C44 38 46.5 31.8 46.5 24.5z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.2C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.2z" />
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.6l-7.7-6c-2.1 1.4-4.7 2.3-7.5 2.3-6.3 0-11.6-4-13.5-9.7l-7.9 6.2C6.5 42.6 14.6 48 24 48z" />
    </svg>
  ));
  const glyphs: Record<string, string> = {
    blogs: 'M4 4h16v12H8l-4 4V4z',
    news: 'M4 3h16v18H4zM8 7h8M8 11h8M8 15h5',
    forums: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  };
  const colors: Record<string, string> = { blogs: '#6d5ce7', news: '#0ea5e9', forums: '#16a34a' };
  return wrap(MN.chip, <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={colors[platform] || MN.purple} strokeWidth={2} strokeLinecap="round"><path d={glyphs[platform] || glyphs.blogs} /></svg>);
}

const MN_FEED: { platform: Brand; name: string; action: string; text: string; tag: string; platformLabel: string; stars?: boolean; time: string; active?: boolean }[] = [
  { platform: 'twitter', name: '@techreviewer', action: 'mentioned you', text: 'Loving the new features from @inaipi! The AI agent is super helpful.', tag: 'Positive', platformLabel: '', time: '2m', active: true },
  { platform: 'facebook', name: 'Sarah J.', action: 'commented', text: 'This platform has improved our customer support workflow so much!', tag: 'Positive', platformLabel: 'Facebook', time: '5m' },
  { platform: 'google', name: 'John D.', action: 'reviewed', text: 'Excellent tool! Easy to use and powerful analytics.', tag: 'Positive', platformLabel: 'Google Review', stars: true, time: '15m' },
  { platform: 'instagram', name: '@digitalhub', action: 'mentioned you', text: 'How does @inaipi handle multilingual support? Asking for a client.', tag: 'Neutral', platformLabel: 'Twitter', time: '18m' },
  { platform: 'instagram', name: 'Lisa M.', action: 'sent a DM', text: 'Do you offer integration with Shopify?', tag: 'Question', platformLabel: 'Instagram', time: '25m' },
];
const MN_TAG_COLOR: Record<string, string> = { Positive: MN.green, Neutral: MN.muted, Question: MN.amber, Negative: MN.red };
const MN_PLATFORMS: [Brand, string, number][] = [['twitter', 'Twitter', 342], ['facebook', 'Facebook', 278], ['instagram', 'Instagram', 189], ['youtube', 'YouTube', 156], ['google', 'Google Reviews', 95]];
const MN_KEYWORDS: [string, number][] = [['#CustomerSupport', 156], ['#AIChatbot', 132], ['#inaipi', 98], ['#Automation', 76], ['#CustomerExperience', 64]];
const MN_LISTENING: [Brand, string][] = [['twitter', 'Twitter'], ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['youtube', 'YouTube'], ['google', 'Google Reviews'], ['blogs', 'Blogs'], ['news', 'News'], ['forums', 'Forums']];
const MN_QUICK: [string, string][] = [['AR', 'Auto Reply Rules'], ['SF', 'Smart Filters'], ['AI', 'AI Copilot Settings'], ['TA', 'Team Assignment'], ['TM', 'Tag Manager']];
/* sparkHist mapped through the design's own x=i*(200/13), y=52-((v-20)/45)*48 */
const MN_SPARK = '0.0,41.3 15.4,37.1 30.8,40.3 46.2,32.8 61.5,34.9 76.9,28.5 92.3,30.7 107.7,24.3 123.1,26.4 138.5,20.0 153.8,22.1 169.2,14.7 184.6,16.8 200.0,11.5';
const MN_POS = 65, MN_NEU = 20, MN_NEG = 15;

const railIcon = (d: string, active = false) => (
  <div style={{ width: 38, height: 38, borderRadius: 11, background: active ? MN.purple : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : MN.muted} strokeWidth={2} strokeLinecap="round"><path d={d} /></svg>
  </div>
);

function MnCard({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return <div style={{ background: MN.card, borderRadius: 15, padding: 10, ...style }}>{children}</div>;
}

export function MentionsView() {
  return (
    <div key="mentions" className="ad-rise ad-scroll" style={{ ...SHELL, padding: 0, background: MN.bg }}>
      <div style={{ display: 'flex', minHeight: '100%' }}>
        {/* Icon rail */}
        <aside style={{ width: 64, background: MN.card, borderRight: `1px solid ${MN.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0', flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: MN.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
          </div>
          {railIcon('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')}
          {railIcon('M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z')}
          {railIcon('M18 20V10M12 20V4M6 20v-6')}
          {railIcon('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a7 7 0 0 1 14 0v1')}
          {railIcon('M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z')}
          {railIcon('M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-7.6-4.7L3 21l5.7-1.9A8.38 8.38 0 0 1 21 11.5z')}
          {railIcon('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4')}
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, padding: 10, minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 292px', gap: 10, alignItems: 'start' }}>

            {/* ── Mention Feed ── */}
            <MnCard style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: MN.ink }}>Mention Feed</div>
                <span style={{ fontSize: 11, fontWeight: 600, color: MN.purple }}>120 new mentions</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {['All', 'Mentions', 'Comments', 'Reviews', 'DMs'].map((f, i) => (
                  <span key={f} style={{ background: i === 0 ? MN.purple : MN.chip, color: i === 0 ? '#fff' : '#5a5f74', fontSize: 10.5, fontWeight: i === 0 ? 700 : 600, padding: '5px 9px', borderRadius: 999 }}>{f}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {MN_FEED.map(m => (
                  <div key={m.name + m.time} style={{ border: `1px solid ${MN.line}`, borderRadius: 12, padding: 9, display: 'flex', flexDirection: 'column', gap: 5, background: m.active ? '#f6f3fe' : MN.card }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <BrandIcon platform={m.platform} size={26} />
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: MN.ink }}>{m.name}</span>
                      <span style={{ fontSize: 10.5, color: MN.muted }}>{m.action}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: MN.faint }}>{m.time}</span>
                    </div>
                    {m.stars && <div style={{ color: MN.amber, fontSize: 12, letterSpacing: 2 }}><Stars n={5} size={12} /></div>}
                    <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: MN.ink3 }}>{m.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {m.platformLabel && <span style={{ fontSize: 10, fontWeight: 600, color: '#6d5ce7' }}>{m.platformLabel}</span>}
                      <span style={{ fontSize: 10, fontWeight: 700, color: MN_TAG_COLOR[m.tag] }}>● {m.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MnCard>

            {/* ── Conversation ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1.4, background: MN.card, border: `2px solid ${MN.purple}`, borderRadius: 12, padding: '8px 11px', display: 'flex', gap: 8, alignItems: 'center', minWidth: 0 }}>
                  <BrandIcon platform="twitter" size={28} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: MN.ink }}>@techreviewer</span>
                      <span style={{ fontSize: 10.5, color: '#1d9bf0', fontWeight: 600 }}>• Twitter</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: MN.faint }}>2m ago</span>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: MN.green }}>● Positive</span>
                    </div>
                  </div>
                </div>
                {[['Sarah J.', 'Facebook'], ['John D.', 'Google Review'], ['Priya Nair', 'Instagram DM']].map(([n, p]) => (
                  <div key={n} style={{ flex: 1, background: MN.card, border: `1px solid ${MN.line}`, borderRadius: 12, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, minWidth: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: MN.ink, whiteSpace: 'nowrap' }}>{n}</span>
                    <span style={{ fontSize: 10, color: MN.muted, whiteSpace: 'nowrap' }}>• {p}</span>
                  </div>
                ))}
                <div style={{ background: MN.card, border: `1px solid ${MN.line}`, borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: MN.purple }}>+2</span>
                </div>
              </div>

              <MnCard style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                  <div style={{ background: MN.panel, borderRadius: 12, padding: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <BrandIcon platform="twitter" size={26} />
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: MN.ink }}>@techreviewer</span>
                      <span style={{ fontSize: 10.5, color: MN.muted }}>mentioned you</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: MN.ink2 }}>Loving the new features from @inaipi! The AI agent is super helpful.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 34, height: 32, border: `1px solid ${MN.edge}`, background: MN.card, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5f74" strokeWidth={2} strokeLinecap="round"><path d="M9 17l-5-5 5-5" /><path d="M4 12h11a5 5 0 0 1 5 5v2" /></svg>
                    </span>
                    <span style={{ width: 34, height: 32, border: `1px solid ${MN.edge}`, background: MN.card, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5f74" strokeWidth={2} strokeLinecap="round"><path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
                    </span>
                    <span style={{ background: MN.purple, color: '#fff', fontSize: 11.5, fontWeight: 700, padding: '8px 16px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
                      Reply <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#5a5f74' }}>Sentiment Score</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: MN.green, lineHeight: 1.1 }}>+0.78</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: MN.green }}>Positive</span>
                  <svg width="200" height="44" viewBox="0 0 200 52" style={{ marginTop: 4, maxWidth: '100%' }}>
                    <polyline points={MN_SPARK} fill="none" stroke={MN.green} strokeWidth={2} strokeLinejoin="round" />
                  </svg>
                </div>
              </MnCard>

              <MnCard style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ display: 'flex', gap: 18, borderBottom: `1px solid ${MN.line}`, paddingBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: MN.purple, borderBottom: `2px solid ${MN.purple}`, paddingBottom: 8, marginBottom: -9 }}>Reply</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: MN.muted }}>Internal Note</span>
                </div>
                <div style={{ border: `1px solid ${MN.edge}`, borderRadius: 10, padding: 11, fontSize: 11.5, color: MN.faint, height: 28 }}>Write your reply...</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 11 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MN.muted} strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MN.muted} strokeWidth={2} strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MN.muted} strokeWidth={2} strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MN.muted} strokeWidth={2} strokeLinecap="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" /></svg>
                  </div>
                  <span style={{ background: MN.purple, color: '#fff', fontSize: 11.5, fontWeight: 700, padding: '8px 16px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Send Reply
                  </span>
                </div>
                <div style={{ border: `1px solid ${MN.line}`, borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MN.purple} strokeWidth={2} strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2" /></svg>
                    <span style={{ fontSize: 12, fontWeight: 700, color: MN.purple }}>AI Suggestion</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: MN.purple, background: MN.purpleSoft, padding: '3px 7px', borderRadius: 6 }}>BETA</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6, color: MN.ink3 }}>Thank you so much! We&apos;re glad you&apos;re enjoying the new features. Let us know if you need any assistance!</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ border: `1px solid ${MN.edge}`, background: MN.panel, color: MN.ink2, fontSize: 11, fontWeight: 700, padding: '7px 13px', borderRadius: 9 }}>Use Suggestion</span>
                  </div>
                </div>
              </MnCard>

              <MnCard>
                <span style={{ fontSize: 12, fontWeight: 700, color: MN.ink }}>Listening To</span>
                <div style={{ display: 'flex', gap: 15, marginTop: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {MN_LISTENING.map(([p, label]) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, position: 'relative' }}>
                      <BrandIcon platform={p} size={30} />
                      <span style={{ position: 'absolute', top: -3, right: -4, width: 14, height: 14, borderRadius: '50%', background: MN.green, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      <span style={{ fontSize: 9.5, color: MN.muted }}>{label}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px dashed #c5c9da', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MN.muted, fontSize: 16 }}>+</div>
                    <span style={{ fontSize: 9.5, color: MN.muted }}>Add More</span>
                  </div>
                </div>
              </MnCard>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 9 }}>
                {MN_QUICK.map(([glyph, label]) => (
                  <div key={label} style={{ background: MN.card, border: `1px solid ${MN.line}`, borderRadius: 12, padding: 7, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: MN.purpleSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MN.purple, fontWeight: 800, fontSize: 11, flexShrink: 0 }}><Glyph g={glyph} size={12} /></span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.3, color: MN.ink }}>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Analytics sidebar ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <MnCard style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ margin: 0, fontSize: 13, fontWeight: 700, color: MN.ink }}>Platform Overview</div>
                  <span style={{ fontSize: 10, color: MN.faint }}>Last 7 days</span>
                </div>
                {MN_PLATFORMS.map(([p, name, count]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BrandIcon platform={p} size={24} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: MN.ink3 }}>{name}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: MN.ink }}>{count}</span>
                  </div>
                ))}
                <span style={{ fontSize: 11, fontWeight: 700, color: MN.purple, textAlign: 'center' }}>View all platforms</span>
              </MnCard>

              <MnCard style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ margin: 0, fontSize: 13, fontWeight: 700, color: MN.ink }}>Sentiment Overview</div>
                  <span style={{ fontSize: 10, color: MN.faint }}>Last 7 days</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 92, height: 92, borderRadius: '50%', flexShrink: 0, background: `conic-gradient(${MN.green} 0 ${MN_POS}%, ${MN.amber} ${MN_POS}% ${MN_POS + MN_NEU}%, ${MN.red} ${MN_POS + MN_NEU}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
                    {([['Positive', MN.green, MN_POS], ['Neutral', MN.amber, MN_NEU], ['Negative', MN.red, MN_NEG]] as [string, string, number][]).map(([label, colour, pct]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: colour, flexShrink: 0 }} />
                        <span style={{ color: MN.ink3, fontWeight: 600 }}>{label}</span>
                        <span style={{ marginLeft: 'auto', fontWeight: 700, color: MN.ink }}>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MnCard>

              <MnCard style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ margin: 0, fontSize: 13, fontWeight: 700, color: MN.ink }}>Top Keywords</div>
                  <span style={{ fontSize: 10, color: MN.faint }}>Last 7 days</span>
                </div>
                {MN_KEYWORDS.map(([tag, count]) => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: MN.ink3 }}>{tag}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: MN.ink }}>{count}</span>
                  </div>
                ))}
                <span style={{ fontSize: 11, fontWeight: 700, color: MN.purple, textAlign: 'center' }}>View all keywords</span>
              </MnCard>
            </section>
          </div>

          {/* ── Analytics Overview ── */}
          <section style={{ background: MN.card, border: '1px solid #e4d9fb', borderRadius: 15, padding: 9 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: MN.ink }}>Analytics Overview</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: `1px solid ${MN.edge}`, borderRadius: 9, padding: '6px 11px', fontSize: 11, fontWeight: 600, color: MN.ink3 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a5f74" strokeWidth={2} strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Aug 20 - Aug 26, 2026
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5a5f74" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              {([
                ['Total Mentions', '1,248', '↑ 18.5%', MN.green],
                ['Positive Mentions', '812', '↑ 65%', MN.green],
                ['Negative Mentions', '187', '↓ 15%', MN.red],
                ['Engagement Rate', '4.8%', '↑ 12.3%', MN.green],
                ['Avg. Response Time', '2m 34s', '↓ 8.7%', MN.red],
              ] as [string, string, string, string][]).map(([label, value, delta, colour], i) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 16px', borderRight: i < 4 ? `1px solid ${MN.line}` : undefined }}>
                  <span style={{ fontSize: 11, color: '#5a5f74', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: MN.ink, whiteSpace: 'nowrap' }}>
                    {value} <span style={{ fontSize: 11, fontWeight: 700, color: colour }}><Lead t={delta} size={11} /></span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
