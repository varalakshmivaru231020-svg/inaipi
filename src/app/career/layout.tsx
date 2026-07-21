import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('career');
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
