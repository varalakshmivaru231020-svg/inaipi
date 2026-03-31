'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const jobs = [
  { slug: 'senior-cx-consultant', title: 'Senior CX Consultant', type: 'Full time', location: 'Dubai, UAE', desc: 'Drive enterprise CX transformation with AI-native solutions across MEA and APAC.' },
  { slug: 'product-designer', title: 'Product Designer', type: 'Full time', location: 'Bengaluru, India', desc: 'Design intuitive, user-centered experiences for our omnichannel CXM platform.' },
  { slug: 'full-stack-developer', title: 'Full Stack Developer', type: 'Full time', location: 'Chennai, India', desc: 'Build and scale our AI-native platform using modern frameworks and cloud infrastructure.' },
  { slug: 'ai-ml-engineer', title: 'AI/ML Engineer', type: 'Full time', location: 'Bengaluru, India', desc: 'Develop and deploy AI models for voice agents, sentiment analysis, and intelligent routing.' },
];

export default function Careers() {
  return (
    <section className="py-28 bg-white relative overflow-hidden" id="careers">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">Join Our Team</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0f172a] leading-[1.15]"
            >
              Build the future of<br />
              <span className="text-blue-600">customer experience.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/career"
              className="inline-flex items-center gap-3 bg-[#0f172a] text-white px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#2563eb] transition-colors duration-200 whitespace-nowrap"
            >
              View All Openings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Job Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {jobs.map((job, i) => (
            <motion.div
              key={job.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/career/${job.slug}`}
                className="group flex flex-col justify-between h-full border border-slate-100/80 hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-2 rounded-[2rem] p-8 transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest group-hover:bg-white/20 group-hover:border-white/20 group-hover:text-white transition-all duration-300">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:bg-white/10 group-hover:text-blue-100 transition-all duration-300">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-white transition-colors duration-300">{job.title}</h3>
                  <p className="text-[16px] text-slate-500 leading-relaxed group-hover:text-blue-100 transition-colors duration-300">{job.desc}</p>
                </div>
                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 group-hover:text-white transition-colors duration-300">
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
