import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "Automate all your daily maintenance logs",
  "System notification and reminders",
  "Create log sheets for your equipment and instruments with ease",
  "Reminder email notifications are sent to designated employees",
  "Log sheets can be printed, downloaded as PDF, or emailed",
];

export function CalibrationSection() {
  return (
    <ModuleSplit
      id="calibration"
      eyebrow="Equipment logs"
      title={
        <>
          <Words text="Calibration &" />
          <span className="block">
            <Words text="Maintenance" />
          </span>
        </>
      }
      media={
        <div className="relative">
          <div data-wipe className={shotClass}>
            <Image
              src="/assetss/qmspad-Log-Sheets-Equipment-1024x574.avif"
              alt="Equipment log sheets, with a maintenance calendar and instrument records."
              width={828}
              height={464}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 44rem, 100vw"
            />
          </div>
          <div data-wipe className={`relative z-10 -mt-16 w-[74%] md:-mt-24 ${shotClass}`}>
            <Image
              src="/assetss/qmspad-Log-Sheets-1024x481.avif"
              alt="Temperature and humidity log sheet that can be printed, downloaded, or emailed."
              width={828}
              height={389}
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
