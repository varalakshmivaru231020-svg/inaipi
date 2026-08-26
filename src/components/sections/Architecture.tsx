'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ArchitectureDiagram, { ARCH_W } from './ArchitectureDiagram';

/* Below this the diagram's 10–12px labels stop being readable. */
const MIN_SCALE = 0.5;

export default function Architecture() {
  const [archImage, setArchImage] = useState('');
  const [scale, setScale] = useState(1);
  const [naturalH, setNaturalH] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/site-images')
      .then(r => r.json())
      // `/arch1.png` is the API's legacy hard-coded fallback, not a real admin
      // upload — ignore it so the new diagram is the default. A genuinely
      // uploaded image still overrides.
      .then(d => { if (d.architectureImage && d.architectureImage !== '/arch1.png') setArchImage(d.architectureImage); })
      .catch(() => {});
  }, []);

  /* The diagram is a fixed 1480px canvas — scale it to the container width, but
     never below MIN_SCALE (scroll sideways instead). offsetHeight is unaffected
     by the transform, so it always reports the natural, unscaled height. */
  useEffect(() => {
    if (archImage) return;
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    const measure = () => {
      setScale(Math.max(MIN_SCALE, Math.min(1, frame.clientWidth / ARCH_W)));
      setNaturalH(inner.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [archImage]);

  return (
    <section className="py-14 lg:py-16 overflow-hidden relative" style={{ background: '#f8faff' }}>
      <div className="absolute pointer-events-none" style={{ width: '48vw', height: '48vw', top: '-200px', right: '-300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.06)' }} />
      <div className="absolute pointer-events-none" style={{ width: '32vw', height: '32vw', bottom: '-150px', left: '-200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
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

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {archImage ? (
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border bg-white w-full" style={{ borderColor: 'rgba(20,71,212,0.12)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={archImage}
                alt="Inaipi Architecture Diagram"
                className="w-full object-cover"
                style={{ maxHeight: '700px' }}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          ) : (
            <>
              <div
                ref={frameRef}
                className="ad-scroll rounded-[2rem] overflow-x-auto overflow-y-hidden border shadow-2xl bg-white w-full"
                style={{ borderColor: 'rgba(20,71,212,0.12)', height: naturalH ? naturalH * scale : undefined, WebkitOverflowScrolling: 'touch' }}
              >
                <div style={{ width: ARCH_W * scale, height: naturalH ? naturalH * scale : undefined }}>
                  <div ref={innerRef} style={{ width: ARCH_W, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                    <ArchitectureDiagram />
                  </div>
                </div>
              </div>
              <p className="sm:hidden text-center text-xs text-slate-400 mt-4 font-medium">
                Swipe the diagram sideways to explore the full architecture.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
