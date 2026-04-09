'use client';

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
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Governance', href: '/terms-conditions' },
      { name: 'Compliance', href: '/privacy-policy' }
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
    <footer className="relative bg-[#fafbff] text-[#0f172a] overflow-hidden border-t border-slate-100/80 font-figtree">

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-blue-50/40 blur-[80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 xl:px-8" style={{ maxWidth: '80rem' }}>

        {/* Main links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 py-20 border-b border-slate-100">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-7">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="inaipi"
                width={120}
                height={38}
                className="w-auto h-9 object-contain"
              />
            </Link>
            <p className="text-[15px] text-slate-500 leading-[1.7] max-w-xs font-normal">
              Unify Voice, Digital, and Intelligence across every customer touchpoint — with precision and scale.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#1447d4] hover:border-[#1447d4]/30 hover:shadow-md hover:shadow-blue-500/8 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{section.title}</h4>
              <ul className="space-y-3.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[15px] text-slate-600 hover:text-[#1447d4] transition-colors duration-200 font-medium"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#1447d4] translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 Inaipi Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/privacy-policy" className="text-xs font-semibold text-slate-400 hover:text-[#1447d4] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-xs font-semibold text-slate-400 hover:text-[#1447d4] transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
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
