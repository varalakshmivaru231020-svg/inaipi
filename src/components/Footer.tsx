'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Omnichannel', href: '#' },
      { name: 'Case Management', href: '#' },
      { name: 'AI Voice Agents', href: '#' },
      { name: 'Campaigns', href: '#' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Financial Services', href: '#' },
      { name: 'Healthcare', href: '#' },
      { name: 'Insurance', href: '#' },
      { name: 'Education', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Vision', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Governance', href: '#' },
      { name: 'Compliance', href: '#' }
    ]
  }
];

const socialLinks = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative bg-white text-[#0f172a] overflow-hidden border-t border-slate-100">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-50/50 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">

        {/* Main links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 py-20 border-b border-slate-100">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="inaipi"
                width={120}
                height={38}
                className="w-auto h-9 object-contain"
              />
            </Link>
            <p className="text-base text-slate-500 leading-relaxed max-w-sm font-medium">
              Unify Voice, Digital, and Intelligence across every customer touchpoint — with precision and scale.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.34em] text-slate-400">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-all duration-300 font-semibold"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-all duration-300 text-blue-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            © 2026 Inaipi Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">
              SSO & Governance
            </Link>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Globe className="w-3.5 h-3.5" />
              <span>EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </footer>
  );
}
