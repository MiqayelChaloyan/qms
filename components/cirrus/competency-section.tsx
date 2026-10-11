import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "Assessment methods and categories are designed to accommodate all your needs",
  "Competency assessments are tailored to the employee's role and job description along with the frequency",
  "Electronic notifications and reminders for upcoming assessments",
  "For each completed assessment, the system will issue an approved certificate for your records",
];

export function CompetencySection() {
  return (
    <ModuleSplit
      id="competency"
      eyebrow="Role competency"
      mediaFirst
      title={
        <>
          <Words text="Competency" />
          <span className="block">
            <Words text="Assessment" />
          </span>
        </>
      }
      media={
        <div className="relative">
          <div data-wipe className={shotClass}>
            <Image
              src="/assetss/qmspad-Competency-image-1-1024x503.avif"
              alt="Employee competency assessment list, with methods, due dates and status."
              width={828}
              height={407}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 44rem, 100vw"
            />
          </div>
          <div data-wipe className={`relative z-10 -mt-14 ml-auto w-[76%] md:-mt-20 ${shotClass}`}>
            <Image
              src="/assetss/qmspad-Competency-image-2-1024x503.avif"
              alt="Approved competency certificate issued after a completed assessment."
              width={828}
              height={407}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 32rem, 80vw"
            />
          </div>
        </div>
      }
    >
      <ModulePoints items={POINTS} />
    </ModuleSplit>
  );
}
