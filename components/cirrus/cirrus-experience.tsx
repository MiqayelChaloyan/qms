"use client";

import { AircraftSection } from "@/components/cirrus/aircraft-section";
import { CabinSection } from "@/components/cirrus/cabin-section";
import { CirrusNav } from "@/components/cirrus/cirrus-nav";
import { DeparturesSection } from "@/components/cirrus/departures-section";
import { GoldDust } from "@/components/cirrus/gold-dust";
import { HeroChapter } from "@/components/cirrus/hero-chapter";
import { IdeaSection } from "@/components/cirrus/idea-section";
import { ReserveSection } from "@/components/cirrus/reserve-section";
import { RevealKit } from "@/components/cirrus/reveal";
import { ReticleCursor } from "@/components/cirrus/reticle-cursor";
import { SmoothScrollProvider } from "@/components/cirrus/smooth-scroll-provider";

export function CirrusExperience() {
  return (
    <SmoothScrollProvider>
      <div className="cirrus relative bg-[#f5f5fa] font-display text-[#180061]">
        <CirrusNav />
        <main>
          <HeroChapter />
          <IdeaSection />
          <AircraftSection />
          <CabinSection />
          <DeparturesSection />
          <ReserveSection />
        </main>
        <GoldDust />
        <div aria-hidden className="cirrus-grain" />
        <ReticleCursor />
        <RevealKit />
      </div>
    </SmoothScrollProvider>
  );
}
