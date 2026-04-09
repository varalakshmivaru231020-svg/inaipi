'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Mail, Globe, Brain, Star, Zap, Users, PhoneCall, PhoneIncoming, ArrowRight } from 'lucide-react';
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
          className="inline-block w-[3px] h-[0.85em] bg-[#1447d4] ml-[2px] align-middle" />
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
            msg.role === 'customer' ? 'bg-[#1447d4] text-white rounded-br-none' : 'bg-slate-100 text-slate-600 rounded-bl-none'
          }`}>{msg.text}</div>
        </motion.div>
      ))}
      {typing && (
        <div className="flex justify-start">
          <div className="bg-slate-100 rounded-xl rounded-bl-none px-3 py-2 flex gap-1 items-center">
            {[0,1,2].map(i => <motion.span key={i} animate={{ y: [0,-3,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} className="w-1 h-1 rounded-full bg-[#1447d4] block" />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Live Call Card ── */
const CALLS = [
  { id: 1, text: 'My order #1224 is delayed',    channel: 'WhatsApp', avatar: '/images/people/person_1.png', name: 'Sarah K.', color: 'bg-[#006fff]', delay: 1000 },
  { id: 2, text: 'Billing issue on my account',  channel: 'Voice',    avatar: '/images/people/person_2.png',  name: 'Marco R.', color: 'bg-[#006fff]', delay: 3200 },
  { id: 3, text: 'Need API integration help',    channel: 'Email',    avatar: '/images/people/person_3.png',    name: 'Alex L.',  color: 'bg-[#006fff]', delay: 5400 },
  { id: 4, text: 'Complaint about service delay', channel: 'Chat',   avatar: '/images/people/person_4.png',   name: 'Priya N.', color: 'bg-[#00e7ff]', delay: 7600 },
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
  { name: 'Jonathan Evans',  dept: 'Sales',        ext: '2309', avatar: '/images/agents/agent_1.png',  color: 'bg-[#1447d4]',  active: false },
  { name: 'Fatima Al-Rashid',dept: 'Front Office', ext: '6014', avatar: '/images/agents/agent_2.png',  color: 'bg-[#006fff]', active: true  },
  { name: 'Adam Smith',      dept: 'Loan Ops',     ext: '7756', avatar: '/images/people/person_1.png', color: 'bg-[#006fff]',  active: false },
  { name: 'Nancy',           dept: 'Sales',        ext: '2534', avatar: '/images/people/person_2.png', color: 'bg-[#00e7ff]', active: false },
  { name: 'Ravi Kumar',      dept: 'Support',      ext: '3301', avatar: '/images/people/person_3.png', color: 'bg-[#1447d4]',   active: false },
  { name: 'Sara M.',         dept: 'Finance',      ext: '4420', avatar: '/images/people/person_4.png', color: 'bg-[#006fff]', active: false },
  { name: 'Marco Rossi',     dept: 'Tech Support', ext: '8821', avatar: '/images/people/person_2.png', color: 'bg-[#006fff]',    active: true  },
  { name: 'Priya Nair',      dept: 'Success',      ext: '1205', avatar: '/images/people/person_3.png', color: 'bg-[#006fff]', active: false },
  { name: 'Zhang Wei',       dept: 'Operations',   ext: '4092', avatar: '/images/people/person_4.png', color: 'bg-[#1447d4]',  active: false },
  { name: 'Elena Petrova',   dept: 'Retention',    ext: '5501', avatar: '/images/people/person_1.png', color: 'bg-[#00e7ff]',  active: false },
];

const INTEGRATIONS = [
  { name: 'Salesforce',      sub: 'CRM',          dot: 'bg-[#00e7ff]',  icon: SalesforceIcon },
  { name: 'Microsoft Teams', sub: 'Collaboration', dot: 'bg-[#00e7ff]',  icon: TeamsIcon      },
  { name: 'HubSpot',         sub: 'CRM',          dot: 'bg-[#006fff]',  icon: HubSpotIcon    },
  { name: 'Zoom Phone',      sub: 'Telephony',     dot: 'bg-[#00e7ff]',  icon: ZoomIcon       },
  { name: 'Slack',           sub: 'Collaboration', dot: 'bg-[#00e7ff]',  icon: SlackIcon      },
  { name: 'Avaya',           sub: 'Telephony',     dot: 'bg-slate-400',  icon: AvayaIcon      },
];

const CSAT_BARS = [
  { label: 'Very Satisfied', pct: 68, color: 'bg-[#1447d4]' },
  { label: 'Satisfied',      pct: 22, color: 'bg-[#006fff]' },
  { label: 'Neutral',        pct: 7,  color: 'bg-slate-300' },
  { label: 'Dissatisfied',   pct: 3,  color: 'bg-slate-300' },
];

const RECENT_REVIEWS = [
  { name: 'Ravi K.',  stars: 5, time: '2m', avatar: '/images/people/person_1.png' },
  { name: 'Sara M.',  stars: 4, time: '5m', avatar: '/images/people/person_2.png' },
  { name: 'Ahmed K.', stars: 5, time: '9m', avatar: '/images/people/person_3.png' },
];

const CAMPAIGN_HEADING = 'Resolve Every Customer Interaction.';



/* ══════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const cardY       = useTransform(scrollYProgress, [0, 0.2],  [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const [calls,         setCalls        ] = useState<typeof CALLS>([]);
  const [activeCallIdx, setActiveCallIdx] = useState<number | null>(null);
  const [pulseStage,    setPulseStage   ] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [csatScore,     setCsatScore    ] = useState(4.6);
  const callListRef = useRef<HTMLDivElement>(null);

  const [displayedHeading, setDisplayedHeading] = useState('');
  const [showSubheading, setShowSubheading]     = useState(false);
  const [showButton, setShowButton]             = useState(false);

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

  /* campaign heading animation loop */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let charInterval: ReturnType<typeof setInterval> | null = null;
    let idx = 0;
    const runLoop = () => {
      if (charInterval) clearInterval(charInterval);
      idx = 0;
      setDisplayedHeading('');
      setShowSubheading(false);
      setShowButton(false);
      timers.push(setTimeout(() => {
        charInterval = setInterval(() => {
          idx++;
          setDisplayedHeading(CAMPAIGN_HEADING.slice(0, idx));
          if (idx >= CAMPAIGN_HEADING.length) {
            if (charInterval) clearInterval(charInterval);
            charInterval = null;
            timers.push(setTimeout(() => setShowSubheading(true), 700));
            timers.push(setTimeout(() => setShowButton(true), 1400));
            timers.push(setTimeout(runLoop, 5500));
          }
        }, 55);
      }, 1800));
    };
    runLoop();
    return () => { timers.forEach(clearTimeout); if (charInterval) clearInterval(charInterval); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] pt-32 pb-0 flex flex-col items-center overflow-visible" style={{ background: '#f8faff' }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Base gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />

        {/* Full dot grid */}
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)`, backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />

        {/* Horizontal grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)`, maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />

        {/* Large center aurora blob */}
        <motion.div className="absolute rounded-full" style={{ width: 1100, height: 1100, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(0,111,255,0.18) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Left blue blob */}
        <motion.div className="absolute rounded-full" style={{ width: 800, height: 800, top: '5%', left: '-20%', background: 'radial-gradient(circle, rgba(0,111,255,0.26) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Right cyan blob */}
        <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, top: '0%', right: '-15%', background: 'radial-gradient(circle, rgba(0,231,255,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, -60, 0], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

        {/* Small floating orbs */}
        <motion.div className="absolute w-3 h-3 rounded-full bg-blue-500/40" style={{ top: '18%', left: '12%', filter: 'blur(2px)' }} animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#006fff]/50" style={{ top: '28%', right: '14%', filter: 'blur(1px)' }} animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.div className="absolute w-4 h-4 rounded-full bg-[#00e7ff]/30" style={{ top: '10%', left: '38%', filter: 'blur(3px)' }} animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-blue-400/50" style={{ top: '35%', left: '22%', filter: 'blur(1px)' }} animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
        <motion.div className="absolute w-3 h-3 rounded-full bg-[#006fff]/35" style={{ top: '20%', right: '28%', filter: 'blur(2px)' }} animate={{ y: [0, -16, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />

        {/* Spotlight cone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]" style={{ background: 'conic-gradient(from 255deg at 50% 0%, transparent 15%, rgba(37,99,235,0.18) 30%, rgba(0,111,255,0.22) 50%, rgba(37,99,235,0.18) 70%, transparent 85%)', filter: 'blur(18px)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px]" style={{ boxShadow: '0 0 180px 90px rgba(37,99,235,0.35), 0 0 280px 140px rgba(0,111,255,0.16)' }} />

        {/* Thin light beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[40%]" style={{ background: 'linear-gradient(to bottom, rgba(0,111,255,0.6) 0%, transparent 100%)' }} />
        <div className="absolute top-0 left-[42%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(6deg)', transformOrigin: 'top' }} />
        <div className="absolute top-0 left-[58%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-80" style={{ background: 'linear-gradient(to top, #e8f4ff 0%, transparent 100%)' }} />
      </div>

      {/* ── Hero Text ── */}
      <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-[#1447d4]/20 bg-white shadow-sm mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#1447d4]">The AI-Native CX Engine</span>
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
          <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-3xl mx-auto">
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
              className="relative group overflow-hidden bg-[#1447d4] hover:bg-[#0d3ab8] text-white min-h-[44px] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-700/40 whitespace-nowrap w-full sm:w-auto"
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
              className="relative group text-[11px] font-black text-[#0f172a] hover:text-[#1447d4] hover:border-[#1447d4] hover:shadow-md hover:shadow-blue-700/15 transition-all duration-200 uppercase tracking-[0.15em] flex items-center justify-center gap-2 border-2 border-[#0f172a]/40 min-h-[44px] px-5 py-2.5 rounded-full whitespace-nowrap w-full sm:w-auto"
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

          {/* ══ LEFT — AI Campaign Panel ══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-64 shrink-0 self-center z-20 -mr-5 rounded-2xl overflow-hidden"
            style={{ height: '560px', background: 'rgba(255,255,255,0.97)', boxShadow: '0 20px 60px -10px rgba(37,99,235,0.20), 0 4px 20px -2px rgba(0,111,255,0.10)', border: '1px solid rgba(219,234,254,0.8)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
              <span className="text-[13px] font-black text-[#0f172a]">Hero</span>
              <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer">
                <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
                </svg>
              </div>
            </div>
            <div className="px-3.5 pt-3 shrink-0">
              <div className="flex items-center gap-2 bg-blue-50/70 rounded-xl px-2.5 py-2 border border-blue-100 mb-2.5">
                <div className="w-5 h-5 rounded-full shrink-0" style={{ background: 'conic-gradient(from 180deg, #1447d4 0%, #006fff 40%, #00e7ff 70%, #1447d4 100%)' }} />
                <span className="text-[9px] font-black text-[#1447d4] flex-1 truncate">Personalize Campaign</span>
                <svg className="w-3 h-3 text-slate-400 cursor-pointer shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
              <p className="text-[8.5px] text-slate-500 leading-relaxed mb-2.5">We can help create variations to personalize your customer engagement campaigns.</p>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 mb-2 text-[8.5px] text-slate-400 leading-relaxed overflow-hidden" style={{ height: '58px' }}>
                Unique messaging promoting a personal and realistic goal our users can be proud of.
              </div>
              <button className="w-full text-[10px] font-black text-white rounded-xl py-2 mb-3" style={{ background: '#1447d4' }}>
                Generate
              </button>
            </div>
            <div className="h-px bg-slate-100 mx-3.5 mb-3 shrink-0" />
            <div className="px-3.5 flex-1 min-h-0 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-2.5 shrink-0">
                <span className="text-[10px] font-black text-[#0f172a]">1. Row</span>
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
              </div>
              <p className="text-[9px] font-bold text-slate-600 mb-1.5 shrink-0">Heading</p>
              <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 mb-3 min-h-[32px] flex items-center shrink-0">
                <span className="text-[8.5px] text-[#0f172a] font-bold leading-snug">{displayedHeading}</span>
                {displayedHeading.length > 0 && displayedHeading.length < CAMPAIGN_HEADING.length && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[2px] h-2.5 bg-blue-500 ml-[1px] shrink-0" />
                )}
              </div>
              <p className="text-[9px] font-bold text-slate-600 mb-2 shrink-0">Feature Image</p>
              <div className="flex gap-2 min-h-0" style={{ flex: '1 1 0' }}>
                <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-b from-blue-50/50 to-slate-50 flex flex-col min-h-0">
                  <div className="flex-1 min-h-0 bg-gradient-to-br from-slate-100 to-blue-50/60" />
                  <div className="flex items-center gap-1 px-2 py-1.5 shrink-0">
                    <svg className="w-2 h-2 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/></svg>
                    <span className="text-[6px] text-slate-400 font-bold truncate">Campaign_01.png</span>
                  </div>
                </div>
                <AnimatePresence>
                  {showSubheading && (
                    <motion.div initial={{ opacity: 0, scale: 0.95, x: 8 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                      className="flex-1 rounded-xl overflow-hidden border border-blue-200 bg-gradient-to-b from-blue-50 to-cyan-50/50 flex flex-col min-h-0">
                      <div className="flex-1 min-h-0 bg-gradient-to-br from-blue-100/50 to-cyan-50/30" />
                      <div className="flex items-center gap-1 px-2 py-1.5 shrink-0">
                        <svg className="w-2 h-2 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/></svg>
                        <span className="text-[6px] text-blue-500 font-bold truncate">Campaign_02.png</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ══ CENTER — Website Preview ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white border border-slate-200/80 z-10 flex flex-col overflow-hidden shrink-0"
            style={{ width: '840px', height: '600px', boxShadow: '0 32px 80px -20px rgba(37,99,235,0.18), 0 8px 32px -4px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center px-5 py-3 shrink-0" style={{ background: '#1447d4' }}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Inaipi Platform — Live</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[8px] font-bold text-white/60">AI Campaign Studio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e7ff] animate-pulse" />
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: '#f8faff' }}>
              <div className="flex items-center justify-between px-6 py-3 bg-white/90 border-b border-white/80 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1447d4] to-[#006fff] flex items-center justify-center shrink-0">
                    <span className="text-[7px] font-black text-white">IN</span>
                  </div>
                  <span className="text-[12px] font-black text-[#0f172a] tracking-[-0.02em]">INAIPI</span>
                </div>
                <div className="flex items-center gap-5">
                  {['Platform', 'Solutions', 'Pricing'].map(item => (
                    <span key={item} className="text-[9px] font-bold text-slate-500">{item}</span>
                  ))}
                </div>
                <div className="px-3 py-1.5 rounded-full border border-[#1447d4] cursor-pointer">
                  <span className="text-[8px] font-black text-[#1447d4]">Log in</span>
                </div>
              </div>
              <div className="flex-1 flex overflow-hidden relative px-6 pt-5 pb-3">
                <div className="flex-1 flex flex-col relative z-10 mr-4">
                  <div className="mb-0.5">
                    <span className="text-[8px] font-black text-white bg-[#1447d4] px-2 py-0.5 rounded-sm inline-block">Heading</span>
                  </div>
                  <div className="relative p-4 mb-3" style={{ border: '1.5px solid #1447d4', borderRadius: '4px', minHeight: '110px', background: 'rgba(20,71,212,0.015)' }}>
                    {displayedHeading ? (
                      <h2 className="text-[28px] font-black text-[#0f172a] leading-tight tracking-tight font-figtree">
                        {displayedHeading}
                        {displayedHeading.length < CAMPAIGN_HEADING.length && (
                          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                            className="inline-block w-[3px] h-6 bg-[#1447d4] ml-1 align-middle" />
                        )}
                      </h2>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
                        <div className="h-6 w-1/2 bg-slate-100 rounded animate-pulse" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {showSubheading && (
                      <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[13px] text-slate-500 mb-4 font-medium leading-relaxed">
                        One platform. Zero silos. Every interaction resolved.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showButton && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                        <button className="px-5 py-2 rounded-full text-[11px] font-black text-white" style={{ background: '#1447d4' }}>
                          Get Started
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-[45%] shrink-0 rounded-2xl overflow-hidden relative" style={{ background: '#dbeafe' }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(20,71,212,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-8 right-8 w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.2) 0%, transparent 70%)', filter: 'blur(12px)' }} />
                  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-8 left-8 w-20 h-20 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,231,255,0.25) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-50">
                    <div className="w-16 h-16 rounded-2xl bg-white/60 border border-blue-100 flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8 text-[#006fff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/50 border border-blue-100" />
                      <div className="w-10 h-10 rounded-xl bg-[#006fff]/10 border border-blue-200" />
                      <div className="w-10 h-10 rounded-xl bg-[#00e7ff]/10 border border-cyan-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/80 px-6 py-2.5 flex items-center gap-5 bg-white/80 shrink-0">
                {[
                  { label: 'AI Resolved',      value: (48247 + resolvedCount).toLocaleString(), color: 'text-[#1447d4]' },
                  { label: 'Avg Handle',        value: '1m 24s',                                 color: 'text-[#006fff]'  },
                  { label: 'CSAT Score',         value: `${csatScore.toFixed(1)}★`,         color: 'text-[#006fff]'  },
                  { label: 'Campaigns Active',  value: '12',                                     color: 'text-[#1447d4]'  },
                ].map((s, i) => (
                  <div key={i} className="flex items-baseline gap-1.5">
                    <motion.span key={s.value} initial={{ y: -3, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[12px] font-black ${s.color}`}>{s.value}</motion.span>
                    <span className="text-[7.5px] text-slate-400 font-bold">{s.label}</span>
                  </div>
                ))}
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e7ff] animate-pulse" />
                  <span className="text-[7.5px] font-bold text-[#00e7ff]">All Systems Operational</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══ RIGHT — Workflow Panel ══ */}
          <div className="flex flex-col gap-3 shrink-0 -mt-8 -ml-5 w-72 z-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-blue-100/80 overflow-hidden"
              style={{ background: '#ffffff', boxShadow: '0 12px 40px -8px rgba(37,99,235,0.18), 0 2px 12px -2px rgba(0,111,255,0.10)', height: '560px' }}
            >
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-blue-100/60">
                <span className="text-[8px] font-black text-white bg-[#1447d4] px-2.5 py-1 rounded-full">In Progress</span>
                <div className="flex items-center gap-2 ml-auto">
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <span className="text-[7.5px] font-bold text-slate-500">This week</span>
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <span className="text-[7.5px] font-bold text-slate-500">Next week</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-3 py-2 border-b border-blue-50">
                <span className="text-[9px] font-black text-[#1447d4] pb-1 border-b-2 border-[#1447d4]">Workflow</span>
                <span className="text-[9px] font-bold text-slate-400">Comments</span>
                <svg className="w-3 h-3 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
              </div>
              <div className="px-3 py-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black text-[#0f172a]">Campaign Launch</span>
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  <div className="ml-auto flex items-center -space-x-1">
                    {[0, 1, 2].map(j => (
                      <div key={j} className="w-4 h-4 rounded-full border-2 border-white" style={{ background: `hsl(${210 + j * 20}, 70%, 65%)` }} />
                    ))}
                  </div>
                </div>
                {[
                  { num: 1, label: 'Design',  done: true,  badge: null,        badgeClass: '' },
                  { num: 2, label: 'Test',    done: true,  badge: null,        badgeClass: '' },
                  { num: 3, label: 'Publish', done: false, badge: 'Yesterday', badgeClass: 'text-slate-400 font-bold' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                    className="flex items-center gap-2 py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <svg className="w-2.5 h-2.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-[#006fff]' : 'border-2 border-slate-300'}`}>
                      {item.done && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <span className="text-[9.5px] font-bold text-[#0f172a] flex-1">{item.num}. {item.label}</span>
                    {item.badge && <span className={`text-[8px] ${item.badgeClass}`}>{item.badge}</span>}
                    <div className="flex items-center -space-x-1 shrink-0">
                      {[0, 1].map(j => (
                        <div key={j} className="w-4 h-4 rounded-full border-2 border-white" style={{ background: `hsl(${190 + j * 30 + i * 15}, 65%, 60%)` }} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <AnimatePresence>
                {showButton && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="mx-3 rounded-xl border border-blue-100 bg-white/80 p-3">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-2">Sankey</p>
                    <div className="space-y-1.5">
                      {[
                        { label: 'AI Resolved', pct: 72, color: 'bg-[#00e7ff]' },
                        { label: 'Transferred', pct: 18, color: 'bg-[#006fff]' },
                        { label: 'Pending',     pct: 10, color: 'bg-slate-200' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[7px] text-slate-400 w-14 truncate shrink-0">{row.label}</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }}
                              transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                              className={`h-full rounded-full ${row.color}`} />
                          </div>
                          <span className="text-[7px] font-bold text-slate-400 w-5 text-right shrink-0">{row.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
