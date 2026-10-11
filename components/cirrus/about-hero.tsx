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

/** A point on a shelf deck. across 0 is the wall, 1 is the front lip. */
function rackPoint(side: "left" | "right", y: number, depth: number, across: number) {
  const along = side === "left" ? OPENING.left * depth : 100 - (100 - OPENING.right) * depth;
  const jut = (side === "left" ? 6.4 : -6.4) * (1 - depth * 0.68);
  const yWall = sideY(y, depth);
  return { x: along + jut * across, y: yWall + 1.5 * (1 - depth * 0.55) * across };
}

/** Wire rack with a top surface and a front lip, so the shelf reads as a solid. */
function Shelf({ side, y }: { side: "left" | "right"; y: number }) {
  const at = (depth: number, across: number) => rackPoint(side, y, depth, across);
  const corner = (depth: number, across: number) => {
    const point = at(depth, across);
    return `${point.x},${point.y}`;
  };
  const lip = (depth: number) => {
    const point = at(depth, 1);
    return { x: point.x, y: point.y + 1.55 * (1 - depth * 0.6) };
  };
  const lip0 = lip(0);
  const lip1 = lip(1);
  const front0 = at(0, 1);
  const front1 = at(1, 1);

  return (
    <g>
      <polygon points={`${corner(0, 0)} ${corner(1, 0)} ${corner(1, 1)} ${corner(0, 1)}`} fill="#f8fafc" opacity="0.42" />
      <polygon
        points={`${front0.x},${front0.y} ${front1.x},${front1.y} ${lip1.x},${lip1.y} ${lip0.x},${lip0.y}`}
        fill="#c5ceda"
        opacity="0.95"
      />
      {[0, 0.33, 0.66, 1].map((across) => {
        const start = at(0, across);
        const end = at(1, across);
        return (
          <line
            key={across}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={across === 1 ? "#ffffff" : "#e8edf4"}
            strokeWidth={across === 1 ? 0.32 : 0.2}
          />
        );
      })}
      {[0.08, 0.24, 0.4, 0.56, 0.72, 0.88].map((depth) => {
        const back = at(depth, 0);
        const front = at(depth, 1);
        return <line key={depth} x1={back.x} y1={back.y} x2={front.x} y2={front.y} stroke="#d5dce8" strokeWidth="0.18" />;
      })}
      <line x1={lip0.x} y1={lip0.y} x2={lip1.x} y2={lip1.y} stroke="#94a3b8" strokeWidth="0.22" />
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

type BottleKind = "media" | "square" | "amber";

type VialSpec = {
  side: "left" | "right";
  shelf: number;
  depth: number;
  tall: number;
  kind: BottleKind;
  /** Extra lean in degrees, on top of the shelf slope. */
  lean: number;
};

/** Clustered rows: a pair close together, then a gap, each bottle leaning a little. */
const VIALS: VialSpec[] = [
  { side: "left", shelf: 0, depth: 0.08, tall: 1.02, kind: "square", lean: 1.4 },
  { side: "left", shelf: 0, depth: 0.3, tall: 0.74, kind: "media", lean: -2.6 },
  { side: "left", shelf: 0, depth: 0.44, tall: 0.56, kind: "amber", lean: 2.2 },
  { side: "left", shelf: 1, depth: 0.16, tall: 0.92, kind: "media", lean: -1.8 },
  { side: "left", shelf: 1, depth: 0.32, tall: 0.64, kind: "amber", lean: 2.8 },
  { side: "left", shelf: 1, depth: 0.58, tall: 0.8, kind: "media", lean: -1.2 },
  { side: "left", shelf: 2, depth: 0.12, tall: 0.7, kind: "amber", lean: 2.4 },
  { side: "left", shelf: 2, depth: 0.28, tall: 0.96, kind: "media", lean: -2.2 },
  { side: "left", shelf: 2, depth: 0.5, tall: 1, kind: "square", lean: 1.1 },
  { side: "right", shelf: 0, depth: 0.1, tall: 0.9, kind: "media", lean: 2.1 },
  { side: "right", shelf: 0, depth: 0.26, tall: 0.58, kind: "amber", lean: -2.4 },
  { side: "right", shelf: 0, depth: 0.52, tall: 1.02, kind: "square", lean: 1.6 },
  { side: "right", shelf: 1, depth: 0.14, tall: 0.78, kind: "media", lean: -1.5 },
  { side: "right", shelf: 1, depth: 0.3, tall: 0.66, kind: "media", lean: 2.6 },
  { side: "right", shelf: 1, depth: 0.56, tall: 0.54, kind: "amber", lean: -2 },
  { side: "right", shelf: 2, depth: 0.18, tall: 0.6, kind: "amber", lean: 1.8 },
  { side: "right", shelf: 2, depth: 0.34, tall: 0.98, kind: "media", lean: -2.5 },
  { side: "right", shelf: 2, depth: 0.62, tall: 0.72, kind: "media", lean: 1.3 },
];

const MARKS = [400, 300, 200, 100];

function BlueCap({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const ribs = 7;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={2.5} fill="#1d4ed8" />
      <rect x={x} y={y} width={width} height={height * 0.22} rx={1.5} fill="#ffffff" opacity="0.35" />
      {Array.from({ length: ribs }, (_, index) => (
        <line
          key={index}
          x1={x + 3 + (index * (width - 6)) / (ribs - 1)}
          x2={x + 3 + (index * (width - 6)) / (ribs - 1)}
          y1={y + 2}
          y2={y + height - 2}
          stroke="#ffffff"
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
      ))}
    </g>
  );
}

function MediaBottle({ id }: { id: number }) {
  const glass = `media-glass-${id}`;
  const liquid = `media-liquid-${id}`;
  const body = `media-body-${id}`;
  const shape = "M28 32h16v6c10 7 15 13 15 21v60c0 8-6 12-23 12S13 127 13 119V59c0-8 5-14 15-21v-6z";
  return (
    <g>
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#64748b" stopOpacity="0.34" />
          <stop offset="0.1" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="0.26" stopColor="#f8fbff" stopOpacity="0.12" />
          <stop offset="0.62" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="0.84" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#334155" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={liquid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="0.14" stopColor="#e7f0fa" stopOpacity="0.28" />
          <stop offset="1" stopColor="#c5d4e8" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id={body}>
          <path d={shape} />
        </clipPath>
      </defs>
      <ellipse cx="36" cy="136" rx="15" ry="2" fill="#64748b" opacity="0.3" />
      <path d={shape} fill={`url(#${glass})`} stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.7" />
      <g clipPath={`url(#${body})`}>
        <rect x="12" y="64" width="48" height="70" fill={`url(#${liquid})`} />
        <ellipse cx="36" cy="65" rx="14" ry="2.5" fill="#ffffff" opacity="0.8" />
        <path d="M13 116c8 7 38 7 46 0v16H13z" fill="#94a3b8" opacity="0.28" />
      </g>
      <path d="M17 68c1.4 16 1.4 38 0 54" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 70c0.6 14 0.6 32 0 46" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <path d="M53 72c-0.7 14-0.7 34 0 48" fill="none" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
      {MARKS.map((mark, index) => (
        <g key={mark} opacity="0.8">
          <line x1="24" x2={index % 2 === 0 ? 32 : 29} y1={78 + index * 11} y2={78 + index * 11} stroke="#64748b" strokeWidth="0.45" />
          <text x="33" y={80 + index * 11} fill="#64748b" fontSize="4.6" fontFamily="ui-sans-serif, system-ui, sans-serif">
            {mark}
          </text>
        </g>
      ))}
      <text x="40" y="100" fill="#64748b" fontSize="5.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        500 ml
      </text>
      <rect x="44" y="104" width="11" height="7" rx="0.5" fill="#e2e8f0" opacity="0.7" />
      <rect x="31" y="28" width="10" height="6" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.4" />
      <BlueCap x={20} y={4} width={32} height={22} />
    </g>
  );
}

function SquareBottle({ id }: { id: number }) {
  const glass = `square-glass-${id}`;
  const liquid = `square-liquid-${id}`;
  const body = `square-body-${id}`;
  const shape = "M46 34h16v8c14 6 28 12 32 16v62c0 6-4 8-40 8s-40-2-40-8V58c4-4 18-10 32-16v-8z";
  return (
    <g>
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#64748b" stopOpacity="0.4" />
          <stop offset="0.08" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.2" stopColor="#f8fafc" stopOpacity="0.16" />
          <stop offset="0.78" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#334155" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id={liquid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d5e2f2" stopOpacity="0.4" />
        </linearGradient>
        <clipPath id={body}>
          <path d={shape} />
        </clipPath>
      </defs>
      <ellipse cx="54" cy="130" rx="32" ry="2.4" fill="#64748b" opacity="0.28" />
      <path d={shape} fill={`url(#${glass})`} stroke="#ffffff" strokeOpacity="0.75" strokeWidth="0.8" />
      <g clipPath={`url(#${body})`}>
        <rect x="14" y="62" width="80" height="68" fill={`url(#${liquid})`} />
        <ellipse cx="54" cy="63" rx="28" ry="2.8" fill="#ffffff" opacity="0.7" />
        <path d="M14 114c16 8 64 8 80 0v16H14z" fill="#94a3b8" opacity="0.25" />
      </g>
      <path d="M20 66c1.5 18 1.5 36 0 52" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M90 70c-1 16-1 32 0 46" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {MARKS.map((mark, index) => (
        <g key={mark} opacity="0.75">
          <line x1="24" x2="34" y1={74 + index * 10} y2={74 + index * 10} stroke="#64748b" strokeWidth="0.5" />
          <text x="36" y={76.5 + index * 10} fill="#64748b" fontSize="5.2" fontFamily="ui-sans-serif, system-ui, sans-serif">
            {(4 - index) * 1000}
          </text>
        </g>
      ))}
      <text x="58" y="92" fill="#64748b" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
        5000 ml
      </text>
      <rect x="62" y="96" width="16" height="8" rx="0.6" fill="#e2e8f0" opacity="0.75" />
      <rect x="48" y="30" width="12" height="8" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.4" />
      <BlueCap x={39} y={6} width={30} height={22} />
    </g>
  );
}

