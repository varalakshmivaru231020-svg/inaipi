'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of AI in Customer Experience',
    excerpt: 'Explore how artificial intelligence is transforming how businesses interact with their customers in 2024 and beyond. From predictive analytics to hyper-personalized support, discover why AI is no longer a luxury but a necessity for competitive edge.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    category: 'Technology',
    author: 'Admin',
    date: 'March 28, 2024',
    comments: 4
  },
  {
    id: 2,
    title: 'Scaling Your SaaS Business: Key Strategies',
    excerpt: 'Moving from early-stage to high-growth requires more than just a great product. Learn the operational and marketing shifts needed to sustain exponential growth while maintaining product quality and customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    category: 'Business',
    author: 'Sarah Chen',
    date: 'March 24, 2024',
    comments: 2
  },
  {
    id: 3,
    title: 'Design Systems for Modern Web Apps',
    excerpt: 'Consistency and efficiency start with a robust design system. We break down the core components of successful systems used by top design teams to streamline their creative and engineering workflows.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2000&auto=format&fit=crop',
    category: 'Design',
    author: 'Marc Wood',
    date: 'March 15, 2024',
    comments: 0
  }
];

const CATEGORIES = [
  { name: 'Technology', count: 12 },
  { name: 'Business', count: 8 },
  { name: 'Design', count: 5 },
  { name: 'Updates', count: 3 },
  { name: 'Innovation', count: 7 }
];

const TAGS = ['AI', 'SaaS', 'Marketing', 'Productivity', 'Growth', 'Strategy', 'UX', 'Cloud'];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white font-figtree">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-36 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 100% 85% at 50% 10%, black 30%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 32px)', maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 100%)' }} />
          <motion.div className="absolute rounded-full" style={{ width: 1100, height: 1100, top: '-35%', left: '50%', x: '-50%', background: 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(99,102,241,0.18) 40%, transparent 70%)', filter: 'blur(90px)' }} animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 800, height: 800, top: '5%', left: '-20%', background: 'radial-gradient(circle, rgba(99,102,241,0.26) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, top: '0%', right: '-15%', background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} animate={{ x: [0, -60, 0], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-blue-500/40" style={{ top: '18%', left: '12%', filter: 'blur(2px)' }} animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-indigo-400/50" style={{ top: '28%', right: '14%', filter: 'blur(1px)' }} animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className="absolute w-4 h-4 rounded-full bg-violet-400/30" style={{ top: '10%', left: '38%', filter: 'blur(3px)' }} animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
          <motion.div className="absolute w-2 h-2 rounded-full bg-blue-400/50" style={{ top: '35%', left: '22%', filter: 'blur(1px)' }} animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
          <motion.div className="absolute w-3 h-3 rounded-full bg-indigo-500/35" style={{ top: '20%', right: '28%', filter: 'blur(2px)' }} animate={{ y: [0, -16, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]" style={{ background: 'conic-gradient(from 255deg at 50% 0%, transparent 15%, rgba(37,99,235,0.18) 30%, rgba(99,102,241,0.22) 50%, rgba(37,99,235,0.18) 70%, transparent 85%)', filter: 'blur(18px)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[35%]" style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.6) 0%, transparent 100%)' }} />
          <div className="absolute top-0 left-[42%] w-px h-[25%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(6deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 left-[58%] w-px h-[25%]" style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.35) 0%, transparent 100%)', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-blue-600">Blog Standard</span>
          </motion.div>

          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">Insights & News</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[4rem] font-bold font-figtree tracking-[-0.03em] text-[#0f172a] leading-[1.15] mb-6"
            >
              Insights & expertise.<br />
              <span className="text-blue-600">Blog Standard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[16px] text-slate-500 max-w-xl mx-auto leading-relaxed"
            >
              Discover the latest insights, news, and expert perspectives on autonomous intelligence, customer engagement, and the future of CX.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-24 bg-white relative overflow-visible">
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
                  className="group border border-slate-100/80 rounded-[2.5rem] p-8 lg:p-10 hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)' }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-200/40">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-5 py-1.5 bg-blue-50 border border-blue-200/60 text-blue-600 text-[11px] font-bold uppercase tracking-widest rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-6 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-[16px] text-slate-600 leading-relaxed max-w-3xl mb-10">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="relative group/btn inline-flex items-center gap-3 bg-[#0f172a] hover:bg-blue-700 text-white px-7 py-3 rounded-full font-bold text-[14px] transition-all duration-300 overflow-hidden shadow-lg shadow-slate-900/10"
                  >
                    <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
                    <span className="relative z-10 uppercase tracking-widest text-[11px] font-black">Read More</span>
                    <span className="relative z-10 w-9 h-9 rounded-full bg-white/20 group-hover/btn:bg-white flex items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-blue-700" />
                    </span>
                  </Link>
                </motion.article>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 pt-10">
                <button className="w-14 h-14 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-black text-sm transition-transform hover:scale-110 shadow-lg shadow-slate-900/10">1</button>
                <button className="w-14 h-14 rounded-full bg-slate-100 text-[#0f172a] flex items-center justify-center font-black text-sm transition-transform hover:scale-110 hover:bg-slate-200">2</button>
                <button className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm transition-transform hover:scale-110 shadow-lg shadow-blue-500/30">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── SIDEBAR (STICKY) ── */}
            <div className="lg:col-span-4 relative">
              <div className="space-y-12 sticky top-32">
              
                {/* Search */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h3 className="text-[13px] font-black text-[#0f172a] mb-6 uppercase tracking-widest">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full bg-white border border-slate-200 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-colors font-medium text-slate-600"
                    />
                    <button className="absolute right-2 top-2 w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-white">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h3 className="text-[13px] font-black text-[#0f172a] mb-6 uppercase tracking-widest">Categories</h3>
                  <ul className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <li key={cat.name}>
                        <Link href={`/blog?category=${cat.name.toLowerCase()}`} className="flex justify-between items-center group font-bold text-[14px] text-slate-500 hover:text-blue-600 transition-all">
                          <span>{cat.name}</span>
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px] text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all">
                            {cat.count}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h3 className="text-[13px] font-black text-[#0f172a] mb-6 uppercase tracking-widest">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map(tag => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag.toLowerCase()}`}
                        className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[12px] font-bold text-slate-500 hover:bg-[#0f172a] hover:text-white hover:border-transparent transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-[#0f172a] p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px]" />
                  <h3 className="text-[22px] font-bold font-figtree text-white leading-tight mb-4 relative z-10">Subscribe to our Newsletters</h3>
                  <p className="text-[16px] text-slate-400 mb-8 relative z-10 leading-relaxed">Stay updated with our latest news and blog posts directly to your inbox.</p>
                  <div className="relative z-10">
                    <div className="relative mb-4">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                      />
                      <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/20">
                      Subscribe
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREERS BANNER ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-[#0f172a] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF5E] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-300">We're Hiring</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                Join the team building<br />
                <span className="text-[#B7FF5E]">the future of AI.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                We're looking for passionate people to help shape intelligent customer experiences. Explore open roles and grow with us.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/career"
                className="inline-flex items-center gap-3 bg-[#B7FF5E] hover:bg-white text-[#090909] font-black text-sm uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-[#B7FF5E]/20 group"
              >
                View Open Roles
                <div className="w-8 h-8 rounded-full bg-[#090909]/10 flex items-center justify-center group-hover:bg-[#090909]/20 transition-colors">
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
