import Image from "next/image";
import { ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

export function JobDescriptionsSection() {
  return (
    <ModuleSplit
      id="job-descriptions"
      eyebrow="Roles and measures"
      tone="white"
      mediaFirst
      title={
        <>
          <Words text="Job Descriptions" />
          <span className="mt-2 block text-[0.62em] leading-[1.05]">
            <Words text="with Key Performance Indicators" />
          </span>
        </>
      }
      media={
        <div className="relative">
          <div data-wipe className={`w-[88%] ${shotClass}`}>
            <Image
              src="/assetss/qmspad-Screenshot-2024-04-21-143318.avif"
              alt="Key performance indicators grouped by role."
              width={718}
              height={355}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 36rem, 90vw"
            />
          </div>
          <div data-wipe className={`relative z-10 -mt-14 ml-auto w-[84%] md:-mt-16 ${shotClass}`}>
            <Image
              src="/assetss/qmspad-Screenshot-2024-04-21-143322.avif"
              alt="Job descriptions linked to roles and performance indicators."
              width={658}
              height={331}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 34rem, 85vw"
            />
          </div>
        </div>
      }
    >
      <p data-rise className="text-lg leading-relaxed font-medium text-[#180061]">
        Integrated job description requirements with key performance
        indicators for a simple and effective performance appraisal.
      </p>
    </ModuleSplit>
  );
}
