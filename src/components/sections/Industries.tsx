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
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
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
    <section className="py-10 overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '44vw', height: '44vw', top: '-180px', right: '-240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', bottom: '-140px', left: '-160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-4"
          >
            Industry Use Cases
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.03em] leading-[1.25] mb-5 pb-2 text-[#0f172a]"
          >
            Built for every industry.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-400 leading-relaxed"
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
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(37,99,235,0.35)', transition: { duration: 0.25, ease: 'easeOut' } }}
                className="group relative overflow-hidden cursor-default"
                style={{
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'linear-gradient(145deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)',
                  padding: '24px 22px',
                }}
              >
                {/* Border draw on hover — top edge */}
                <div className="absolute top-0 left-0 h-[2px] rounded-full pointer-events-none z-10 w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)' }} />

                {/* Hover shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)', zIndex: 1 }} />

                {/* Dotted texture overlay */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }} />

                {/* Top row: icon with rotating glow (wa-rotated from reference) */}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  {/* Icon wrap — outer circle with spinning glow inside */}
                  <div className="relative" style={{ width: 56, height: 56 }}>
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)', border: '1px solid rgba(255,255,255,0.22)' }} />
                    {/* Inner icon circle */}
                    <div className="absolute flex items-center justify-center rounded-full" style={{ top: 6, left: 6, width: 44, height: 44, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {/* Rotating glow — exact wa-rotated 7s from reference */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
                      style={{ zIndex: -1 }}
                    >
                      {/* top glow blob */}
                      <div style={{ position: 'absolute', top: 3, left: 19, width: 18, height: 10, background: 'rgba(255,255,255,0.7)', filter: 'blur(3px)', borderRadius: '50%' }} />
                      {/* bottom glow blob */}
                      <div style={{ position: 'absolute', bottom: 3, left: 19, width: 18, height: 10, background: 'rgba(255,255,255,0.5)', filter: 'blur(3px)', borderRadius: '50%' }} />
                    </motion.div>
                  </div>
                </div>

                {/* Title with animated underline */}
                <div className="relative z-10 mb-1">
                  <h3 className="text-[17px] font-bold text-white font-figtree leading-snug inline-block">{ind.name}</h3>
                  {/* underline draws on hover */}
                  <div className="h-[2px] rounded-full mt-1 bg-white/80 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>

                <p className="relative z-10 text-[13px] text-white/65 font-figtree font-normal leading-relaxed mb-4">{ind.desc}</p>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {ind.useCases.map((uc, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-figtree font-semibold uppercase tracking-wider text-white/80 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}
                    >
                      {uc}
                    </span>
                  ))}
                </div>

                {/* Bottom glow */}
                <div className="absolute pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" style={{ bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', zIndex: 0 }} />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
