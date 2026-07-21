import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export function generateMetadata() {
  return buildMetadata('privacy-policy');
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
