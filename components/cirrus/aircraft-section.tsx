import { ArchScrub } from "@/components/cirrus/arch-scrub";
import { Words } from "@/components/cirrus/reveal";
import { CIRRUS_POSTERS, CIRRUS_VIDEOS } from "@/lib/cirrus/media";

const SPECS = [
  { label: "Modules", value: 17, unit: "", decimals: 0 },
  { label: "Quality areas", value: 4, unit: "", decimals: 0 },
  { label: "Uptime", value: 99.9, unit: "%", decimals: 1 },
  { label: "Go-live", value: 30, unit: "days", decimals: 0 },
];

export function AircraftSection() {
  return (
    <section id="platform" className="bg-[#f5f5fa] px-6 py-28 md:px-12 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p data-rise className="font-mono text-[11px] tracking-[0.25em] text-[#6d28d9] uppercase">
            02 — The platform
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[#180061]">
            <Words text="Built for" />
            <span className="block">
              <Words text="the bench." className="italic text-[#6d28d9]" />
            </span>
          </h2>
          <p data-rise className="mt-8 max-w-md text-base leading-relaxed text-[#180061]/70">
            Designed with laboratory teams, not around them. Fast enough for a
            busy bench, rigorous enough for an accreditation visit, and simple
            enough that nobody needs a manual.
          </p>

          <dl className="mt-12 max-w-lg">
            {SPECS.map((spec) => (
              <div key={spec.label}>
                <div data-line className="h-px w-full bg-[#180061]/20" />
                <div className="flex items-baseline justify-between py-4">
                  <dt className="font-mono text-[11px] tracking-[0.25em] text-[#180061]/60 uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-display text-2xl text-[#180061] md:text-3xl">
                    <span data-count={spec.value} data-decimals={spec.decimals || undefined}>
                      {spec.value.toLocaleString("en-US")}
                    </span>
                    {spec.unit ? (
                      <span className="ml-1.5 font-mono text-xs text-[#6d28d9]">{spec.unit}</span>
                    ) : null}
                  </dd>
                </div>
              </div>
            ))}
            <div data-line className="h-px w-full bg-[#180061]/20" />
          </dl>
        </div>

        <ArchScrub videoSrc={CIRRUS_VIDEOS.emerge} posterSrc={CIRRUS_POSTERS.emerge} />
      </div>
    </section>
  );
}
