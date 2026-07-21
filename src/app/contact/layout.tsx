import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('contact');
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
