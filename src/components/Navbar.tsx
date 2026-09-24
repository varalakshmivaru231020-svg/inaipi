'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Platform', href: '/#platform' },
  { name: 'Features', href: '/#features' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Buyer Resources', href: '/resources' },
  { name: 'Careers', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.slice(2);
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = href;
    }
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest <= 60);
  });

  const logoHeight = useTransform(scrollY, [0, 80], [40, 30]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center font-figtree"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          paddingTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 16 : 0,
          paddingRight: scrolled ? 16 : 0,
        }}
        transition={{
          opacity: { duration: 0.4, ease: 'easeOut' },
          y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          paddingTop: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          paddingLeft: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          paddingRight: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
        }}
      >
        <motion.div
          className="w-full"
          animate={{ maxWidth: scrolled ? '980px' : '100%' }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative grid items-center gap-x-6 xl:gap-x-10 px-6 sm:px-10 overflow-hidden"
            style={{
              // logo | links | call to action — the outer columns share the
              // slack evenly, so the links sit centred with matching gaps
              gridTemplateColumns: '1fr auto 1fr',
              borderStyle: 'solid',
              backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
              WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
              transition: 'backdrop-filter 0.35s ease, -webkit-backdrop-filter 0.35s ease',
            }}
            animate={{
              borderRadius: scrolled ? '9999px' : '0px',
              backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
              borderWidth: scrolled ? '1px' : '0px',
              borderColor: scrolled ? 'rgba(37,99,235,0.15)' : 'transparent',
              boxShadow: scrolled
                ? '0 1px 2px -1px rgba(15,23,42,0.05), 0 8px 20px -12px rgba(15,23,42,0.10), 0 20px 44px -24px rgba(20,71,212,0.16)'
                : '0 1px 0 0 rgba(0,0,0,0.06)',
              paddingTop: scrolled ? 10 : 18,
              paddingBottom: scrolled ? 10 : 18,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/" className="flex items-center">
                <motion.div style={{ height: logoHeight }} className="overflow-hidden flex items-center">
                  <Image
                    src="/brand/logo.png"
                    alt="inaipi"
                    width={140}
                    height={44}
                    className="w-auto h-full object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative inline-flex items-center min-h-[44px] text-[15px] font-semibold font-figtree text-[#0f172a]/60 hover:text-[#1447d4] transition-colors duration-200 tracking-normal whitespace-nowrap group focus-visible:outline-none focus-visible:text-[#1447d4]"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#1447d4] group-hover:w-full transition-all duration-200 rounded-full" />
                  </Link>
                </motion.div>
              ))}
            </div>


            {/* Book a Demo — desktop. Goes to the Get in Touch form. */}
            <div className="hidden lg:flex items-center justify-end col-start-3">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96, y: 0 }}
              >
                <Link
                  href="/contact#get-in-touch"
                  aria-label="Book a demo — opens the Get in Touch form"
                  className="relative group overflow-hidden bg-[#1447d4] hover:bg-[#0d3ab8] text-white min-h-[44px] px-5 py-2.5 rounded-full font-black font-figtree text-[11px] uppercase tracking-widest transition-all duration-200 inline-flex items-center gap-2 shadow-md shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-700/40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {/* Shimmer sweeps across on hover */}
                  <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-500 ease-in-out pointer-events-none" />
                  {/* Glow ring */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(37,99,235,0.25)' }} />
                  <span className="relative z-10">Book a Demo</span>
                  {/* The arrow leaves and another follows it in */}
                  <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/30 transition-colors duration-200">
                    <ArrowRight className="w-2.5 h-2.5 text-white translate-x-0 group-hover:translate-x-4 transition-transform duration-200 ease-in" />
                    <ArrowRight className="w-2.5 h-2.5 text-white absolute -translate-x-4 group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex justify-end col-start-3">
              <button
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#0f172a] hover:bg-slate-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-gray-100 p-8 shadow-2xl font-figtree"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="min-h-[52px] flex items-center text-base font-bold text-[#0f172a] hover:text-[#1447d4] transition-colors duration-200 px-2 rounded-xl hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              {/* the same call to action, once, at the end of the list */}
              <Link
                href="/contact#get-in-touch"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Book a demo — opens the Get in Touch form"
                className="mt-3 w-full min-h-[52px] bg-[#1447d4] hover:bg-[#0d3ab8] text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                Book a Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
