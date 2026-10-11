"use client";

import Image from "next/image";
import { useRef } from "react";
import { useFilmScrub } from "@/components/cirrus/use-film-scrub";

type ArchScrubProps = {
  videoSrc: string;
  posterSrc: string;
};

export function ArchScrub({ videoSrc, posterSrc }: ArchScrubProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useFilmScrub(frameRef, videoRef, { start: "top bottom", end: "bottom top" });

  return (
    <div
      ref={frameRef}
      data-wipe
      data-cursor
      className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] overflow-hidden rounded-[999px_999px_26px_26px] border border-[#180061]/15 shadow-[0_50px_100px_-40px_rgba(24, 0, 97,0.45)]"
    >
      <Image src={posterSrc} alt="" fill className="object-cover" sizes="480px" />
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <p className="sr-only">
        Film: closing in on a gloved hand pipetting samples into a tube rack.
      </p>
    </div>
  );
}
