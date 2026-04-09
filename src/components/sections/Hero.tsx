'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Mail, Globe, Star, Zap, PhoneIncoming, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ── Typewriter ── */
function TypewriterWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay * 1000); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started || displayed.length >= word.length) return;
    const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    return () => clearTimeout(t);
  }, [started, displayed, word]);
  return (
    <span className={className}>
      {displayed}
      {displayed.length < word.length && started && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[3px] h-[0.85em] bg-blue-500 ml-[2px] align-middle" />
      )}
    </span>
  );
}

/* ── AI Copilot Chat ── */
// Each message: role, text, delay from start (ms), optional typingMs before it appears
const LIVE_CONVO: { role: 'customer' | 'ai'; text: string; delay: number; typing?: number }[] = [
  { role: 'customer', text: 'Hi, my order #1224 was due yesterday. Any update?',                           delay: 600 },
  { role: 'ai',       text: 'Hi Sarah! Let me check order #1224 for you right now...',                     delay: 1800, typing: 900 },
  { role: 'ai',       text: 'Found it! Your order was held at customs in Dubai. It cleared this morning and is out for delivery — arriving today by 6 PM. 🚚', delay: 4000, typing: 1400 },
  { role: 'customer', text: 'Oh great! Can I get the tracking link?',                                      delay: 6200 },
  { role: 'ai',       text: '📦 track.inaipi.com/1224-DXB\n\nAlso sent to your email!',                   delay: 7600, typing: 1000 },
  { role: 'customer', text: 'Perfect, thank you! 😊',                                                     delay: 9400 },
  { role: 'ai',       text: 'Happy to help! Is there anything else I can do for you today?',               delay: 10800, typing: 800 },
];