function AmberBottle({ id }: { id: number }) {
  const glass = `amber-glass-${id}`;
  const shape = "M23 38h16v5c9 6 13 11 13 17v32c0 8-6 12-21 12S10 100 10 92V60c0-6 4-11 13-17v-5z";
  return (
    <g>
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#431407" />
          <stop offset="0.14" stopColor="#fdba74" />
          <stop offset="0.32" stopColor="#c2410c" />
          <stop offset="0.55" stopColor="#9a3412" />
          <stop offset="0.78" stopColor="#fb923c" />
          <stop offset="1" stopColor="#431407" />
        </linearGradient>
        <clipPath id={`amber-body-${id}`}>
          <path d={shape} />
        </clipPath>
      </defs>
      <ellipse cx="31" cy="106" rx="15" ry="2" fill="#7c2d12" opacity="0.35" />
      <path d={shape} fill={`url(#${glass})`} />
      <g clipPath={`url(#amber-body-${id})`}>
        <path d="M10 96c8 6 34 6 42 0v12H10z" fill="#431407" opacity="0.45" />
      </g>
      <path d="M15 62c1.2 10 1.2 24 0 36" fill="none" stroke="#ffedd5" strokeOpacity="0.85" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 66c-0.6 8-0.6 20 0 30" fill="none" stroke="#431407" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 34h14v6c-2 1-12 1-14 0z" fill="#292524" />
      <rect x="26" y="24" width="10" height="14" rx="1" fill="#1c1917" />
      <ellipse cx="31" cy="22" rx="12" ry="4.2" fill="#1c1917" />
      <ellipse cx="31" cy="20.6" rx="12" ry="2.8" fill="#44403c" />
      <ellipse cx="27" cy="19.8" rx="3.5" ry="0.9" fill="#ffffff" opacity="0.35" />
    </g>
  );
}

