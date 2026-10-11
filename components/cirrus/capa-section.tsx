"use client";

import Image from "next/image";
import { useState } from "react";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const STEPS = [
  {
    code: "01",
    title: "Description of non Conformity",
    body: "State the issue",
    photo: "/assetss/qmspad-corrective-actions.avif",
  },
  {
    code: "02",
    title: "Root Cause",
    body: "Customized questions in a variety of categories guide you through identifying the root cause",
    photo: "/assetss/qmspad-capa-form.avif",
  },
  {
    code: "03",
    title: "Corrective Action(s) taken",
    body: "List all the immediate actions taken to remedy the issue",
    photo: "/assetss/qmspad-corrective-actions.avif",
  },
  {
    code: "04",
    title: "Preventive Action(s) taken",
    body: "List the planned actions that prevent the issue from recurring",
    photo: "/assetss/qmspad-capa-form.avif",
  },
  {
    code: "05",
    title: "Planning for implementation",
    body: "Define who must do what by when, so the corrective and preventive actions are complete",
    photo: "/assetss/qmspad-capa-plan-1.avif",
  },
];

const COLUMNS =
  "grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)_15rem] lg:grid-cols-[6rem_minmax(0,1fr)_18rem_10rem]";

export function CapaSection() {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);

  const hover = (i: number | null) => {
    setActive(i);
    if (i !== null) setLast(i);
  };

  return (
    <section id="capa" className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <p data-rise className={styles.eyebrow}>
          Corrective action
        </p>
        <h2 className={`${styles.title} ${styles.titleDark} ${styles.titleXL}`}>
          <Words text="CAPA NCR" />{" "}
          <Words text="Management." className="italic text-[#6d28d9]" />
        </h2>

        <div className="mt-12 md:mt-16" onMouseLeave={() => hover(null)}>
          <div
            className={`grid ${COLUMNS} gap-3 pb-4 font-mono text-[10px] tracking-[0.3em] text-[#180061]/50 uppercase md:gap-4`}
          >
            <span>Step</span>
            <span>Action</span>
            <span className="hidden md:block">What happens</span>
            <span className="hidden lg:block">Status</span>
          </div>

          {STEPS.map((step, i) => (
            <div key={step.code}>
              <div data-line className="h-px w-full bg-[#180061]/20" />
              <div
                className={`grid ${COLUMNS} items-start gap-3 py-5 transition-colors duration-500 md:items-center md:gap-4 md:py-8 ${
                  active === i ? "bg-[#6d28d9]/10" : ""
                }`}
                onMouseEnter={() => hover(i)}
                data-cursor
              >
                <span className="pt-1 font-mono text-sm text-[#6d28d9] md:pt-0">{step.code}</span>
                <span className="min-w-0">
                  <span
                    className={`block font-display text-[clamp(1.45rem,3.4vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.03em] text-[#180061] transition-transform duration-500 ease-out ${
                      active === i ? "lg:translate-x-4" : ""
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#180061]/70 md:hidden">
                    {step.body}
                  </span>
                </span>
                <span className="hidden text-sm leading-relaxed text-[#180061]/70 md:block">
                  {step.body}
                </span>
                <span className="hidden items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-[#180061]/70 uppercase lg:flex">
                  <span className="h-2 w-2 rounded-full bg-[#6d28d9] shadow-[0_0_10px_2px_rgba(109,40,217,0.7)]" />
                  Guided
                </span>
              </div>
            </div>
          ))}
          <div data-line className="h-px w-full bg-[#180061]/20" />
        </div>

        <div data-wipe className={`mt-10 lg:hidden ${styles.shot}`}>
          <Image
            src="/assetss/qmspad-capa-plan-1.avif"
            alt="CAPA plan, with who must do what by when to complete the corrective and preventive actions."
            width={1116}
            height={884}
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none fixed top-1/2 right-10 z-20 hidden w-[420px] -translate-y-1/2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          active === null
            ? "translate-x-[140%] rotate-[8deg] opacity-0"
            : "translate-x-0 rotate-0 opacity-100"
        }`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow-[0_40px_80px_-30px_rgba(24,0,97,0.55)]">
          {STEPS.map((step, i) => (
            <Image
              key={step.code}
              src={step.photo}
              alt=""
              fill
              sizes="420px"
              className={`object-contain transition-opacity duration-500 ${
                last === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
