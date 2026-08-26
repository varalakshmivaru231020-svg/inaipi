'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Facebook, Instagram, Youtube, Check, Loader2, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/sections/CTA';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

const fieldCls =
  'w-full px-5 py-3.5 rounded-xl bg-white border border-white/30 text-[15px] text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200';

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [company, setCompany] = useState(''); // honeypot — must stay empty
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const renderedAt = useRef(0);

  useEffect(() => { renderedAt.current = Date.now(); }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company, ts: renderedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-32 lg:pt-36 pb-14 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.14) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1447d4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[11px] font-bold text-[#1447d4]">Contact Us</span>
          </motion.div>

          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Get In Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-figtree tracking-[-0.03em] mb-8 leading-[1.25] text-[#0f172a] max-w-5xl mx-auto"
            >
              One Platform. Every Channel.<br />
              <span className="inline-block text-[#1447d4] pb-2">Intelligent CX.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Have a question, need a demo, or want to explore how Inaipi can transform your CX? We&apos;d love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section className="py-14 lg:py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — Info + Contact Details + Socials */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#1447d4]/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1447d4] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1447d4]">Get In Touch</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] leading-[1.15] mb-5">
                <span className="text-[#0f172a]">Let&apos;s Make Something<br /></span>
                <span className="text-[#1447d4]">Awesome Together</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-md">
                Have a project in mind or need help bringing your digital vision to life? We&apos;d love to hear from you! Whether you&apos;re starting fresh or scaling fast.
              </p>

              {/* Need Help label */}
              <div className="text-[13px] font-bold text-[#0f172a] mb-4">Need Help?</div>

              {/* Contact details */}
              <div className="space-y-6 mb-10">
                <div>
                  <div className="text-[13px] font-bold text-[#0f172a] uppercase tracking-widest mb-1">UAE (HO)</div>
                  <div className="text-[15px] text-slate-500 leading-relaxed font-medium">1504 B, 1 Lake Plaza,<br />Cluster T, Jumeirah Lakes Towers,<br />PO Box: 73916, Dubai, UAE</div>
                  <div className="text-[15px] text-slate-500 mt-1">800- INAIPI</div>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#0f172a] uppercase tracking-widest mb-1">Bengaluru</div>
                  <div className="text-[15px] text-slate-500 leading-relaxed font-medium">#Krishna Tech Park, near Kaverappa<br />Layout, Kadubeesanahalli, Bengaluru,<br />Karnataka 560075</div>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#0f172a] uppercase tracking-widest mb-1">Chennai</div>
                  <div className="text-[15px] text-slate-500 leading-relaxed font-medium">47/2 Ashok Nagar, 53rd Street,<br />Indira Colony, Chennai, Tamil Nadu<br />600083</div>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-[13px] font-bold text-[#0f172a] mb-4">Social Media</div>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#1447d4] hover:text-white hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-[17px] h-[17px]" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease }}
              className="rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-blue-900/15 relative overflow-hidden"
              style={{ background: '#1447d4' }}
            >
              <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
              <h3 className="relative z-10 text-[22px] font-bold font-figtree text-white leading-tight mb-2">Get in Touch</h3>
              <p className="relative z-10 text-base sm:text-lg text-white/70 leading-relaxed mb-8">Let&apos;s build something impactful together.</p>

              {status === 'sent' ? (
                <div className="relative z-10 py-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 mb-5">
                    <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xl font-bold font-figtree text-white mb-2">Message sent!</h4>
                  <p className="text-white/70 text-[15px] max-w-xs mx-auto">Thanks for reaching out — our team will get back to you shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/80 hover:text-white border border-white/30 hover:border-white px-5 py-2.5 rounded-full transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
              <form className="space-y-5 relative z-10" onSubmit={submit} noValidate>
                {/* Honeypot — visually hidden, off-screen; bots fill it, humans don't */}
                <div aria-hidden className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" style={{ height: 0, overflow: 'hidden' }}>
                  <label>Company
                    <input type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-white mb-2">Full Name*</label>
                  <input type="text" required maxLength={120} value={form.name} onChange={set('name')} placeholder="Steven L. Manzo" className={fieldCls} />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-white mb-2">Email Address*</label>
                  <input type="email" required maxLength={200} value={form.email} onChange={set('email')} placeholder="Enter your email" className={fieldCls} />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-white mb-2">Subject*</label>
                  <input type="text" required maxLength={200} value={form.subject} onChange={set('subject')} placeholder="I would like to discuss" className={fieldCls} />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-white mb-2">Message*</label>
                  <textarea required rows={5} maxLength={5000} value={form.message} onChange={set('message')} placeholder="Write message" className={`${fieldCls} resize-none`} />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-[13px] text-white">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{error}</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: status === 'sending' ? 1 : 1.03, y: status === 'sending' ? 0 : -2 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="group overflow-hidden bg-white hover:bg-white/90 text-[#1447d4] min-h-[44px] px-6 py-2.5 rounded-full font-black font-figtree text-[11px] uppercase tracking-widest transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  <span className="w-5 h-5 rounded-full bg-[#1447d4]/10 flex items-center justify-center group-hover:bg-[#1447d4]/20 transition-colors duration-200">
                    {status === 'sending'
                      ? <Loader2 className="w-2.5 h-2.5 text-[#1447d4] animate-spin" />
                      : <ArrowRight className="w-2.5 h-2.5 text-[#1447d4]" />}
                  </span>
                </motion.button>
              </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA />

      <Footer />
    </main>
  );
}
