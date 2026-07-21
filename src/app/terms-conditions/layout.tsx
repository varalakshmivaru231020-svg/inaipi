import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('terms-conditions');
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
