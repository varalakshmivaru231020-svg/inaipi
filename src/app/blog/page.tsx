'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type BlogPost = { id: string; title: string; excerpt: string; image: string; category: string; author: string; date: string; comments: number };

const CATEGORIES = [
  { name: 'Technology', count: 12 },
  { name: 'Business', count: 8 },
  { name: 'Design', count: 5 },
  { name: 'Updates', count: 3 },
  { name: 'Innovation', count: 7 }
];

const TAGS = ['AI', 'SaaS', 'Marketing', 'Productivity', 'Growth', 'Strategy', 'UX', 'Cloud'];

export default function BlogPage() {
  const [BLOG_POSTS, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blogs', { cache: 'no-store' }).then(r => r.json()).then(setBlogPosts);
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

      {/* ── HERO ── */}
      <section className="pt-32 lg:pt-36 pb-14 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)', maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />
          <motion.div className="absolute rounded-full" style={{ width: 1100, height: 1100, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(0,111,255,0.18) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 800, height: 800, top: '5%', left: '-20%', background: 'radial-gradient(circle, rgba(0,111,255,0.26) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, top: '0%', right: '-15%', background: 'radial-gradient(circle, rgba(0,231,255,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, -60, 0], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-blue-500/40" style={{ top: '18%', left: '12%', filter: 'blur(2px)' }} animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-[#006fff]/50" style={{ top: '28%', right: '14%', filter: 'blur(1px)' }} animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className="absolute w-4 h-4 rounded-full bg-[#00e7ff]/30" style={{ top: '10%', left: '38%', filter: 'blur(3px)' }} animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-blue-400/50" style={{ top: '35%', left: '22%', filter: 'blur(1px)' }} animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-[#006fff]/35" style={{ top: '20%', right: '28%', filter: 'blur(2px)' }} animate={{ y: [0, -16, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]" style={{ background: 'conic-gradient(from 255deg at 50% 0%, transparent 15%, rgba(37,99,235,0.18) 30%, rgba(0,111,255,0.22) 50%, rgba(37,99,235,0.18) 70%, transparent 85%)', filter: 'blur(18px)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[35%]" style={{ background: 'linear-gradient(to bottom, rgba(0,111,255,0.6) 0%, transparent 100%)' }} />
          <div className="absolute top-0 left-[42%] w-px h-[25%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(6deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 left-[58%] w-px h-[25%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-[#1447d4]">Blog</span>
          </motion.div>

          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Insights & News</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-figtree tracking-[-0.03em] mb-8 leading-[1.25] max-w-5xl mx-auto"
            >
              <span className="text-[#0f172a]">Insights &amp; expertise.</span><br />
              <span className="inline-block text-[#1447d4] pb-2">Blog Standard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}

              className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Discover the latest insights, news, and expert perspectives on AI-native CX, sovereign cloud, and the future of customer engagement.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-14 lg:py-16 bg-white relative overflow-visible">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* ── BLOG LIST ── */}
            <div className="lg:col-span-8 space-y-16">
              {BLOG_POSTS.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="rounded-[2.5rem] p-8 lg:p-10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  style={{ background: '#1447d4' }}
                >
                  <div className="absolute inset-0 rounded-[2.5rem]" style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 15%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-black/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 relative z-10">
                    <span className="inline-flex items-center px-5 py-1.5 bg-white/20 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/60 font-bold text-[11px] uppercase tracking-widest">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 font-bold text-[11px] uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-white leading-[1.15] mb-6 relative z-10">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl mb-10 relative z-10">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="relative group/btn overflow-hidden bg-white text-[#1447d4] min-h-[44px] px-5 py-2.5 rounded-full font-black font-figtree text-[11px] uppercase tracking-widest transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-xl hover:bg-white/90 z-10"
                  >
                    <span className="relative z-10">Read More</span>
                    <span className="relative z-10 w-5 h-5 rounded-full bg-[#1447d4]/10 flex items-center justify-center overflow-hidden transition-colors duration-200">
                      <ArrowRight className="w-2.5 h-2.5 text-[#1447d4]" />
                    </span>
                  </Link>
                </motion.article>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 pt-10">
                <button className="w-14 h-14 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-black text-sm transition-transform hover:scale-110 shadow-lg shadow-slate-900/10">1</button>
                <button className="w-14 h-14 rounded-full bg-slate-100 text-[#0f172a] flex items-center justify-center font-black text-sm transition-transform hover:scale-110 hover:bg-slate-200">2</button>
                <button className="w-14 h-14 rounded-full bg-[#1447d4] text-white flex items-center justify-center font-black text-sm transition-transform hover:scale-110 shadow-lg shadow-blue-900/20">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── SIDEBAR (STICKY) ── */}
            <div className="lg:col-span-4 relative">
              <div className="space-y-12 lg:sticky lg:top-32 lg:h-fit self-start">
              
                {/* Search */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black font-figtree text-[#0f172a] mb-6 uppercase tracking-widest">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full bg-white border border-slate-200 rounded-full py-4 pl-6 pr-14 text-[15px] font-figtree font-medium text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button className="absolute right-2 top-2 w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-white">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black font-figtree text-[#0f172a] mb-6 uppercase tracking-widest">Categories</h3>
                  <ul className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <li key={cat.name}>
                        <Link href={`/blog?category=${cat.name.toLowerCase()}`} className="flex justify-between items-center group font-semibold font-figtree text-[15px] text-slate-600 hover:text-[#1447d4] transition-all">
                          <span>{cat.name}</span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[11px] font-black font-figtree text-slate-400 group-hover:bg-[#1447d4] group-hover:text-white group-hover:border-transparent transition-all">
                            {cat.count}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black font-figtree text-[#0f172a] mb-6 uppercase tracking-widest">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map(tag => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag.toLowerCase()}`}
                        className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-bold font-figtree text-slate-500 hover:bg-[#0f172a] hover:text-white hover:border-transparent transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREERS BANNER ── */}
      <section className="py-14 lg:py-16 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{ background: '#000', borderRadius: 30 }}
          >
            {/* CTA-style blobs */}
            <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, width: '63%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 80% at 0% 100%,rgba(0,71,255,0.7),rgba(0,71,255,0.3) 35%,transparent 65%)', clipPath: 'ellipse(80% 90% at 10% 90%)' }} />
            <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '39%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 80% at 100% 0%,rgba(0,231,255,0.5),rgba(0,111,255,0.25) 45%,transparent 70%)', clipPath: 'ellipse(90% 80% at 90% 10%)' }} />

            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-300">We're Hiring</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-4">
                <span className="text-white">Join the team building</span><br />
                <span className="text-[#006fff]">the future of AI.</span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                We're looking for passionate people to help shape intelligent customer experiences. Explore open roles and grow with us.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/career"
                className="inline-flex items-center gap-3 bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-black text-sm uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-blue-700/30 group"
              >
                View Open Roles
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
