'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { industryIcon, type Industry } from '@/lib/industryIcons';
import RichContent from '@/components/RichContent';
import DownloadGate from '@/components/DownloadGate';
import { hasHtml, toDocuments } from '@/lib/richtext';

const ease = [0.22, 1, 0.36, 1] as const;

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/industries', { cache: 'no-store' })
      .then(r => r.json())
      .then((d: Industry[]) => { setIndustries(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Fix sticky positioning by switching root overflow from 'hidden' to 'clip'
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  const industry = industries.find(n => n.slug === slug);
  const related = industries.filter(n => n.slug !== slug).slice(0, 3);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center text-slate-400 text-sm">Loading industry…</div>
        <Footer />
      </main>
    );
  }

  if (!industry) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Industry Not Found</h1>
          <p className="text-slate-500 mb-8">This sector may have been renamed or removed.</p>
          <Link href="/#industries" className="text-blue-600 font-bold hover:underline">View All Industries</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = industryIcon(industry.icon);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 lg:pt-36 pb-14 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/#industries" className="text-[11px] font-bold text-slate-400 hover:text-[#1447d4] transition-colors">Industries</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-blue-600">{industry.name}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 overflow-hidden" style={{ background: '#1447d4' }}>
              {industry.iconUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={industry.iconUrl} alt="" className="w-7 h-7 object-contain" />
                : <Icon className="w-5 h-5 text-white" />}
            </div>
            {industry.sub && (
              <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-5">{industry.sub}</span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-5">{industry.name}</h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-3xl">{industry.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-16 bg-white relative overflow-visible">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* ── LEFT: the sector's content ── */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="space-y-12">
                {(hasHtml(industry.html) || industry.content.length > 0) && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-4">Overview</h2>
                    {hasHtml(industry.html) ? (
                      <RichContent html={industry.html as string} />
                    ) : (
                      <div className="space-y-4">
                        {industry.content.map((p, i) => (
                          <p key={i} className="text-base sm:text-lg text-slate-500 leading-relaxed">{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {industry.useCases.length > 0 && (
                  <>
                    {(hasHtml(industry.html) || industry.content.length > 0) && <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-6">Use Cases</h2>
                      <ul className="space-y-3">
                        {industry.useCases.map((uc, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#1447d4]" />
                            </span>
                            <span className="text-base sm:text-lg text-slate-500 leading-relaxed">{uc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                {toDocuments(industry.documents).length > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />
                    <DownloadGate documents={toDocuments(industry.documents)} source="Industry" title={industry.name} />
                  </>
                )}
              </motion.div>
            </div>

            {/* ── RIGHT: the other sectors ── */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl border border-blue-100 bg-[#f8faff] p-6">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Talk to us</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">See how Inaipi fits the workflows and compliance of {industry.name}.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#1447d4] hover:gap-3 transition-all">
                    Get in touch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {related.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Other Industries</p>
                    <div className="space-y-3">
                      {related.map(n => {
                        const RelIcon = industryIcon(n.icon);
                        return (
                          <Link key={n.id} href={`/industries/${n.slug}`} className="flex items-center gap-3 group">
                            <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 overflow-hidden">
                              {n.iconUrl
                                // eslint-disable-next-line @next/next/no-img-element
                                ? <img src={n.iconUrl} alt="" className="w-5 h-5 object-contain" />
                                : <RelIcon className="w-4 h-4 text-[#1447d4]" />}
                            </span>
                            <span className="text-sm font-bold text-slate-700 group-hover:text-[#1447d4] transition-colors">{n.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
