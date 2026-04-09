'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Zap, Globe, ArrowRight, Shield, Lock, CheckSquare, Layers, Users, Phone, Mail, MessageSquare, FileText, Activity, PhoneCall, LayoutGrid, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/sections/TrustMarquee';
import CTA from '@/components/sections/CTA';

const allLeaders = [
  { name: 'Manikandan Karunakaran', title: 'Chief Executive Officer', initials: 'MK', gradient: 'from-[#1447d4] to-[#006fff]', img: '/team/Manikandan Karunakaran.JPG' },
  { name: 'Sanju Sambasivan', title: 'Business Growth Leader', initials: 'SS', gradient: 'from-blue-700 to-cyan-500', img: '/team/Sanju Sambasivan.JPG' },
  { name: 'Bharath K Reddy', title: 'Director - Revenue and Operations', initials: 'BK', gradient: 'from-emerald-600 to-cyan-600', img: '/team/Bharath K Reddy.JPG' },
  { name: 'Wilson Xavier', title: 'Chief Strategy Advisor', initials: 'WX', gradient: 'from-[#1447d4] to-[#006fff]', img: '/team/Wilson Xavier.jpeg' },
  { name: 'Monish', title: 'Product and Growth Manager', initials: 'MO', gradient: 'from-[#006fff] to-[#00e7ff]', img: '/team/Monish.jpeg' },
  { name: 'Sarath Kumar', title: 'Solution Architect', initials: 'SK', gradient: 'from-[#006fff] to-[#00e7ff]', img: '/team/Sarath Kumar.jpeg' },
  { name: 'Shajith Navas', title: 'Head of Presales', initials: 'SN', gradient: 'from-[#1447d4] to-[#00e7ff]', img: '/team/Shajith Navas.jpeg' },
];

const offices = [
  { city: 'Dubai, UAE', type: 'Headquarters', flag: '🇦🇪', addr: '1504 B, 1 Lake Plaza, Cluster T, Jumeirah Lakes Towers, PO Box 73916' },
  { city: 'Bengaluru, India', type: 'Sales & R&D', flag: '🇮🇳', addr: 'Krishna Tech Park, Kadubeesanahalli, Bengaluru 560075' },
  { city: 'Chennai, India', type: 'R&D Office', flag: '🇮🇳', addr: '47/2 Ashok Nagar, 53rd Street, Indira Colony, Chennai 600083' },
  { city: 'Trivandrum, India', type: 'R&D Office', flag: '🇮🇳', addr: '' },
  { city: 'Delaware, USA', type: 'Sales Office', flag: '🇺🇸', addr: '' },
  { city: 'Philippines', type: 'Sales Office', flag: '🇵🇭', addr: '' },
  { city: 'Singapore', type: 'Sales Office', flag: '🇸🇬', addr: '' },
];

const storySteps = [
  { num: '01', title: 'Years inside the industry', desc: 'We spent years building and scaling contact centre solutions for the most demanding enterprises — banks, healthcare systems, government entities, telecoms handling millions of interactions every month.' },
  { num: '02', title: 'The same failure, everywhere', desc: 'Enterprises investing millions in CX infrastructure. Customers still getting broken, fragmented, frustrating experiences. Agents switching between seven different tools for a single conversation.' },
  { num: '03', title: 'The root cause', desc: "AI was always treated as an add-on. Channels operated in silos. Bolting a chatbot onto a legacy contact centre doesn't create intelligence — it creates another silo." },
  { num: '04', title: 'The Inaipi answer', desc: 'A single, AI-native platform where intelligence is not a feature — it is the foundation. One platform, one data layer, one governance framework. Predictable costs. Zero data exposure.' },
];

