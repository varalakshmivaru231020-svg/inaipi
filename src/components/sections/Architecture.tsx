'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Architecture() {
  return (
    <section className="py-8 overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      <div className="absolute pointer-events-none" style={{ width: '48vw', height: '48vw', top: '-200px', right: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.06)' }} />
      <div className="absolute pointer-events-none" style={{ width: '32vw', height: '32vw', bottom: '-150px', left: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
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
          <span className="inline-block text-xs font-black uppercase tracking-[0.4em] text-blue-600 border border-blue-100 bg-blue-50 px-4 py-2 rounded-full mb-6">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.25] mb-5">
            Inaipi Architecture
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
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
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-white w-full">
            <Image
              src="/arch.jpeg"
              alt="Inaipi Architecture Diagram"
              width={1200}
              height={800}
              className="w-full object-cover"
              style={{ maxHeight: '700px' }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
