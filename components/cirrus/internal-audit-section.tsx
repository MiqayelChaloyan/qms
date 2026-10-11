import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const FLOW = ["Select date", "Audit source", "Audit details", "Schedule", "Review"];

const POINTS = [
  {
    code: "01",
    title: "An audit calendar",
    body: "Results stay linked to the CAPA system, so a finding has a place to go.",
  },
  {
    code: "02",
    title: "Drawn from the quality manual",
    body: "Audits are selected from the linked quality manual, module by module.",
  },
  {
    code: "03",
    title: "Failed results become CAPA",
    body: "A failed internal audit is an input source for the Corrective Action system.",
  },
];

export function InternalAuditSection() {
  return (
    <section id="internal-audit" className={`${styles.section} ${styles.ink}`}>
      <div className={styles.container}>
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p data-rise className={styles.eyebrow}>
              Scheduled audits
            </p>
            <h2 className={`${styles.title} ${styles.titleXL}`}>
              <Words text="Internal" />
              <span className="block italic text-[#c4b5fd]">
                <Words text="Audit." />
              </span>
            </h2>
          </div>
          <p data-rise className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg lg:pb-3">
            With QMS Pad, internal audits are planned at such intervals to
            provide information on the effectiveness of its management system.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8 md:mt-14">
          {FLOW.map((step, i) => (
            <li key={step} data-rise className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#c4b5fd]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/85">{step}</span>
              {i < FLOW.length - 1 ? (
                <span aria-hidden className="hidden h-px w-8 bg-white/25 sm:block" />
              ) : null}
            </li>
          ))}
        </ol>

        <div className="relative mx-auto mt-10 max-w-3xl md:mt-16">
          <div
            data-wipe
            className="overflow-hidden rounded-xl shadow-[0_30px_60px_-32px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
          >
            <Image
              src="/assetss/qmspad-internal-audit-1-1024x617.avif"
              alt="Internal audit calendar for April 2026 beside the table of quality-manual audits."
              width={828}
              height={499}
              className="h-auto w-full"
              sizes="48rem"
            />
          </div>
          <div
            data-wipe
            className="relative z-10 -mt-6 ml-auto w-[88%] overflow-hidden sm:w-[72%] rounded-xl bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.65)] ring-4 ring-[#180061] md:-mt-12"
          >
            <Image
              src="/assetss/qmspad-internal-audit-2-1024x472.avif"
              alt="Add New Internal Audit, choosing a quality module and writing the audit details."
              width={828}
              height={382}
              className="h-auto w-full"
              sizes="34rem"
            />
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 md:mt-16 md:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.code} data-rise className="bg-[#180061] p-6 md:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#c4b5fd]">{point.code}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight font-medium tracking-[-0.02em]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
