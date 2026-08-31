'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RichContent from '@/components/RichContent';
import DownloadGate from '@/components/DownloadGate';
import { hasHtml, toDocuments } from '@/lib/richtext';

const ease = [0.22, 1, 0.36, 1] as const;

type Resource = {
  id: string; slug: string; title: string; excerpt: string; image: string;
  category: string; html: string; content: string[]; documents: unknown;
};

export default function ResourceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
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

  const resource = resources.find(r => r.slug === slug);
  const related = resources.filter(r => r.slug !== slug).slice(0, 3);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center text-slate-400 text-sm">Loading resource…</div>
        <Footer />
      </main>
    );
  }

  if (!resource) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Resource Not Found</h1>
          <p className="text-slate-500 mb-8">This resource may have been renamed or removed.</p>
          <Link href="/resources" className="text-blue-600 font-bold hover:underline">View All Resources</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const documents = toDocuments(resource.documents);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

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
            <Link href="/resources" className="text-[11px] font-bold text-slate-400 hover:text-[#1447d4] transition-colors">Buyer Resources</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-blue-600">Resource</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            {resource.category && (
              <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-5">{resource.category}</span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-5">{resource.title}</h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-3xl">{resource.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-white relative overflow-visible">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {resource.image && (
                <div className="rounded-3xl overflow-hidden border border-blue-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resource.image} alt={resource.title} className="w-full object-cover" />
                </div>
              )}

              {hasHtml(resource.html) ? (
                <RichContent html={resource.html} />
              ) : (
                <div className="space-y-4">
                  {(resource.content ?? []).map((p, i) => (
                    <p key={i} className="text-base sm:text-lg text-slate-500 leading-relaxed">{p}</p>
                  ))}
                </div>
              )}

              {documents.length > 0 && (
                <>
                  <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />
                  <DownloadGate documents={documents} source="Buyer Resource" title={resource.title} />
                </>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl border border-blue-100 bg-[#f8faff] p-6">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Talk to us</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">Want a walkthrough instead? We are happy to run through it with you.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#1447d4] hover:gap-3 transition-all">Get in touch →</Link>
                </div>

                {related.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">More resources</p>
                    <div className="space-y-3">
                      {related.map(r => (
                        <Link key={r.id} href={`/resources/${r.slug}`} className="block text-sm font-bold text-slate-700 hover:text-[#1447d4] transition-colors leading-snug">
                          {r.title}
                        </Link>
                      ))}
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
