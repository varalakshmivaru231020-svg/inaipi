'use client';

import { motion } from 'framer-motion';
import { Heart, Landmark, ShieldHalf, GraduationCap, Plane, ShoppingBag, Building2, Truck } from 'lucide-react';

const industries = [
  {
    icon: Heart,
    name: 'Healthcare',
    sub: 'Life Sciences',
    color: '#e11d48',
    bg: '#fff1f2',
    border: '#fecdd3',
    stat: '01',
    desc: 'Appointment management, patient engagement & surveys, grievance handling across every channel.',
    useCases: ['Appointment Automation', 'Patient Surveys', 'Grievance Mgmt'],
  },
  {
    icon: ShieldHalf,
    name: 'Insurance',
    sub: 'Advisory & Claims',
    color: '#006fff',
    bg: '#eff6ff',
    border: '#bfdbfe',
    stat: '02',
    desc: 'Claims triage, policy inquiry automation and AI-powered renewal follow-ups at scale.',
    useCases: ['Claims Servicing', 'Policy Inquiries', 'Renewal AI'],
  },
  {
    icon: Plane,
    name: 'Hospitality',
    sub: 'Travel & Hotels',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    stat: '03',
    desc: 'Pre-stay to post-stay guest engagement, booking support and loyalty management.',
    useCases: ['Guest Journey', 'Service Requests', 'Loyalty'],
  },
  {
    icon: GraduationCap,
    name: 'Education',
    sub: 'Public Sector',
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
    stat: '04',
    desc: 'Student helpdesk, admissions inquiries and multi-channel feedback workflows at scale.',
    useCases: ['Student Support', 'Admissions', 'Feedback'],
  },
  {
    icon: Landmark,
    name: 'Government',
    sub: 'Public Services',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    stat: '05',
    desc: 'Citizen services, complaint management and compliant omnichannel CX with Arabic support.',
    useCases: ['Citizen Services', 'Arabic Support', 'Audit Compliant'],
  },
  {
    icon: ShoppingBag,
    name: 'Telecom & Retail',
    sub: 'Commerce',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    stat: '06',
    desc: 'High-volume omnichannel support with NPS tracking and AI-powered churn prediction.',
    useCases: ['Omnichannel', 'NPS Tracking', 'Churn AI'],
  },
];

export default function Industries() {
  return (
    <section className="py-20 lg:py-24 overflow-hidden relative" style={{ background: '#f8faff' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '44vw', height: '44vw', top: '-180px', right: '-240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', bottom: '-140px', left: '-160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Industry Use Cases
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5 pb-2"
          >
            Built for <span className="text-[#1447d4]">every industry.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed whitespace-nowrap"
          >
            Inaipi adapts to the compliance, workflows, and customer expectations of your specific domain.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(20,71,212,0.16)', transition: { duration: 0.2, ease: 'easeOut' } }}
                className="group relative overflow-hidden cursor-default bg-white hover:border-[#1447d4]/25"
                style={{
                  borderRadius: 20,
                  border: '1.5px solid rgba(20,71,212,0.10)',
                  padding: '28px 24px',
                  boxShadow: '0 2px 16px rgba(20,71,212,0.06)',
                }}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: '#1447d4' }} />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: '#1447d4' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold font-figtree text-[#0f172a] leading-tight mb-2 group-hover:text-[#1447d4] transition-colors duration-300">{ind.name}</h3>

                {/* Desc */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{ind.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {ind.useCases.map((uc, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-black uppercase tracking-widest text-[#1447d4] px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(20,71,212,0.07)', border: '1px solid rgba(20,71,212,0.15)' }}
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