const platformCards = [
  { icon: MessageSquare, title: 'Omnichannel Orchestration', desc: 'Voice, WhatsApp, Email, Chat, SMS, Social, and Video — all flowing into one intelligent inbox. No channel switching. No context loss.', tag: '7 Channels Unified' },
  { icon: Activity, title: 'AI Agents + Co-Pilot', desc: 'AI agents resolve routine inquiries autonomously. Human agents are guided by a real-time co-pilot with smart suggestions and live sentiment scoring.', tag: 'AI-Human Collaboration' },
  { icon: FileText, title: 'Intelligent Case Management', desc: 'Every unresolved interaction auto-becomes a case — classified, routed, and tracked against SLA in real time. Escalation is automatic.', tag: 'SLA Tracking' },
  { icon: Activity, title: 'CSAT & NPS Surveys', desc: 'Automated satisfaction surveys deploy after every resolution. Sentiment analysis flags dissatisfied customers before they escalate.', tag: 'Automated Feedback' },
  { icon: PhoneCall, title: 'AI Voice Campaigns', desc: 'AI voice agents run outbound campaigns at unlimited scale — renewals, follow-ups, loyalty engagement. No human dialler needed.', tag: 'Outbound AI' },
  { icon: LayoutGrid, title: 'Analytics & Governance', desc: 'Real-time dashboards across CSAT, NPS, handle time, and agent performance. One governance layer, ISO 27001:2022 certified.', tag: 'ISO 27001:2022' },
];

const trustCards = [
  { icon: Shield, title: 'ISO 27001:2022 Certified', desc: 'Certified against the 2022 revision of the international information security standard, with updated controls covering cloud security, threat intelligence, and data masking.' },
  { icon: Lock, title: 'Zero Data Exposure', desc: 'Customer data is never used for model training without explicit consent. Your interactions remain yours.' },
  { icon: CheckSquare, title: 'Single Governance Layer', desc: 'One framework managing compliance, access, and data policies across every channel and geography.' },
  { icon: Globe, title: 'Regional Compliance', desc: 'Built for UAE and MENA regulatory standards. Audit-ready from day one of deployment.' },
  { icon: Layers, title: 'Multi-Cloud Hosting', desc: 'Multi-cloud and sovereign hosting model ensures data residency compliance and enterprise-grade resilience.' },
  { icon: Users, title: 'Enterprise SSO', desc: 'Seamless single sign-on across your existing identity infrastructure. No new credentials. No friction.' },
];

const capabilities = [
  'Value-based selling powered by our IP solutions',
  'Tailored solutions for specific business outcomes',
  'Enterprise-ready integration capabilities',
  'Cloud expertise and strategic partnerships',
  'Service provider & partner ecosystem',
  'Multi-cloud & sovereign hosting model',
];

const funcTags = ['Sales', 'Presales', 'Customer Success', 'Partner Management', 'Engineering', 'Professional Services', 'Support', 'Finance & Operations'];

const ease = [0.18, 0.82, 0.41, 1] as const;

