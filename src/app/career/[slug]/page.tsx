'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const allJobs: Record<string, {
  title: string; type: string; location: string; salary: string;
  desc: string; responsibilities: string[]; requirements: string[]; offers: string[];
}> = {
  'senior-cx-consultant': {
    title: 'Senior CX Consultant', type: 'Full time', location: 'Dubai, UAE', salary: 'Competitive',
    desc: 'We\'re looking for a Senior CX Consultant to drive enterprise CX transformation with AI-native solutions, working directly with regional clients across MEA and APAC. You\'ll be the bridge between client needs and our platform capabilities.',
    responsibilities: [
      'Lead CX strategy workshops with enterprise clients across MEA and APAC',
      'Map customer journeys and identify optimization opportunities using our platform',
      'Collaborate with product and engineering teams to translate client needs into solutions',
      'Manage end-to-end implementation of omnichannel CX solutions',
      'Build and maintain long-term client relationships at C-suite level',
    ],
    requirements: [
      '5+ years of experience in CX consulting or contact center transformation',
      'Deep understanding of omnichannel customer engagement strategies',
      'Experience working with enterprise clients in MEA or APAC regions',
      'Familiarity with AI/ML applications in customer service',
      'Excellent communication and presentation skills',
    ],
    offers: [
      'Work on cutting-edge AI-native CX technology',
      'Collaborative, innovation-driven environment',
      'Competitive compensation with performance bonuses',
      'Opportunity to shape CX strategy for leading enterprises',
      'Flexible work arrangements',
    ],
  },
  'product-designer': {
    title: 'Product Designer', type: 'Full time', location: 'Bengaluru, India', salary: 'Competitive',
    desc: 'We\'re looking for a creative and detail-oriented Product Designer to join our team. You\'ll be responsible for designing intuitive, user-centered digital experiences across web and mobile platforms for our AI-native CX platform.',
    responsibilities: [
      'Translate product requirements into wireframes, prototypes, and high-fidelity designs',
      'Design pixel-perfect UI for web and mobile applications',
      'Collaborate with cross-functional teams including engineering and product',
      'Conduct user research and usability testing to validate design decisions',
      'Deliver well-organized Figma files with design systems and components',
    ],
    requirements: [
      '2–5+ years of experience in UI/UX or Product Design',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Strong portfolio demonstrating user-centered design thinking',
      'Understanding of UX principles, accessibility, and responsive design',
      'Excellent visual design skills and attention to detail',
    ],
    offers: [
      'Collaborative and creative work culture',
      'Direct impact on product design decisions',
      'Competitive compensation and benefits',
      'Learning and growth opportunities',
      'Modern tech stack and tools',
    ],
  },
  'full-stack-developer': {
    title: 'Full Stack Developer', type: 'Full time', location: 'Chennai, India', salary: 'Competitive',
    desc: 'Build and scale our AI-native platform using modern frameworks, microservices architecture, and cloud infrastructure. You\'ll work on high-impact features that serve thousands of enterprise users.',
    responsibilities: [
      'Develop and maintain full-stack features using React/Next.js and Node.js',
      'Design and implement RESTful APIs and microservices',
      'Collaborate with AI/ML team to integrate intelligent features',
      'Write clean, testable, and well-documented code',
      'Participate in code reviews and architectural discussions',
    ],
    requirements: [
      '3+ years of experience in full-stack development',
      'Strong proficiency in TypeScript, React, and Node.js',
      'Experience with cloud platforms (AWS/GCP/Azure)',
      'Understanding of database design and optimization',
      'Experience with CI/CD pipelines and DevOps practices',
    ],
    offers: [
      'Work on a platform used by 15,000+ enterprise customers',
      'Modern tech stack with latest frameworks',
      'Competitive salary and equity options',
      'Remote-friendly work culture',
      'Continuous learning and conference budgets',
    ],
  },
  'ai-ml-engineer': {
    title: 'AI/ML Engineer', type: 'Full time', location: 'Bengaluru, India', salary: 'Competitive',
    desc: 'Develop and deploy AI models for voice agents, sentiment analysis, and intelligent routing across our CX platform. You\'ll push the boundaries of what\'s possible in AI-powered customer experience.',
    responsibilities: [
      'Design and train ML models for NLP, sentiment analysis, and voice AI',
      'Build and optimize real-time inference pipelines',
      'Collaborate with product teams to identify AI-driven feature opportunities',
      'Evaluate and integrate third-party AI services and APIs',
      'Monitor model performance and implement continuous improvement loops',
    ],
    requirements: [
      '3+ years of experience in ML/AI engineering',
      'Strong proficiency in Python, TensorFlow/PyTorch',
      'Experience with NLP, speech recognition, or conversational AI',
      'Understanding of MLOps and model deployment practices',
      'Published research or strong portfolio of ML projects is a plus',
    ],
    offers: [
      'Work at the intersection of AI and enterprise CX',
      'Access to cutting-edge AI infrastructure',
      'Competitive compensation and growth path',
      'Collaborate with industry experts',
      'Conference attendance and research time',
    ],
  },
  'sales-executive': {
    title: 'Sales Executive — MEA', type: 'Full time', location: 'Dubai, UAE', salary: 'Competitive',
    desc: 'Own the sales cycle for enterprise accounts across the Middle East and Africa, selling our AI-native CX platform to banks, telecoms, healthcare, and government entities.',
    responsibilities: [
      'Identify and qualify enterprise prospects across MEA region',
      'Lead product demonstrations and solution presentations',
      'Manage full sales cycle from prospecting to contract closure',
      'Build strategic relationships with C-suite decision makers',
      'Collaborate with presales and solution architects on proposals',
    ],
    requirements: [
      '4+ years of enterprise SaaS sales experience in MEA',
      'Track record of exceeding quota in B2B technology sales',
      'Experience selling to financial services, telecom, or government sectors',
      'Strong understanding of CX, contact center, or cloud communications',
      'Arabic language skills are a strong plus',
    ],
    offers: [
      'Uncapped commission structure',
      'Sell a differentiated AI-native platform',
      'Regional travel opportunities',
      'Collaborative sales culture with strong presales support',
      'Career growth into leadership roles',
    ],
  },
  'customer-success-manager': {
    title: 'Customer Success Manager', type: 'Full time', location: 'Dubai, UAE', salary: 'Competitive',
    desc: 'Ensure enterprise clients achieve measurable outcomes with our platform through onboarding, training, and strategic guidance. You\'ll be the trusted advisor for our most valuable accounts.',
    responsibilities: [
      'Onboard and train new enterprise clients on the platform',
      'Develop and execute customer success plans with measurable KPIs',
      'Conduct quarterly business reviews with client stakeholders',
      'Identify upsell and expansion opportunities within accounts',
      'Act as the voice of the customer internally to product and engineering',
    ],
    requirements: [
      '3+ years in customer success or account management for SaaS',
      'Experience managing enterprise accounts with $100K+ ARR',
      'Strong analytical skills and comfort with CX metrics',
      'Excellent communication and relationship-building skills',
      'Experience in CX, contact center, or related technology is preferred',
    ],
    offers: [
      'Work with leading enterprises across MEA and APAC',
      'Direct impact on customer retention and growth',
      'Competitive salary with performance bonuses',
      'Professional development opportunities',
      'Flexible working arrangements',
    ],
  },
};

