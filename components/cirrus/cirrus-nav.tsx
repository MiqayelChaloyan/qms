"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

const LINKS = [
  { href: "/#idea", label: "The system" },
  { href: "/about", label: "About us" },
  { href: "/#lab", label: "Inside the lab" },
];

function ModulesPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {PRODUCT_CATEGORIES.map((category) => (
        <div key={category.id}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#6d28d9] uppercase">
            {category.title}
          </p>
          <ul className="mt-3 space-y-2">
            {category.modules.map((module) => (
              <li key={module.anchor}>
                <Link
                  href={`/#${module.anchor}`}
                  className="text-sm leading-snug text-[#180061]/80 transition-colors hover:text-[#6d28d9]"
                  onClick={onNavigate}
                >
                  {module.menuLabel ?? module.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

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
  const [modulesOpen, setModulesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[130px] bg-gradient-to-b from-[#f5f5fa] via-[#f5f5fa]/70 to-transparent">
        <div className="pointer-events-auto mx-auto flex max-w-[90rem] items-center justify-between px-5 pt-5 sm:px-8 md:pt-6 lg:px-12">
          <Link href="/" aria-label="QMS Pad home">
            <Logo className="h-9 w-auto sm:h-10 lg:h-12" />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Main">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#180061]/80 transition-colors hover:text-[#6d28d9]"
              >
                {link.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setModulesOpen(true)}
              onMouseLeave={() => setModulesOpen(false)}
            >
              <button
                type="button"
                className="text-sm text-[#180061]/80 transition-colors hover:text-[#6d28d9]"
                aria-expanded={modulesOpen}
                aria-controls="modules-menu"
                onClick={() => setModulesOpen((value) => !value)}
              >
                Modules
              </button>
              <div
                id="modules-menu"
                className={`absolute top-full right-0 z-50 w-[min(100vw-3rem,52rem)] pt-4 transition-all duration-200 ${
                  modulesOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="rounded-2xl bg-[#f5f5fa] p-6 shadow-[0_30px_70px_-30px_rgba(24,0,97,0.45)] ring-1 ring-[#180061]/10">
                  <ModulesPanel onNavigate={() => setModulesOpen(false)} />
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-[#180061] px-5 py-2.5 text-sm text-[#f5f5fa] transition-colors hover:bg-[#6d28d9]"
            >
              Contact us
            </Link>
          </nav>
          <button
            type="button"
            className="rounded-full bg-[#180061] px-4 py-2 font-mono text-[11px] tracking-[0.25em] text-[#f5f5fa] uppercase lg:hidden"
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
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-[#f5f5fa] px-5 pt-5 pb-10 transition-[opacity,visibility] duration-500 sm:px-8 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Logo className="h-9 w-auto sm:h-10" />
          <button
            type="button"
            className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.25em] text-[#180061] uppercase ring-1 ring-[#180061]/20"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="mt-12 flex flex-col gap-3 sm:mt-16" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[clamp(2rem,9vw,3rem)] leading-tight font-medium tracking-[-0.03em] text-[#180061]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div>
            <p className="font-display text-[clamp(2rem,9vw,3rem)] leading-tight font-medium tracking-[-0.03em] text-[#180061]">
              Modules
            </p>
            <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-[#180061]/10">
              <ModulesPanel onNavigate={() => setOpen(false)} />
            </div>
          </div>
          <Link
            href="/contact"
            className="mt-8 w-fit rounded-full bg-[#180061] px-7 py-3.5 text-sm text-[#f5f5fa]"
            onClick={() => setOpen(false)}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </>
  );
}
