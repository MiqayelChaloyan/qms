import Link from "next/link";

const STATS = [
  { value: "15+", label: "Years in quality management" },
  { value: "2,000+", label: "Organizations worldwide" },
  { value: "99.9%", label: "Platform uptime" },
];

export function AboutSection() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="border-t border-brand-cream-dark/50 bg-brand-cream"
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-orange">
            About us
          </p>
          <h2
            id="about-us-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
          >
            Quality management that stays simple as you scale
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            SimplerQMS helps regulated teams document processes, manage
            change, and stay audit-ready without wrestling with spreadsheets or
            legacy systems. We built the platform we wished existed when we were
            on the factory floor.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-navy/75">
            From document control to training records, everything lives in one
            validated environment so your people can focus on product quality—not
            paperwork.
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-orange"
          >
            Learn our story
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-brand-cream-dark bg-white/70 px-6 py-5 shadow-sm"
            >
              <p className="text-3xl font-bold tracking-tight text-brand-navy">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-brand-navy/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
