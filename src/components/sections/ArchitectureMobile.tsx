'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ARCH_SLIDES } from './architectureSlides';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The architecture on narrow screens: one step at a time, at the width of the
 * viewport, advanced with the arrows, the dots or a swipe. The desktop canvas
 * is unchanged and still used from `lg` up.
 */
export default function ArchitectureMobile() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const last = ARCH_SLIDES.length - 1;

  const go = (next: number) => {
    if (next < 0 || next > last) return;
    setDir(next > i ? 1 : -1);
    setI(next);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 320;
    if (!far) return;
    if (info.offset.x < 0) go(Math.min(last, i + 1));
    else go(Math.max(0, i - 1));
  };

  const slide = ARCH_SLIDES[i];

  return (
    <div className="w-full">
      {/* Step header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          Step {i + 1} of {ARCH_SLIDES.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(i - 1)}
            disabled={i === 0}
            aria-label="Previous step"
            className="w-9 h-9 rounded-full border border-blue-100 bg-white flex items-center justify-center text-[#1447d4] disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(i + 1)}
            disabled={i === last}
            aria-label="Next step"
            className="w-9 h-9 rounded-full border border-blue-100 bg-white flex items-center justify-center text-[#1447d4] disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* One step. overflow-hidden keeps the sliding card from widening the page. */}
      <div className="relative w-full overflow-hidden rounded-[1.5rem] border bg-white shadow-xl" style={{ borderColor: 'rgba(20,71,212,0.12)' }}>
        <AnimatePresence initial={false} mode="wait" custom={dir}>
          <motion.div
            key={slide.key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={onDragEnd}
            className="p-5 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-[15px] font-bold font-figtree text-[#0f172a] leading-snug">{slide.title}</h3>
              {slide.pill && (
                <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-[#1447d4] px-2.5 py-1 rounded-full" style={{ background: 'rgba(20,71,212,0.07)', border: '1px solid rgba(20,71,212,0.15)' }}>
                  {slide.pill}
                </span>
              )}
            </div>

            <div className={slide.cols === 2 ? 'grid grid-cols-2 gap-2.5' : 'grid grid-cols-1 gap-2.5'}>
              {slide.items.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl p-3 min-w-0"
                    style={{
                      background: item.lead ? 'linear-gradient(135deg,#FFFFFF 0%,#EAF1FF 100%)' : '#fff',
                      border: `1px solid ${item.lead ? '#1447d4' : 'rgba(20,71,212,0.14)'}`,
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: item.lead ? '#1447d4' : '#E6EEFE', color: item.lead ? '#fff' : '#1447d4' }}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-semibold text-[#0e1726] leading-tight break-words">{item.label}</span>
                      {item.sub && <span className="block text-[10.5px] text-slate-400 leading-tight mt-0.5 break-words">{item.sub}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {ARCH_SLIDES.map((s, n) => (
          <button
            key={s.key}
            type="button"
            onClick={() => go(n)}
            aria-label={s.title}
            aria-current={n === i ? 'true' : undefined}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: n === i ? 22 : 8, background: n === i ? '#1447d4' : 'rgba(20,71,212,0.22)' }}
          />
        ))}
      </div>
    </div>
  );
}
