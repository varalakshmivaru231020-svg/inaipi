'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Phone, MessageSquare, Mail, Search,
  Video, Paperclip, Send, Brain,
  PhoneForwarded, PauseCircle, PhoneOff,
  ExternalLink, Bell, Settings, ChevronRight, MoreHorizontal,
  CheckCircle2,
} from 'lucide-react';

const INITIAL_QUEUE = [
  { id: 1, name: 'John Smith',   type: 'WhatsApp', msg: 'Where is my order #1224?',         time: 2,  active: true,  color: 'text-blue-600',  dot: 'bg-blue-500',   seed: 'JohnSmith',   bg: 'b6e3f4' },
  { id: 2, name: 'Sarah Connor', type: 'Voice',    msg: 'Billing adjustment support',         time: 5,  active: false, color: 'text-blue-600',  dot: 'bg-blue-500',   seed: 'SarahConnor', bg: 'ffd5c8' },
  { id: 3, name: 'Alex Rivera',  type: 'Email',    msg: 'API documentation help needed',      time: 8,  active: false, color: 'text-blue-600',  dot: 'bg-blue-400',   seed: 'AlexRivera',  bg: 'c0aede' },
  { id: 4, name: 'Priya Nair',   type: 'Social',   msg: 'Complaint about service delay',      time: 11, active: false, color: 'text-blue-500',  dot: 'bg-blue-300',   seed: 'PriyaNair',   bg: 'd1f4d1' },
];

const NEW_ARRIVALS = [
  { id: 5, name: 'Omar Hassan',  type: 'WhatsApp', msg: 'Need invoice for last order',        time: 0,  active: false, color: 'text-blue-600',  dot: 'bg-blue-500',   seed: 'OmarHassan',  bg: 'ffdfbf' },
  { id: 6, name: 'Lena Müller',  type: 'Email',    msg: 'Refund not received after 7 days',   time: 0,  active: false, color: 'text-blue-600',  dot: 'bg-blue-400',   seed: 'LenaMuller',  bg: 'f4d1f4' },
];

const CONVERSATION = [
  { id: 1, side: 'customer', text: 'Hi, I made a purchase yesterday but my delivery date keeps changing. Can you check?', delay: 0 },
  { id: 2, side: 'ai',       text: 'Check carrier API for order #1224 shipment status. Customer is Gold Tier — offer priority upgrade proactively.', delay: 2200 },
  { id: 3, side: 'agent',    text: 'Of course, John. I can see your order for the Premium Console — let me pull up the live tracking right now.', delay: 4000 },
  { id: 4, side: 'customer', text: 'Thank you! Also, can I get free priority shipping? The delay is really inconvenient.', delay: 6500 },
  { id: 5, side: 'ai',       text: 'Offer free priority shipping upgrade — resolves 94% of similar complaints and raises NPS by avg 1.8 pts.', delay: 8200 },
  { id: 6, side: 'agent',    text: "Absolutely — I've applied a free priority upgrade to your order. You'll receive a confirmation on WhatsApp shortly!", delay: 10000 },
];

const customerStats = [
  { label: 'Lifetime Value', value: '$42,400' },
  { label: 'CSAT Score',     value: '4.8 / 5'  },
  { label: 'Open Cases',     value: '2'         },
  { label: 'Recent Orders',  value: '7'         },
];

