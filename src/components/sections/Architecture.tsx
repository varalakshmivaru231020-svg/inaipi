'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Architecture() {
  const [archImage, setArchImage] = useState('/arch1.png');

  useEffect(() => {
    fetch('/api/site-images')
      .then(r => r.json())
      .then(d => { if (d.architectureImage) setArchImage(d.architectureImage); });
  }, []);
  return (
    <section className="py-20 lg:py-24 overflow-hidden relative" style={{ background: '#f8faff' }}>
      <div className="absolute pointer-events-none" style={{ width: '48vw', height: '48vw', top: '-200px', right: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.06)' }} />
      <div className="absolute pointer-events-none" style={{ width: '32vw', height: '32vw', bottom: '-150px', left: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow wow wow-d1">Architecture</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5 wow wow-d2">
            Inaipi <span className="text-[#1447d4]">Architecture</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto wow wow-d3">
            A single unified platform — every channel, AI layer, and enterprise
            integration connected through one intelligent core.
          </p>
        </motion.div>

        {/* Image — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border bg-white w-full" style={{ borderColor: 'rgba(20,71,212,0.12)' }}>
            <img
              src={archImage}
              alt="Inaipi Architecture Diagram"
              className="w-full object-cover"
              style={{ maxHeight: '700px' }}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
