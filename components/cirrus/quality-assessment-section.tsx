import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const STATUSES = [
  { label: "Approved", dot: "bg-[#22c55e]" },
  { label: "Pending", dot: "bg-[#f59e0b]" },
  { label: "CAPA", dot: "bg-[#e11d48]" },
];

const POINTS = [
  "One list for the month’s quality control assessments",
  "Dates and approval status stay with each assessment",
  "A CAPA flag marks a result that needs action",
];

export function QualityAssessmentSection() {
  return (
    <section id="quality-assessment" className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p data-rise className={styles.eyebrow}>
              Monthly review
            </p>
            <h2 className={`${styles.title} ${styles.titleXL}`}>
              <Words text="Monthly Quality" />
              <span className="block italic text-[#180061]">
                <Words text="Assessment." />
              </span>
            </h2>
          </div>
          <ol className="space-y-3 lg:pb-2">
            {POINTS.map((point, i) => (
              <li key={point} data-rise className="flex items-baseline gap-4 text-[#180061]/80">
                <span className="font-mono text-[11px] text-[#6d28d9]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-relaxed sm:text-base">{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden className="mt-10 grid grid-cols-6 gap-1.5 sm:grid-cols-12 sm:gap-2 md:mt-14">
          {MONTHS.map((month, i) => {
            const current = i === 2;
            return (
              <div
                key={month}
                data-rise
                className={`flex flex-col items-center gap-2 rounded-xl py-3 transition-colors ${
                  current
                    ? "bg-[#6600ff] text-white shadow-[0_16px_34px_-14px_rgba(102,0,255,0.8)]"
                    : "bg-white text-[#180061]/55 ring-1 ring-[#180061]/8"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase">{month}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${current ? "bg-white" : "bg-[#6600ff]/30"}`} />
              </div>
            );
          })}
        </div>

        <div className="relative mx-auto mt-8 max-w-5xl">
          <div
            data-wipe
            className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-44px_rgba(24,0,97,0.55)] ring-1 ring-[#180061]/10"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#180061]/10 px-4 py-3 sm:px-5">
              <span className="hidden gap-1.5 sm:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {STATUSES.map((status) => (
                  <span key={status.label} className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-[#180061]/60 uppercase">
                    <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                ))}
              </span>
            </div>
            <Image
              src="/assetss/qmspad-Screenshot-2024-03-02-235157.avif"
              alt="Quality Control Assessment list, with dates, approval status and CAPA flags."
              width={1920}
              height={794}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
