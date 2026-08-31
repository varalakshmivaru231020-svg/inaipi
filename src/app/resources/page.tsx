'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toDocuments } from '@/lib/richtext';

const ease = [0.22, 1, 0.36, 1] as const;

type Resource = {
  id: string; slug: string; title: string; excerpt: string;
  image: string; category: string; documents: unknown;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resources', { cache: 'no-store' })
      .then(r => r.json())
      .then((d: Resource[]) => { setResources(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 lg:pt-36 pb-14 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="section-eyebrow"
          >
            Buyer Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-5"
          >
            Guides, brochures and <span className="text-[#1447d4]">datasheets.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            Everything you need to evaluate Inaipi, ready to download.
          </motion.p>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {loading ? (
            <p className="text-center text-slate-400 text-sm">Loading resources…</p>
          ) : resources.length === 0 ? (
            <p className="text-center text-slate-400 text-sm">Resources are on their way. Check back shortly.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-start">
              {resources.map((r, i) => {
                const docs = toDocuments(r.documents);
                return (
                  <motion.article
                    key={r.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease, delay: Math.min(i, 5) * 0.05 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-400 shadow-md hover:shadow-2xl hover:shadow-blue-700/15 transition-all duration-300 flex flex-col"
                  >
                    <Link href={`/resources/${r.slug}`} className="flex flex-col flex-1">
                      <div className="relative h-44 bg-slate-100 overflow-hidden shrink-0">
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt={r.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#EAF1FF,#DCE8FF)' }}>
                            <FileText className="w-10 h-10 text-[#1447d4]" />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        {r.category && (
                          <span className="self-start text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ color: '#1447d4', background: '#eff6ff' }}>
                            {r.category}
                          </span>
                        )}
                        <h2 className="text-lg font-bold font-figtree text-[#0f172a] leading-snug mb-2 group-hover:text-[#1447d4] transition-colors">{r.title}</h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{r.excerpt}</p>
                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <Download className="w-3.5 h-3.5" />
                            {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all" style={{ color: '#1447d4' }}>
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
