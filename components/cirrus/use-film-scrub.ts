"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";
import { armIosVideoUnlock } from "@/components/cirrus/ios-video-unlock";

gsap.registerPlugin(ScrollTrigger);

type FilmScrubOptions = {
  startOffset?: number;
  start?: string;
  end?: string;
  onProgress?: (progress: number) => void;
};

export function useFilmScrub(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  { startOffset = 0, start = "top top", end = "bottom bottom", onProgress }: FilmScrubOptions = {},
) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onProgress?.(1);
      return;
    }

    const disarmIos = armIosVideoUnlock(video);

    let active = false;
    let target = startOffset;
    let shown = startOffset;

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (entry.isIntersecting && video.preload !== "auto") {
          video.preload = "auto";
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(section);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start,
      end,
      onUpdate: (self) => {
        onProgress?.(self.progress);
        const duration = video.duration || 0;
        if (duration <= 0) return;
        const last = Math.max(startOffset, duration - 0.04);
        target = startOffset + self.progress * (last - startOffset);
      },
    });
    onProgress?.(trigger.progress);

    const tick = () => {
      if (!active || video.readyState < 2) return;
      const delta = target - shown;
      if (Math.abs(delta) < 0.004) return;
      shown += delta * 0.14;
      video.currentTime = shown;
    };
    gsap.ticker.add(tick);

    return () => {
      disarmIos();
      io.disconnect();
      trigger.kill();
      gsap.ticker.remove(tick);
    };
    // onProgress is expected to be stable (refs only)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, videoRef, startOffset, start, end]);
}