const relatedSlugs = ['product-designer', 'full-stack-developer', 'senior-cx-consultant', 'ai-ml-engineer'];

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const job = allJobs[slug];

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

  if (!job) {
    return (
      <main className="min-h-screen bg-white font-figtree">
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
    <main className="min-h-screen bg-white font-figtree">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)' }}>
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
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 mb-10">
            <Link href="/" className="text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/career" className="text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors">Career</Link>
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="space-y-12"
              >
              {/* Description */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-4">Job Description:</h2>
                <p className="text-[16px] text-slate-500 leading-relaxed mb-4">{job.desc}</p>
                <p className="text-[16px] text-slate-500 leading-relaxed">
                  From day one, you'll work closely with cross-functional teams in a fast-paced, collaborative environment where your contributions directly shape the product and customer experience.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-6">Key Responsibilities:</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[16px] text-slate-500 leading-relaxed">
                      <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                        <svg viewBox="0 0 20 20" className="w-4 h-4 text-blue-500" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

              {/* Requirements */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-6">Requirements:</h2>
                <ul className="space-y-4">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[16px] text-slate-500 leading-relaxed">
                      <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                        <svg viewBox="0 0 20 20" className="w-4 h-4 text-indigo-500" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />

              {/* What We Offer */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.1] mb-6">What We Offer:</h2>
                <ul className="space-y-4">
                  {job.offers.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[16px] text-slate-500 leading-relaxed">
                      <span className="mt-1 shrink-0 flex items-center justify-center w-5 h-5">
                        <svg viewBox="0 0 20 20" className="w-4 h-4 text-sky-500" fill="none"><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="relative group overflow-hidden inline-flex items-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
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

                {/* Job Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="rounded-[2rem] p-8 relative overflow-hidden border border-blue-100/60"
                style={{ background: 'linear-gradient(145deg, #eff6ff 0%, #e0e7ff 50%, #f0f4ff 100%)' }}
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="inline-flex items-center px-4 py-2 bg-[#0f172a] text-white rounded-full text-[11px] font-black uppercase tracking-widest">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 text-slate-600 rounded-full text-[12px] font-bold border border-blue-100">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Salary</p>
                      <p className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight">{job.salary}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dark CTA Banner */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease }}
                className="relative rounded-[2rem] overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', minHeight: 280 }}
              >
                {/* Gradient orbs */}
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: 280 }}>
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF5E] animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Now Hiring</span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-snug">
                      Looking for full&#8209;time<br />or part&#8209;time roles?<br />
                      <span style={{ background: 'linear-gradient(90deg, #B7FF5E 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>This is the right place.</span>
                    </h3>
                  </div>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30 self-start group"
                  >
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
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f5ff 40%, #f5f0ff 75%, #ffffff 100%)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">More Openings</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold font-figtree tracking-[-0.025em] leading-[1.1]">
              <span className="text-[#0f172a]">Explore More </span>
              <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 60%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Positions</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedSlugs.filter(s => s !== slug).slice(0, 2).map((s, i) => {
              const j = allJobs[s];
              if (!j) return null;
              return (
                <motion.div key={s} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="group p-8 lg:p-10 border border-slate-100/80 rounded-[2rem] hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-500 uppercase tracking-widest group-hover:bg-white/20 group-hover:border-white/20 group-hover:text-white transition-all duration-300">
                        {j.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:bg-white/10 group-hover:text-blue-100 transition-all duration-300">
                        <MapPin className="w-3 h-3" />{j.location}
                      </span>
                    </div>
                    <h3 className="text-[22px] font-bold font-figtree text-[#0f172a] leading-tight mb-3 group-hover:text-white transition-colors duration-300">{j.title}</h3>
                    <p className="text-[16px] text-slate-500 leading-relaxed mb-8 group-hover:text-blue-100 transition-colors duration-300">{j.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-400 group-hover:text-blue-200 transition-colors duration-300">
                        <Clock className="w-3.5 h-3.5" />{j.salary}
                      </span>
                      <Link
                        href={`/career/${s}`}
                        className="inline-flex items-center gap-2.5 bg-[#2563eb] group-hover:bg-white text-white group-hover:text-[#2563eb] px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md shadow-blue-500/25"
                      >
                        <span>View Details</span>
                        <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-blue-50 flex items-center justify-center transition-colors duration-300">
                          <ArrowRight className="w-3 h-3" />
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
