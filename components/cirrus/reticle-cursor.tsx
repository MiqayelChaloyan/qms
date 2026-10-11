"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useSyncExternalStore } from "react";

const HOT_TARGETS = "a, button, video, [data-cursor]";
const CURSOR_QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(CURSOR_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function ReticleCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(CURSOR_QUERY).matches,
    () => false,
  );

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    if (!enabled || !root || !ring) return;

    document.documentElement.classList.add("cirrus-cursor-on");

    const moveX = gsap.quickTo(root, "x", { duration: 0.35, ease: "power3.out" });
    const moveY = gsap.quickTo(root, "y", { duration: 0.35, ease: "power3.out" });
    const spin = gsap.to(ring, {
      rotation: 360,
      duration: 9,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    const onMove = (e: PointerEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const hot = (e.target as Element | null)?.closest(HOT_TARGETS);
      gsap.to(ring, { scale: hot ? 2.2 : 1, duration: 0.45, ease: "expo.out" });
      gsap.to(spin, { timeScale: hot ? 4 : 1, duration: 0.6 });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);

    return () => {
      document.documentElement.classList.remove("cirrus-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      spin.kill();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
    >
      <svg
        ref={ringRef}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="-translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        <circle cx="20" cy="20" r="13" stroke="#fff" strokeWidth="1" />
        <path
          d="M20 2v6M20 32v6M2 20h6M32 20h6"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="2" fill="#6d28d9" />
      </svg>
    </div>
  );
}
