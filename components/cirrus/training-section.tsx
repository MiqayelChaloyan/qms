import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "New employee orientation",
  "Health and Safety trainings",
  "Customized training categories and modules",
  "Manage the certification process for all the trainings, both internal and third party",
  "Receive electronic notifications for training due dates",
];

export function TrainingSection() {
  return (
    <ModuleSplit
      id="training"
      eyebrow="Training records"
      tone="white"
      title={
        <>
          <Words text="Employee" />
          <span className="block">
            <Words text="Training" />
          </span>
        </>
      }
      media={
        <div data-wipe className={shotClass}>
          <Image
            src="/assetss/qmspad-Training-Modules-1-1024x749.avif"
            alt="Employee training list and a selected training record, with modules, status and due dates."
            width={828}
            height={606}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 44rem, 100vw"
          />
        </div>
      }
    >
      <p data-rise className="text-lg leading-relaxed font-medium text-[#180061]">
        All employee training needs are managed in one place.
      </p>
      <div className="mt-6">
        <ModulePoints items={POINTS} />
      </div>
    </ModuleSplit>
  );
}
