import type Lenis from 'lenis';

/**
 * Shared handle to the app-wide Lenis smooth-scroll instance (created in
 * SmoothScroll.tsx). Components that need to coordinate with smooth scrolling —
 * e.g. temporarily freezing it to pin a section — read it through here.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;
