import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const TABS = ["Profile", "Training", "Competency", "Evaluations", "Documents"];

const POINTS = [
  { title: "One file per person", body: "Choose a person and the records that belong to them open together." },
  { title: "Fully secured", body: "All records are fully secured." },
  { title: "Watched access", body: "Access controlled and monitored." },
];

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3.5" y="8" width="11" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8V5.8a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function EmployeeRecordsSection() {
  return (
    <section id="employee-records" className={`${styles.section} ${styles.white}`}>
      <div className={`${styles.container} grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20`}>
        <div>
          <p data-rise className={styles.eyebrow}>
            Personnel files
          </p>
          <h2 className={`${styles.title} ${styles.titleXL}`}>
            <Words text="Employee" />
            <span className="block">
              <Words text="Records" />
            </span>
          </h2>
          <ul className="mt-10 divide-y divide-[#180061]/10 border-y border-[#180061]/10">
            {POINTS.map((point) => (
              <li key={point.title} data-rise className="flex gap-4 py-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6600ff]/10 text-[#6600ff]">
                  <LockIcon />
                </span>
                <span>
                  <span className="block font-display text-lg font-medium text-[#180061]">{point.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#180061]/70">{point.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-wipe className="relative">
          <div aria-hidden className="absolute -top-4 left-6 right-10 h-full rounded-2xl bg-[#6600ff]/10" />
          <div aria-hidden className="absolute -top-2 left-3 right-5 h-full rounded-2xl bg-[#6600ff]/15" />
          <div className="relative">
            <div className="flex gap-1 overflow-x-auto pl-4">
              {TABS.map((tab, i) => (
                <span
                  key={tab}
                  className={`shrink-0 rounded-t-xl px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase ${
                    i === 0 ? "bg-[#6600ff] text-white" : "bg-[#f5f5fa] text-[#180061]/60"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl rounded-tl-none border-t-4 border-[#6600ff] bg-white shadow-[0_30px_70px_-34px_rgba(24,0,97,0.45)] ring-1 ring-[#180061]/10">
              <Image
                src="/assetss/qmspad-Screenshot-2024-04-21-143626.avif"
                alt="Employee list with the records available for the selected employee."
                width={738}
                height={327}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 46rem, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
