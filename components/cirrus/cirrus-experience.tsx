"use client";

import { AccessControlSection } from "@/components/cirrus/access-control-section";
import { CabinSection } from "@/components/cirrus/cabin-section";
import { CalibrationSection } from "@/components/cirrus/calibration-section";
import { CapaSection } from "@/components/cirrus/capa-section";
import { CompetencySection } from "@/components/cirrus/competency-section";
import { CirrusNav } from "@/components/cirrus/cirrus-nav";
import { DelegationSection } from "@/components/cirrus/delegation-section";
import { DocumentControlSection } from "@/components/cirrus/document-control-section";
import { EmployeeRecordsSection } from "@/components/cirrus/employee-records-section";
import { GoldDust } from "@/components/cirrus/gold-dust";
import { HeroChapter } from "@/components/cirrus/hero-chapter";
import { IdeaSection } from "@/components/cirrus/idea-section";
import { MonitoringSection } from "@/components/cirrus/monitoring-section";
import { PerformanceSection } from "@/components/cirrus/performance-section";
import { ImprovementsSection } from "@/components/cirrus/improvements-section";
import { InternalAuditSection } from "@/components/cirrus/internal-audit-section";
import { JobDescriptionsSection } from "@/components/cirrus/job-descriptions-section";
import { InventorySection } from "@/components/cirrus/inventory-section";
import { QualityAssessmentSection } from "@/components/cirrus/quality-assessment-section";
import { RevealKit } from "@/components/cirrus/reveal";
import { SiteFooter } from "@/components/cirrus/site-footer";
import { ReticleCursor } from "@/components/cirrus/reticle-cursor";
import { SettingsSlider } from "@/components/cirrus/settings-slider";
import { SmoothScrollProvider } from "@/components/cirrus/smooth-scroll-provider";
import { SolutionSection } from "@/components/cirrus/solution-section";
import { SuggestionsSection } from "@/components/cirrus/suggestions-section";
import { TemperatureLogsSection } from "@/components/cirrus/temperature-logs-section";
import { TrainingSection } from "@/components/cirrus/training-section";

export function CirrusExperience() {
  return (
    <SmoothScrollProvider>
      <div className="cirrus relative bg-[#f5f5fa] font-display text-[#180061]">
        <CirrusNav />
        <main>
          <HeroChapter />
          <IdeaSection />
          <ImprovementsSection />
          <DocumentControlSection />
          <CapaSection />
          <InternalAuditSection />
          <CompetencySection />
          <TrainingSection />
          <MonitoringSection />
          <QualityAssessmentSection />
          <CalibrationSection />
          <TemperatureLogsSection />
          <SuggestionsSection />
          <DelegationSection />
          <CabinSection />
          <InventorySection />
          <JobDescriptionsSection />
          <PerformanceSection />
          <EmployeeRecordsSection />
          <AccessControlSection />
          <SettingsSlider />
          <SolutionSection />
        </main>
        <SiteFooter />
        <GoldDust />
        <div aria-hidden className="cirrus-grain" />
        <ReticleCursor />
        <RevealKit />
      </div>
    </SmoothScrollProvider>
  );
}
