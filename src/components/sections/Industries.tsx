'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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

  /* The cards reveal once they are both on screen and actually loaded.

     They used to reveal on whileInView alone, with once:true. The grid is empty
     while the fetch is in flight, so coming back from a detail page — where the
     scroll is restored with the grid already on screen — spent that one shot on
     an empty grid, and the cards that arrived a moment later stayed at opacity
     0. The section looked blank even though every card was in the DOM. Tying
     the reveal to the data as well as the viewport fixes that, and the entrance
     on a first visit is unchanged. */
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  /* A first visit starts at the top of the page; coming back from a detail page
     starts wherever the reader was, and the browser settles that position while
     the rest of the page is still measuring itself, so the grid can end up well
     off screen. Waiting to be seen would leave it invisible until they happened
     to scroll back to it, so a restored position reveals the cards straight
     away. A first visit still gets the entrance as it comes into view. */
  const [restored, setRestored] = useState(false);
  useEffect(() => { if (window.scrollY > 100) setRestored(true); }, []);

  const revealed = industries.length > 0 && (gridInView || restored);

  /* A link to /#industry-<slug> brings that sector's own card into view. The
     cards arrive with the fetch, so this runs once they exist as well as on
     every later hash change. */
  useEffect(() => {
    const open = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash.startsWith('industry-')) return;
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    if (industries.length) open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, [industries.length]);

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
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={revealed ? 'visible' : 'hidden'}
        >
          {industries.map(ind => {
            const Icon = industryIcon(ind.icon);
            return (
              <motion.div
                key={ind.id}
                /* the footer links straight to a sector's own card */
                id={`industry-${ind.slug}`}
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
                  // clear the fixed navbar when linked to directly
                  scrollMarginTop: 96,
                }}
              >
                {/* The whole card opens the sector's page. An overlay link keeps
                    the card markup, hover animation and spacing exactly as they
                    were rather than re-nesting everything inside an anchor. */}
                <Link href={`/industries/${ind.slug}`} className="absolute inset-0 z-10" aria-label={ind.name} />

                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: '#1447d4' }} />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: '#1447d4' }}>
                  {ind.iconUrl
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={ind.iconUrl} alt="" className="w-7 h-7 object-contain" />
                    : <Icon className="w-5 h-5 text-white" />}
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
