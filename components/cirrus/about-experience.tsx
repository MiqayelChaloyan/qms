"use client";

import { AboutHero } from "@/components/cirrus/about-hero";
import { AboutContactBand, AboutProcess, AboutStory, AboutValues } from "@/components/cirrus/about-sections";
import { AircraftSection } from "@/components/cirrus/aircraft-section";
import { CirrusNav } from "@/components/cirrus/cirrus-nav";
import { SiteFooter } from "@/components/cirrus/site-footer";
import { RevealKit } from "@/components/cirrus/reveal";
import { ReticleCursor } from "@/components/cirrus/reticle-cursor";
import { SmoothScrollProvider } from "@/components/cirrus/smooth-scroll-provider";

export function AboutExperience() {
  return (
    <SmoothScrollProvider>
      <div className="cirrus relative min-h-[100dvh] bg-[#f5f5fa] font-display text-[#180061]">
        <CirrusNav />
        <main>
          <AboutHero />
          <AboutStory />
          <AircraftSection />
          <AboutValues />
          <AboutProcess />
          <AboutContactBand />
        </main>
        <SiteFooter />
        <div aria-hidden className="cirrus-grain" />
        <ReticleCursor />
        <RevealKit />
      </div>
    </SmoothScrollProvider>
  );
}
