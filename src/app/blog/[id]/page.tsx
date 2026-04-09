'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const allBlogs: Record<string, {
  title: string; category: string; author: string; date: string; image: string;
  excerpt: string; content: string[]; tags: string[];
}> = {
  '1': {
    title: 'The Future of AI in Customer Experience', 
    category: 'Technology', 
    author: 'Admin', 
    date: 'March 28, 2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Explore how artificial intelligence is transforming how businesses interact with their customers...',
    tags: ['AI', 'CX', 'Innovation'],
    content: [
      'The landscape of customer experience (CX) is undergoing a monumental shift. Leading this charge is artificial intelligence, which is moving past basic automation and entering a new phase of proactive, empathetic, and hyper-personalized engagement.',
      'Historically, contact centers have been reactive environments. A customer has a problem, they reach out, and an agent tries to solve it across disparate systems. Today, AI models are predicting customer friction before it happens, allowing enterprises to intercept issues and offer solutions proactively.',
      'But the real magic happens when AI is blended with human empathy. Instead of replacing agents entirely, the most successful implementations are side-by-side: AI handles the repetitive triage and search tasks, while human agents are freed to handle complex, emotionally nuanced interactions.',
      'As we look to the rest of 2024, the companies that thrive will be those that view AI not as a cost-cutting measure, but as an engine for deeper customer loyalty.'
    ]
  },
  '2': {
    title: 'Scaling Your SaaS Business: Key Strategies',
    category: 'Business',
    author: 'Sarah Chen',
    date: 'March 24, 2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Moving from early-stage to high-growth requires more than just a great product.',
    tags: ['SaaS', 'Growth', 'Strategy'],
    content: [
      'Transitioning from a promising startup to a scaling SaaS enterprise introduces a completely new set of challenges. Early on, founder-led sales and unscalable customer support might work, but growth demands systemic changes.',
      'The first critical shift is moving from acquisition-only focus to a retention-first mentality. Because acquiring a new enterprise customer costs significantly more than retaining an existing one, your customer success motion becomes the heartbeat of the company.',
      'Secondly, scaling requires breaking down data silos. Marketing, sales, and support must operate from a single source of truth. If your sales team doesn\'t know what tickets an enterprise account has filed, churn becomes inevitable.',
      'Lastly, pricing and packaging must evolve. Moving upmarket means dealing with complex procurement requirements and deploying enterprise-grade governance. Building secure, compliant infrastructure early on pays massive dividends later.'
    ]
  },
  '3': {
    title: 'Design Systems for Modern Web Apps',
    category: 'Design',
    author: 'Marc Wood',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Consistency and efficiency start with a robust design system.',
    tags: ['UX', 'Design', 'Architecture'],
    content: [
      'A true design system is more than just a UI kit in Figma or a folder of components. It is the connective tissue between design, engineering, and product strategy.',
      'When scaling an application, particularly an enterprise SaaS platform with hundreds of screens, establishing a shared vocabulary is critical. Without it, design debt accumulates rapidly, and every new feature takes progressively longer to release.',
      'The best design systems act as boundaries that actually encourage creativity. Because designers no longer have to worry about padding, typography scales, or border states, they can focus entirely on solving deep user experience problems.',
      'Building a system early, enforcing strict token adherence, and establishing clear contribution guidelines ensures your platform feels cohesive, premium, and trustworthy to every user who encounters it.'
    ]
  }
};

