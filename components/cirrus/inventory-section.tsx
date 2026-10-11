import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "Reagents and consumables listed by lot, location and quantity",
  "Purchasing from the supplier through to the date received",
  "What is on the shelf stays tied to the order that brought it in",
];

export function InventorySection() {
  return (
    <ModuleSplit
      id="inventory"
      eyebrow="Lots and purchasing"
      title={
        <>
          <Words text="Inventory" />
          <span className="block">
            <Words text="Management" />
          </span>
        </>
      }
      media={
        <div className="relative">
          <div data-wipe className={`w-[84%] ${shotClass}`}>
            <Image
              src="/assetss/qmspad-inventory-768x391.avif"
              alt="Inventory list of reagents and consumables, with lot, location and quantity."
              width={768}
              height={391}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 36rem, 80vw"
            />
          </div>
          <div data-wipe className={`relative z-10 -mt-12 ml-auto w-[84%] md:-mt-16 ${shotClass}`}>
            <Image
              src="/assetss/qmspad-purchasing-1024x499.avif"
              alt="Purchasing list with suppliers, order dates and received status."
              width={828}
              height={403}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 36rem, 80vw"
            />
          </div>
        </div>
      }
    >
      <p data-rise className="text-lg leading-relaxed font-medium text-[#180061]">
        Stock and purchasing live together, so a reagent can be traced from
        the order to the shelf.
      </p>
      <div className="mt-6">
        <ModulePoints items={POINTS} />
      </div>
    </ModuleSplit>
  );
}
