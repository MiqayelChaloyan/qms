import { ScrubChapter } from "@/components/cirrus/scrub-chapter";
import { CIRRUS_POSTERS, CIRRUS_VIDEOS } from "@/lib/cirrus/media";

const PILLS = ["Temperature monitoring", "Calibration", "Inventory"];

export function CabinSection() {
  return (
    <ScrubChapter
      id="lab"
      heightVh={300}
      videoSrc={CIRRUS_VIDEOS.cabin}
      posterSrc={CIRRUS_POSTERS.cabin}
      srLabel="Film: a slow pan across a laboratory team working at the bench."
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-[#f5f5fa] via-[#f5f5fa]/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#f5f5fa] via-[#f5f5fa]/75 to-transparent"
      />

      <div className="relative flex h-full flex-col justify-between px-6 pt-28 pb-12 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[#180061]">
            Every bench,
            <span className="block italic text-[#6d28d9]">in view.</span>
          </h2>
          <p className="font-mono text-[11px] tracking-[0.25em] text-[#180061]/60 uppercase">
            03 — Scroll, step inside
          </p>
        </div>

        <div className="max-w-xl">
          <p className="text-base leading-relaxed text-[#180061]/80">
            Fridges and freezers log themselves. Calibration comes due before
            it lapses. Reagent lots are traced from delivery to result. Your
            team works the bench and QMS Pad keeps the record.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PILLS.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-[#180061]/15 bg-[#f5f5fa]/70 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-[#180061] uppercase backdrop-blur-md"
              >
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrubChapter>
  );
}
