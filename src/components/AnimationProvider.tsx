'use client';

import { ReactNode, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ── fadeInUp2 scroll-reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.visibility = 'visible';
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    document.querySelectorAll('.wow').forEach((el) => {
      if (!el.classList.contains('animated')) {
        (el as HTMLElement).style.visibility = 'hidden';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
