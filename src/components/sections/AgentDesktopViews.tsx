'use client';

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
        <div style={{ width: 46, height: 46, borderRadius: 14, background: markBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>{mark}</div>
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
  { icon: '💬', bg: '#E9F8EF', color: '#16A34A', text: 'Delivery notification delivered on WhatsApp — read receipt confirmed', time: '4m ago' },
  { icon: '🔁', bg: '#F3ECFF', color: '#7C3AED', text: 'No answer on win-back outreach — follow-up scheduled automatically', time: '6m ago' },
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
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{c.icon}</span>
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
                    <span style={{ width: 28, height: 28, borderRadius: 9, background: a.bg, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{a.icon}</span>
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
  { who: 'a', text: 'Of course — I can see order #4521 is still in processing, so the address can be updated.', time: '14:02' },
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
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{c.icon}</span>
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
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF6EE', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</span>
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
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{c.icon}</span>
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
                  <span style={{ fontWeight: 800, fontSize: 12.5, color: '#B7791F' }}>★ {c.score}</span>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, padding: '12px 15px' }}>
              <PanelHead title="Automated Triggers" sub="Surveys fire automatically after customer interactions" badge="auto" badgeBg="#E9F8EF" badgeColor="#16A34A" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                {SUR_TRIGGERS.map(t => (
                  <div key={t.t} style={{ background: '#F7FAFF', border: '1px solid #EDF2FA', borderRadius: 12, padding: '11px 12px' }}>
                    <span style={{ width: 28, height: 28, borderRadius: 9, background: t.bg, color: t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginBottom: 8 }}>{t.icon}</span>
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
                      <span style={{ fontWeight: 800, fontSize: 12.5, color: g.color, fontVariantNumeric: 'tabular-nums' }}>{g.trend} {g.score}</span>
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
  { who: 'a', text: 'Happy to help. I can see a service visit booked for Tuesday at 10am — what day suits you better?', time: '00:07' },
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
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: v.bg, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{v.icon}</span>
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
                    }}>{m.who === 'a' ? 'AI' : '👤'}</span>
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
              <PanelHead title="Task Execution" sub="Not just answering — completing the request" badge="1,905 done" badgeBg="#E9F8EF" badgeColor="#16A34A" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {VOICE_TASKS.map((r, i) => (
                  <div key={r.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF0FE', color: '#2A63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 10.5, color: '#8FA1BE', fontWeight: 700 }}>{r.s}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#16A34A', flexShrink: 0 }}>✓</span>
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
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF6EE', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</span>
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
