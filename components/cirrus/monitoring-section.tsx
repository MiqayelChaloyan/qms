import { SensorModel } from "@/components/cirrus/sensor-model";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const TIMES = ["01:01 am", "02:01 am", "03:00 am", "04:02 am", "05:01 am", "06:01 am", "07:01 am", "08:00 am"];

const TEMPERATURE = {
  title: "Daily Temperature Log",
  yLabel: "Temperature (°C)",
  min: -28,
  max: -8,
  ticks: [-8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28],
  limitHigh: -10,
  limitLow: -25,
  series: [-14.8, -15.4, -17.6, -16.3, -14.2, -16.1, -18.1, -15.2],
  seriesLabel: "[MO4] FREEZER #2",
  scatter: [
    { i: 0.05, y: -9.2 },
    { i: 1.05, y: -16.2 },
    { i: 1.35, y: -27 },
    { i: 2.1, y: -18.4 },
    { i: 3.15, y: -20.2 },
    { i: 4.05, y: -13.8 },
    { i: 5.15, y: -9.6 },
    { i: 6.2, y: -18.6 },
  ],
};

const HUMIDITY = {
  title: "Daily Humidity Log",
  yLabel: "Humidity (%)",
  min: 20,
  max: 90,
  ticks: [90, 80, 70, 60, 50, 40, 30, 20],
  limitHigh: 80,
  limitLow: 30,
  series: [58, 54, 57, 51.5, 56, 58, 53.5, 57],
  seriesLabel: "FREEZER 2024",
  highlight: 3,
  scatter: [
    { i: 0.1, y: 32 },
    { i: 1.15, y: 27 },
    { i: 3.2, y: 68 },
    { i: 4.05, y: 64 },
    { i: 5.1, y: 42 },
  ],
};

type Feature = { title: string; body: string; icon: "sensor" | "data" | "life" | "water" };

const FEATURES: Feature[] = [
  {
    icon: "sensor",
    title: "Sensors",
    body: "Take temperature, humidity, and barometric pressure readings once per minute.",
  },
  {
    icon: "data",
    title: "Data protocols",
    body: "The data is collected at one minute intervals and is stored within the QMS Pad database for each client. This data is then used to chart the temperature and humidity log over time. Upper and lower limits are managed in QMS Pad system settings. Notifications are generated for readings outside user-defined tolerances.",
  },
  {
    icon: "life",
    title: "Long lifetime",
    body: "Over 2 years (more in normal conditions, less in extreme cold).",
  },
  {
    icon: "water",
    title: "Waterproof casing",
    body: "Water-resistant temperature, humidity and barometric pressure smart sensor.",
  },
];

const STATS = [
  { value: "1 min", label: "Reading interval" },
  { value: "3", label: "Measurements: temp, humidity, pressure" },
  { value: "2+ yrs", label: "Sensor lifetime" },
];

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "sensor") {
    return (
      <svg {...common}>
        <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z" />
        <path d="M12 9v6" />
      </svg>
    );
  }
  if (name === "data") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
        <path d="M5 5.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
        <path d="M5 11.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
      </svg>
    );
  }
  if (name === "life") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="16" height="10" rx="2" />
        <path d="M21 10.5v3" />
        <path d="M6.5 10v4M10 10v4M13.5 10v4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <li
      data-rise
      className="group relative rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#a78bfa]/50 hover:bg-white/[0.07] sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6600ff]/25 text-[#c4b5fd] ring-1 ring-[#a78bfa]/30 transition group-hover:bg-[#6600ff] group-hover:text-white">
          <FeatureIcon name={feature.icon} />
        </span>
        <span className="font-display text-sm text-white/30">0{index + 1}</span>
      </div>
      <h3 className="mt-5 font-display text-xl font-medium text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.body}</p>
    </li>
  );
}

const PLOT = { w: 640, h: 360, l: 62, r: 16, t: 14, b: 34 };

function xAt(index: number) {
  return PLOT.l + (index / (TIMES.length - 1)) * (PLOT.w - PLOT.l - PLOT.r);
}

function yAt(value: number, min: number, max: number) {
  return PLOT.t + ((max - value) / (max - min)) * (PLOT.h - PLOT.t - PLOT.b);
}

