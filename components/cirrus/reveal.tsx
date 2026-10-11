"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** The joining space sits outside each word's mask: a trailing space inside an inline-block is dropped by CSS. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span data-words className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="cirrus-word inline-block">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

function formatCount(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function RevealKit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const once = (trigger: Element) => ({
        trigger,
        start: "top 88%",
        once: true,
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        gsap.from(el.querySelectorAll(".cirrus-word"), {
          yPercent: 115,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: once(el),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: once(el),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: once(el),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: once(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const counter = { value: 0 };
        el.textContent = formatCount(0, decimals);
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: once(el),
          onUpdate: () => {
            el.textContent = formatCount(counter.value, decimals);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
