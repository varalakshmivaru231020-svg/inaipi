'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { industryIcon, type Industry } from '@/lib/industryIcons';

export default function Industries() {
  /* The cards are managed in the admin, so a new sector shows up here and gets
     its own detail page without a code change. */
  const [industries, setIndustries] = useState<Industry[]>([]);
  useEffect(() => {
    let alive = true;
    fetch('/api/industries', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((d: Industry[]) => { if (alive && Array.isArray(d)) setIndustries(d); })
      .catch(() => { if (alive) setIndustries([]); });
    return () => { alive = false; };
  }, []);

  return (
    <section id="industries" className="py-14 lg:py-16 overflow-hidden relative" style={{ background: '#f8faff' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '44vw', height: '44vw', top: '-180px', right: '-240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', bottom: '-140px', left: '-160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
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
          {industries.map(ind => {
            const Icon = industryIcon(ind.icon);
            return (
              <motion.div
                key={ind.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(20,71,212,0.16)', transition: { duration: 0.2, ease: 'easeOut' } }}
                className="group relative overflow-hidden bg-white hover:border-[#1447d4]/25"
                style={{
                  borderRadius: 20,
                  border: '1.5px solid rgba(20,71,212,0.10)',
                  padding: '28px 24px',
                  boxShadow: '0 2px 16px rgba(20,71,212,0.06)',
                }}
              >
                {/* The whole card opens the sector's page. An overlay link keeps
                    the card markup, hover animation and spacing exactly as they
                    were rather than re-nesting everything inside an anchor. */}
                <Link href={`/industries/${ind.slug}`} className="absolute inset-0 z-10" aria-label={ind.name} />

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
