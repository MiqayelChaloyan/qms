"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const POINTS = [
  "Access controls over every process",
  "Manage approvals (all electronic, all super easy via email)",
  "Manage user roles and functions with the click of a button (Add, Edit, Delete, Upload, & Download)",
  "Designate notification distributions",
  "Process maps for every module",
  "Variety of views and reports for everything",
];

const NODES = [
  { label: "Integration", icon: "monitor" },
  { label: "Project Management\nTo Do Center", icon: "flow" },
  { label: "Quality Manual modules\nQuality Document Control\nQuality Records Center", icon: "docs" },
  { label: "Customer Service Metrics\nHuman Resource Center", icon: "exchange" },
  { label: "Corrective and Preventive\nAction", icon: "capa" },
  { label: "SOP and WI modules", icon: "org" },
  { label: "Employee Training\nEmployees Performance\nEmployee Records", icon: "person" },
] as const;

function NodeIcon({ name, filled }: { name: (typeof NODES)[number]["icon"]; filled: boolean }) {
  const stroke = filled ? "#ffffff" : "#6600ff";
  const common = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", "aria-hidden": true as const };
  if (name === "monitor") {
    return (
      <svg {...common}>
        <rect x="5" y="6" width="22" height="14" rx="2" stroke={stroke} strokeWidth="2" />
        <path d="M12 26h8M16 20v6" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  if (name === "flow") {
    return (
      <svg {...common}>
        <circle cx="8" cy="10" r="3" stroke={stroke} strokeWidth="2" />
        <circle cx="22" cy="8" r="3" stroke={stroke} strokeWidth="2" />
        <circle cx="20" cy="22" r="3" stroke={stroke} strokeWidth="2" />
        <path d="M11 10h8M20 11l-1 8M10 12l8 8" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  if (name === "docs") {
    return (
      <svg {...common}>
        <path d="M10 6h8l6 6v14H10V6z" stroke={stroke} strokeWidth="2" />
        <path d="M18 6v6h6M13 17h7M13 21h7" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  if (name === "exchange") {
    return (
      <svg {...common}>
        <path d="M8 12h14l-4-4M24 20H10l4 4" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "capa") {
    return (
      <svg {...common}>
        <path d="M10 6h12v20H10z" stroke={stroke} strokeWidth="2" />
        <path d="M13 12h6M13 16h6M13 20h4" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  if (name === "org") {
    return (
      <svg {...common}>
        <rect x="12" y="4" width="8" height="6" rx="1" stroke={stroke} strokeWidth="2" />
        <rect x="4" y="20" width="8" height="6" rx="1" stroke={stroke} strokeWidth="2" />
        <rect x="20" y="20" width="8" height="6" rx="1" stroke={stroke} strokeWidth="2" />
        <path d="M16 10v4M8 20v-4h16v4M16 14H8M16 14h8" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="16" cy="11" r="4" stroke={stroke} strokeWidth="2" />
      <path d="M8 26c1.2-4 4-6 8-6s6.8 2 8 6" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

const STEP = 360 / NODES.length;
const RADIUS = 36;

export function SolutionSection() {
  const [ring, setRing] = useState({ active: 0, rotation: 0 });
  const [paused, setPaused] = useState(false);
  const active = ring.active;

  const select = (index: number) => {
    setRing((current) => {
      let delta = (index - current.active + NODES.length) % NODES.length;
      if (delta > NODES.length / 2) delta -= NODES.length;
      return { active: index, rotation: current.rotation + delta * STEP };
    });
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setRing((current) => ({
        active: (current.active + 1) % NODES.length,
        rotation: current.rotation + STEP,
      }));
    }, 2400);
    return () => window.clearInterval(timer);
  }, [paused]);

  const sweep = ((((ring.rotation % 360) + 360) % 360) / 360) * 100;

  return (
    <section id="solution" className={`${styles.section} ${styles.white}`}>
      <div className={`${styles.container} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <div
          className="relative mx-auto aspect-square w-full max-w-[540px]"
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,_rgba(102,0,255,0.16)_0%,_rgba(102,0,255,0.05)_45%,_transparent_70%)] motion-safe:animate-[solution-breathe_5s_ease-in-out_infinite]"
          />

          <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="solution-arc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6600ff" />
              </linearGradient>
              <filter id="solution-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            <g className="origin-center motion-safe:animate-[spin_60s_linear_infinite]">
              <circle cx="50" cy="50" r="47" fill="none" stroke="#6600ff" strokeOpacity="0.18" strokeWidth="0.3" strokeDasharray="0.6 2.4" />
            </g>
            <g className="origin-center motion-safe:animate-[spin_40s_linear_infinite_reverse]">
              <circle cx="50" cy="50" r="24" fill="none" stroke="#6600ff" strokeOpacity="0.22" strokeWidth="0.3" strokeDasharray="1.5 2" />
            </g>

            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#6600ff" strokeOpacity="0.14" strokeWidth="1.4" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="url(#solution-arc)"
              strokeWidth="1.4"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${Math.max(sweep, 0.01)} 100`}
              transform="rotate(-90 50 50)"
              className="transition-[stroke-dasharray] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            <g
              style={{ transform: `rotate(${ring.rotation}deg)`, transformOrigin: "50px 50px" }}
              className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <line x1="50" y1="50" x2="50" y2={50 - RADIUS + 9} stroke="#6600ff" strokeOpacity="0.35" strokeWidth="0.35" strokeDasharray="1 1.2" />
              <circle cx="50" cy={50 - RADIUS} r="3.4" fill="#6600ff" opacity="0.5" filter="url(#solution-glow)" />
            </g>
            <circle cx="50" cy="50" r="1.1" fill="#6600ff" />
          </svg>

          <div className="absolute inset-[27%] flex items-center justify-center">
            <p
              key={active}
              aria-live="polite"
              className="text-center text-sm leading-relaxed font-medium whitespace-pre-line text-[#180061]/70 motion-safe:animate-[solution-label_0.7s_cubic-bezier(0.16,1,0.3,1)_both] md:text-base"
            >
              {NODES[active].label}
            </p>
          </div>

          {NODES.map((node, index) => {
            const angle = (-90 + index * STEP) * (Math.PI / 180);
            const selected = index === active;
            return (
              <button
                key={node.label}
                type="button"
                aria-label={node.label.replaceAll("\n", ", ")}
                aria-pressed={selected}
                onMouseEnter={() => {
                  setPaused(true);
                  select(index);
                }}
                onFocus={() => {
                  setPaused(true);
                  select(index);
                }}
                onBlur={() => setPaused(false)}
                className="absolute h-[17%] w-[17%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + Math.cos(angle) * RADIUS}%`,
                  top: `${50 + Math.sin(angle) * RADIUS}%`,
                }}
              >
                {selected ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[#6600ff]/30 motion-safe:animate-[solution-ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]"
                  />
                ) : null}
                <span
                  className={`relative flex h-full w-full items-center justify-center rounded-full ring-1 transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    selected
                      ? "scale-110 bg-[#6600ff] shadow-[0_18px_40px_-12px_rgba(102,0,255,0.75)] ring-[#6600ff]"
                      : "bg-white shadow-[0_10px_30px_-14px_rgba(102,0,255,0.45)] ring-[#6600ff]/10 hover:scale-105"
                  }`}
                >
                  <span className={`transition-transform duration-500 ${selected ? "scale-110" : ""}`}>
                    <NodeIcon name={node.icon} filled={selected} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <p data-rise className={styles.eyebrow}>
            Every module, connected
          </p>
          <h2 className={`${styles.title} ${styles.titleMd} max-w-xl`}>
            <Words text="An end-to-end solution" />{" "}
            <Words text="to manage your business and unite your team." className="text-[#180061]" />
          </h2>
          <ul className="mt-8 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#180061]/85">
                <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6600ff]" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group relative mt-12 inline-flex w-full max-w-2xl items-center justify-between gap-6 overflow-hidden rounded-full bg-[#6600ff] py-5 pr-5 pl-9 text-left text-base leading-snug font-medium text-white md:py-6 md:pl-10 md:text-lg shadow-[0_14px_34px_-14px_rgba(102,0,255,0.75)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(102,0,255,0.85)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6600ff] focus-visible:ring-offset-4 active:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#180061] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[left,opacity] duration-1000 ease-out group-hover:left-[110%] group-hover:opacity-100"
            />
            <span className="relative">
              Give us 20 minutes of your time for a one-on-one demonstration of QMS Pad&apos;s capabilities
            </span>
            <span
              aria-hidden
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#6600ff] transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#6600ff] group-hover:text-white md:h-14 md:w-14"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
