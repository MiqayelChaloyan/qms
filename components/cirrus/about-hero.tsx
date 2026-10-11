"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LAB_SCENE } from "@/lib/cirrus/media";

gsap.registerPlugin(ScrollTrigger);

/** Fridge doorway as seen from inside, in % of the viewport. */
const OPENING = { left: 19, right: 81, top: 13, bottom: 87 };
const SHELVES = [24, 46, 68, 90];
const DOOR_ANGLE = -108;
const EXIT_SCALE = 5.5;
const PROGRESS_LERP = 0.24;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

/** Point on a side wall: depth 0 is the viewer's plane, 1 is the doorway. */
function sideY(y: number, depth: number) {
  const span = OPENING.bottom - OPENING.top;
  return y + (OPENING.top + (y / 100) * span - y) * depth;
}

/** Wire rack. The top wire stays on the line the bottles stand on. */
function Shelf({ side, y }: { side: "left" | "right"; y: number }) {
  const outerX = side === "left" ? 0 : 100;
  const innerX = side === "left" ? OPENING.left : OPENING.right;
  const backY = sideY(y, 1);
  const frontDrop = 2.5;
  const backDrop = 0.85;
  const wires = [0, 0.34, 0.68, 1];
  const xAt = (depth: number) => (side === "left" ? innerX * depth : 100 - (100 - innerX) * depth);

  return (
    <g>
      {wires.map((t) => (
        <line
          key={t}
          x1={outerX}
          y1={y + frontDrop * t}
          x2={innerX}
          y2={backY + backDrop * t}
          stroke={t === 0 ? "#f8fafc" : "#c5cedb"}
          strokeWidth={t === 0 ? 0.42 : 0.28}
          strokeLinecap="round"
        />
      ))}
      {[0.1, 0.24, 0.38, 0.52, 0.66, 0.8, 0.92].map((depth) => {
        const x = xAt(depth);
        const top = sideY(y, depth);
        const drop = frontDrop + (backDrop - frontDrop) * depth;
        return <line key={depth} x1={x} y1={top} x2={x} y2={top + drop} stroke="#e2e8f0" strokeWidth="0.2" />;
      })}
    </g>
  );
}

function FridgeWalls() {
  const { left: l, right: r, top: t, bottom: b } = OPENING;
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="fridge-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7cbd8" />
          <stop offset="1" stopColor="#eceef5" />
        </linearGradient>
        <linearGradient id="fridge-bottom" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8e95a8" />
          <stop offset="1" stopColor="#c9cdd9" />
        </linearGradient>
        <linearGradient id="fridge-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a7adbe" />
          <stop offset="1" stopColor="#dfe2eb" />
        </linearGradient>
        <linearGradient id="fridge-right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#a1a7b9" />
          <stop offset="1" stopColor="#d9dce6" />
        </linearGradient>
      </defs>
      <polygon points={`0,0 100,0 ${r},${t} ${l},${t}`} fill="url(#fridge-top)" />
      <polygon points={`0,100 100,100 ${r},${b} ${l},${b}`} fill="url(#fridge-bottom)" />
      <polygon points={`0,0 ${l},${t} ${l},${b} 0,100`} fill="url(#fridge-left)" />
      <polygon points={`100,0 ${r},${t} ${r},${b} 100,100`} fill="url(#fridge-right)" />

      <line x1={l + 2} x2={r - 2} y1={t - 1.6} y2={t - 1.6} stroke="#a78bfa" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <line x1={l + 2} x2={r - 2} y1={t - 1.6} y2={t - 1.6} stroke="#ede9fe" strokeWidth="1" vectorEffect="non-scaling-stroke" />

      {SHELVES.map((y) => (
        <g key={y}>
          <Shelf side="left" y={y} />
          <Shelf side="right" y={y} />
        </g>
      ))}

    </svg>
  );
}

const CAP = "#5b4ce0";

type VialSpec = {
  side: "left" | "right";
  shelf: number;
  depth: number;
  tall: number;
  fill: number;
  stripe: string;
};

