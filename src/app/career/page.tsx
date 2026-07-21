'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/sections/CTA';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

type Job = { slug: string; title: string; type: string; location: string; salary: string; desc: string };

export default function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(setJobs).catch(() => setJobs([]));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.14) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1447d4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #f8faff 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-[#1447d4]">Career</span>
          </motion.div>

          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Join Our Team</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-figtree tracking-[-0.03em] mb-8 leading-[1.25] text-[#0f172a] max-w-5xl mx-auto"
            >
              Build the Future of<br />
              <span className="inline-block text-[#1447d4] pb-2">Customer Experience.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
              >
              Join a team of CX, AI, and enterprise technology practitioners building the platform that replaces fragmented CX stacks.
            </motion.p>
          </div>  
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#f8faff' }}>
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(0,111,255,0.08) 50%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
         

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="rounded-[2rem] p-8 lg:p-10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                style={{ background: '#1447d4' }}
              >
                <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />

                <div className="relative z-10">
                  {/* Type + Location badges */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center px-3.5 py-1.5 bg-white/20 border border-white/30 rounded-full text-[11px] font-bold text-white uppercase tracking-widest">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 rounded-full text-[11px] font-bold text-white/80 uppercase tracking-widest">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold font-figtree text-white leading-tight mb-3">{job.title}</h3>
                  <p className="text-base text-white/80 leading-relaxed mb-8">{job.desc}</p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-white/60">
                      <Clock className="w-3.5 h-3.5" />
                      {job.salary}
                    </span>
                    <Link
                      href={`/career/${job.slug}`}
                      className="overflow-hidden bg-white text-[#1447d4] min-h-[44px] px-5 py-2.5 rounded-full font-black font-figtree text-[11px] uppercase tracking-widest transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-xl hover:bg-white/90"
                    >
                      <span className="relative z-10">View Details</span>
                      <span className="relative z-10 w-5 h-5 rounded-full bg-[#1447d4]/10 flex items-center justify-center">
                        <ArrowRight className="w-2.5 h-2.5 text-[#1447d4]" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
