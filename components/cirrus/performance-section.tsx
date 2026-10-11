import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const POINTS = [
  { title: "No more awkward appraisals", body: "No more awkward feeling for performance appraisal.", score: 5 },
  { title: "Scoring that reads clearly", body: "Easy to understand evaluation scoring.", score: 4 },
  { title: "Set up your way", body: "All parameters customizable within the settings.", score: 3 },
];

function ScoreDots({ score }: { score: number }) {
  return (
    <span aria-hidden className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`h-2 w-2 rounded-full ${dot <= score ? "bg-[#c4b5fd]" : "bg-white/20"}`}
        />
      ))}
    </span>
  );
}

export function PerformanceSection() {
  return (
    <section id="performance" className={`${styles.section} ${styles.ink}`}>
      <div className={styles.container}>
        <div className="mx-auto max-w-3xl text-center">
          <p data-rise className={styles.eyebrow}>
            Appraisal scoring
          </p>
          <h2 className={`${styles.title} ${styles.titleXL}`}>
            <Words text="Performance" />{" "}
            <Words text="Evaluation." className="italic text-[#c4b5fd]" />
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div
            data-wipe
            className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
          >
            <div className="flex items-center gap-1.5 border-b border-[#180061]/10 bg-[#f5f5fa] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
            </div>
            <Image
              src="/assetss/qmspad-Screenshot-2024-04-21-143445.avif"
              alt="Employee performance appraisal, with scored parameters and comments."
              width={681}
              height={322}
              className="h-auto w-full"
              sizes="48rem"
            />
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {POINTS.map((point) => (
            <li
              key={point.title}
              data-rise
              className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.1]"
            >
              <ScoreDots score={point.score} />
              <h3 className="mt-5 font-display text-xl leading-tight font-medium">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
