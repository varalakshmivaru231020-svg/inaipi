'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCheck } from 'lucide-react';

const CUBE: [number, number, number, number] = [0.18, 0.82, 0.41, 1];



export default function CTA() {

  return (
    <section className="py-14 lg:py-16 px-6 relative overflow-hidden" style={{ background: '#f8faff' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ width: '40vw', height: '40vw', top: '-160px', right: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ width: '28vw', height: '28vw', bottom: '-120px', left: '-140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
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
              <div style={{ position: 'absolute', width: '55%', height: '70%', top: '-5%', right: '-5%', background: 'rgba(0,111,255,0.85)', borderRadius: '50%', filter: 'blur(50px)' }} />
              <div style={{ position: 'absolute', width: '35%', height: '50%', top: '20%', left: '15%', background: 'rgba(0,231,255,0.4)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', width: '30%', height: '90%', top: '5%', right: '15%', background: 'linear-gradient(180deg,rgba(0,111,255,0.7),rgba(0,71,255,0.4))', borderRadius: '40%', filter: 'blur(48px)', transform: 'rotate(10deg)' }} />
            </div>
          </motion.div>

          {/* ── Main dark card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: CUBE }}
            className="px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-[80px]"
            style={{ position: 'relative', background: '#000', borderRadius: 30, overflow: 'hidden', zIndex: 1 }}
          >
            {/* Color glow LEFT — blue */}
            <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, width: '63%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 80% at 0% 100%,rgba(0,71,255,0.7),rgba(0,71,255,0.3) 35%,transparent 65%)', clipPath: 'ellipse(80% 90% at 10% 90%)' }} />
            {/* Color glow RIGHT — cyan */}
            <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '39%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 80% at 100% 0%,rgba(0,231,255,0.5),rgba(0,111,255,0.25) 45%,transparent 70%)', clipPath: 'ellipse(90% 80% at 90% 10%)' }} />

            {/* Inner layout */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>

              {/* ── CENTER: text + form ── */}
              <div style={{ maxWidth: 620, color: '#fff', textAlign: 'center', width: '100%' }}>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: CUBE }}
                  style={{ fontSize: 'clamp(30px,3.2vw,40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 22, color: '#fff', fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}
                >
                  Your CX challenge.{' '}
                  <span style={{ color: '#4d8aff' }}>Our solution.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.55, ease: CUBE }}
                  style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 55, fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}
                >
                  Start with the capability you need today. Add more as your business grows.
                </motion.p>

                {/* CTA Buttons — match Navbar exactly */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.55, ease: CUBE }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  {/* Primary — full hover treatment */}
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96, y: 0 }} className="w-full sm:w-auto">
                    <button className="relative group overflow-hidden text-white min-h-[44px] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/50 hover:brightness-110 whitespace-nowrap w-full sm:w-auto" style={{ background: '#1447d4' }}>
                      {/* Shimmer fires on hover */}
                      <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
                      {/* Glow ring */}
                      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.3)' }} />
                      <span className="relative z-10">Book a Demo</span>
                      {/* Arrow shoots out and re-enters */}
                      <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                        <ArrowRight className="w-2.5 h-2.5 text-white translate-x-0 group-hover:translate-x-4 transition-transform duration-200 ease-in" />
                        <ArrowRight className="w-2.5 h-2.5 text-white absolute -translate-x-4 group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                      </span>
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.38 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 20, justifyContent: 'center' }}
                >
                  {['Cancel anytime', 'ISO 27001:2022', 'Live in 48 hours'].map((t, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 600, fontFamily: 'var(--font-figtree), Figtree, sans-serif' }}
                    >
                      <CheckCheck size={13} style={{ color: '#4ade80', flexShrink: 0 }} />
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