function FridgeVials() {
  const ordered = VIALS.map((vial, index) => ({ vial, index })).sort((a, b) => b.vial.depth - a.vial.depth);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {ordered.map(({ vial, index }) => {
        const seat = rackPoint(vial.side, SHELVES[vial.shelf], vial.depth, 0.62);
        const x = seat.x;
        const y = seat.y;
        const scale = (1.15 - vial.depth * 0.32) * vial.tall;
        const frame = vial.kind === "square" ? { w: 108, h: 132 } : vial.kind === "amber" ? { w: 62, h: 108 } : { w: 72, h: 138 };
        const slope = vial.side === "left" ? 5.5 : -5.5;
        return (
          <svg
            key={`${vial.side}-${index}`}
            viewBox={`0 0 ${frame.w} ${frame.h}`}
            width={frame.w * scale}
            height={frame.h * scale}
            className="absolute overflow-visible"
            style={{
              left: `${x}%`,
              top: `${y + 0.2}%`,
              transform: `translate(-50%, -100%) rotate(${slope + vial.lean}deg)`,
              transformOrigin: "center bottom",
            }}
          >
            {vial.kind === "amber" ? <AmberBottle id={index} /> : vial.kind === "square" ? <SquareBottle id={index} /> : <MediaBottle id={index} />}
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
