import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = ["Improve customer service", "Eliminate waste", "Reduce cost"];

export function SuggestionsSection() {
  return (
    <ModuleSplit
      id="suggestions"
      eyebrow="Ideas from the bench"
      title={
        <>
          <Words text="Employee" />
          <span className="block">
            <Words text="Suggestions" />
          </span>
        </>
      }
      media={
        <div data-wipe className={shotClass}>
          <Image
            src="/assetss/qmspad-employe-suggestion-1024x508.avif"
            alt="Improvement suggestion form, with employee details, suggestion type and review status."
            width={828}
            height={411}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 44rem, 100vw"
          />
        </div>
      }
    >
      <p data-rise className="text-base leading-relaxed text-[#180061]/80">
        Encourages employees to offer useful ideas or suggestions that may
        point out problems or identify potential improvements in the
        workplace. It is a systematic way of obtaining employee feedback and
        encouraging them to contribute.
      </p>
      <div className="mt-6">
        <ModulePoints items={POINTS} />
      </div>
      <p data-rise className="mt-6 text-sm leading-relaxed font-medium text-[#180061]">
        Employee engagement increases efficiency and provides continuous
        improvement.
      </p>
      <p data-rise className="mt-3 text-sm leading-relaxed text-[#180061]/80">
        Provides an easier connection between management and staff, and
        increases customer satisfaction.
      </p>
    </ModuleSplit>
  );
}
