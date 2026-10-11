import { Words } from "@/components/cirrus/reveal";
import { ScrubChapter } from "@/components/cirrus/scrub-chapter";
import Image from "next/image";
import { CIRRUS_POSTERS, CIRRUS_VIDEOS } from "@/lib/cirrus/media";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

const FOOTER_COLUMNS = [
  {
    title: "Modules",
    links: PRODUCT_CATEGORIES.map((category) => category.title),
  },
  { title: "Laboratory", links: ["ISO 15189", "ISO/IEC 17025", "CAP & CLIA", "Validation pack"] },
  { title: "Company", links: ["About", "New launch", "Book a demo", "Contact"] },
];

export function ReserveSection() {
  return (
    <>
      <ScrubChapter
        id="demo"
        heightVh={220}
        videoSrc={CIRRUS_VIDEOS.window}
        posterSrc={CIRRUS_POSTERS.window}
        srLabel="Film: slowly closing in on a scientist at the microscope."
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f5f5fa] via-[#f5f5fa]/35 to-[#f5f5fa] backdrop-blur-[2px]"
        />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-[11px] tracking-[0.25em] text-[#6d28d9] uppercase">
            05 — Book a demo
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] font-medium tracking-[-0.03em] text-[#180061]">
            <Words text="Put your lab" />
            <span className="block">
              <Words text="in order." className="italic text-[#6d28d9]" />
            </span>
          </h2>
          <a
            href="mailto:hello@qmspad.com?subject=QMS%20Pad%20demo"
            className="mt-10 rounded-full bg-[#180061] px-8 py-4 text-sm text-[#f5f5fa] transition-colors hover:bg-[#6d28d9]"
          >
            Book a demo
          </a>
          <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-[#180061]/60 uppercase">
            30-minute walkthrough · No commitment
          </p>
        </div>
      </ScrubChapter>

      <footer className="bg-[#f5f5fa] px-6 pt-20 pb-12 md:px-12">
        <div className="mx-auto max-w-[90rem]">
          <div data-line className="h-px w-full bg-[#180061]/20" />
          <div className="grid gap-12 pt-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
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
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#180061]/50 uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#180061]/75 transition-colors hover:text-[#6d28d9]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-16 font-mono text-[10px] tracking-[0.25em] text-[#180061]/40 uppercase">
            © 2026 QMS Pad · Laboratory quality system
          </p>
        </div>
      </footer>
    </>
  );
}
