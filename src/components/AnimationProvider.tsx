'use client';

import { ReactNode, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    // Basic setup if any
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
