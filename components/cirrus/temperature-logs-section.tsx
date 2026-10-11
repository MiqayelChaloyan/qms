import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const POINTS = [
  { title: "One system", body: "No need for a separate system.", icon: "layers" },
  { title: "Every unit, logged", body: "Automated log sheets for each piece of equipment.", icon: "fridge" },
  { title: "Share it your way", body: "All log sheets can be printed, downloaded, or emailed.", icon: "share" },
] as const;

const TICKS = [10, 8, 6, 4, 2, 0];

function PointIcon({ name }: { name: (typeof POINTS)[number]["icon"] }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  if (name === "layers") {
    return (
      <svg {...common}>
        <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "fridge") {
    return (
      <svg {...common}>
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 10h12M9 6v2M9 13v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="7" y="14" width="10" height="6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Thermometer() {
  return (
    <div aria-hidden className="relative flex h-full items-end gap-4">
      <div className="flex h-[78%] flex-col justify-between pb-14 font-mono text-[10px] text-[#180061]/45">
        {TICKS.map((tick) => (
          <span key={tick}>{tick}°</span>
        ))}
      </div>
      <div className="relative flex h-full w-10 flex-col items-center">
        <div className="relative w-4 flex-1 overflow-hidden rounded-t-full bg-white ring-1 ring-[#180061]/10">
          <span className="absolute inset-x-0 top-[22%] h-px bg-[#e11d48]/60" />
          <span className="absolute inset-x-0 top-[82%] h-px bg-[#e11d48]/60" />
          <span className="absolute inset-x-[3px] bottom-0 rounded-t-full bg-gradient-to-t from-[#6600ff] to-[#a78bfa] motion-safe:animate-[thermo-fill_4.5s_ease-in-out_infinite]" style={{ height: "52%" }} />
        </div>
        <span className="-mt-1 h-10 w-10 rounded-full bg-[#6600ff] shadow-[0_10px_30px_-8px_rgba(102,0,255,0.8)] ring-4 ring-white" />
      </div>
    </div>
  );
}

export function TemperatureLogsSection() {
  return (
    <section
      id="temperature-logs"
      className={`${styles.section} overflow-hidden bg-gradient-to-b from-white via-[#f7f4ff] to-[#f5f5fa]`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#6600ff]/10 blur-3xl"
      />
      <div className={styles.container}>
        <div className="mx-auto max-w-3xl text-center">
          <p data-rise className={styles.eyebrow}>
            Refrigerators and freezers
          </p>
          <h2 className={`${styles.title} ${styles.titleXL}`}>
            <Words text="Temperature" />{" "}
            <Words text="Log Sheets." className="italic text-[#180061]" />
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl md:mt-16 items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
          <div className="mx-auto hidden h-[22rem] lg:block">
            <Thermometer />
          </div>

          <div data-wipe className="relative">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-[2.5deg] rounded-2xl bg-white shadow-[0_20px_40px_-28px_rgba(24,0,97,0.4)] ring-1 ring-[#180061]/8" />
            <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rotate-[1.2deg] rounded-2xl bg-white ring-1 ring-[#180061]/8" />
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-34px_rgba(24,0,97,0.5)] ring-1 ring-[#180061]/10">
              <Image
                src="/assetss/qmspad-Screenshot_10-1024x518.avif"
                alt="Equipment and temperature log sheets, including a generated refrigerator temperature log."
                width={828}
                height={419}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 48rem, 100vw"
              />
            </div>
            <div className="absolute -bottom-4 left-4 flex gap-1.5 sm:-bottom-5 sm:left-6 sm:gap-2">
              {["Print", "PDF", "Email"].map((action) => (
                <span
                  key={action}
                  className="rounded-full bg-[#180061] px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-white uppercase shadow-[0_10px_24px_-10px_rgba(24,0,97,0.7)]"
                >
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-4 md:mt-20 md:grid-cols-3">
          {POINTS.map((point) => (
            <li
              key={point.title}
              data-rise
              className="group rounded-2xl bg-white p-6 ring-1 ring-[#180061]/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(102,0,255,0.6)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6600ff]/10 text-[#6600ff] transition-colors duration-500 group-hover:bg-[#6600ff] group-hover:text-white">
                <PointIcon name={point.icon} />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-[#180061]">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#180061]/70">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
