import Image from "next/image";
import Link from "next/link";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";
import { LAB_PHOTOS } from "@/lib/cirrus/media";

const AREAS = [
  "Document control",
  "Training & competency",
  "Equipment & calibration",
  "Temperature monitoring",
  "Internal audits & CAPA",
  "People & performance",
];

export function AboutStory() {
  return (
    <section id="about-story" className={`${styles.section} ${styles.white}`}>
      <div className={`${styles.container} ${styles.split}`}>
        <div className={styles.copy}>
          <p data-rise className={styles.eyebrow}>
            Our story
          </p>
          <h2 className={`${styles.title} ${styles.titleDark}`}>
            <Words text="A quality system that lives" />
            <span className="block italic text-[#6d28d9]">
              <Words text="where the work happens." />
            </span>
          </h2>
          <p data-rise className={styles.lead}>
            Laboratories run on records: procedures, training sign-offs, calibration certificates, temperature logs,
            audit findings. Too often they live in binders, spreadsheets and inboxes that nobody can find on audit day.
          </p>
          <p data-rise className={styles.lead}>
            QMS Pad brings them into one place. Every module shares the same people, equipment and documents, so a
            change in one record is reflected everywhere it matters — and the evidence an assessor asks for is a click
            away.
          </p>
          <ul data-rise className="mt-8 flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full border border-[#180061]/12 bg-[#f5f5fa] px-4 py-2 text-xs text-[#180061]/80"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.media} relative`}>
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,_rgba(167,139,250,0.5)_1.1px,_transparent_1.2px)] bg-[length:18px_18px] opacity-60"
          />
          <div data-wipe className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(24,0,97,0.45)]">
            <Image src={LAB_PHOTOS.scientist} alt="Laboratory scientist at work" fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 left-2 rounded-2xl bg-[#180061] px-5 py-4 text-white shadow-xl sm:left-6">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#c4b5fd] uppercase">Made in</p>
            <p className="mt-1 font-display text-lg">Carrollton, Texas</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  {
    title: "Audit-ready by default",
    body: "Every record carries who, what and when. Version history, approvals and sign-offs are kept automatically, so audit preparation stops being a project.",
  },
  {
    title: "Simple at the bench",
    body: "Screens are built for busy technicians, not for administrators. Logging a reading or acknowledging a document takes seconds.",
  },
  {
    title: "People who answer",
    body: "Demos, setup help and one-on-one training come from the QMS Pad team directly — the same people who build the product.",
  },
];

export function AboutValues() {
  return (
    <section className={`${styles.section} ${styles.ink} overflow-hidden`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(196,181,253,0.16)_1px,_transparent_1.2px)] bg-[length:22px_22px]"
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#6600ff]/40 blur-[120px]" />
      <div className={styles.container}>
        <p data-rise className={`${styles.eyebrow} ${styles.center}`}>
          What we stand for
        </p>
        <h2 className={`${styles.title} ${styles.center} mx-auto max-w-3xl`}>
          <Words text="Built around three promises" />
        </h2>
        <ol className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {VALUES.map((value, index) => (
            <li
              key={value.title}
              data-rise
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a78bfa]/50 hover:bg-white/[0.07] sm:p-8"
            >
              <span className="font-display text-6xl leading-none text-white/10 transition group-hover:text-[#a78bfa]/40">
                0{index + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{value.body}</p>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#6600ff] to-[#c4b5fd] transition-transform duration-500 group-hover:scale-x-100" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Demo", body: "Twenty minutes, one-on-one, focused on how your lab works today." },
  { title: "Setup", body: "Your departments, people, equipment and limits configured in system settings." },
  { title: "Training", body: "One-on-one sessions so every role knows exactly what to do in QMS Pad." },
  { title: "Go-live", body: "Your team starts recording in QMS Pad, with support on hand when questions come up." },
];

export function AboutProcess() {
  return (
    <section className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <p data-rise className={`${styles.eyebrow} ${styles.center}`}>
          How we work with you
        </p>
        <h2 className={`${styles.title} ${styles.center} mx-auto max-w-3xl`}>
          <Words text="From first call to go-live" />
        </h2>
        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-0">
          <span
            aria-hidden
            data-line
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-[#180061]/15 lg:block"
          />
          {STEPS.map((step, index) => (
            <li key={step.title} data-rise className="relative lg:px-6 lg:text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-lg text-[#6600ff] shadow-[0_10px_30px_-12px_rgba(102,0,255,0.6)] ring-1 ring-[#6600ff]/20 lg:mx-auto">
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-xl text-[#180061]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#180061]/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutContactBand() {
  return (
    <section className={`${styles.section} ${styles.white}`}>
      <div className={`${styles.container} relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6600ff] via-[#6d28d9] to-[#180061] px-6 py-14 text-center text-white sm:px-12 md:py-20`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.18)_1px,_transparent_1.2px)] bg-[length:20px_20px]"
        />
        <p data-rise className="relative font-mono text-[11px] tracking-[0.25em] text-[#ddd6fe] uppercase">
          Let&apos;s talk
        </p>
        <h2 className="relative mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,1.2rem+3vw,3.75rem)] leading-[1] tracking-[-0.03em]">
          <Words text="Tell us about your laboratory." />
        </h2>
        <p data-rise className="relative mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
          Questions about modules, accreditation or getting started — send us a message and the team will get back to
          you.
        </p>
        <Link
          href="/contact"
          className="group relative mt-9 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-7 text-sm font-medium text-[#180061] transition hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]"
        >
          Contact us
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6600ff] text-white transition-transform duration-300 group-hover:translate-x-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