function LogChart({
  title,
  yLabel,
  min,
  max,
  ticks,
  limitHigh,
  limitLow,
  series,
  seriesLabel,
  scatter,
  highlight,
}: {
  title: string;
  yLabel: string;
  min: number;
  max: number;
  ticks: number[];
  limitHigh: number;
  limitLow: number;
  series: number[];
  seriesLabel: string;
  scatter: { i: number; y: number }[];
  highlight?: number;
}) {
  const line = series.map((value, index) => `${xAt(index)},${yAt(value, min, max)}`).join(" ");
  const labelIndex = series.length - 1;

  return (
    <figure className="min-w-0 rounded-[1.25rem] bg-white px-2 pt-4 pb-2 sm:rounded-[1.6rem] sm:px-3 sm:pt-5 sm:pb-3 shadow-[0_24px_50px_-28px_rgba(24,0,97,0.28)]">
      <figcaption className="relative px-3">
        <p className="text-center font-display text-[1.05rem] font-semibold text-[#1a1a1a]">{title}</p>
        <span aria-hidden className="absolute top-1 right-3 flex flex-col gap-[3px]">
          <span className="h-[2px] w-4 rounded-full bg-[#334155]" />
          <span className="h-[2px] w-4 rounded-full bg-[#334155]" />
          <span className="h-[2px] w-4 rounded-full bg-[#334155]" />
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${PLOT.w} ${PLOT.h}`} className="mt-2 h-auto w-full" role="img" aria-label={title}>
        <text x="16" y={PLOT.h / 2} fill="#64748b" fontSize="14" transform={`rotate(-90 16 ${PLOT.h / 2})`} textAnchor="middle">
          {yLabel}
        </text>
        {ticks.map((tick) => (
          <text key={tick} x={PLOT.l - 8} y={yAt(tick, min, max) + 5} fill="#64748b" fontSize="14" textAnchor="end">
            {tick}
          </text>
        ))}
        <line x1={PLOT.l} x2={PLOT.w - PLOT.r} y1={yAt(limitHigh, min, max)} y2={yAt(limitHigh, min, max)} stroke="#e11d48" strokeWidth="1.4" />
        <line x1={PLOT.l} x2={PLOT.w - PLOT.r} y1={yAt(limitLow, min, max)} y2={yAt(limitLow, min, max)} stroke="#e11d48" strokeWidth="1.4" />
        <text x={PLOT.l + 8} y={yAt(limitHigh, min, max) - 6} fill="#334155" fontSize="14">
          Maximum
        </text>
        <text x={PLOT.l + 8} y={yAt(limitLow, min, max) - 6} fill="#334155" fontSize="14">
          Minimum
        </text>
        {scatter.map((point) => (
          <circle key={`${point.i}-${point.y}`} cx={xAt(point.i)} cy={yAt(point.y, min, max)} r="3.2" fill="#a78bfa" />
        ))}
        <polyline points={line} fill="none" stroke="#111111" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {series.map((value, index) => (
          <circle key={TIMES[index]} cx={xAt(index)} cy={yAt(value, min, max)} r="3.4" fill="#111111" />
        ))}
        {highlight !== undefined ? (
          <circle
            cx={xAt(highlight)}
            cy={yAt(series[highlight], min, max)}
            r="11"
            fill="none"
            stroke="#65a30d"
            strokeWidth="2"
          />
        ) : null}
        <text x={xAt(labelIndex) - 8} y={yAt(series[labelIndex], min, max) - 10} fill="#111111" fontSize="14" fontWeight="600" textAnchor="end">
          {seriesLabel}
        </text>
        {TIMES.map((time, index) => (
          <text
            key={time}
            x={xAt(index)}
            y={PLOT.h - 8}
            fill="#64748b"
            fontSize="13"
            textAnchor="middle"
            className={index % 2 === 1 ? styles.chartTimeAlt : undefined}
          >
            {time}
          </text>
        ))}
      </svg>
    </figure>
  );
}

export function MonitoringSection() {
  return (
    <section id="monitoring" className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <p data-rise className={`${styles.eyebrow} ${styles.center}`}>
          Sensors and logsheets
        </p>
        <h2 className={`${styles.title} ${styles.center} mx-auto max-w-4xl`}>
          <Words text="Integrated Temperature and Humidity" />
          <span className="mt-2 block">
            <Words text="Monitoring with Automated Logsheets" />
          </span>
        </h2>

        <div className="relative mt-10 md:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-2 -inset-y-6 sm:-inset-x-4 sm:-inset-y-8 bg-[radial-gradient(circle,_rgba(167,139,250,0.55)_1.1px,_transparent_1.2px)] bg-[length:18px_18px] opacity-50"
          />
          <div className="relative grid gap-5 lg:grid-cols-2 lg:gap-8">
            <LogChart {...TEMPERATURE} />
            <LogChart {...HUMIDITY} />
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[1.75rem] bg-[#180061] px-5 py-10 sm:rounded-[2.25rem] sm:px-8 md:mt-20 md:py-14 lg:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(196,181,253,0.18)_1px,_transparent_1.2px)] bg-[length:22px_22px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6600ff]/35 blur-[110px]"
          />

          <div className="relative text-center">
            <p data-rise className="text-xs font-semibold tracking-[0.22em] text-[#c4b5fd] uppercase">
              The smart sensor
            </p>
            <h3 data-rise className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.6rem)] leading-tight text-white">
              Readings every minute, <span className="italic text-[#c4b5fd]">logged for you.</span>
            </h3>
          </div>

          <div className="relative mt-10 grid items-center gap-5 md:mt-12 lg:grid-cols-3 lg:gap-8">
            <ul className="grid gap-5 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
              {FEATURES.slice(0, 2).map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </ul>

            <div className="relative order-first mx-auto aspect-square w-full max-w-[20rem] justify-self-center lg:order-2 lg:max-w-[24rem]">
              <div aria-hidden className="pointer-events-none absolute inset-[8%] rounded-full border border-white/10" />
              <div aria-hidden className="pointer-events-none absolute inset-[20%] rounded-full border border-dashed border-[#a78bfa]/30" />
              <div aria-hidden className="pointer-events-none absolute inset-[30%] rounded-full bg-[#6600ff]/20 blur-2xl" />
              <SensorModel mode="manual" className="absolute inset-0" />
              <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                Drag to turn
              </span>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:order-3 lg:grid-cols-1">
              {FEATURES.slice(2).map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index + 2} />
              ))}
            </ul>
          </div>

          <dl className="relative mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 md:mt-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[#180061] px-5 py-5 text-center sm:py-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-white sm:text-4xl">{stat.value}</dd>
                <dd className="mt-1 text-xs tracking-wide text-white/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
