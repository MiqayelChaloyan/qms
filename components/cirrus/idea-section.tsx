import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import { LAB_PHOTOS } from "@/lib/cirrus/media";
import styles from "@/components/cirrus/styles.module.css";

function FilmChip({ src }: { src: string }) {
  return (
    <span
      data-wipe
      className="relative mx-[0.12em] inline-block h-[0.92em] w-[2.1em] overflow-hidden rounded-full align-[-0.12em] shadow-[0_10px_30px_-10px_rgba(24, 0, 97,0.45)]"
    >
      <Image src={src} alt="" fill className="object-cover" sizes="120px" />
    </span>
  );
}

const FACTS = [
  {
    label: "One platform",
    body: "Seventeen modules for quality, people, equipment and access, built for clinical and testing laboratories.",
  },
  {
    label: "One source of truth",
    body: "Every SOP, log sheet, training record and CAPA lives in one place, versioned, signed and searchable.",
  },
  {
    label: "Every role",
    body: "From bench technologist to lab director, everyone sees exactly what they need and nothing they shouldn't.",
  },
];

export function IdeaSection() {
  return (
    <section id="idea" className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <p className={styles.eyebrow} data-rise>
          One laboratory system
        </p>
        <p className="mt-8 max-w-[22ch] font-display text-[clamp(2.1rem,5.2vw,4.4rem)] leading-[1.08] font-medium tracking-[-0.02em] text-[#180061] md:max-w-none">
          <Words text="One system for the whole laboratory —" />{" "}
          <FilmChip src={LAB_PHOTOS.plate} />{" "}
          <Words text="every document controlled. Every instrument calibrated," />{" "}
          <FilmChip src={LAB_PHOTOS.vials} />{" "}
          <Words text="every result traceable." />{" "}
          <FilmChip src={LAB_PHOTOS.cells} />{" "}
          <Words text="Every audit, ready." className="italic text-[#6d28d9]" />
        </p>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-14">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <div data-line className="h-px w-full bg-[#180061]/25" />
              <h3
                data-rise
                className="mt-6 font-mono text-[11px] tracking-[0.25em] text-[#180061] uppercase"
              >
                {fact.label}
              </h3>
              <p data-rise className="mt-3 max-w-xs text-sm leading-relaxed text-[#180061]/70">
                {fact.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
