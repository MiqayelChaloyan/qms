import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "Management commitment",
  "Measure performance and action items",
  "Display the roadmap via Plan–Do–Check–Act",
  "Display and share the results with employees and customers alike",
];

export function ImprovementsSection() {
  return (
    <ModuleSplit
      id="improvements"
      eyebrow="Plan–Do–Check–Act"
      title={
        <>
          <Words text="Continuous" />
          <span className="block">
            <Words text="Improvements" />
          </span>
        </>
      }
      media={
        <div data-wipe className={shotClass}>
          <Image
            src="/assetss/qmspad-Policy-Deployment-Performance-Review-PDPR-04-16-2026_04_05_PM-copy-1536x1296.avif"
            alt="Policy Deployment Performance Review board, with monthly results across compliance, customer satisfaction and employee measures."
            width={1536}
            height={1296}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 44rem, 100vw"
          />
        </div>
      }
    >
      <p data-rise className="text-lg leading-relaxed font-medium text-[#180061]">
        QMS Pad provides a comprehensive CI module to guide your organization
        on the journey of achieving excellence.
      </p>
      <div className="mt-6">
        <ModulePoints items={POINTS} />
      </div>
    </ModuleSplit>
  );
}