export default function AboutPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0 });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, amount: 0 });

  return (
    <main className="min-h-screen bg-white font-figtree overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-36 pb-24 relative overflow-x-clip overflow-y-visible" style={{ background: '#f8faff' }}>
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)', maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />
          <motion.div className="absolute rounded-full" style={{ width: 1100, height: 1100, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(0,111,255,0.18) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 800, height: 800, top: '5%', left: '-20%', background: 'radial-gradient(circle, rgba(0,111,255,0.26) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, top: '0%', right: '-15%', background: 'radial-gradient(circle, rgba(0,231,255,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, -60, 0], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-blue-500/40" style={{ top: '18%', left: '12%', filter: 'blur(2px)' }} animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-[#006fff]/50" style={{ top: '28%', right: '14%', filter: 'blur(1px)' }} animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className="absolute w-4 h-4 rounded-full bg-[#00e7ff]/30" style={{ top: '10%', left: '38%', filter: 'blur(3px)' }} animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-blue-400/50" style={{ top: '35%', left: '22%', filter: 'blur(1px)' }} animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-[#006fff]/35" style={{ top: '20%', right: '28%', filter: 'blur(2px)' }} animate={{ y: [0, -16, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]" style={{ background: 'conic-gradient(from 255deg at 50% 0%, transparent 15%, rgba(37,99,235,0.18) 30%, rgba(0,111,255,0.22) 50%, rgba(37,99,235,0.18) 70%, transparent 85%)', filter: 'blur(18px)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px]" style={{ boxShadow: '0 0 180px 90px rgba(37,99,235,0.35), 0 0 280px 140px rgba(0,111,255,0.16)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[40%]" style={{ background: 'linear-gradient(to bottom, rgba(0,111,255,0.6) 0%, transparent 100%)' }} />
          <div className="absolute top-0 left-[42%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(6deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 left-[58%] w-px h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #e8f4ff 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <ChevronIcon />
            <span className="text-[11px] font-bold text-[#1447d4]">About Us</span>
          </motion.div>

          {/* Headline */}
          <div className="text-center mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-figtree tracking-[-0.03em] mb-8 leading-[1.25] text-[#0f172a] max-w-5xl mx-auto"
            >
              Empowering Intelligent<br />
              <span className="inline-block text-[#1447d4] pb-2">Customer Experiences.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
            >
              We specialize in building scalable, AI-native CX solutions that help enterprises transform every interaction into an insight.
            </motion.p>
          </div>

          {/* Image + Quote Card */}
          <div className="grid lg:grid-cols-12 gap-5 items-stretch overflow-visible">
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 rounded-[2rem] overflow-hidden relative min-h-[420px]"
            >
              <Image src="/about-hero.jpg" alt="Inaipi Team" fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-[#0f172a] rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-[60px]" />
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
              <blockquote className="text-xl font-bold text-white leading-snug mb-8 relative z-10">
                &ldquo;We don&apos;t just build products; we build partnerships. Our mission is to empower businesses with AI that is as agile and ambitious as they are.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#1447d4] flex items-center justify-center font-black text-white text-sm shrink-0 shadow-lg shadow-blue-900/25">MK</div>
                <div>
                  <div className="text-white font-bold text-sm">Manikandan Karunakaran</div>
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Chief Executive Officer</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="py-28 border-y border-slate-100 relative" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Heading + Description */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Vision & Mission</span>
                </div>
                 <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-6">
                  <span className="text-[#0f172a]">Why we exist.</span><br /><span className="text-[#1447d4]">What drives us forward.</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed mb-4 max-w-md">
                  A comprehensive statement outlining the organizational purpose and strategic direction for delivering intelligent customer experience solutions.
                </p>
               
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden relative h-[280px] group/img"
              >
                <Image src="/about-hero.jpg" alt="Team collaboration" fill className="object-cover transition-transform duration-500 group-hover/img:scale-105" />
                <div className="absolute inset-0 bg-blue-900/0 group-hover/img:bg-blue-900/30 transition-all duration-400 pointer-events-none" />
              </motion.div>
            </div>

            {/* Right — Vision & Mission Cards — ref watches visible container; animate= drives cards from 100vw */}
            <div ref={cardsRef} className="flex flex-col gap-5">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: "100vw" }}
                animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2rem] p-10 relative overflow-hidden cursor-default shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300"
                style={{ background: '#1447d4' }}
              >
                <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[60px]" />
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="relative z-10 text-[11px] font-bold uppercase tracking-widest text-white/75 mb-2">Vision</div>
                <h3 className="relative z-10 text-[22px] font-bold font-figtree text-white leading-tight mb-3">Empowering Intelligent Experiences</h3>
                <p className="relative z-10 text-base text-white/80 leading-relaxed">
                  To empower enterprises to deliver seamless, intelligent, and outcome-driven customer experiences across every channel.
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: "100vw" }}
                animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2rem] p-10 relative overflow-hidden cursor-default shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300"
                style={{ background: '#1447d4' }}
              >
                <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[60px]" />
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="relative z-10 text-[11px] font-bold uppercase tracking-widest text-white/75 mb-2">Mission</div>
                <h3 className="relative z-10 text-[22px] font-bold font-figtree text-white leading-tight mb-3">Replacing Fragmented CX Stacks</h3>
                <p className="relative z-10 text-base text-white/80 leading-relaxed">
                  To replace fragmented CX stacks with a secure, AI-enabled omnichannel CXM platform that unifies engagement, operations, analytics, and integrations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY — TIMELINE ── */}
      <section className="py-28 border-b border-slate-100 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 60%, transparent 100%)' }} />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Our Story</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15]"
            >
              <span className="text-[#0f172a]">The problem we</span><br /><span className="text-[#1447d4]">couldn&apos;t ignore.</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1447d4] via-[#006fff] to-transparent hidden lg:block" />

            {storySteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.num} className={`relative lg:grid lg:grid-cols-2 lg:gap-12 mb-12 last:mb-0 ${!isLeft ? '' : ''}`}>
                  {/* Center circle on timeline */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 w-12 h-12 rounded-full bg-white border-[3px] border-blue-400 items-center justify-center shadow-lg shadow-blue-500/20"
                  >
                    <span className="text-[14px] font-extrabold text-[#1447d4] font-figtree">{step.num}</span>
                  </motion.div>

                  {/* Left column */}
                  <div className={isLeft ? 'lg:pr-14' : ''}>
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="group bg-white rounded-2xl border border-slate-100 p-8 relative overflow-hidden hover:border-blue-500/25 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1447d4] via-[#006fff] to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                        <span className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#eef4ff] border-2 border-[#1447d4] text-[13px] font-extrabold text-[#1447d4] mb-4">{step.num}</span>
                        <h4 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-[#1447d4] transition-colors duration-300">{step.title}</h4>
                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">{step.desc}</p>
                      </motion.div>
                    ) : <div className="hidden lg:block" />}
                  </div>

                  {/* Right column */}
                  <div className={!isLeft ? 'lg:pl-14' : ''}>
                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="group bg-white rounded-2xl border border-slate-100 p-8 relative overflow-hidden hover:border-blue-500/25 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#006fff] to-[#1447d4] scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500" />
                        <span className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#eef4ff] border-2 border-[#1447d4] text-[13px] font-extrabold text-[#1447d4] mb-4">{step.num}</span>
                        <h4 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-[#1447d4] transition-colors duration-300">{step.title}</h4>
                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">{step.desc}</p>
                      </motion.div>
                    ) : <div className="hidden lg:block" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Belief — Dark Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0f172a] rounded-[2rem] p-10 lg:p-14 relative overflow-hidden mt-20 mb-10"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/15 rounded-full blur-[60px]" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10 text-center">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#00e7ff] mb-5">Core Belief</div>
              <p className="text-2xl lg:text-3xl font-bold font-figtree text-white leading-snug max-w-3xl mx-auto">
                &ldquo;Inaipi doesn&apos;t add AI to a contact centre. Inaipi is an AI platform that runs a contact centre.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-5 text-center">Capabilities We Built</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 p-5 bg-[#1447d4] border border-[#1447d4] rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 cursor-default"
                >
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <p className="text-[14px] text-white font-bold">{cap}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* ── TEAM ── */}
      <section ref={teamRef} className="py-24 border-y border-slate-100 relative overflow-x-clip" style={{ background: '#f8faff' }}>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          {/* Section label + heading — centered */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Our Team</span>
            </div>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.4, ease }}
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5 text-center">
            <span className="text-[#0f172a]">Expert-led.</span><br /><span className="text-[#1447d4]">Experience-driven.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-slate-500 max-w-[560px] leading-relaxed mb-12 text-center mx-auto">
            A team of CX, AI, and enterprise technology practitioners spanning sales, presales, engineering, customer success, and partner management across MEA and APAC.
          </motion.p>

          {/* Bento grid */}
          <div className="grid lg:grid-cols-2 gap-5 items-stretch">

            {/* LEFT column — slides in from the far left */}
            <div className="flex flex-col gap-5">

              {/* Big photo */}
              <motion.div
                initial={{ opacity: 0, x: "-100vw" }}
                animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100vw" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] overflow-hidden flex-1 min-h-[340px]"
              >
                <Image src="/about-hero.jpg" alt="Inaipi Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              </motion.div>

              {/* White card — 40+ stat */}
              <motion.div
                initial={{ opacity: 0, x: "-100vw" }}
                animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100vw" }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 flex items-start justify-between gap-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="text-[4.5rem] font-bold font-figtree text-[#0f172a] leading-none mb-3">40+</div>
                  <div className="text-[15px] font-bold text-[#0f172a] mb-1">Professional Team</div>
                  <div className="text-[15px] font-bold text-[#0f172a]">Members</div>
                </div>
                <p className="text-[13.5px] text-slate-400 leading-relaxed max-w-[180px] mt-1">
                  Our team is a passionate group of thinkers, creators, and problem-solvers dedicated to transforming CX.
                </p>
              </motion.div>
            </div>

            {/* RIGHT column — slides in from the far right */}
            <div className="flex flex-col gap-5">

              {/* Top tile — dark globe */}
              <motion.div
                initial={{ opacity: 0, x: "100vw" }}
                animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0f172a] rounded-[2rem] p-10 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[220px] hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Dotted Globe SVG */}
                <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[240px] h-[240px] opacity-90 pointer-events-none select-none">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <clipPath id="globeClip">
                        <circle cx="100" cy="100" r="96" />
                      </clipPath>
                      <radialGradient id="globeFade" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                      <mask id="fadeMask">
                        <circle cx="100" cy="100" r="96" fill="url(#globeFade)" />
                      </mask>
                    </defs>
                    <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                    <g clipPath="url(#globeClip)" mask="url(#fadeMask)">
                      {Array.from({ length: 27 }, (_, row) => row * 7 + 4).map(y =>
                        Array.from({ length: 27 }, (_, col) => col * 7 + 4).map(x => {
                          const dx = x - 100, dy = y - 100;
                          if (dx * dx + dy * dy > 96 * 96) return null;
                          const inContinent =
                            (x > 22 && x < 62 && y > 28 && y < 78 && !(x < 32 && y > 65)) ||
                            (x > 34 && x < 62 && y > 82 && y < 145 && !(x > 54 && y < 95)) ||
                            (x > 90 && x < 118 && y > 28 && y < 68 && !(x > 112 && y < 42)) ||
                            (x > 90 && x < 128 && y > 68 && y < 148 && !(x < 96 && y > 130)) ||
                            (x > 114 && x < 178 && y > 24 && y < 108 && !(x > 165 && y > 90) && !(x < 124 && y < 36)) ||
                            (x > 148 && x < 182 && y > 118 && y < 155 && !(x < 154 && y > 140));
                          return (
                            <circle key={`${x}-${y}`} cx={x} cy={y}
                              r={inContinent ? 1.3 : 0.6}
                              fill={inContinent ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)'}
                            />
                          );
                        })
                      )}
                      {[35, 60, 100, 140, 165].map(cy => (
                        <ellipse key={cy} cx="100" cy={cy} rx="92" ry="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
                      ))}
                      {[60, 80, 100, 120, 140].map(cx => (
                        <ellipse key={cx} cx={cx} cy="100" rx="7" ry="92" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
                      ))}
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-[4rem] font-bold font-figtree text-white leading-none mb-3">100%</div>
                  <div className="text-[15px] text-slate-300 font-bold">Focused on Enterprise CX Outcomes</div>
                </div>
              </motion.div>

              {/* Bottom row — two tiles */}
              <div className="grid grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: "100vw" }}
                  animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
                  transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#1447d4] rounded-[2rem] p-8 flex flex-col justify-between min-h-[200px] hover:bg-[#0d3ab8] hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-[3.8rem] font-bold font-figtree text-white leading-none">6</div>
                  <div className="text-[14px] text-blue-100 font-bold leading-snug">Office Locations<br />Globally</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: "100vw" }}
                  animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
                  transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#1e293b] rounded-[2rem] p-8 flex flex-col justify-between min-h-[200px] hover:bg-[#0f172a] hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-[3.8rem] font-bold font-figtree text-white leading-none">7+</div>
                  <div className="text-[14px] text-slate-300 font-bold leading-snug">Years of CX<br />Industry Expertise</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Role tags */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mt-10">
            {funcTags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[13px] text-slate-500 font-bold hover:border-blue-400/40 hover:text-[#1447d4] hover:bg-blue-50/50 transition-all duration-200 cursor-default">{tag}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Leadership</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.4, ease }}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5">
              <span className="text-[#0f172a]">The team behind</span><br /><span className="text-[#1447d4]">the platform.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-[620px] mx-auto leading-relaxed">
              Seasoned CX and technology leaders with deep regional expertise — practitioners who lived the problem Inaipi was built to solve.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {allLeaders.slice(0, 4).map((l, i) => (
              <motion.div key={l.name + '-top'}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-default"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] bg-slate-100">
                  {l.img ? (
                    <Image src={l.img} alt={l.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${l.gradient} flex items-center justify-center`}>
                      <span className="text-5xl font-bold font-figtree text-white/90">{l.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <a href="#" className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1447d4] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#1447d4] hover:text-white shadow-lg z-10">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <h4 className="text-[18px] font-bold font-figtree text-[#0f172a] leading-tight mb-1 group-hover:text-[#1447d4] transition-colors duration-300">{l.name}</h4>
                <p className="text-[13px] text-slate-500 font-bold">{l.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Second row: 3 cards — centered */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-[75%] lg:mx-auto">
            {allLeaders.slice(4).map((l, i) => (
              <motion.div key={l.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-default"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] bg-slate-100">
                  {l.img ? (
                    <Image src={l.img} alt={l.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${l.gradient} flex items-center justify-center`}>
                      <span className="text-5xl font-bold font-figtree text-white/90">{l.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <a href="#" className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1447d4] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#1447d4] hover:text-white shadow-lg z-10">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <h4 className="text-[18px] font-bold font-figtree text-[#0f172a] leading-tight mb-1 group-hover:text-[#1447d4] transition-colors duration-300">{l.name}</h4>
                <p className="text-[13px] text-slate-500 font-bold">{l.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Section label */}
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Global Presence</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15]">
              <span className="text-[#0f172a]">Serving clients </span>
              <span className="text-[#1447d4]">across the globe.</span>
            </motion.h2>
          </div>

          {/* Two-column: offices left, image right */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* Offices — stacked on the left */}
            <div className="lg:flex-1 flex flex-col justify-center gap-3">
              {offices.map((o, i) => (
                <motion.div
                  key={o.city}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/8 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-2xl shrink-0 mt-0.5">{o.flag}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[17px] font-bold text-[#0f172a] group-hover:text-[#1447d4] transition-colors duration-200">{o.city}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#1447d4] px-2.5 py-0.5 rounded-full">{o.type}</span>
                    </div>
                    {o.addr && <p className="text-[13px] text-slate-600 leading-snug mt-1">{o.addr}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image — 75% width, on the right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="lg:w-[72%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 shrink-0"
            >
              <Image src="/global.jpeg" alt="Inaipi Global Presence" width={1920} height={960} className="w-full h-auto object-contain" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TRUST & SECURITY ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Trust & Security</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.4, ease }}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5">
              <span className="text-[#0f172a]">Built on a foundation</span><br /><span className="text-[#1447d4]">of trust.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-[620px] mx-auto leading-relaxed">
              When enterprises run their customer experience on Inaipi, they trust us with their most sensitive relationships. We take that seriously.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {trustCards.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 rounded-[2rem] hover:shadow-2xl hover:shadow-blue-900/18 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                style={{ background: '#1447d4' }}>
                <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
                <div className="relative z-10 w-10 h-10 rounded-[11px] bg-white/15 border border-white/25 flex items-center justify-center text-white mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="relative z-10 text-[16px] font-bold font-figtree text-white mb-2 leading-tight">{title}</h4>
                <p className="relative z-10 text-[14px] text-white/80 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3">
            {['ISO 27001:2022', 'GDPR Compliant', 'ISO 27001:2022 Certified', 'MENA Regulatory Ready'].map(badge => (
              <span key={badge} className="flex items-center gap-2 px-5 py-2.5 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full text-[12px] font-bold text-[#1447d4]">
                <Shield className="w-4 h-4 text-[#1447d4]" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA />

      <Footer />
    </main>
  );
}

function ChevronIcon() {
  return (
    <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