/** Clear media bottles with purple caps, packed along each wire shelf. */
const VIALS: VialSpec[] = [
  { side: "left", shelf: 0, depth: 0.14, tall: 1.05, fill: 0.82, stripe: "#16a34a" },
  { side: "left", shelf: 0, depth: 0.4, tall: 0.78, fill: 0.7, stripe: "#2563eb" },
  { side: "left", shelf: 0, depth: 0.66, tall: 0.92, fill: 0.88, stripe: "#0f766e" },
  { side: "left", shelf: 1, depth: 0.1, tall: 0.84, fill: 0.76, stripe: "#2563eb" },
  { side: "left", shelf: 1, depth: 0.34, tall: 1.08, fill: 0.9, stripe: "#16a34a" },
  { side: "left", shelf: 1, depth: 0.58, tall: 0.72, fill: 0.66, stripe: "#0f766e" },
  { side: "left", shelf: 2, depth: 0.16, tall: 1, fill: 0.8, stripe: "#16a34a" },
  { side: "left", shelf: 2, depth: 0.42, tall: 0.8, fill: 0.74, stripe: "#2563eb" },
  { side: "left", shelf: 2, depth: 0.68, tall: 0.94, fill: 0.86, stripe: "#0f766e" },
  { side: "right", shelf: 0, depth: 0.16, tall: 0.96, fill: 0.84, stripe: "#2563eb" },
  { side: "right", shelf: 0, depth: 0.42, tall: 0.76, fill: 0.7, stripe: "#16a34a" },
  { side: "right", shelf: 0, depth: 0.68, tall: 1.02, fill: 0.9, stripe: "#0f766e" },
  { side: "right", shelf: 1, depth: 0.12, tall: 0.82, fill: 0.72, stripe: "#16a34a" },
  { side: "right", shelf: 1, depth: 0.36, tall: 1.06, fill: 0.88, stripe: "#2563eb" },
  { side: "right", shelf: 1, depth: 0.6, tall: 0.74, fill: 0.64, stripe: "#0f766e" },
  { side: "right", shelf: 2, depth: 0.18, tall: 1.02, fill: 0.8, stripe: "#2563eb" },
  { side: "right", shelf: 2, depth: 0.44, tall: 0.78, fill: 0.76, stripe: "#16a34a" },
  { side: "right", shelf: 2, depth: 0.7, tall: 0.9, fill: 0.85, stripe: "#0f766e" },
];