export default function AgentDesktop() {
  const [messages, setMessages]     = useState<typeof CONVERSATION>([]);
  const [typing, setTyping]         = useState(false);
  const [typingSide, setTypingSide] = useState<'customer'|'agent'|null>(null);
  const [sentiment, setSentiment]   = useState(54);
  const [liveCount, setLiveCount]   = useState(1242);
  const [queue, setQueue]           = useState(INITIAL_QUEUE);
  const [arrivalIdx, setArrivalIdx] = useState(0);
  const [inView, setInView]         = useState(false);
  const [desktopImage, setDesktopImage] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatRef    = useRef<HTMLDivElement>(null);
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    fetch('/api/site-images')
      .then(r => r.json())
      .then(d => { if (d.agentDesktopImage) setDesktopImage(d.agentDesktopImage); });
  }, []);

  // Intersection observer — start only when visible
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Live counter ticks
  useEffect(() => {
    const id = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 3)), 1800);
    return () => clearInterval(id);
  }, []);

  // Queue timers increment
  useEffect(() => {
    const id = setInterval(() => {
      setQueue(q => q.map(item => ({ ...item, time: item.time + 1 })));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // New queue arrival
  useEffect(() => {
    if (!inView || arrivalIdx >= NEW_ARRIVALS.length) return;
    const id = setTimeout(() => {
      setQueue(q => [NEW_ARRIVALS[arrivalIdx], ...q]);
      setArrivalIdx(i => i + 1);
    }, 7000 + arrivalIdx * 9000);
    return () => clearTimeout(id);
  }, [inView, arrivalIdx]);

  // Conversation playback
  useEffect(() => {
    if (!inView) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    CONVERSATION.forEach((msg, i) => {
      // Show typing indicator 1.2s before message
      const typingT = setTimeout(() => {
        setTyping(true);
        setTypingSide(msg.side === 'customer' ? 'customer' : msg.side === 'agent' ? 'agent' : null);
      }, msg.delay);

      const msgT = setTimeout(() => {
        setTyping(false);
        setTypingSide(null);
        setMessages(prev => [...prev, msg]);
        // Bump sentiment as conversation resolves
        if (msg.side === 'agent') setSentiment(s => Math.min(94, s + 12));
        // Scroll chat to bottom
        setTimeout(() => {
          chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
        }, 50);
      }, msg.delay + 1200);

      timers.current.push(typingT, msgT);
    });

    return () => timers.current.forEach(clearTimeout);
  }, [inView]);

  const sentimentColor = sentiment >= 75 ? 'bg-blue-500' : sentiment >= 50 ? 'bg-blue-300' : 'bg-slate-400';
  const sentimentLabel = sentiment >= 75 ? 'Positive' : sentiment >= 50 ? 'Neutral' : 'Negative';
  const sentimentText  = sentiment >= 75 ? 'text-blue-600' : sentiment >= 50 ? 'text-blue-400' : 'text-slate-500';

  return (
    <section className="py-20 lg:py-24 overflow-hidden border-t border-blue-100/40 relative" id="solutions" ref={sectionRef} style={{ background: '#f8faff' }}>
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', top: '-220px', right: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '32vw', height: '32vw', bottom: '-160px', left: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-14 max-w-4xl">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-eyebrow">
          Unified Workspace
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5">
          The <span className="text-[#1447d4]">Agent Desktop.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Every channel, every customer, every insight — in one unified interface. No tab switching. No context loss.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {desktopImage ? (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl"
          >
            <img src={desktopImage} alt="Agent Desktop" className="w-full object-cover" />
          </motion.div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-[#f8fafc]"
        >
          {/* ── Top Bar ── */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-white/10 overflow-hidden" style={{ background: '#1447d4' }}>
            <div className="flex items-center gap-4">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1447d4] to-[#006fff] flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/thumbs/svg?seed=JamesDaemon&backgroundColor=dbeafe"
                  alt="James Daemon"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <p className="text-white text-xs font-bold">James Daemon</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Available</span>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 mx-2 hidden sm:block" />
              {[{ icon: Phone, count: 3, color: 'text-white/80' }, { icon: MessageSquare, count: 5, color: 'text-white/80' }, { icon: Mail, count: 8, color: 'text-white/80' }]
                .map((s, i) => (
                  <div key={i} className="hidden sm:flex items-center gap-1.5">
                    <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                    <span className="text-white/60 text-xs font-bold">{s.count}</span>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center hidden sm:block">
                <p className="text-white text-sm font-black">4.8</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wider">CSAT</p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-white text-sm font-black">1m42s</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wider">Avg Handle</p>
              </div>
              <motion.div
                key={liveCount}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[10px] font-black uppercase tracking-wider">Live: {liveCount.toLocaleString()}</span>
              </motion.div>
              <Bell className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Settings className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* ── 3 Panel Body ── */}
          <div className="grid grid-cols-12 h-[480px] sm:h-[560px] lg:h-[620px]">

            {/* LEFT — Queue */}
            <div className="col-span-3 border-r border-gray-100 flex-col bg-white hidden lg:flex">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <Search className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <input className="bg-transparent text-xs text-slate-500 focus:outline-none w-full placeholder:text-slate-300" placeholder="Search customers..." />
                </div>
                <div className="flex gap-2 mt-3">
                  {['All', 'Voice', 'Chat', 'Email'].map((f, i) => (
                    <button key={i} className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full transition-all ${i === 0 ? 'text-white' : 'bg-gray-100 text-slate-400 hover:bg-gray-200'}`} style={i === 0 ? { background: '#1447d4' } : {}}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 px-2 mb-3">Interaction Queue</p>
                <AnimatePresence>
                  {queue.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${item.active ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative shrink-0">
                          <img
                            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${item.seed}&backgroundColor=${item.bg}`}
                            alt={item.name}
                            className="w-8 h-8 rounded-full object-cover bg-slate-100"
                          />
                          <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${item.dot}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#0f172a] truncate">{item.name}</p>
                            <span className="text-[9px] text-slate-300 shrink-0 ml-1">{item.time}m</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className={`text-[9px] font-black uppercase tracking-wider ${item.color}`}>{item.type}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.msg}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* CENTER — Conversation */}
            <div className="col-span-12 lg:col-span-6 flex flex-col bg-white border-r border-gray-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/thumbs/svg?seed=JohnSmith&backgroundColor=b6e3f4"
                    alt="John Smith"
                    className="w-10 h-10 rounded-2xl object-cover bg-slate-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#0f172a]">John Smith</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">ID: 882910 · <span className="text-blue-500 font-bold">Gold Tier</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100"><Phone className="w-3.5 h-3.5 text-blue-600" /></div>
                  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100"><Video className="w-3.5 h-3.5 text-blue-600" /></div>
                  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100"><MoreHorizontal className="w-3.5 h-3.5 text-slate-400" /></div>
                </div>
              </div>

              {/* Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex ${msg.side === 'agent' ? 'justify-end' : msg.side === 'ai' ? 'justify-center' : 'justify-start'}`}
                    >
                      {msg.side === 'customer' && (
                        <div className="max-w-[72%] bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-sm text-[#0f172a] leading-relaxed">{msg.text}</p>
                          <p className="text-[9px] text-slate-400 mt-1.5">10:42 AM</p>
                        </div>
                      )}
                      {msg.side === 'agent' && (
                        <div className="max-w-[72%] rounded-2xl rounded-tr-sm px-4 py-3" style={{ background: '#1447d4' }}>
                          <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                          <p className="text-[9px] text-white/40 mt-1.5">10:45 AM</p>
                        </div>
                      )}
                      {msg.side === 'ai' && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 max-w-[90%]"
                        >
                          <Brain className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0 animate-pulse" />
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-wider text-blue-600 mb-1">AI Co-Pilot</p>
                            <p className="text-xs text-blue-800">{msg.text}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {typing && typingSide && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${typingSide === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`px-4 py-3 rounded-2xl flex items-center gap-1 ${typingSide === 'agent' ? '' : 'bg-gray-100'}`} style={typingSide === 'agent' ? { background: '#1447d4' } : {}}>
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${typingSide === 'agent' ? 'bg-white/60' : 'bg-slate-400'}`}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Voice controls */}
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-center gap-4">
                {[
                  { icon: PauseCircle,    label: 'Hold'     },
                  { icon: PhoneForwarded, label: 'Transfer' },
                  { icon: PhoneOff,       label: 'End',    danger: true },
                ].map((ctrl, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors ${'danger' in ctrl && ctrl.danger ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-100'}`}>
                    <ctrl.icon className="w-4 h-4" />
                    {ctrl.label}
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                  <p className="flex-1 text-sm text-slate-300 select-none">Type or use <span className="text-blue-400 font-bold">/</span> for AI commands...</p>
                  <Paperclip className="w-4 h-4 text-slate-300 hover:text-blue-600 cursor-pointer transition-colors" />
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-xl transition-all hover:brightness-110 shadow-sm" style={{ background: '#1447d4' }}>
                    <Send className="w-3.5 h-3.5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* RIGHT — AI Co-Pilot + Intelligence */}
            <div className="col-span-3 flex-col bg-[#fafafa] hidden lg:flex overflow-y-auto">
              {/* AI Co-Pilot */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Co-Pilot</p>
                  <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div className="space-y-2">
                  {['Offer free priority shipping upgrade to resolve friction.', 'Check carrier API for live status — order #1224.'].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 + 1 }}
                      className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 cursor-pointer hover:bg-blue-100 transition-colors group">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-blue-800 leading-relaxed">{s}</p>
                      <ChevronRight className="w-3 h-3 text-blue-400 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full mt-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-all hover:brightness-110 hover:shadow-md hover:shadow-blue-700/30" style={{ background: '#1447d4' }}>
                  Apply Suggestion
                </motion.button>
              </div>

              {/* Sentiment — animates live */}
              <div className="p-5 border-b border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Customer Sentiment</p>
                <div className="flex items-center justify-between mb-2">
                  <motion.span key={sentimentLabel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs font-bold ${sentimentText}`}>{sentimentLabel}</motion.span>
                  <motion.span key={sentiment} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-xs font-black text-[#0f172a]">{sentiment}%</motion.span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${sentiment}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${sentimentColor}`} />
                </div>
                <div className="flex gap-2 mt-2.5">
                  {[{ l: 'Positive', c: 'text-blue-500' }, { l: 'Neutral', c: 'text-slate-400' }, { l: 'Negative', c: 'text-slate-400' }].map((s, i) => (
                    <div key={i} className="flex-1 text-center">
                      <p className={`text-[8px] text-slate-300 uppercase tracking-wider`}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Intelligence */}
              <div className="p-5 border-b border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Customer Intelligence</p>
                <div className="space-y-2.5">
                  {customerStats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.5 }}
                      className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">{s.label}</span>
                      <span className="text-xs font-black text-[#0f172a]">{s.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CRM */}
              <div className="p-5 border-b border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">CRM Integration</p>
                <motion.div whileHover={{ borderColor: '#3b82f6' }}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer transition-colors group">
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#1447d4' }}>
                    <span className="text-white text-[8px] font-black">SF</span>
                  </div>
                  <span className="text-xs font-bold text-[#0f172a] flex-1">View in Salesforce</span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </motion.div>
              </div>

              {/* Notes */}
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Notes</p>
                <textarea className="w-full bg-white border border-gray-200 rounded-xl text-xs text-slate-500 p-3 focus:outline-none focus:border-blue-300 resize-none" rows={3}
                  defaultValue="Customer escalated twice before. Prefers WhatsApp updates." />
                <button className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-500 transition-colors">
                  Save & Create Follow-up
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