const relatedBlogIds = ['1', '2', '3'];

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const article = allBlogs[id];

  useEffect(() => {
    // Fix sticky positioning by switching root overflow from 'hidden' to 'clip'
    // 'clip' behaves similarly to 'hidden' but doesn't break sticky elements.
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Article Not Found</h1>
          <p className="text-slate-500 mb-8">This article may have been removed or the URL is incorrect.</p>
          <Link href="/blog" className="text-[#1447d4] font-bold hover:underline">Return to Blog</Link>
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
          <motion.div className="absolute rounded-full" style={{ width: 900, height: 900, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(0,111,255,0.14) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-wrap items-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/blog" className="text-xs font-bold text-slate-400 hover:text-[#1447d4] transition-colors">Blog</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-xs font-bold text-[#1447d4] line-clamp-1 max-w-[200px]">{article.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-block px-3 py-1 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full text-[11px] font-bold text-[#1447d4] uppercase tracking-wider mb-5">{article.category}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-5 max-w-4xl">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-[15px] font-figtree text-slate-500">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white relative overflow-visible">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* ── LEFT: Blog Content ── */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="space-y-12"
              >
              <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-100 mb-10 border border-slate-100">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>

              {/* Description */}
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-base sm:text-lg md:text-xl text-[#0f172a] font-medium leading-relaxed mb-8">
                  {article.excerpt}
                </p>
                {article.content.map((paragraph, i) => (
                  <p key={i} className="text-base sm:text-lg text-slate-600 leading-[1.8] mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-blue-100 via-blue-50 to-transparent" />

              {/* Tags Area */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Tags:</span>
                {article.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-500 hover:bg-[#0f172a] hover:text-white hover:border-transparent transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Return Button */}
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Link
                  href="/blog"
                  className="relative group overflow-hidden inline-flex items-center gap-2 bg-[#1447d4] hover:bg-[#0d3ab8] text-white min-h-[44px] px-5 py-2.5 rounded-full font-black font-figtree text-[11px] uppercase tracking-widest transition-all duration-200 shadow-md shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-700/40"
                >
                  <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 pointer-events-none" />
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.25)' }} />
                  <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                    <ArrowRight className="w-2.5 h-2.5 rotate-180" />
                  </span>
                  <span className="relative z-10">Back to Articles</span>
                </Link>
              </motion.div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky Sidebar ── */}
            <div className="lg:col-span-4 relative mt-12 lg:mt-0">
              <div className="space-y-6 lg:sticky lg:top-36 lg:h-fit self-start">
                {/* Article Info Card (Modeled after Job Info Card) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease }}
                  className="rounded-[2rem] p-8 relative overflow-hidden border border-slate-200 shadow-sm"
                  style={{ background: '#dde6ff' }}
                >
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="inline-flex items-center px-4 py-2 bg-[#0f172a] text-white rounded-full text-[11px] font-black uppercase tracking-widest">
                        {article.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 text-slate-600 rounded-full text-[12px] font-bold border border-[#1447d4]/15">
                        <Calendar className="w-3.5 h-3.5 text-[#1447d4]" />
                        {article.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-700/30 overflow-hidden">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Written By</p>
                          <p className="text-lg font-bold text-[#0f172a]">{article.author}</p>
                        </div>
                      </div>
                      
                      <button className="w-10 h-10 rounded-full bg-white border border-[#1447d4]/15 flex items-center justify-center text-[#1447d4] hover:bg-[#0f172a] hover:text-white hover:border-transparent transition-all shadow-sm">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Related Posts */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.35, ease }}
                  className="rounded-[2rem] p-8 border border-slate-200 shadow-sm bg-white"
                >
                  <h3 className="text-[11px] font-black font-figtree text-[#0f172a] uppercase tracking-widest mb-6">Related Posts</h3>
                  <div className="space-y-5">
                    {relatedBlogIds.filter(s => s !== id).map((s) => {
                      const b = allBlogs[s];
                      if (!b) return null;
                      return (
                        <Link key={s} href={`/blog/${s}`} className="group flex gap-4 items-start hover:-translate-y-0.5 transition-transform duration-200">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-black font-figtree uppercase tracking-widest text-[#1447d4] mb-1 block">{b.category}</span>
                            <p className="text-[13px] font-bold font-figtree text-[#0f172a] leading-snug group-hover:text-[#1447d4] transition-colors duration-200 line-clamp-2">{b.title}</p>
                            <p className="text-[11px] font-figtree text-slate-400 mt-1">{b.date}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Tags Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease }}
                  className="rounded-[2rem] p-8 border border-slate-200 shadow-sm bg-white"
                >
                  <h3 className="text-[11px] font-black font-figtree text-[#0f172a] uppercase tracking-widest mb-6">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-[12px] font-bold font-figtree text-slate-500 hover:bg-[#0f172a] hover:text-white hover:border-transparent transition-all cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested / Related Blogs (Modeled after related jobs) */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(0,111,255,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Keep Reading</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold font-figtree tracking-[-0.025em] leading-[1.15]">
              <span className="text-[#0f172a]">Similar </span>
              <span className="text-[#1447d4]">Articles</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogIds.filter(s => s !== id).slice(0, 2).map((s, i) => {
              const b = allBlogs[s];
              if (!b) return null;
              return (
                <motion.div key={s} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="rounded-[2rem] p-8 lg:p-10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                  style={{ background: '#1447d4' }}
                >
                  <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="inline-flex items-center px-3.5 py-1.5 bg-white/20 border border-white/30 rounded-full text-[11px] font-bold text-white uppercase tracking-wider">
                        {b.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 rounded-full text-[11px] font-bold text-white/80 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />{b.date}
                      </span>
                    </div>
                    <h3 className="text-[22px] font-bold font-figtree text-white mb-3">{b.title}</h3>
                    <p className="text-base text-white/80 leading-relaxed mb-8">{b.excerpt.substring(0, 80)}...</p>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white/60">
                        <User className="w-3.5 h-3.5" />{b.author}
                      </span>
                      <Link
                        href={`/blog/${s}`}
                        className="inline-flex items-center gap-2.5 bg-white text-[#1447d4] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md hover:bg-white/90"
                      >
                        <span>Read Post</span>
                        <span className="w-6 h-6 rounded-full bg-[#1447d4]/10 flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-[#1447d4]" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
