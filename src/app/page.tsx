'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Architecture from "@/components/sections/Architecture";
import PlatformFlow from "@/components/sections/PlatformFlow";
import Industries from "@/components/sections/Industries";
import TrustMarquee from "@/components/sections/TrustMarquee";
import AgentDesktop from "@/components/sections/AgentDesktop";
import PlatformCards from "@/components/sections/PlatformCards";
import Analytics from "@/components/sections/Analytics";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import Careers from "@/components/sections/Careers";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#fcfcfd] overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Architecture />
      <PlatformFlow />
      <Industries />
      <TrustMarquee />
      {/* <PlatformCards /> */}
      <AgentDesktop />
      {/* <Analytics /> */}
      <Testimonials />
      <Blogs />
      {/* <Careers /> */}
      <CTA />
      <Footer />
    </main>
  );
}
