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
    <section className="py-14 lg:py-16 bg-white relative overflow-hidden" id="careers">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Join Our Team</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0f172a] leading-[1.15]"
            >
              Build the future of<br />
              <span className="text-[#1447d4]">customer experience.</span>
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
              className="inline-flex items-center gap-3 bg-[#1447d4] text-white px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#0d3ab8] transition-colors duration-200 whitespace-nowrap"
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
                className="flex flex-col justify-between h-full rounded-[2rem] p-8 transition-all duration-300 cursor-pointer relative overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2"
                style={{ background: '#1447d4' }}
              >
                <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 border border-white/30 rounded-full text-[11px] font-bold text-white uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-[11px] font-bold text-white/80 uppercase tracking-widest">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-bold font-figtree text-white leading-tight mb-3">{job.title}</h3>
                  <p className="text-[16px] text-white/80 leading-relaxed">{job.desc}</p>
                </div>
                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white">
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
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
