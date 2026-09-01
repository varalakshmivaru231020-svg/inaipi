import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Architecture from "@/components/sections/Architecture";
import PlatformFlow from "@/components/sections/PlatformFlow";
import Industries from "@/components/sections/Industries";
import TrustMarquee from "@/components/sections/TrustMarquee";
import AgentDesktop from "@/components/sections/AgentDesktop";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

// Re-read SEO settings periodically so admin edits take effect without a redeploy.
export const revalidate = 300;
export function generateMetadata() {
  return buildMetadata("home");
}

export default function Home() {
  return (
    <main className="relative bg-[#fcfcfd] overflow-x-clip">
      <Navbar />
      <Hero />
      <Problem />
      <Architecture />
      <PlatformFlow />
      <Industries />
      <TrustMarquee />
      <AgentDesktop />
      <Testimonials />
      <Blogs />
      <CTA />
      <Footer />
    </main>
  );
}
