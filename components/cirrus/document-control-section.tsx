import Image from "next/image";
import { ModulePoints, ModuleSplit, shotClass } from "@/components/cirrus/module-split";
import { Words } from "@/components/cirrus/reveal";

const POINTS = [
  "All documents can be tailored to ISO, CLIA, COLA or CAP standards",
  "Maintain full control over the documents (who can do what): view, edit, delete and download",
  "Electronic approvals and email notifications",
  "Keep all of the latest revisions under full control",
  "View activity records of each document",
  "Email / share documents",
];

export function DocumentControlSection() {
  return (
    <ModuleSplit
      id="document-control"
      eyebrow="Controlled documents"
      tone="white"
      title={
        <>
          <Words text="Document Control" />
          <span className="block">
            <Words text="& Quality Records" />
          </span>
        </>
      }
      media={
        <div data-wipe className={shotClass}>
          <Image
            src="/assetss/Document-Control_-1024x514.avif"
            alt="Document Control list, with revision status, owners and approval state for each quality record."
            width={1024}
            height={514}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 44rem, 100vw"
          />
        </div>
      }
    >
      <ModulePoints items={POINTS} />
    </ModuleSplit>
  );
}
