'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AgentDesktopUI, { DESIGN_H, DESIGN_W } from './AgentDesktopUI';

/* Below this the mock's 10–13px type stops being readable. */
const MIN_SCALE = 0.55;

export default function AgentDesktop() {
  const [desktopImage, setDesktopImage] = useState('');
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/site-images')
      .then(r => r.json())
      .then(d => { if (d.agentDesktopImage) setDesktopImage(d.agentDesktopImage); })
      .catch(() => {});
  }, []);

  /* The mock is authored at a fixed canvas — scale it to whatever width we get,
     but never below MIN_SCALE or the UI stops being legible. Narrower than that
     and the frame scrolls sideways instead. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(Math.max(MIN_SCALE, Math.min(1, el.clientWidth / DESIGN_W)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktopImage]);

  /* Only run the mock's clocks and auto-tour while the section is on screen. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-14 lg:py-16 overflow-hidden border-t border-blue-100/40 relative"
      style={{ background: '#f8faff' }}
    >
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', top: '-220px', right: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '32vw', height: '32vw', bottom: '-160px', left: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-14 max-w-4xl relative">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-eyebrow">
          Unified Workspace
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5">
          The <span className="text-[#1447d4]">Agent Desktop.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Every channel, every customer, every insight in one unified interface. No tab switching. No context loss.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-[#f2f6fc]"
        >
          {desktopImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={desktopImage} alt="Inaipi Agent Desktop" className="w-full object-cover" />
          ) : (
            <div ref={frameRef} className="ad-scroll" style={{ width: '100%', height: DESIGN_H * scale, overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}>
                <div style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <AgentDesktopUI playing={inView} />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {!desktopImage && (
          <p className="text-center text-xs text-slate-400 mt-5 font-medium">
            Live product tour: workspace, monitoring, cases and analytics.
            <span className="hidden sm:inline"> Click any tab to explore.</span>
            <span className="sm:hidden"> Swipe the panel sideways to explore.</span>
          </p>
        )}
      </div>
    </section>
  );
}
