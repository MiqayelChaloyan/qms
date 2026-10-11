"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#idea", label: "The system" },
  { href: "#platform", label: "Platform" },
  { href: "#lab", label: "Inside the lab" },
  { href: "#modules", label: "Modules" },
];

function Logo({ className }: { className: string }) {
  return (
    <Image
      src="/assetss/qmspad-QMS_INVO_PAD.avif"
      alt="QMS Pad"
      width={1200}
      height={381}
      priority
      className={className}
    />
  );
}

export function CirrusNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[130px] bg-gradient-to-b from-[#f5f5fa] via-[#f5f5fa]/70 to-transparent">
        <div className="pointer-events-auto mx-auto flex max-w-[90rem] items-center justify-between px-6 pt-6 md:px-12">
          <a href="#hero" aria-label="QMS Pad home">
            <Logo className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#180061]/80 transition-colors hover:text-[#6d28d9]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              className="rounded-full bg-[#180061] px-5 py-2.5 text-sm text-[#f5f5fa] transition-colors hover:bg-[#6d28d9]"
            >
              Book a demo
            </a>
          </nav>
          <button
            type="button"
            className="font-mono text-[11px] tracking-[0.25em] text-[#180061] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="cirrus-mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        id="cirrus-mobile-menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-[#f5f5fa] px-6 pt-6 pb-10 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Logo className="h-10 w-auto" />
          <button
            type="button"
            className="font-mono text-[11px] tracking-[0.25em] text-[#180061] uppercase"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="mt-auto flex flex-col gap-4" aria-label="Mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-5xl font-medium tracking-[-0.03em] text-[#180061]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className="mt-8 w-fit rounded-full bg-[#180061] px-7 py-3.5 text-sm text-[#f5f5fa]"
            onClick={() => setOpen(false)}
          >
            Book a demo
          </a>
        </nav>
      </div>
    </>
  );
}
