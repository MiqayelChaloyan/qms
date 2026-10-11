"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useFilmScrub } from "@/components/cirrus/use-film-scrub";

type ScrubChapterProps = {
  id: string;
  heightVh: number;
  videoSrc: string;
  posterSrc: string;
  srLabel: string;
  overlayClassName?: string;
  children?: ReactNode;
};

export function ScrubChapter({
  id,
  heightVh,
  videoSrc,
  posterSrc,
  srLabel,
  overlayClassName = "",
  children,
}: ScrubChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useFilmScrub(sectionRef, videoRef);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative scroll-mt-0"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0" data-cursor>
          <Image src={posterSrc} alt="" fill className="object-cover" sizes="100vw" />
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className={`absolute inset-0 ${overlayClassName}`}>{children}</div>
      </div>
      <p className="sr-only">{srLabel}</p>
    </section>
  );
}
