"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductsMenu } from "@/components/products-menu";
import { PAGE_CONTAINER } from "@/lib/page-container";

const LOGO_SRC = "/assetss/qmspad-QMS_INVO_PAD.avif";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={LOGO_SRC}
        alt="QMS Pad"
        width={1200}
        height={381}
        className="h-14 w-auto md:h-16"
        priority
      />
    </Link>
  );
}

function getScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollProgress(getScrollProgress());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMobile = () => setIsMenuOpen(false);

  const navLinkClass =
    "header-nav-link group relative flex flex-col gap-0.5";

  return (
    <header
      data-scrolled={isScrolled ? "true" : "false"}
      className={`site-header fixed top-0 left-0 z-50 w-full bg-white transition-all duration-500 ${
        isScrolled
          ? "py-3 shadow-md backdrop-blur-lg md:py-4"
          : "border-b border-brand-cream-dark/60 py-4 md:py-6"
      }`}
    >
      <div className={`${PAGE_CONTAINER} flex items-center justify-between gap-4`}>
        <Logo />

        <nav
          className="hidden items-center gap-4 md:flex lg:gap-8"
          aria-label="Main"
        >
          <Link href="/" className={navLinkClass}>
            Home
            <div className="h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
          </Link>
          <ProductsMenu variant="desktop" />
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/#"
            className="header-cta rounded-full px-8 py-2.5 transition-colors duration-300"
          >
            Contact us
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1"
          >
            <svg
              className="h-6 w-6 cursor-pointer text-[#180061]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="absolute right-0 bottom-0 left-0 h-[3px] bg-brand-cream-dark/80"
        aria-hidden
      >
        <div
          className="h-full w-full origin-left bg-brand-orange will-change-transform transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div
        className={`fixed top-0 left-0 z-[60] flex h-screen w-full flex-col items-center justify-center gap-6 overflow-y-auto bg-white px-6 py-24 text-base font-medium text-[#180061] transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="absolute top-4 right-6 p-2 lg:right-12"
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <Link
          href="/"
          onClick={closeMobile}
          className="header-nav-link text-lg"
        >
          Home
        </Link>
        <ProductsMenu variant="mobile" onNavigate={closeMobile} />

        <Link
          href="/#"
          onClick={closeMobile}
          className="header-cta rounded-full px-8 py-2.5 transition-colors duration-300"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
}
