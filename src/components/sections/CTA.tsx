'use client';

import {
  motion, useInView, AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight, CheckCheck,
  Phone, MessageSquare, Mail, Search,
  Brain, CheckCircle2, ChevronRight,
  Send, Paperclip,
  PauseCircle, PhoneForwarded, PhoneOff,
  Bell, Settings, MoreHorizontal, Video, ExternalLink,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const CUBE: [number, number, number, number] = [0.18, 0.82, 0.41, 1];

/* ── Mini AgentDesktop data ── */
const QUEUE = [
  { id: 1, name: 'John Smith',   type: 'WhatsApp', msg: 'Where is my order #1224?',       time: 2,  active: true,  dot: 'bg-blue-500', seed: 'JohnSmith',   bg: 'b6e3f4' },
  { id: 2, name: 'Sarah Connor', type: 'Voice',    msg: 'Billing adjustment support',       time: 5,  active: false, dot: 'bg-blue-400', seed: 'SarahConnor', bg: 'ffd5c8' },
  { id: 3, name: 'Alex Rivera',  type: 'Email',    msg: 'API documentation help needed',    time: 8,  active: false, dot: 'bg-blue-300', seed: 'AlexRivera',  bg: 'c0aede' },
];

const CONVO = [
  { id: 1, side: 'customer', text: 'Hi, my delivery date keeps changing. Can you check?', delay: 0 },
  { id: 2, side: 'ai',       text: 'Gold Tier customer — offer priority upgrade proactively.', delay: 2200 },
  { id: 3, side: 'agent',    text: "Let me pull up your live tracking right now, John.", delay: 4000 },
  { id: 4, side: 'customer', text: 'Can I get free priority shipping? The delay is inconvenient.', delay: 6500 },
  { id: 5, side: 'agent',    text: "Done — I've applied a free priority upgrade. You'll get a confirmation shortly!", delay: 8800 },
];

/* ── Inline mini desktop ── */
function MiniAgentDesktop() {
  const [messages, setMessages] = useState<typeof CONVO>([]);
  const [typing, setTyping]     = useState(false);
  const [typingSide, setTypingSide] = useState<string | null>(null);
  const [sentiment, setSentiment]  = useState(54);
  const [liveCount, setLiveCount]  = useState(1242);
  const [queue, setQueue]          = useState(QUEUE.map(q => ({ ...q })));
  const chatRef   = useRef<HTMLDivElement>(null);
  const rootRef   = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 3)), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setQueue(q => q.map(item => ({ ...item, time: item.time + 1 }))), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!inView) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    CONVO.forEach(msg => {
      const t1 = setTimeout(() => { setTyping(true); setTypingSide(msg.side); }, msg.delay);
      const t2 = setTimeout(() => {
        setTyping(false); setTypingSide(null);
        setMessages(prev => [...prev, msg]);
        if (msg.side === 'agent') setSentiment(s => Math.min(94, s + 18));
        setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }), 50);
      }, msg.delay + 1100);
      timers.current.push(t1, t2);
    });
    return () => timers.current.forEach(clearTimeout);
  }, [inView]);

  const sentimentColor = sentiment >= 75 ? '#3b82f6' : sentiment >= 50 ? '#93c5fd' : '#94a3b8';

  return (
    <div ref={rootRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', borderRadius: 'inherit', overflow: 'hidden' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=JamesDaemon&backgroundColor=dbeafe" alt="" style={{ width: 26, height: 26, borderRadius: 8 }} />
          <div>
            <p style={{ color: '#fff', fontSize: 10, fontWeight: 700, lineHeight: 1.2 }}>James Daemon</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
              <span style={{ fontSize: 8, color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Available</span>
            </div>
          </div>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 6px' }} />
          {[{ Icon: Phone, n: 3 }, { Icon: MessageSquare, n: 5 }, { Icon: Mail, n: 8 }].map(({ Icon, n }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon size={11} style={{ color: '#93c5fd' }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700 }}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div key={liveCount} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', padding: '3px 8px', borderRadius: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
            <span style={{ color: '#60a5fa', fontSize: 8, fontWeight: 700, textTransform: 'uppercase' }}>Live: {liveCount.toLocaleString()}</span>
          </motion.div>
          <Bell size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
          <Settings size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>

      {/* 3-column body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '26% 1fr 26%', minHeight: 0 }}>

        {/* LEFT queue */}
        <div style={{ borderRight: '1px solid #f1f5f9', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '5px 8px' }}>
              <Search size={10} style={{ color: '#cbd5e1' }} />
              <span style={{ fontSize: 9, color: '#94a3b8' }}>Search customers...</span>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              {['All', 'Voice', 'Chat'].map((f, i) => (
                <span key={i} style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 20, background: i === 0 ? '#2563eb' : '#f1f5f9', color: i === 0 ? '#fff' : '#94a3b8', letterSpacing: '0.05em' }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            <p style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#cbd5e1', padding: '0 4px', marginBottom: 6 }}>Queue</p>
            <AnimatePresence>
              {queue.map(item => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ padding: '7px 8px', borderRadius: 10, border: '1px solid', borderColor: item.active ? '#bfdbfe' : 'transparent', background: item.active ? '#eff6ff' : 'transparent', marginBottom: 4, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${item.seed}&backgroundColor=${item.bg}`} alt="" style={{ width: 22, height: 22, borderRadius: '50%' }} />
                      <span style={{ position: 'absolute', bottom: 0, right: 0, width: 6, height: 6, borderRadius: '50%', border: '1px solid #fff', background: '#3b82f6', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                        <span style={{ fontSize: 8, color: '#cbd5e1', flexShrink: 0 }}>{item.time}m</span>
                      </div>
                      <p style={{ fontSize: 8, color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.type}</p>
                      <p style={{ fontSize: 8, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.msg}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER conversation */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRight: '1px solid #f1f5f9' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=JohnSmith&backgroundColor=b6e3f4" alt="" style={{ width: 28, height: 28, borderRadius: 8 }} />
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#0f172a' }}>John Smith</p>
                <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gold Tier · <span style={{ color: '#2563eb', fontWeight: 700 }}>WhatsApp</span></p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                <div key={i} style={{ padding: 5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, cursor: 'pointer' }}>
                  <Icon size={10} style={{ color: i < 2 ? '#2563eb' : '#94a3b8' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: CUBE }}
                  style={{ display: 'flex', justifyContent: msg.side === 'agent' ? 'flex-end' : msg.side === 'ai' ? 'center' : 'flex-start' }}>
                  {msg.side === 'customer' && (
                    <div style={{ maxWidth: '75%', background: '#f1f5f9', borderRadius: '10px 10px 10px 2px', padding: '6px 10px' }}>
                      <p style={{ fontSize: 9, color: '#0f172a', lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                  )}
                  {msg.side === 'agent' && (
                    <div style={{ maxWidth: '75%', background: '#2563eb', borderRadius: '10px 10px 2px 10px', padding: '6px 10px' }}>
                      <p style={{ fontSize: 9, color: '#fff', lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                  )}
                  {msg.side === 'ai' && (
                    <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 5, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '5px 8px', maxWidth: '90%' }}>
                      <Brain size={9} style={{ color: '#3b82f6', marginTop: 1, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2563eb', marginBottom: 2 }}>AI Co-Pilot</p>
                        <p style={{ fontSize: 9, color: '#1e40af', lineHeight: 1.4 }}>{msg.text}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              {typing && typingSide && (
                <motion.div key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', justifyContent: typingSide === 'agent' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ padding: '7px 10px', borderRadius: 10, background: typingSide === 'agent' ? '#2563eb' : '#f1f5f9', display: 'flex', alignItems: 'center', gap: 3 }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: typingSide === 'agent' ? 'rgba(255,255,255,0.6)' : '#94a3b8', display: 'block' }}
                        animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Voice controls */}
          <div style={{ padding: '6px 12px', borderTop: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'center', gap: 8, flexShrink: 0 }}>
            {[{ Icon: PauseCircle, label: 'Hold' }, { Icon: PhoneForwarded, label: 'Transfer' }, { Icon: PhoneOff, label: 'End', danger: true }].map(({ Icon, label, danger }, i) => (
              <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 8, cursor: 'pointer', background: danger ? '#fee2e2' : '#fff', border: danger ? 'none' : '1px solid #e2e8f0' } as React.CSSProperties}>
                <Icon size={11} style={{ color: danger ? '#ef4444' : '#64748b' }} />
                <span style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', color: danger ? '#ef4444' : '#64748b' }}>{label}</span>
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '6px 10px' }}>
              <span style={{ flex: 1, fontSize: 9, color: '#cbd5e1' }}>Type or use <span style={{ color: '#3b82f6', fontWeight: 700 }}>/</span> for AI...</span>
              <Paperclip size={10} style={{ color: '#cbd5e1' }} />
              <div style={{ background: '#2563eb', padding: '4px 5px', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={9} style={{ color: '#fff' }} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AI panel */}
        <div style={{ background: '#fafafa', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Co-Pilot */}
          <div style={{ padding: '10px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <Brain size={11} style={{ color: '#2563eb' }} />
              <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8' }}>AI Co-Pilot</p>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', display: 'block' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Offer free priority shipping upgrade.', 'Check carrier API — order #1224.'].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 + 1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 5, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '5px 7px', cursor: 'pointer' }}>
                  <CheckCircle2 size={9} style={{ color: '#3b82f6', marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 8, color: '#1e40af', lineHeight: 1.4 }}>{s}</p>
                  <ChevronRight size={8} style={{ color: '#93c5fd', marginTop: 1, flexShrink: 0 }} />
                </motion.div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: 7, padding: '5px 0', background: '#2563eb', border: 'none', borderRadius: 8, fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', cursor: 'pointer' }}>
              Apply Suggestion
            </button>
          </div>

          {/* Sentiment */}
          <div style={{ padding: '10px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 6 }}>Sentiment</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#2563eb' }}>{sentiment >= 75 ? 'Positive' : 'Neutral'}</span>
              <motion.span key={sentiment} initial={{ scale: 1.3 }} animate={{ scale: 1 }} style={{ fontSize: 9, fontWeight: 700, color: '#0f172a' }}>{sentiment}%</motion.span>
            </div>
            <div style={{ height: 4, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div animate={{ width: `${sentiment}%` }} transition={{ duration: 0.8 }}
                style={{ height: '100%', background: sentimentColor, borderRadius: 4 }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ padding: '10px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 6 }}>Customer Intel</p>
            {[['Lifetime Value', '$42,400'], ['CSAT Score', '4.8/5'], ['Open Cases', '2']].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 8, color: '#94a3b8' }}>{l}</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: '#0f172a' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* CRM */}
          <div style={{ padding: '10px 10px' }}>
            <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 6 }}>CRM</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}>
              <div style={{ width: 16, height: 16, background: '#2563eb', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 6, fontWeight: 700 }}>SF</span>
              </div>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#0f172a', flex: 1 }}>View in Salesforce</span>
              <ExternalLink size={9} style={{ color: '#cbd5e1' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CTA() {
  const imgRef  = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <section className="py-16 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '40vw', height: '40vw', top: '-160px', right: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: '28vw', height: '28vw', bottom: '-120px', left: '-140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 30 }}>

          {/* ── Pulsing blurry bg blobs (replicates saasking cta-1-bg-img scale pulse) ── */}
          <motion.div
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
            style={{ position: 'absolute', top: -70, left: -70, width: 'calc(100% + 140px)', height: 'calc(100% + 140px)', pointerEvents: 'none', zIndex: 0, borderRadius: 40, overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', width: '70%', height: '80%', bottom: '-10%', left: '-5%', background: 'rgba(0,55,204,0.9)', borderRadius: '50%', filter: 'blur(55px)' }} />
              <div style={{ position: 'absolute', width: '45%', height: '120%', top: '-10%', left: '30%', background: 'linear-gradient(160deg,rgba(0,71,255,0.85),rgba(77,138,255,0.6),transparent)', borderRadius: '40% 60% 60% 40%/50%', filter: 'blur(45px)', transform: 'rotate(-15deg)' }} />
              <div style={{ position: 'absolute', width: '55%', height: '70%', top: '-5%', right: '-5%', background: 'rgba(116,68,253,0.85)', borderRadius: '50%', filter: 'blur(50px)' }} />
              <div style={{ position: 'absolute', width: '35%', height: '50%', top: '20%', left: '15%', background: 'rgba(56,189,248,0.4)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', width: '30%', height: '90%', top: '5%', right: '15%', background: 'linear-gradient(180deg,rgba(99,102,241,0.7),rgba(0,71,255,0.4))', borderRadius: '40%', filter: 'blur(48px)', transform: 'rotate(10deg)' }} />
            </div>
          </motion.div>

          {/* ── Main dark card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: CUBE }}
            style={{ position: 'relative', background: '#000', borderRadius: 30, padding: '80px', overflow: 'hidden', zIndex: 1 }}
          >
            {/* Color glow LEFT — blue */}
            <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, width: '63%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 80% at 0% 100%,rgba(0,71,255,0.7),rgba(0,71,255,0.3) 35%,transparent 65%)', clipPath: 'ellipse(80% 90% at 10% 90%)' }} />
            {/* Color glow RIGHT — purple */}
            <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '39%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 80% at 100% 0%,rgba(116,68,253,0.65),rgba(37,99,235,0.25) 45%,transparent 70%)', clipPath: 'ellipse(90% 80% at 90% 10%)' }} />

            {/* Inner layout */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>

              {/* ── LEFT: text + form ── */}
              <div style={{ maxWidth: 460, color: '#fff', flexShrink: 0 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: CUBE }}
                  style={{ fontSize: 'clamp(30px,3.2vw,40px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 22, color: '#fff' }}
                >
                  Ready to transform your{' '}
                  <span style={{ color: '#4d8aff' }}>CX?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.55, ease: CUBE }}
                  style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 55 }}
                >
                  Join thousands of teams boosting CX with our all-in-one cloud contact center platform.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.55, ease: CUBE }}
                  style={{ display: 'flex', gap: 14 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    style={{ height: 52, padding: '0 28px', background: '#0047FF', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', position: 'relative' }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                      style={{ position: 'absolute', inset: 0, width: '30%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)', transform: 'skewX(-12deg)', pointerEvents: 'none' }}
                    />
                    <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial</span>
                    <ArrowRight size={15} style={{ position: 'relative', zIndex: 1 }} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    style={{ height: 52, padding: '0 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', backdropFilter: 'blur(12px)' }}
                  >
                    Book a Demo
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.38 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 20 }}
                >
                  {['Cancel anytime', 'SOC 2 Certified', 'Live in 48 hours'].map((t, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 600 }}
                    >
                      <CheckCheck size={13} style={{ color: '#4ade80', flexShrink: 0 }} />
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Agent Desktop (saasking-style slide-in from bottom-right) ── */}
              <div
                ref={imgRef}
                style={{ width: '51%', position: 'absolute', bottom: 0, right: 0, zIndex: 0 }}
              >
                {/* Glass layer 2 — slides in at 0.3s */}
                <motion.div
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 150, y: 150 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: CUBE }}
                  style={{ width: '100%', height: '107%', background: 'rgba(77,138,255,0.08)', backdropFilter: 'blur(6px)', borderRadius: 12, transform: 'matrix(1,0,0.5,0.87,0,0)', position: 'absolute', top: 24, right: -89, zIndex: -2, border: '1px solid rgba(77,138,255,0.15)' }}
                />
                {/* Glass layer 1 — slides in at 0.6s */}
                <motion.div
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 150, y: 150 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: CUBE }}
                  style={{ width: '100%', height: '110%', background: 'rgba(0,71,255,0.1)', backdropFilter: 'blur(6px)', borderRadius: 12, transform: 'matrix(1,0,0.5,0.87,0,0)', position: 'absolute', top: 0, right: -103, zIndex: -1, border: '1px solid rgba(0,71,255,0.2)' }}
                />
                {/* Agent Desktop — slides in at 0.9s */}
                <motion.div
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 150, y: 150 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: CUBE }}
                  style={{ borderRadius: '12px 0 0 0', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', height: 380 }}
                >
                  <MiniAgentDesktop />
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
