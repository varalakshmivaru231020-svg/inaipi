// Client-safe SEO definitions (no filesystem imports). Shared by the admin UI
// and the server-side metadata helpers in ./seo.ts.

export type SeoEntry = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type SeoPage = { key: string; label: string; path: string };

export const SEO_PAGES: SeoPage[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'blog', label: 'Blog', path: '/blog' },
  { key: 'career', label: 'Career', path: '/career' },
  { key: 'contact', label: 'Contact', path: '/contact' },
  { key: 'privacy-policy', label: 'Privacy Policy', path: '/privacy-policy' },
  { key: 'terms-conditions', label: 'Terms & Conditions', path: '/terms-conditions' },
];

export const SEO_DEFAULTS: Record<string, SeoEntry> = {
  home: {
    title: 'Inaipi | AI-Native, Cloud-First CX with Sovereign Cloud',
    description:
      'Inaipi is an AI-native, cloud-first customer experience platform with Sovereign Cloud options for regulated industries: data stays resident and compliant.',
    ogImage: '/hero.png',
  },
  about: {
    title: 'About Inaipi | AI-Native Customer Experience Platform',
    description:
      'Learn about Inaipi, the AI-native platform unifying voice, chat, email and social into one intelligent customer experience engine.',
  },
  blog: {
    title: 'Blog | Insights on AI & Customer Experience | Inaipi',
    description:
      'Insights, news and expert perspectives on AI-native CX, sovereign cloud and the future of customer engagement from the Inaipi team.',
  },
  career: {
    title: 'Careers | Build the Future of Customer Experience | Inaipi',
    description:
      'Join Inaipi and help build the AI-native platform replacing fragmented CX stacks. Explore open roles across engineering, design, sales and CX.',
  },
  contact: {
    title: 'Contact Inaipi | Talk to Our Team',
    description:
      'Get in touch with Inaipi to see how our AI-native customer experience platform can transform your contact centre.',
  },
  'privacy-policy': {
    title: 'Privacy Policy | Inaipi',
    description: 'Read the Inaipi privacy policy to understand how we collect, use and protect your data.',
    noindex: true,
  },
  'terms-conditions': {
    title: 'Terms & Conditions | Inaipi',
    description: 'Read the terms and conditions governing the use of Inaipi products and services.',
    noindex: true,
  },
};

/** Merge a saved entry over the defaults for a page key. */
export function mergeSeo(key: string, saved?: Partial<SeoEntry>): SeoEntry {
  const base = SEO_DEFAULTS[key] ?? { title: 'Inaipi', description: '' };
  return { ...base, ...(saved ?? {}) };
}
