'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { name: 'Platform', href: '#platform' },
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Analytics', href: '#analytics' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest <= 60);
  });

  const logoHeight = useTransform(scrollY, [0, 80], [40, 30]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: 1,
          y: 0,
          paddingTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 16 : 0,
          paddingRight: scrolled ? 16 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-full overflow-hidden"
          animate={{ maxWidth: scrolled ? '980px' : '100%' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative grid items-center px-6 sm:px-10"
            style={{
              gridTemplateColumns: '1fr auto 1fr',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              borderStyle: 'solid',
            }}
            animate={{
              borderRadius: scrolled ? '9999px' : '0px',
              backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
              borderWidth: scrolled ? '1px' : '0px',
              borderColor: scrolled ? 'rgba(37,99,235,0.15)' : 'transparent',
              boxShadow: scrolled
                ? '0 8px 32px -8px rgba(37,99,235,0.18), 0 2px 8px -2px rgba(0,0,0,0.08)'
                : '0 1px 0 0 rgba(0,0,0,0.06)',
              paddingTop: scrolled ? 10 : 18,
              paddingBottom: scrolled ? 10 : 18,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
                    src="/logo.png"
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
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="relative text-sm font-semibold text-[#0f172a]/60 hover:text-[#2563eb] transition-colors duration-300 tracking-normal whitespace-nowrap group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center justify-end gap-3 pl-6">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/login"
                  className="text-[11px] font-black text-[#0f172a] hover:text-[#2563eb] hover:border-[#2563eb] transition-all duration-300 uppercase tracking-[0.15em] flex items-center gap-2 border-2 border-[#0f172a]/40 px-5 py-2.5 rounded-full whitespace-nowrap"
                >
                  Log in
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <button className="relative group overflow-hidden bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 shadow-md shadow-blue-500/25 whitespace-nowrap">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.8, delay: 1.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">Get Started</span>
                  <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex justify-end">
              <button
                className="p-2 text-[#0f172a]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-gray-100 p-8 shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-[#0f172a]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 border border-[#0f172a]/20 rounded-2xl font-black text-sm uppercase tracking-widest text-[#0f172a] flex items-center justify-center gap-2"
              >
                Log in <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button className="w-full py-4 bg-[#2563eb] text-white rounded-2xl font-black uppercase tracking-widest text-sm">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
