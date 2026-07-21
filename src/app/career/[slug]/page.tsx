'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

type Job = {
  slug: string; title: string; type: string; location: string; salary: string;
  desc: string; responsibilities: string[]; requirements: string[]; offers: string[];
};

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then((d: Job[]) => { setJobs(d); setLoading(false); })
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

  const job = jobs.find(j => j.slug === slug);
  const related = jobs.filter(j => j.slug !== slug).slice(0, 2);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center text-slate-400 text-sm">Loading position…</div>
        <Footer />
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Position Not Found</h1>
          <p className="text-slate-500 mb-8">This position may have been filled or removed.</p>
          <Link href="/career" className="text-blue-600 font-bold hover:underline">View All Positions</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)', maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/career" className="text-[11px] font-bold text-slate-400 hover:text-[#1447d4] transition-colors">Career</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-blue-600">Career Details</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-5">{job.type}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-5">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-[14px] text-slate-500 leading-relaxed">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.salary}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white relative overflow-visible">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* ── LEFT: Job Content ── */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-4">Job Description:</h2>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-4">{job.desc}</p>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                    From day one, you&apos;ll work closely with cross-functional teams in a fast-paced, collaborative environment where your contributions directly shape the product and customer experience.
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

                {/* Responsibilities */}
                {job.responsibilities?.length > 0 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-6">Key Responsibilities:</h2>
                    <ul className="space-y-4">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                          <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-blue-500" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

                {/* Requirements */}
                {job.requirements?.length > 0 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-6">Requirements:</h2>
                    <ul className="space-y-4">
                      {job.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                          <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#006fff]" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

                {/* What We Offer */}
                {job.offers?.length > 0 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-6">What We Offer:</h2>
                    <ul className="space-y-4">
                      {job.offers.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                          <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#006fff]" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Apply Button */}
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/contact" className="relative group overflow-hidden inline-flex items-center gap-3 bg-[#1447d4] hover:bg-[#0d3ab8] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40">
                    <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 pointer-events-none" />
                    <span className="relative z-10">Apply for this Job</span>
                    <span className="relative z-10 w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky Sidebar ── */}
            <div className="lg:col-span-4 relative mt-12 lg:mt-0">
              <div className="space-y-6 lg:sticky lg:top-36 lg:h-fit self-start">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }} className="rounded-[2rem] p-8 relative overflow-hidden border border-slate-200 shadow-sm" style={{ background: '#dde6ff' }}>
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="inline-flex items-center px-4 py-2 bg-[#0f172a] text-white rounded-full text-[11px] font-black uppercase tracking-widest">{job.type}</span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 text-slate-600 rounded-full text-[12px] font-bold border border-blue-100">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-700/30">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Salary</p>
                        <p className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight">{job.salary}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }} className="relative rounded-[2rem] overflow-hidden" style={{ background: '#0f172a', minHeight: 280 }}>
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: 280 }}>
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Now Hiring</span>
                      </div>
                      <h3 className="text-2xl font-black text-white leading-snug">
                        Looking for full&#8209;time<br />or part&#8209;time roles?<br />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">This is the right place.</span>
                      </h3>
                    </div>
                    <Link href="/career" className="inline-flex items-center gap-3 bg-[#1447d4] hover:bg-[#0d3ab8] text-white px-6 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-700/30 self-start group">
                      View All Jobs
                      <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {related.length > 0 && (
        <section className="py-24 relative overflow-hidden" style={{ background: '#f8faff' }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">More Openings</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold font-figtree tracking-[-0.025em] leading-[1.15]">
                <span className="text-[#0f172a]">Explore More </span>
                <span className="text-[#1447d4]">Positions</span>
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((j, i) => (
                <motion.div key={j.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: i * 0.08, duration: 0.5, ease }} className="group p-8 lg:p-10 border border-slate-200 shadow-sm rounded-[2rem] hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-700/15 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden" style={{ background: '#dde6ff' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" style={{ background: '#1447d4' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest group-hover:bg-white/20 group-hover:border-white/20 group-hover:text-white transition-all duration-300">{j.type}</span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:bg-white/10 group-hover:text-blue-100 transition-all duration-300">
                        <MapPin className="w-3 h-3" />{j.location}
                      </span>
                    </div>
                    <h3 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-white transition-colors duration-300">{j.title}</h3>
                    <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 group-hover:text-blue-100 transition-colors duration-300">{j.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-400 group-hover:text-blue-200 transition-colors duration-300">
                        <Clock className="w-3.5 h-3.5" />{j.salary}
                      </span>
                      <Link href={`/career/${j.slug}`} className="inline-flex items-center gap-2.5 bg-[#2563eb] group-hover:bg-white text-white group-hover:text-[#2563eb] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md shadow-blue-700/25">
                        <span>View Details</span>
                        <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-blue-50 flex items-center justify-center transition-colors duration-300">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
