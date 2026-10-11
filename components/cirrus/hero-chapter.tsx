"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LAB_SCENE } from "@/lib/cirrus/media";

gsap.registerPlugin(ScrollTrigger);

const ZOOM_END = 0.16;

/** Door leaf rectangle inside the 16:9 hall photo, in % of the stage. */
const DOOR = { left: 43.021, top: 38.889, width: 8.776, height: 36.574 };
/** Technician cut-out, same stage coordinates; the hall underneath has her silhouette painted out. */
const TECH = { left: 53.958, top: 46.713, width: 6.693, height: 42.315 };
const DOOR_CX = (DOOR.left + DOOR.width / 2) / 100;
const DOOR_CY = (DOOR.top + DOOR.height / 2) / 100;
const DOOR_CENTER = `${DOOR_CX * 100}% ${DOOR_CY * 100}%`;

/** Camera eye level in the hall (fraction of stage height); the back room's vanishing point is pinned here. */
const EYE_Y = 0.494;
/** Default point of the back-room photo framed in the doorway (fraction of the 16:9 image): right of its vanishing point, on the scientists. */
const ROOM_VP = { x: 0.64, y: 0.46 };
/** Once through the door the room stays shifted so its right side, where the team works, holds the frame. */
const ROOM_END_SHIFT = -0.9;
const ROOM_ASPECT = 16 / 9;
const ROOM_OVERSCAN = 0.1;
/** Back-room frame height relative to the doorway when first seen, so its depth reads true to the hall. */
const ROOM_TO_DOORWAY = 1.25;
const PROGRESS_LERP = 0.28;

const APPROACH_SCALE = 2.3;
const THROUGH_SCALE = 10;
/** Zoom into the ceiling lights after entering the room, before the page hands over. */
const TILT_SCALE = 1.6;
const DOOR_ANGLE = 84;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function displayFontFamily() {
  const family = getComputedStyle(document.body)
    .getPropertyValue("--font-cirrus-display")
    .trim();
  return family || "sans-serif";
}

type Zoom = { wordmark: string; before: string; letter: string; at: number };

/** White plate with the wordmark cut out; returns the data URL and a solid letter stroke as a % anchor for the zoom. */
function buildMask(width: number, height: number, { wordmark, before, letter, at }: Zoom) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const family = displayFontFamily();
  ctx.font = `700 100px ${family}`;
  const measured = ctx.measureText(wordmark).width;
  const fontSize = Math.min((width * 0.92 * 100) / measured, height * 0.62);
  ctx.font = `700 ${fontSize}px ${family}`;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "destination-out";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(wordmark, width / 2, height / 2);

  const wordWidth = ctx.measureText(wordmark).width;
  const left = width / 2 - wordWidth / 2;
  const stemX =
    left + ctx.measureText(before).width + ctx.measureText(letter).width * at;

  return {
    url: canvas.toDataURL("image/png"),
    anchor: `${(stemX / width) * 100}% 50%`,
  };
}

type HeroChapterProps = {
  id?: string;
  zoom?: Zoom;
  roomSrc?: string;
  roomFocus?: { x: number; y: number };
  title?: string;
  accent?: string;
  body?: string;
  cta?: { href: string; label: string };
  labels?: [string, string];
  description?: string;
};

const DEFAULT_ZOOM: Zoom = { wordmark: "QMSPAD", before: "QMS", letter: "P", at: 0.2 };

