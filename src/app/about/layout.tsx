import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('about');
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
