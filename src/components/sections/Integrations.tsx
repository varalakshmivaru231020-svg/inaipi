'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const logos = [
  "Salesforce", "Zoho", "HubSpot", "Microsoft", 
  "Avaya", "3CX", "Zoom", "Twilio", 
  "Slack", "ServiceNow", "Jira", "Shopify",
  "SAP", "Oracle", "OpenAI", "Anthropic"
];

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.children;
    
    gsap.to(elements, {
      y: (i) => (i % 2 === 0 ? '-15px' : '15px'),
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
         amount: 2,
         from: 'random',
      }
    });

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <section className="py-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      <div className="absolute pointer-events-none" style={{ width: '48vw', height: '48vw', top: '-240px', left: '-320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '36vw', height: '36vw', bottom: '-180px', right: '-220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
      {/* Background connecting lines (Subtle) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 100 100">
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="section-eyebrow">Enterprise Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-5">Seamlessly integrates with your existing stack.</h2>
          <p className="text-[16px] text-slate-500 leading-relaxed">No more silos. Inaipi connects directly with your CRM, Telephony, and Collaboration tools.</p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8"
        >
          {logos.map((name, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              className="glass aspect-square flex items-center justify-center p-6 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm cursor-pointer transition-shadow hover:shadow-lg group"
            >
               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                     <span className="text-[10px] font-black uppercase tracking-tighter">{name.substring(0, 2)}</span>
                  </div>
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest group-hover:text-blue-500/70 transition-colors">{name}</span>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Connection Points */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale">
            {[1, 2, 3, 4, 5].map((it) => (
                <div key={it} className="flex items-center space-x-2">
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
