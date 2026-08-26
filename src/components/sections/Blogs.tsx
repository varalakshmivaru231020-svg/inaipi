'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const blogs = [
  {
    tag: 'AI & CX',
    tagColor: '#2563eb',
    tagBg: '#eff6ff',
    title: 'How AI Co-Pilots Are Redefining Agent Productivity in Contact Centers',
    excerpt: 'AI co-pilots are reshaping how agents work — real-time suggestions, auto-filled notes, and live sentiment detection mean faster resolutions and happier customers.',
    keyPoints: [
      'Handle time reduced by up to 40%',
      'Auto-summarization after every call',
      'Sentiment scoring flags at-risk customers',
    ],
    stats: [
      { value: '40%', label: 'Faster Handle Time' },
      { value: '2×', label: 'Agent Throughput' },
      { value: '4.8★', label: 'Avg CSAT Score' },
    ],
    readTime: '5 min read',
    date: 'Mar 18, 2026',
    image: '/images/blogs/ai_copilot.png',
    featured: true,
  },
  {
    tag: 'Omnichannel',
    tagColor: '#006fff',
    tagBg: '#eff6ff',
    title: 'Unifying Voice, Chat & Email: The Architecture Behind Modern CX',
    excerpt: 'A deep dive into the technical challenges of building a true omnichannel experience — and how a unified platform solves them. When customers switch channels, context must follow seamlessly.',

    readTime: '7 min read',
    date: 'Mar 10, 2026',
    image: '/images/blogs/omnichannel.png',
    featured: false,
  },
  {
    tag: 'Case Study',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
    title: 'How Emirates NBD Cut Customer Wait Times by 67% with Intelligent Routing',
    excerpt: 'One of the region\'s largest banks transformed its contact center in under 90 days — reducing wait times, boosting CSAT, and empowering agents with AI-driven insights at every touchpoint.',

    readTime: '4 min read',
    date: 'Feb 28, 2026',
    image: '/images/blogs/case_study.png',
    featured: false,
  },
];


export default function Blogs() {
  const [featured, ...rest] = blogs;

  return (
    <section className="py-14 lg:py-16 relative overflow-hidden" style={{ background: '#f8faff' }}>
      <div className="absolute pointer-events-none" style={{ width: '42vw', height: '42vw', top: '-200px', right: '-260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', bottom: '-140px', left: '-180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,111,255,0.05) 0%, transparent 70%)' }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="section-eyebrow wow wow-d1">From the Blog</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.025em] leading-[1.15] wow wow-d2">
              Insights &amp; <span className="text-[#1447d4]">Resources</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96, y: 0 }}
            className="shrink-0 wow wow-d3"
          >
            <a
              href="#"
              className="relative group overflow-hidden text-white min-h-[44px] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-md shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-700/40 hover:brightness-110 whitespace-nowrap"
              style={{ background: '#1447d4' }}
            >
              {/* Shimmer fires on hover */}
              <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
              {/* Glow ring */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.25)' }} />
              <span className="relative z-10">View all posts</span>
              {/* Arrow shoots out and re-enters */}
              <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                <ArrowRight className="w-2.5 h-2.5 text-white translate-x-0 group-hover:translate-x-4 transition-transform duration-200 ease-in" />
                <ArrowRight className="w-2.5 h-2.5 text-white absolute -translate-x-4 group-hover:translate-x-0 transition-transform duration-200 ease-out" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Grid — featured left large, 2 stacked right */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="lg:col-span-3 group bg-white rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-400 shadow-md hover:shadow-2xl hover:shadow-blue-700/15 transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Tag on image */}
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white" style={{ background: '#1447d4' }}>
                {featured.tag}
              </span>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-[18px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-[#1447d4] transition-colors duration-200">
                {featured.title}
              </h3>
              <p className="text-base text-slate-500 leading-relaxed mb-5">
                {featured.excerpt}
              </p>

              {/* Key points */}
              {'keyPoints' in featured && (
                <ul className="space-y-2 mb-6">
                  {(featured as typeof featured & { keyPoints: string[] }).keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stats row */}
              {'stats' in featured && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(featured as typeof featured & { stats: { value: string; label: string }[] }).stats.map((s, i) => (
                    <div key={i} className="rounded-2xl px-3 py-3 text-center border" style={{ background: '#eef4ff', borderColor: 'rgba(20,71,212,0.15)' }}>
                      <p className="text-lg font-black" style={{ color: '#1447d4' }}>{s.value}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black" style={{ background: '#1447d4' }}>
                    IN
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Inaipi Editorial</p>
                    <p className="text-xs text-slate-400">{featured.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </div>
                  <a href="#" className="flex items-center gap-1 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all duration-200" style={{ color: '#1447d4' }}>
                    Read <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Two stacked smaller cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-400 shadow-md hover:shadow-2xl hover:shadow-blue-700/15 transition-all duration-300 cursor-pointer flex flex-col flex-1"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white" style={{ background: '#1447d4' }}>
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[16px] font-bold font-figtree text-[#0f172a] leading-tight mb-2 group-hover:text-[#1447d4] transition-colors duration-200">
                    {post.title}
                  </h3>
                  {'excerpt' in post && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{post.excerpt}</p>
                  )}
                  {'keyPoints' in post && (
                    <ul className="space-y-1.5 mb-3">
                      {(post as typeof post & { keyPoints: string[] }).keyPoints.map((pt, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-sm text-slate-500 font-medium">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0 text-blue-500" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">{post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>


      </div>
    </section>
  );
}
