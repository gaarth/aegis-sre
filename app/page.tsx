"use client";

import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { LandingView } from "@/components/LandingView";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function Home() {
  const router = useRouter();

  return (
    <SmoothScrollProvider>
      <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
        {/* Shared Navigation — anchor-based smooth scrolling */}
        <Navigation />

        {/* All sections stacked on one page */}
        <LandingView onEnterAegis={() => router.push("/dashboard")} />
        <CapabilitiesSection />
        <ArchitectureSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
