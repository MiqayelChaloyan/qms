"use client";

import Image from "next/image";
import { useState } from "react";
import { Words } from "@/components/cirrus/reveal";
import { CIRRUS_POSTERS, LAB_PHOTOS } from "@/lib/cirrus/media";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

const CATEGORY_PHOTOS: Record<string, string> = {
  "quality-compliance": LAB_PHOTOS.plate,
  workforce: LAB_PHOTOS.scientist,
  operations: LAB_PHOTOS.vials,
  security: CIRRUS_POSTERS.window,
};

const AREAS = PRODUCT_CATEGORIES.map((category, i) => ({
  ...category,
  code: `QMS-${String(i + 1).padStart(2, "0")}`,
  photo: CATEGORY_PHOTOS[category.id] ?? CIRRUS_POSTERS.hero,
}));

const COLUMNS = "grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_1fr_16rem_10rem]";

export function DeparturesSection() {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);

  const hover = (i: number | null) => {
    setActive(i);
    if (i !== null) setLast(i);
  };

  return (
    <section id="modules" className="bg-[#f5f5fa] px-6 py-28 md:px-12 lg:py-40">
      <div className="mx-auto max-w-[90rem]">
        <p data-rise className="font-mono text-[11px] tracking-[0.25em] text-[#6d28d9] uppercase">
          04 — Modules
        </p>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[#180061]">
          <Words text="Seventeen modules," />{" "}
          <Words text="one lab." className="italic text-[#6d28d9]" />
        </h2>

        <div className="mt-16" onMouseLeave={() => hover(null)}>
          <div
            className={`grid ${COLUMNS} gap-4 pb-4 font-mono text-[10px] tracking-[0.3em] text-[#180061]/50 uppercase`}
          >
            <span>Code</span>
            <span>Area</span>
            <span className="hidden md:block">Includes</span>
            <span className="hidden md:block">Status</span>
          </div>

          {AREAS.map((area, i) => (
            <div key={area.id}>
              <div data-line className="h-px w-full bg-[#180061]/20" />
              <div
                className={`grid ${COLUMNS} items-center gap-4 py-6 transition-colors duration-500 md:py-8 ${
                  active === i ? "bg-[#6d28d9]/10" : ""
                }`}
                onMouseEnter={() => hover(i)}
                data-cursor
              >
                <span className="font-mono text-sm text-[#6d28d9]">{area.code}</span>
                <div
                  className={`transition-transform duration-500 ease-out ${
                    active === i ? "translate-x-4" : ""
                  }`}
                >
                  <span className="block font-display text-[clamp(1.9rem,4.4vw,4rem)] leading-none font-medium tracking-[-0.03em] text-[#180061]">
                    {area.title}
                  </span>
                  <span className="mt-2 block font-mono text-[11px] tracking-[0.2em] text-[#180061]/60 uppercase">
                    {area.modules.length} {area.modules.length === 1 ? "module" : "modules"}
                  </span>
                </div>
                <span className="hidden text-sm leading-relaxed text-[#180061]/70 md:block">
                  {area.modules.map((m) => m.menuLabel ?? m.title).join(" · ")}
                </span>
                <span className="hidden items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-[#180061]/70 uppercase md:flex">
                  <span className="h-2 w-2 rounded-full bg-[#6d28d9] shadow-[0_0_10px_2px_rgba(109,40,217,0.7)]" />
                  Validated
                </span>
              </div>
            </div>
          ))}
          <div data-line className="h-px w-full bg-[#180061]/20" />
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none fixed top-1/2 right-10 z-20 hidden w-[260px] -translate-y-1/2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
          active === null
            ? "translate-x-[140%] rotate-[8deg] opacity-0"
            : "translate-x-0 rotate-0 opacity-100"
        }`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgba(24,0,97,0.55)]">
          {AREAS.map((area, i) => (
            <Image
              key={area.id}
              src={area.photo}
              alt=""
              fill
              sizes="260px"
              className={`object-cover transition-opacity duration-500 ${
                last === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