function AICopilotChat() {
  const [shown, setShown]       = useState<typeof LIVE_CONVO>([]);
  const [typing, setTyping]     = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LIVE_CONVO.forEach((msg, i) => {
      if (msg.typing) {
        timers.push(setTimeout(() => setTyping(true),  msg.delay));
        timers.push(setTimeout(() => { setTyping(false); setShown(p => [...p, msg]); }, msg.delay + msg.typing));
      } else {
        timers.push(setTimeout(() => setShown(p => [...p, msg]), msg.delay));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' }); }, [shown, typing]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5 overflow-y-auto scrollbar-none flex-1">
      {shown.map((msg, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[88%] px-2.5 py-1.5 rounded-xl text-[9px] leading-snug font-medium whitespace-pre-line ${
            msg.role === 'customer' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-600 rounded-bl-none'
          }`}>{msg.text}</div>
        </motion.div>
      ))}
      {typing && (
        <div className="flex justify-start">
          <div className="bg-slate-100 rounded-xl rounded-bl-none px-3 py-2 flex gap-1 items-center">
            {[0,1,2].map(i => <motion.span key={i} animate={{ y: [0,-3,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} className="w-1 h-1 rounded-full bg-blue-400 block" />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Live Call Card ── */
const CALLS = [
  { id: 1, text: 'My order #1224 is delayed',    channel: 'WhatsApp', avatar: '/images/people/person_1.png', name: 'Sarah K.', color: 'bg-green-500', delay: 1000 },
  { id: 2, text: 'Billing issue on my account',  channel: 'Voice',    avatar: '/images/people/person_2.png',  name: 'Marco R.', color: 'bg-blue-500', delay: 3200 },
  { id: 3, text: 'Need API integration help',    channel: 'Email',    avatar: '/images/people/person_3.png',    name: 'Alex L.',  color: 'bg-indigo-500', delay: 5400 },
  { id: 4, text: 'Complaint about service delay', channel: 'Chat',   avatar: '/images/people/person_4.png',   name: 'Priya N.', color: 'bg-violet-500', delay: 7600 },
];

const CH_ICONS: Record<string, React.ElementType> = { Voice: Phone, WhatsApp: MessageSquare, Email: Mail, Chat: Globe };

/* ── Brand Icons ── */
const SalesforceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.02 4.28a4.27 4.27 0 0 1 3.07 1.3 5.8 5.8 0 0 1 2.3-.48 5.84 5.84 0 0 1 5.84 5.84c0 .28-.02.55-.06.82A4.15 4.15 0 0 1 22 15.1a4.15 4.15 0 0 1-4.15 4.15c-.2 0-.4-.01-.59-.04a3.56 3.56 0 0 1-3.17 1.94 3.53 3.53 0 0 1-1.74-.45A4.27 4.27 0 0 1 8.3 22a4.27 4.27 0 0 1-4-2.77 3.73 3.73 0 0 1-.56.04A3.74 3.74 0 0 1 0 15.53a3.74 3.74 0 0 1 2.1-3.35 4.87 4.87 0 0 1-.18-1.32 4.88 4.88 0 0 1 4.88-4.88c.3 0 .6.03.89.08A4.27 4.27 0 0 1 10.02 4.28z" fill="#00A1E0"/>
  </svg>
);
const TeamsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4.5h-6v2h4.5v11H20V4.5z" fill="#5059C9"/>
    <path d="M14 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#5059C9"/>
    <path d="M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 2.5A1.5 1.5 0 0 0 2.5 12v5A4.5 4.5 0 0 0 7 21.5 4.5 4.5 0 0 0 11.5 17v-5A1.5 1.5 0 0 0 10 10.5H4z" fill="#7B83EB"/>
    <path d="M9 10.5H4a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 0 0-3z" fill="white" fillOpacity="0.3"/>
  </svg>
);
const HubSpotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.16 8.75V6.54a1.56 1.56 0 0 0 .9-1.41V5.1a1.56 1.56 0 0 0-1.56-1.56h-.03A1.56 1.56 0 0 0 15.9 5.1v.03a1.56 1.56 0 0 0 .9 1.41v2.21a4.43 4.43 0 0 0-2.1.92L8.4 5.4a1.75 1.75 0 1 0-.86 1.5l6.1 4.18a4.43 4.43 0 0 0-.6 2.2 4.43 4.43 0 0 0 .6 2.2l-1.87 1.87a1.5 1.5 0 0 0-.44-.07 1.56 1.56 0 1 0 1.56 1.56 1.5 1.5 0 0 0-.07-.44l1.85-1.85a4.45 4.45 0 1 0 3.49-7.8z" fill="#FF7A59"/>
  </svg>
);
const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5H8a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h8.5c.28 0 .5.22.5.5v6.5a.5.5 0 0 1-.5.5zm2.5-1.25-2-1.5V11.25l2-1.5v4.5z" fill="#2D8CFF"/>
  </svg>
);
const AvayaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#cc0000" />
    <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="900" fill="white" fontFamily="sans-serif">AV</text>
  </svg>
);
const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.04 15.12a2.04 2.04 0 0 1-2.04 2.04A2.04 2.04 0 0 1 .96 15.12a2.04 2.04 0 0 1 2.04-2.04h2.04v2.04zm1.02 0a2.04 2.04 0 0 1 2.04-2.04 2.04 2.04 0 0 1 2.04 2.04v5.1a2.04 2.04 0 0 1-2.04 2.04 2.04 2.04 0 0 1-2.04-2.04v-5.1z" fill="#E01E5A"/>
    <path d="M8.1 5.04a2.04 2.04 0 0 1-2.04-2.04A2.04 2.04 0 0 1 8.1.96a2.04 2.04 0 0 1 2.04 2.04v2.04H8.1zm0 1.02a2.04 2.04 0 0 1 2.04 2.04 2.04 2.04 0 0 1-2.04 2.04H2.96A2.04 2.04 0 0 1 .92 8.1a2.04 2.04 0 0 1 2.04-2.04H8.1z" fill="#36C5F0"/>
    <path d="M18.96 8.1a2.04 2.04 0 0 1 2.04-2.04A2.04 2.04 0 0 1 23.04 8.1a2.04 2.04 0 0 1-2.04 2.04h-2.04V8.1zm-1.02 0a2.04 2.04 0 0 1-2.04 2.04 2.04 2.04 0 0 1-2.04-2.04V2.96A2.04 2.04 0 0 1 15.9.92a2.04 2.04 0 0 1 2.04 2.04V8.1z" fill="#2EB67D"/>
    <path d="M15.9 18.96a2.04 2.04 0 0 1 2.04 2.04A2.04 2.04 0 0 1 15.9 23.04a2.04 2.04 0 0 1-2.04-2.04v-2.04h2.04zm0-1.02a2.04 2.04 0 0 1-2.04-2.04 2.04 2.04 0 0 1 2.04-2.04h5.14a2.04 2.04 0 0 1 2.04 2.04 2.04 2.04 0 0 1-2.04 2.04H15.9z" fill="#ECB22E"/>
  </svg>
);

/* ── Data ── */
const AGENTS = [
  { name: 'Jonathan Evans',  dept: 'Sales',        ext: '2309', avatar: '/images/agents/agent_1.png',  color: 'bg-blue-500',   active: false },
  { name: 'Fatima Al-Rashid',dept: 'Front Office', ext: '6014', avatar: '/images/agents/agent_2.png',  color: 'bg-indigo-500', active: true  },
  { name: 'Adam Smith',      dept: 'Loan Ops',     ext: '7756', avatar: '/images/people/person_1.png', color: 'bg-blue-400',   active: false },
  { name: 'Nancy',           dept: 'Sales',        ext: '2534', avatar: '/images/people/person_2.png', color: 'bg-violet-500', active: false },
  { name: 'Ravi Kumar',      dept: 'Support',      ext: '3301', avatar: '/images/people/person_3.png', color: 'bg-blue-600',   active: false },
  { name: 'Sara M.',         dept: 'Finance',      ext: '4420', avatar: '/images/people/person_4.png', color: 'bg-indigo-400', active: false },
  { name: 'Marco Rossi',     dept: 'Tech Support', ext: '8821', avatar: '/images/people/person_2.png', color: 'bg-sky-500',    active: true  },
  { name: 'Priya Nair',      dept: 'Success',      ext: '1205', avatar: '/images/people/person_3.png', color: 'bg-emerald-500', active: false },
  { name: 'Zhang Wei',       dept: 'Operations',   ext: '4092', avatar: '/images/people/person_4.png', color: 'bg-amber-500',   active: false },
  { name: 'Elena Petrova',   dept: 'Retention',    ext: '5501', avatar: '/images/people/person_1.png', color: 'bg-rose-500',    active: false },
];

const INTEGRATIONS = [
  { name: 'Salesforce',      sub: 'CRM',          dot: 'bg-green-400',  icon: SalesforceIcon },
  { name: 'Microsoft Teams', sub: 'Collaboration', dot: 'bg-green-400',  icon: TeamsIcon      },
  { name: 'HubSpot',         sub: 'CRM',          dot: 'bg-yellow-400', icon: HubSpotIcon    },
  { name: 'Zoom Phone',      sub: 'Telephony',     dot: 'bg-green-400',  icon: ZoomIcon       },
  { name: 'Slack',           sub: 'Collaboration', dot: 'bg-green-400',  icon: SlackIcon  },
  { name: 'Avaya',           sub: 'Telephony',     dot: 'bg-red-500',    icon: AvayaIcon  },
];

const CSAT_BARS = [
  { label: 'Very Satisfied', pct: 68, color: 'bg-blue-500' },
  { label: 'Satisfied',      pct: 22, color: 'bg-blue-300' },
  { label: 'Neutral',        pct: 7,  color: 'bg-slate-300' },
  { label: 'Dissatisfied',   pct: 3,  color: 'bg-red-300'  },
];

const RECENT_REVIEWS = [
  { name: 'Ravi K.',  stars: 5, time: '2m', avatar: '/images/people/person_1.png' },
  { name: 'Sara M.',  stars: 4, time: '5m', avatar: '/images/people/person_2.png' },
  { name: 'Ahmed K.', stars: 5, time: '9m', avatar: '/images/people/person_3.png' },
];



/* ══════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const cardY       = useTransform(scrollYProgress, [0, 0.2],  [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const [calls,         setCalls        ] = useState<typeof CALLS>([]);
  const [activeCallIdx, setActiveCallIdx] = useState<number | null>(null);
  const [_pulseStage,    setPulseStage   ] = useState(0);
  const [_resolvedCount, setResolvedCount] = useState(0);
  const [_csatScore,     setCsatScore    ] = useState(4.6);
  const callListRef = useRef<HTMLDivElement>(null);

  /* incoming calls */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    CALLS.forEach((c, idx) => {
      const t = setTimeout(() => {
        setCalls(prev => prev.find(p => p.name === c.name) ? prev : [...prev, c]);
        setTimeout(() => callListRef.current?.scrollTo({ top: callListRef.current.scrollHeight, behavior: 'smooth' }), 50);
      }, c.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  /* cycle active call */
  useEffect(() => {
    const id = setInterval(() => setActiveCallIdx(i => i === null ? 0 : (i + 1) % CALLS.length), 2800);
    return () => clearInterval(id);
  }, []);

  /* pipeline pulse */
  useEffect(() => {
    const id = setInterval(() => setPulseStage(s => (s + 1) % 5), 800);
    return () => clearInterval(id);
  }, []);

  /* resolved tick */
  useEffect(() => {
    const id = setInterval(() => setResolvedCount(c => c + 1), 3200);
    return () => clearInterval(id);
  }, []);

  /* csat nudge */
  useEffect(() => {
    const id = setInterval(() => setCsatScore(s => parseFloat(Math.min(5, s + 0.01).toFixed(2))), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] pt-32 pb-0 flex flex-col items-center overflow-visible" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Base gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />

        {/* Full dot grid */}
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)`, backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />

        {/* Horizontal grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)`, maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />

        {/* Large center aurora blob */}
        <motion.div className="absolute rounded-full" style={{ width: 1100, height: 1100, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(99,102,241,0.18) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Left indigo blob */}
        <motion.div className="absolute rounded-full" style={{ width: 800, height: 800, top: '5%', left: '-20%', background: 'radial-gradient(circle, rgba(99,102,241,0.26) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Right violet blob */}
        <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, top: '0%', right: '-15%', background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, -60, 0], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

        {/* Small floating orbs */}
        <motion.div className="absolute w-3 h-3 rounded-full bg-blue-500/40" style={{ top: '18%', left: '12%', filter: 'blur(2px)' }} animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-indigo-400/50" style={{ top: '28%', right: '14%', filter: 'blur(1px)' }} animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.div className="absolute w-4 h-4 rounded-full bg-violet-400/30" style={{ top: '10%', left: '38%', filter: 'blur(3px)' }} animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-blue-400/50" style={{ top: '35%', left: '22%', filter: 'blur(1px)' }} animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
        <motion.div className="absolute w-3 h-3 rounded-full bg-indigo-500/35" style={{ top: '20%', right: '28%', filter: 'blur(2px)' }} animate={{ y: [0, -16, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />

        {/* Spotlight cone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]" style={{ background: 'conic-gradient(from 255deg at 50% 0%, transparent 15%, rgba(37,99,235,0.18) 30%, rgba(99,102,241,0.22) 50%, rgba(37,99,235,0.18) 70%, transparent 85%)', filter: 'blur(18px)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px]" style={{ boxShadow: '0 0 180px 90px rgba(37,99,235,0.35), 0 0 280px 140px rgba(99,102,241,0.16)' }} />

        {/* Thin light beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[40%]" style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.6) 0%, transparent 100%)' }} />
        <div className="absolute top-0 left-[42%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(6deg)', transformOrigin: 'top' }} />
        <div className="absolute top-0 left-[58%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-80" style={{ background: 'linear-gradient(to top, #f5f0ff 0%, transparent 100%)' }} />
      </div>

      {/* ── Hero Text ── */}
      <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-blue-100 bg-white shadow-sm mb-8">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600">The AI-Native CX Engine</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-figtree tracking-[-0.03em] mb-8 leading-[1.25] text-[#0f172a] max-w-5xl mx-auto overflow-visible">
          <div className="block mb-1 overflow-visible pb-3">
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="inline-block mr-[0.25em]">
              Autonomous
            </motion.span>
            <TypewriterWord word="Intelligence" delay={1.1} className="inline-block text-[#1447d4] pb-2 leading-none" />
          </div>
          <div className="block whitespace-nowrap">
            {['for', 'Every', 'Customer', 'Interaction'].map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 2.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="inline-block mr-[0.25em] last:mr-0">
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subtext */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 3.0, ease: [0.16, 1, 0.3, 1] }} className="mb-10 px-4">
          <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
            Inaipi transforms the customer experience journey into a single intelligent ecosystem — unifying every touchpoint with precision and human-level empathy.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Primary — exact Navbar "Get Started" clone */}
          {/* Primary — full hover treatment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96, y: 0 }}
            className="w-full sm:w-auto"
          >
            <a
              href="#"
              aria-label="Get started free"
              className="relative group overflow-hidden bg-[#2563eb] hover:bg-[#1d4ed8] text-white min-h-[44px] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 whitespace-nowrap w-full sm:w-auto"
            >
              {/* Shimmer fires on hover */}
              <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
              {/* Glow ring */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.25)' }} />
              <span className="relative z-10">Get Started Free</span>
              {/* Arrow shoots out and re-enters */}
              <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                <ArrowRight className="w-2.5 h-2.5 text-white translate-x-0 group-hover:translate-x-4 transition-transform duration-200 ease-in" />
                <ArrowRight className="w-2.5 h-2.5 text-white absolute -translate-x-4 group-hover:translate-x-0 transition-transform duration-200 ease-out" />
              </span>
            </a>
          </motion.div>

          {/* Secondary — border/text turns blue on hover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96, y: 0 }}
            className="w-full sm:w-auto"
          >
            <a
              href="#"
              aria-label="Watch product demo"
              className="relative group text-[11px] font-black text-[#0f172a] hover:text-[#2563eb] hover:border-[#2563eb] hover:shadow-md hover:shadow-blue-500/15 transition-all duration-200 uppercase tracking-[0.15em] flex items-center justify-center gap-2 border-2 border-[#0f172a]/40 min-h-[44px] px-5 py-2.5 rounded-full whitespace-nowrap w-full sm:w-auto"
            >
              Watch Demo
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ── 3-Panel Floating Dashboard ──
      ══════════════════════════════════════════════ */}
      <motion.div
        style={{ y: cardY, opacity: cardOpacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-8 mt-10"
      >
        {/* Glow behind center */}
        <div className="absolute -inset-10 bg-blue-500/8 blur-[100px] rounded-full pointer-events-none" />

        {/* 3-panel container — flex so center is truly centered */}
        <div className="flex items-start justify-center gap-0" style={{ minHeight: '640px' }}>

          {/* ══ LEFT — two separate cards ══ */}
          <div className="flex flex-col gap-3 w-60 shrink-0 self-center z-20 -mr-5">

            {/* Card 1 — AI Copilot */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-blue-100/60 flex flex-col overflow-hidden"
              style={{ height: '280px', background: 'linear-gradient(160deg, #ffffff 0%, #f0f5ff 100%)', boxShadow: '0 20px 60px -10px rgba(37,99,235,0.20), 0 4px 20px -2px rgba(99,102,241,0.10)' }}
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-blue-100/60 shrink-0">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/images/agents/agent_1.png" alt="AI Agent" className="w-full h-full object-cover" />
                </motion.div>
                <p className="text-[9px] font-black uppercase tracking-widest text-blue-600">AI Copilot</p>
                <span className="ml-auto text-[8px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full">AI Powered</span>
              </div>
              <div className="flex flex-col px-3 pt-2 pb-2 gap-1.5 flex-1 overflow-hidden">
                <AICopilotChat />
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shrink-0">
                  <span className="text-[10px] text-slate-300 flex-1">Ask anything...</span>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 cursor-pointer">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Incoming Call */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-green-200/80 overflow-hidden shrink-0"
              style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', boxShadow: '0 12px 40px -8px rgba(34,197,94,0.18), 0 2px 12px -2px rgba(34,197,94,0.10)' }}
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-green-100">
                <PhoneIncoming className="w-3 h-3 text-green-600" />
                <span className="text-[8px] font-black uppercase tracking-widest text-green-700">Incoming Call</span>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  className="ml-auto text-[7px] font-black text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">Ringing...</motion.span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="relative shrink-0">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-green-400" />
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-300 relative z-10">
                    <img src="/images/people/person_1.png" alt="Caller" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-700">Sarah K.</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.8 }}
                    className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center cursor-pointer">
                    <Phone className="w-3 h-3 text-white" />
                  </motion.div>
                  <div className="w-7 h-7 rounded-full bg-red-400 flex items-center justify-center cursor-pointer">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ══ CENTER card ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl z-10 flex flex-col overflow-hidden shrink-0 relative"
            style={{
              width: '840px',
              height: '600px',
              boxShadow: '0 32px 80px -20px rgba(37,99,235,0.18), 0 8px 32px -4px rgba(0,0,0,0.08)',
            }}
          >
            {/* Full background image */}
            <img
              src="/hero.png"
              alt="Inaipi Agent"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay — left side for text legibility */}
            <div
              className="absolute inset-0"
            />

            {/* Animated text — moved down from top */}
            <div className="absolute left-0 px-10 flex flex-col items-start" style={{ maxWidth: '500px', top: '22%' }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e7ff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e7ff]" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Inaipi Platform</span>
              </motion.div>

              {/* Heading — word by word animation */}
              <h2 className="font-black font-figtree leading-tight mb-5" style={{ fontSize: '2rem' }}>
                {['From', 'Automation', 'to', 'Human', 'Connection'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-white mr-[0.35em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-[#1447d4]"
                  style={{
                    textShadow: 'none',
                  }}
                >
                  —Seamlessly
                </motion.span>
              </h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/75 font-figtree font-medium leading-relaxed"
                style={{ fontSize: '0.875rem' }}
              >
                Inaipi unifies AI-driven automation with human intelligence to deliver faster resolutions and richer customer experiences.
              </motion.p>
            </div>

            {/* ── Bottom-left floating stat card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-6 rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              {/* Satisfaction ring */}
              <div className="relative w-12 h-12 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="15" fill="none"
                    stroke="#00e7ff" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="94.2"
                    initial={{ strokeDashoffset: 94.2 }}
                    animate={{ strokeDashoffset: 94.2 * 0.08 }}
                    transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white">92%</span>
              </div>
              {/* Labels */}
              <div>
                <p className="text-white font-black text-sm leading-none mb-1">Customer Satisfaction</p>
                <p className="text-white/60 text-[11px] font-medium">Avg. CSAT across all channels</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e7ff] animate-pulse" />
                  <span className="text-[#00e7ff] text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* ══ RIGHT — two stacked cards ══ */}
          <div className="flex flex-col gap-3 shrink-0 mt-6 -ml-5 w-72 z-20">

            {/* Card 1 — Enterprise Integrations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-blue-100/80 overflow-hidden flex-1"
              style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #eef2ff 100%)', boxShadow: '0 12px 40px -8px rgba(37,99,235,0.18), 0 2px 12px -2px rgba(99,102,241,0.10)' }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-blue-100/60" style={{ background: 'linear-gradient(90deg, #dbeafe 0%, #e0e7ff 100%)' }}>
                <Zap className="w-3 h-3 text-blue-600" />
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-700">Enterprise Integrations</span>
                <span className="ml-auto text-[7px] font-black text-blue-500 bg-white/70 px-1.5 py-0.5 rounded-full">Connected</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-2.5 py-2.5">
                {INTEGRATIONS.map((int, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl bg-white/70 border border-blue-50 hover:border-blue-200 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white border border-slate-100">
                      <int.icon />
                    </div>
                    <p className="text-[8px] font-bold text-[#0f172a] truncate w-full text-center">{int.name}</p>
                    <div className="flex items-center gap-1">
                      <motion.span animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${int.dot}`} />
                      <p className="text-[7px] text-slate-400">{int.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Card 2 — Customer Satisfaction */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-violet-100/80 overflow-hidden flex-1"
              style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 50%, #f5f0ff 100%)', boxShadow: '0 12px 40px -8px rgba(124,58,237,0.15), 0 2px 12px -2px rgba(99,102,241,0.10)' }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-violet-100/60" style={{ background: 'linear-gradient(90deg, #ede9fe 0%, #fce7f3 100%)' }}>
                <Star className="w-3 h-3 text-violet-600" />
                <span className="text-[9px] font-black uppercase tracking-widest text-violet-700">Customer Satisfaction</span>
              </div>
              <div className="px-3 py-2.5 flex flex-col gap-2">
                {/* Donut + bars */}
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#ede9fe" strokeWidth="4" />
                      <motion.circle cx="18" cy="18" r="14" fill="none" stroke="url(#csatGrad)" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray="87.96" initial={{ strokeDashoffset: 87.96 }} animate={{ strokeDashoffset: 87.96 * 0.1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} />
                      <defs>
                        <linearGradient id="csatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7c3aed" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-violet-600">90%</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    {CSAT_BARS.map((row, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="text-[7px] text-slate-400 w-12 truncate shrink-0">{row.label}</span>
                        <div className="flex-1 h-1 bg-violet-50 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${row.color}`} />
                        </div>
                        <span className="text-[7px] font-bold text-slate-400 w-5 text-right shrink-0">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* NPS row */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'NPS',       value: '72',  color: 'text-violet-600', bg: 'from-violet-50 to-blue-50' },
                    { label: 'Passive',   value: '18%', color: 'text-slate-500',  bg: 'from-slate-50 to-slate-50' },
                    { label: 'Detractor',value: '10%',  color: 'text-red-400',    bg: 'from-red-50 to-pink-50' },
                  ].map((n, i) => (
                    <div key={i} className={`bg-gradient-to-br ${n.bg} border border-white rounded-xl p-1.5 text-center`}>
                      <p className={`text-sm font-black ${n.color}`}>{n.value}</p>
                      <p className="text-[7px] text-slate-400 uppercase tracking-wider">{n.label}</p>
                    </div>
                  ))}
                </div>
                {/* Recent reviews */}
                <div className="flex flex-col gap-1">
                  {RECENT_REVIEWS.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-white/60">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ede9fe, #dbeafe)' }}>
                        <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 flex-1">{r.name}</span>
                      <span className="text-[8px] text-yellow-400">{'★'.repeat(r.stars)}</span>
                      <span className="text-[7px] text-slate-300">{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </motion.div>

      {/* Bottom tagline — below the dashboard image */}
      <div className="relative z-10 mt-16 text-center w-full max-w-[1400px] mx-auto px-10 pb-10">
        <p className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-[0.35em] mb-4">One Intelligent Platform</p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed max-w-5xl mx-auto tracking-tight">
          Powering the entire Customer Experience Lifecycle — seamlessly integrating AI Agents, Human Teams, and your Enterprise Stack.
        </p>
      </div>
    </section>
  );
}
