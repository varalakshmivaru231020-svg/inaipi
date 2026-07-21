import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('blog');
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
