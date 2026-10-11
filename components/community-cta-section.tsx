import { Poppins } from "next/font/google";
import Link from "next/link";
import { PAGE_CONTAINER } from "@/lib/page-container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const gradientText =
  "bg-gradient-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent";

export function CommunityCtaSection() {
  return (
    <section
      aria-labelledby="community-cta-heading"
      className={`bg-black pb-16 ${poppins.className}`}
    >
      <div className={PAGE_CONTAINER}>
      <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#301469] to-black p-10 text-center text-white">
        <p
          className={`rounded-full border border-[#54487B] px-6 py-2 text-sm ${gradientText}`}
        >
          Commnunity & Support
        </p>
        <h2
          id="community-cta-heading"
          className="mt-5 max-w-2xl text-4xl font-medium md:text-5xl md:leading-[60px]"
        >
          Join 10,000+ AI Infulencers{" "}
          <span className={gradientText}>in the AI Community</span>
        </h2>
        <p className="mt-2 text-sm text-white">
          Unlock all our free resources instantly.
        </p>
        <Link
          href="#"
          className={`mt-6 rounded-full border border-[#54487B] px-12 py-2.5 text-sm transition-all active:scale-95 ${gradientText}`}
        >
          Get Started
        </Link>
      </div>
      </div>
    </section>
  );
}
