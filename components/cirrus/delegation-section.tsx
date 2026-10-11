import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "The laboratory director may delegate selected duties or responsibilities to qualified and competent personnel.",
  "QMS Pad allows for such delegations to be documented.",
  "The laboratory director shall maintain the ultimate responsibility for the overall operation of the laboratory.",
];

export function DelegationSection() {
  return (
    <ModuleSplit
      id="delegation"
      eyebrow="Delegated duties"
      tone="white"
      mediaFirst
      title={
        <>
          <Words text="Laboratory Director's" />
          <span className="block">
            <Words text="Delegation of Duties" />
          </span>
        </>
      }
      media={
        <div className="relative">
          <div data-wipe className={shotClass}>
            <Image
              src="/assetss/qmspad-Delegation-of-duties-1024x508.avif"
              alt="Delegation of duties list, with delegated tasks, personnel and status."
              width={828}
              height={411}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 44rem, 100vw"
            />
          </div>
          <div data-wipe className={`relative z-10 -mt-16 ml-8 w-[42%] md:-mt-20 ${shotClass}`}>
            <Image
              src="/assetss/qmspad-Delegation-of-duties-2-1024x532-1.avif"
              alt="Signed laboratory director delegation record."
              width={346}
              height={449}
              className="h-auto w-full"
              sizes="16rem"
            />
          </div>
        </div>
      }
    >
      <ModulePoints items={POINTS} />
    </ModuleSplit>
  );
}
