import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AnimationProvider from "@/components/AnimationProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", weight: ["300","400","500","600","700","800","900"] });
// Used by the Agent Desktop UI mockups in the PlatformFlow section (matches the source design)
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://inaipi.zapeat.in"),
  title: "Inaipi | AI-Native, Cloud-First CX with Sovereign Cloud",
  description: "Inaipi is an AI-native, cloud-first customer experience platform with Sovereign Cloud options for regulated industries: data stays resident and compliant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${poppins.variable}`} style={{ scrollBehavior: "auto" }}>
      <head>
        <link rel="preload" as="image" href="/hero.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/arch1.png" />
      </head>
      <body className="antialiased overflow-x-clip">
        <GoogleAnalytics />
        <AnimationProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AnimationProvider>
      </body>
    </html>
  );
}

