"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const SLIDES = [
  {
    src: "/media/qmspad-04-settings-1024x399.png",
    title: "Quality settings",
    body: "System, CAPA, audit, inspection, training and record categories.",
    alt: "Quality Settings, with system, CAPA, audit, inspection, training and record categories.",
  },
  {
    src: "/assetss/qmspad-setttt11-2-1024x399.avif",
    title: "Settings hub",
    body: "Laboratory director, monitoring, access, quality and company, from one menu.",
    alt: "Settings menu for laboratory director, monitoring, access, quality and company.",
  },
  {
    src: "/assetss/qmspad-sett5-2-1024x399.avif",
    title: "Company settings",
    body: "Departments, company info, employees, branding and roles.",
    alt: "Company Settings for departments, company info, employees, branding and roles.",
  },
];

const INTERVAL = 4200;

export function SettingsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  return (
    <section id="settings" className={`${styles.section} ${styles.ink}`}>
      <div className={`${styles.container} grid items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16`}>
        <div>
          <p data-rise className={styles.eyebrow}>
            Set up once
          </p>
          <h2 className={`${styles.title} ${styles.titleXL}`}>
            <Words text="Quality" />
            <span className="block italic text-[#c4b5fd]">
              <Words text="Settings." />
            </span>
          </h2>

          <div
            className="mt-10 border-t border-white/15"
            role="tablist"
            aria-label="Settings screens"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {SLIDES.map((slide, slideIndex) => {
              const selected = slideIndex === index;
              return (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setIndex(slideIndex)}
                  className="group relative block w-full border-b border-white/15 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`font-mono text-[11px] transition-colors ${selected ? "text-[#c4b5fd]" : "text-white/35"}`}>
                      {String(slideIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-xl font-medium transition-[color,transform] duration-500 ${
                        selected ? "translate-x-1 text-white" : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      {slide.title}
                    </span>
                  </span>
                  <span
                    className={`grid pl-9 transition-[grid-template-rows,opacity] duration-500 ${
                      selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-sm leading-relaxed text-white/65">{slide.body}</span>
                    </span>
                  </span>
                  <span aria-hidden className="absolute bottom-[-1px] left-0 h-px w-full overflow-hidden">
                    {selected ? (
                      <span
                        key={`${index}-${paused}`}
                        className="block h-full origin-left bg-[#c4b5fd] motion-safe:animate-[settings-progress_linear_forwards]"
                        style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div data-wipe className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[#6600ff]/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <div className="flex items-center gap-1.5 border-b border-[#180061]/10 bg-[#f5f5fa] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#180061]/15" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.2em] text-[#180061]/45 uppercase">
                {SLIDES[index].title}
              </span>
            </div>
            <div className="relative aspect-[1024/399]">
              {SLIDES.map((slide, slideIndex) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    slideIndex === index ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                  }`}
                  sizes="(min-width: 1024px) 52rem, 100vw"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
