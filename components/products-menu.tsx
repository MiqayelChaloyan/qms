"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

type ProductsMenuProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 1.25L5 4.75L9 1.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductsMenu({ variant, onNavigate }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);

  const linkClass = "header-nav-link";

  if (variant === "desktop") {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link
          href="/#products"
          className={`group relative inline-flex items-center gap-1.5 ${linkClass}`}
          aria-expanded={open}
          aria-haspopup="true"
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setOpen(false);
            }
          }}
        >
          Products
          <ChevronDown
            className={`mt-px transition-transform ${open ? "rotate-180" : ""}`}
          />
          <span
            className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"
          />
        </Link>

        <div
          className={`absolute top-full left-1/2 z-50 w-[min(100vw-3rem,56rem)] -translate-x-1/2 pt-3 transition-all duration-200 ${
            open
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-brand-cream-dark bg-white p-6 shadow-xl lg:p-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_CATEGORIES.map((category) => (
                <div key={category.id}>
                  <Link
                    href={`/#products-${category.id}`}
                    className="text-sm font-semibold text-brand-navy hover:text-brand-orange"
                    onClick={() => setOpen(false)}
                  >
                    {category.title}
                  </Link>
                  <ul className="mt-3 space-y-2">
                    {category.modules.map((module) => (
                      <li key={module.id}>
                        <Link
                          href={`/#${module.id}`}
                          className="text-sm leading-snug text-brand-navy/70 hover:text-brand-navy"
                          onClick={() => setOpen(false)}
                        >
                          {module.menuLabel ?? module.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-brand-cream-dark pt-4">
              <Link
                href="/#products"
                className="text-sm font-semibold text-brand-orange hover:text-brand-orange-hover"
                onClick={() => setOpen(false)}
              >
                View all products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs text-center">
      <button
        type="button"
        className="header-nav-link inline-flex items-center gap-2 text-lg"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        Products
        <ChevronDown className={open ? "rotate-180" : ""} />
      </button>
      {open ? (
        <div className="mt-4 max-h-[50vh] space-y-6 overflow-y-auto text-left text-sm">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.id}>
              <Link
                href={`/#products-${category.id}`}
                className="font-semibold text-[#180061]"
                onClick={onNavigate}
              >
                {category.title}
              </Link>
              <ul className="mt-2 space-y-2 pl-1">
                {category.modules.map((module) => (
                  <li key={module.id}>
                    <Link
                      href={`/#${module.id}`}
                      className="text-[#180061]/80"
                      onClick={onNavigate}
                    >
                      {module.menuLabel ?? module.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/#products"
            className="block font-semibold text-brand-orange"
            onClick={onNavigate}
          >
            View all products
          </Link>
        </div>
      ) : null}
    </div>
  );
}
