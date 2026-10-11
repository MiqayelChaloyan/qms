import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#f5f5fa] px-5 pt-16 pb-10 sm:px-8 md:pt-20 md:pb-12 lg:px-12">
      <div className="mx-auto max-w-[90rem]">
        <div data-line className="h-px w-full bg-[#180061]/20" />
        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/assetss/qmspad-QMS_INVO_PAD.avif"
              alt="QMS Pad"
              width={1200}
              height={381}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#180061]/60">
              The quality management system for laboratories. Documents,
              people, equipment and audits in one place.
            </p>
          </div>
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.id}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#180061]/50 uppercase">
                {category.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {category.modules.map((module) => (
                  <li key={module.anchor}>
                    <Link
                      href={`/#${module.anchor}`}
                      className="text-sm text-[#180061]/75 transition-colors hover:text-[#6d28d9]"
                    >
                      {module.menuLabel ?? module.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#180061]/50 uppercase">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#180061]/75 transition-colors hover:text-[#6d28d9]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-16 font-mono text-[10px] tracking-[0.25em] text-[#180061]/40 uppercase">
          © 2026 QMS Pad · Laboratory quality system
        </p>
      </div>
    </footer>
  );
}