export function HeroChapter({
  id = "hero",
  zoom: zoomConfig = DEFAULT_ZOOM,
  roomSrc = LAB_SCENE.room,
  roomFocus = ROOM_VP,
  title = "The lab,",
  accent = "audit-ready.",
  body = "Documents, training, equipment, temperatures and audits — every quality record in your laboratory, controlled in one system.",
  cta = { href: "#idea", label: "See the system" },
  labels = ["QMS Pad · Laboratory quality system", "ISO 15189 · ISO 17025 ready"],
  description = "Scrolling walks down a laboratory aisle past a technician at her instrument; the door at the end swings open onto a second lab where two scientists work at microscopes, and the view rises into the ceiling lights.",
}: HeroChapterProps = {}) {
  const { wordmark, before, letter, at } = zoomConfig;
  const focusXRatio = roomFocus.x;
  const focusYRatio = roomFocus.y;
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const doorShadeRef = useRef<HTMLDivElement>(null);
  const jambRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const roomGlowRef = useRef<HTMLDivElement>(null);
  const roomTiltRef = useRef<HTMLDivElement>(null);
  const ceilingRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;

    const apply = () => {
      const mask = buildMask(window.innerWidth, window.innerHeight, { wordmark, before, letter, at });
      if (!mask) return;
      const s = plate.style;
      s.webkitMaskImage = `url(${mask.url})`;
      s.maskImage = `url(${mask.url})`;
      s.webkitMaskPosition = mask.anchor;
      s.maskPosition = mask.anchor;
    };

    apply();
    void document.fonts.ready.then(apply);
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [wordmark, before, letter, at]);

  useEffect(() => {
    const section = sectionRef.current;
    const plate = plateRef.current;
    const stage = stageRef.current;
    const door = doorRef.current;
    const doorShade = doorShadeRef.current;
    const jamb = jambRef.current;
    const room = roomRef.current;
    const roomGlow = roomGlowRef.current;
    const roomTilt = roomTiltRef.current;
    const ceiling = ceilingRef.current;
    const headline = headlineRef.current;
    const veil = veilRef.current;
    if (
      !section ||
      !plate ||
      !stage ||
      !door ||
      !doorShade ||
      !jamb ||
      !room ||
      !roomGlow ||
      !roomTilt ||
      !ceiling ||
      !headline ||
      !veil
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      plate.style.opacity = "0";
      headline.style.opacity = "1";
      headline.style.pointerEvents = "auto";
      veil.style.opacity = "1";
      if (hintRef.current) hintRef.current.style.opacity = "0";
      return;
    }

    const render = (p: number) => {
      const zoom = clamp01(p / ZOOM_END);
      const size = `${(1 + 9 * zoom * zoom) * 100}%`;
      plate.style.webkitMaskSize = size;
      plate.style.maskSize = size;
      const dissolve = clamp01((zoom - 0.75) / 0.25);
      plate.style.opacity = String(1 - dissolve);
      plate.style.visibility = dissolve >= 1 ? "hidden" : "visible";

      const approach = smooth(clamp01((p - 0.04) / 0.42));
      const open = smooth(clamp01((p - 0.43) / 0.13));
      const through = clamp01((p - 0.54) / 0.22);
      const tilt = smooth(clamp01((p - 0.78) / 0.2));
      const throughEased = through * through;

      const scale =
        (1 + (APPROACH_SCALE - 1) * approach) *
        (1 + (THROUGH_SCALE / APPROACH_SCALE - 1) * throughEased);
      stage.style.transform = `scale(${scale})`;
      const stageAlpha = 1 - clamp01((through - 0.55) / 0.35);
      stage.style.opacity = String(stageAlpha);
      stage.style.visibility = stageAlpha <= 0 ? "hidden" : "visible";

      door.style.transform = `perspective(900px) rotateY(${open * DOOR_ANGLE}deg)`;
      doorShade.style.opacity = String(open * 0.45);
      jamb.style.opacity = String(open * (1 - through));

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const roomW = Math.max(vw, vh * ROOM_ASPECT) * (1 + 2 * ROOM_OVERSCAN);
      const roomH = roomW / ROOM_ASPECT;
      const focusX = vw / 2 + (focusXRatio - 0.5) * roomW;
      const focusY = vh / 2 + (focusYRatio - 0.5) * roomH;
      const stageW = Math.max(vw, (vh * 16) / 9);
      const stageH = stageW * (9 / 16);
      const doorX = vw / 2 + (DOOR_CX - 0.5) * stageW;
      const eyeY = vh / 2 + (EYE_Y - 0.5) * stageH;
      const startScale = Math.min(
        1,
        (ROOM_TO_DOORWAY * (DOOR.height / 100) * stageH * APPROACH_SCALE) /
          roomH,
      );
      const settle = 1 - smooth(through);
      const reveal = smooth(clamp01((p - 0.45) / 0.31));
      room.style.transformOrigin = `${focusX + vw * ROOM_OVERSCAN}px ${focusY + vh * ROOM_OVERSCAN}px`;
      room.style.transform = `translate(${(doorX - focusX) * settle + ROOM_END_SHIFT * ROOM_OVERSCAN * vw * (1 - settle)}px, ${(eyeY - focusY) * settle}px) scale(${startScale + (1 - startScale) * (1 - settle)})`;
      roomGlow.style.opacity = String(0.45 * (1 - reveal));
      roomTilt.style.transform = `scale(${1 + (TILT_SCALE - 1) * tilt})`;
      ceiling.style.opacity = String(smooth(clamp01((p - 0.88) / 0.1)));

      const enter = clamp01((p - 0.18) / 0.06);
      const exit = clamp01((p - 0.36) / 0.06);
      const shown = enter * (1 - exit);
      headline.style.opacity = String(shown);
      headline.style.transform = `translateY(${(1 - enter) * 60 - exit * 90}px)`;
      headline.style.pointerEvents = shown > 0.5 ? "auto" : "none";
      veil.style.opacity = String(shown);

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
        shown =
          Math.abs(delta) < 0.001 ? target : shown + delta * PROGRESS_LERP;
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
  }, [focusXRatio, focusYRatio]);

  return (
    <section id={id} ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#f5f5fa]">
        <div className="absolute inset-0">
          <div
            ref={roomTiltRef}
            className="absolute inset-0 origin-top will-change-transform"
          >
            <div
              ref={roomRef}
              className="absolute -inset-[10%] will-change-transform"
            >
              <Image
                src={roomSrc}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
              <div
                ref={roomGlowRef}
                className="absolute inset-0 bg-white opacity-0"
              />
            </div>
          </div>

          <div
            ref={stageRef}
            className="absolute top-1/2 left-1/2 aspect-video w-[max(100vw,177.78dvh)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ transformOrigin: DOOR_CENTER }}
          >
            <div
              ref={jambRef}
              aria-hidden
              className="absolute opacity-0 shadow-[inset_0_0_24px_6px_rgba(10,6,30,0.55)]"
              style={{
                left: `${DOOR.left}%`,
                top: `${DOOR.top}%`,
                width: `${DOOR.width}%`,
                height: `${DOOR.height}%`,
              }}
            />
            <Image
              src={LAB_SCENE.hall}
              alt=""
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div
              ref={doorRef}
              aria-hidden
              className="absolute origin-left"
              style={{
                left: `${DOOR.left}%`,
                top: `${DOOR.top}%`,
                width: `${DOOR.width}%`,
                height: `${DOOR.height}%`,
              }}
            >
              <Image
                src={LAB_SCENE.door}
                alt=""
                fill
                priority
                unoptimized
                className="object-fill"
              />
              <div
                ref={doorShadeRef}
                className="absolute inset-0 bg-[#0a061e] opacity-0"
              />
            </div>
            <div
              aria-hidden
              className="lab-tech-sway absolute"
              style={{
                left: `${TECH.left}%`,
                top: `${TECH.top}%`,
                width: `${TECH.width}%`,
                height: `${TECH.height}%`,
              }}
            >
              <div className="lab-tech-breathe absolute inset-0">
                <Image
                  src={LAB_SCENE.tech}
                  alt=""
                  fill
                  priority
                  unoptimized
                  className="object-fill"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ceilingRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#f5f5fa] opacity-0"
        />

        <div
          ref={veilRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f5f5fa]/85 via-[#f5f5fa]/40 to-transparent opacity-0"
        />

        <div
          ref={plateRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#6600ff] [mask-repeat:no-repeat] [mask-size:100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase md:px-12">
          <span>{labels[0]}</span>
          <span className="hidden sm:inline">{labels[1]}</span>
        </div>

        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-white/70 uppercase transition-opacity duration-700"
        >
          <span>Scroll</span>
          <span className="cirrus-hint-line h-10 w-px bg-white/50" />
        </div>

        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6 opacity-0 md:px-12"
        >
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.03em] text-[#180061]">
            {title}
            <span className="block italic text-[#6d28d9]">{accent}</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-[#180061]/75">{body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex w-fit rounded-full bg-[#180061] px-7 py-3 text-sm text-[#f5f5fa] transition-colors hover:bg-[#6d28d9]"
          >
            {cta.label}
          </Link>
        </div>

        <p className="sr-only">{description}</p>
      </div>
    </section>
  );
}
