"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

function scrollToTop() {
  if (activeLenis) activeLenis.scrollTo(0, { duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Scroll to a section, leaving room for the fixed navigation. */
export function scrollPageTo(target: number | string | HTMLElement, duration = 1.15) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && activeLenis) {
    activeLenis.scrollTo(target, { duration, offset: -112 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: Math.max(0, target - 112) });
    return;
  }
  const element = typeof target === "string" ? document.querySelector(target) : target;
  element?.scrollIntoView();
}

/** Lenis drives ScrollTrigger's clock through the one shared gsap.ticker. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const next = new Lenis({ lerp: 0.09, anchors: true });
    activeLenis = next;
    next.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => next.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      next.destroy();
      if (activeLenis === next) activeLenis = null;
    };
  }, []);

  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 z-[55] flex h-12 w-12 items-center justify-center rounded-full bg-[#180061] text-[#f5f5fa] shadow-[0_16px_40px_-16px_rgba(24,0,97,0.7)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#6d28d9] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 14V4M9 4L4 9M9 4l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
