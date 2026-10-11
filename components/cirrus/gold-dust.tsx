"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const SPECK_COUNT = 140;

type Speck = {
  x: number;
  y: number;
  r: number;
  rise: number;
  phase: number;
  twinkle: number;
};

export function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const specks: Speck[] = Array.from({ length: SPECK_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.6,
      rise: 0.08 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 1.8,
    }));

    let lastScroll = window.scrollY;
    let velocity = 0;

    const draw = (time: number) => {
      const scrollY = window.scrollY;
      velocity += (scrollY - lastScroll - velocity) * 0.12;
      lastScroll = scrollY;

      ctx.clearRect(0, 0, width, height);
      for (const s of specks) {
        s.y -= s.rise + velocity * 0.35 * (s.r / 2);
        s.x += Math.sin(time * 0.4 + s.phase) * 0.12;
        if (s.y < -4) {
          s.y = height + 4;
          s.x = Math.random() * width;
        } else if (s.y > height + 4) {
          s.y = -4;
          s.x = Math.random() * width;
        }
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(time * s.twinkle + s.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(109, 40, 217, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    gsap.ticker.add(draw);
    window.addEventListener("resize", resize);
    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 mix-blend-multiply"
    />
  );
}
