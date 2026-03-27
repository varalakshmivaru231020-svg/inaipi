'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Blogs() {
  const [featured, ...rest] = blogs;

  return (
    <section className="py-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
      <div className="absolute pointer-events-none" style={{ width: '42vw', height: '42vw', top: '-200px', right: '-260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', border: '1px solid rgba(37,99,235,0.05)' }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', bottom: '-140px', left: '-180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
              From the Blog
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.25]">
              Insights &amp; Resources
            </motion.h2>
          </div>
          <motion.a href="#" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 hover:gap-3 transition-all shrink-0">
            View all posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Grid — featured left large, 2 stacked right */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured card */}
          <motion.article
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3 group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Tag on image */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ backgroundColor: featured.tagColor, color: '#fff' }}>
                {featured.tag}
              </span>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-[#0f172a] leading-snug mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {featured.title}
              </h3>
              <p className="text-[15px] text-slate-500 leading-relaxed mb-5">
                {featured.excerpt}
              </p>

              {/* Key points */}
              {'keyPoints' in featured && (
                <ul className="space-y-2 mb-6">
                  {(featured as typeof featured & { keyPoints: string[] }).keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: featured.tagColor }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stats row */}
              {'stats' in featured && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(featured as typeof featured & { stats: { value: string; label: string }[] }).stats.map((s, i) => (
                    <div key={i} className="rounded-2xl px-3 py-3 text-center" style={{ background: `${featured.tagColor}08`, border: `1px solid ${featured.tagColor}20` }}>
                      <p className="text-lg font-black font-figtree" style={{ color: featured.tagColor }}>{s.value}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                    style={{ backgroundColor: featured.tagColor }}>
                    IN
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">Inaipi Editorial</p>
                    <p className="text-[10px] text-slate-400">{featured.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </div>
                  <a href="#" className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest group-hover:gap-2 transition-all"
                    style={{ color: featured.tagColor }}>
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
                custom={i + 1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col flex-1"
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{ backgroundColor: post.tagColor, color: '#fff' }}>
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[16px] font-bold text-[#0f172a] leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  {'excerpt' in post && (
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{post.excerpt}</p>
                  )}
                  {'keyPoints' in post && (
                    <ul className="space-y-1.5 mb-3">
                      {(post as typeof post & { keyPoints: string[] }).keyPoints.map((pt, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: post.tagColor }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">{post.date}</span>
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