function FridgeVials() {
  const ordered = VIALS.map((vial, index) => ({ vial, index })).sort((a, b) => b.vial.depth - a.vial.depth);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {ordered.map(({ vial, index }) => {
        const span = vial.side === "left" ? OPENING.left : 100 - OPENING.right;
        const x = vial.side === "left" ? span * vial.depth : 100 - span * vial.depth;
        const y = sideY(SHELVES[vial.shelf], vial.depth);
        const scale = (1.32 - vial.depth * 0.38) * vial.tall;
        const width = 92 * scale;
        const height = 118 * scale;
        const glass = `bottle-glass-${index}`;
        const body = `bottle-body-${index}`;
        const surface = 96 - vial.fill * 48;
        const shape = "M36 30h18c1 8 8 14 16 18c6 4 8 8 8 14v40c0 10-8 16-18 16H30c-10 0-18-6-18-16V62c0-6 2-10 8-14c8-4 15-10 16-18z";
        return (
          <svg
            key={`${vial.side}-${index}`}
            viewBox="0 0 90 130"
            width={width}
            height={height}
            className="absolute overflow-visible"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)" }}
          >
            <defs>
              <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e8eef8" stopOpacity="0.35" />
                <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="0.42" stopColor="#d5e2f2" stopOpacity="0.18" />
                <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.62" />
                <stop offset="1" stopColor="#94a3b8" stopOpacity="0.28" />
              </linearGradient>
              <clipPath id={body}>
                <path d={shape} />
              </clipPath>
            </defs>
            <ellipse cx="45" cy="126" rx="22" ry="3" fill="#180061" opacity="0.1" />
            <path d={shape} fill={`url(#${glass})`} stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.1" />
            <g clipPath={`url(#${body})`}>
              <rect x="12" y={surface} width="66" height={130 - surface} fill="#e7f0fb" opacity="0.55" />
              <ellipse cx="45" cy={surface + 1} rx="24" ry="3.2" fill="#ffffff" opacity="0.55" />
              <rect x="24" y="62" width="42" height="36" rx="1.5" fill="#ffffff" opacity="0.92" />
              <rect x="24" y="62" width="42" height="5" fill={vial.stripe} />
              <rect x="28" y="72" width="22" height="1.6" rx="0.8" fill="#94a3b8" />
              <rect x="28" y="77" width="30" height="1.6" rx="0.8" fill="#cbd5e1" />
              <rect x="28" y="82" width="16" height="1.6" rx="0.8" fill="#cbd5e1" />
            </g>
            <path d="M22 58c3 16 3 36 1 52" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
            <path d="M68 60c-1.5 14-1.5 32 0 46" fill="none" stroke="#64748b" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
            <rect x="30" y="4" width="30" height="20" rx="3.5" fill={CAP} />
            <rect x="30" y="4" width="30" height="4" rx="2" fill="#ffffff" opacity="0.4" />
            {[9, 13, 17].map((rib) => (
              <line key={rib} x1="31" x2="59" y1={rib} y2={rib} stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1" />
            ))}
            <rect x="38" y="22" width="14" height="10" rx="2" fill="#eef2f7" stroke="#ffffff" strokeOpacity="0.7" />
          </svg>
        );
      })}
    </div>
  );
}

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const fridgeRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const glassLabelRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const room = roomRef.current;
    const fridge = fridgeRef.current;
    const door = doorRef.current;
    const frost = frostRef.current;
    const glassLabel = glassLabelRef.current;
    const mist = mistRef.current;
    const veil = veilRef.current;
    const headline = headlineRef.current;
    if (!section || !room || !fridge || !door || !frost || !glassLabel || !mist || !veil || !headline) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fridge.style.visibility = "hidden";
      mist.style.opacity = "0";
      headline.style.opacity = "1";
      headline.style.pointerEvents = "auto";
      veil.style.opacity = "1";
      if (hintRef.current) hintRef.current.style.opacity = "0";
      return;
    }

    const render = (p: number) => {
      const defrost = smooth(clamp01((p - 0.02) / 0.26));
      frost.style.opacity = String(1 - defrost * 0.8);
      glassLabel.style.opacity = String(1 - smooth(clamp01((p - 0.14) / 0.14)));

      const open = smooth(clamp01((p - 0.22) / 0.26));
      door.style.transform = `perspective(1400px) rotateY(${open * DOOR_ANGLE}deg)`;

      const exit = clamp01((p - 0.42) / 0.36);
      const exitEased = exit * exit;
      fridge.style.transform = `scale(${1 + (EXIT_SCALE - 1) * exitEased})`;
      const fridgeAlpha = 1 - clamp01((exit - 0.6) / 0.35);
      fridge.style.opacity = String(fridgeAlpha);
      fridge.style.visibility = fridgeAlpha <= 0 ? "hidden" : "visible";

      const settle = smooth(clamp01((p - 0.3) / 0.5));
      const blur = 7 * (1 - smooth(clamp01((p - 0.24) / 0.36)));
      room.style.transform = `scale(${1.3 - 0.3 * settle})`;
      room.style.filter = blur > 0.05 ? `blur(${blur}px) saturate(${0.75 + 0.25 * settle})` : "none";

      const mistIn = smooth(clamp01((p - 0.26) / 0.16));
      const mistOut = smooth(clamp01((p - 0.5) / 0.22));
      mist.style.opacity = String(mistIn * (1 - mistOut));
      mist.style.transform = `translateY(${-6 * mistIn}vh) scale(${1 + 0.8 * mistIn + 0.6 * mistOut})`;

      const enter = smooth(clamp01((p - 0.74) / 0.12));
      headline.style.opacity = String(enter);
      headline.style.transform = `translateY(${(1 - enter) * 60}px)`;
      headline.style.pointerEvents = enter > 0.5 ? "auto" : "none";
      veil.style.opacity = String(enter);

      if (hintRef.current) hintRef.current.style.opacity = p > 0.01 ? "0" : "1";
    };

    let target = 0;
    let shown = -1;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target = self.progress;
      },
    });
    target = trigger.progress;

    const tick = () => {
      if (shown < 0) {
        shown = target;
      } else {
        const delta = target - shown;
        if (Math.abs(delta) < 0.0002) return;
        shown = Math.abs(delta) < 0.001 ? target : shown + delta * PROGRESS_LERP;
      }
      render(shown);
    };
    gsap.ticker.add(tick);
    const onResize = () => render(shown < 0 ? target : shown);
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const opening = {
    left: `${OPENING.left}%`,
    top: `${OPENING.top}%`,
    width: `${OPENING.right - OPENING.left}%`,
    height: `${OPENING.bottom - OPENING.top}%`,
  };

  return (
    <section id="about-hero" ref={sectionRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#dfe2eb]">
        <div ref={roomRef} className="absolute inset-0 will-change-transform">
          <Image src={LAB_SCENE.coldRoom} alt="" fill priority unoptimized className="object-cover object-[60%_50%]" />
        </div>

        <div
          ref={mistRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom opacity-0"
        >
          <div className="absolute bottom-[4%] left-[18%] h-[34vh] w-[38vw] rounded-full bg-white/70 blur-[60px]" />
          <div className="absolute bottom-[10%] left-[42%] h-[28vh] w-[30vw] rounded-full bg-[#eef2ff]/80 blur-[70px]" />
          <div className="absolute bottom-[2%] right-[14%] h-[30vh] w-[34vw] rounded-full bg-white/60 blur-[60px]" />
          <div className="absolute bottom-[26%] left-[30%] h-[18vh] w-[40vw] rounded-full bg-white/40 blur-[80px]" />
        </div>

        <div ref={fridgeRef} aria-hidden className="absolute inset-0 origin-center will-change-transform">
          <FridgeWalls />
          <FridgeVials />

          <div
            className="absolute rounded-[6px] shadow-[0_0_0_10px_#3a3f4d,0_0_0_12px_#5b6172,inset_0_0_40px_rgba(10,6,30,0.35)]"
            style={opening}
          />

          <div className="absolute origin-right will-change-transform" style={opening} ref={doorRef}>
            <div className="absolute inset-0 overflow-hidden rounded-[4px] border-[7px] border-[#c9ced8] bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]">
              <div
                ref={frostRef}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.28)_0%,_rgba(240,244,255,0.72)_70%,_rgba(255,255,255,0.92)_100%)] backdrop-blur-[14px]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_0.8px,_transparent_1.4px)] bg-[length:9px_11px] opacity-40" />
              </div>
              <div className="absolute inset-y-0 left-[12%] w-[9%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
              <div className="absolute inset-y-0 left-[26%] w-[3%] -skew-x-12 bg-white/25" />

              <div ref={glassLabelRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span className="rounded-full bg-[#180061]/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-[#c4b5fd] uppercase">
                  Inside · 4.0 °C
                </span>
                <p className="mt-5 font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.03em] text-[#180061]">
                  About us
                </p>
                <p className="mt-4 max-w-xs text-sm text-[#180061]/70">
                  Step out of the cold storage and meet the team behind QMS Pad.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-[2px] h-[30%] w-[5px] -translate-y-1/2 rounded-full bg-[#9aa0b3]" />
          </div>
        </div>

        <div
          ref={veilRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f5f5fa]/90 via-[#f5f5fa]/55 to-transparent opacity-0"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.25em] text-[#180061]/60 uppercase md:px-12">
          <span>About QMS Pad</span>
          <span className="hidden sm:inline">Invopad LLC · Carrollton, Texas</span>
        </div>

        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-[#180061]/70 uppercase transition-opacity duration-700"
        >
          <span>Scroll to open</span>
          <span className="cirrus-hint-line h-10 w-px bg-[#180061]/40" />
        </div>

        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6 opacity-0 md:px-12"
        >
          <p className="font-mono text-[11px] tracking-[0.25em] text-[#6d28d9] uppercase">About QMS Pad</p>
          <h1 className="mt-5 font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.9] font-medium tracking-[-0.03em] text-[#180061]">
            Quality, kept
            <span className="block italic text-[#6d28d9]">under control.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-[#180061]/75">
            QMS Pad by Invopad LLC is a quality management system for clinical and testing laboratories — from the
            bench and the cold room to the director&apos;s office.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#about-story"
              className="inline-flex rounded-full bg-[#180061] px-7 py-3 text-sm text-[#f5f5fa] transition-colors hover:bg-[#6d28d9]"
            >
              Our story
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-[#180061]/25 bg-white/60 px-7 py-3 text-sm text-[#180061] backdrop-blur transition-colors hover:border-[#6d28d9] hover:text-[#6d28d9]"
            >
              Contact us
            </Link>
          </div>
        </div>

        <p className="sr-only">
          Scrolling starts inside a laboratory refrigerator looking out through its frosted glass door; the frost clears,
          the door swings open with a breath of cold mist, and the view glides out into a cold-storage room lined with
          refrigerators where a technician checks samples on a tablet.
        </p>
      </div>
    </section>
  );
}
