"use client";

import { useEffect } from "react";
import { CirrusNav } from "@/components/cirrus/cirrus-nav";
import { SiteFooter } from "@/components/cirrus/site-footer";
import { ContactForm } from "@/components/cirrus/contact-form";
import { RevealKit, Words } from "@/components/cirrus/reveal";
import { SensorModel } from "@/components/cirrus/sensor-model";
import { ReticleCursor } from "@/components/cirrus/reticle-cursor";
import { scrollPageTo, SmoothScrollProvider } from "@/components/cirrus/smooth-scroll-provider";

const CARDS = [
  {
    title: "Help getting started",
    body: "We can help you upload your existing documents onto QMS Pad so you can get started right away.",
    icon: "flag",
  },
  {
    title: "Address",
    body: "QMS Pad by Invopad LLC is a Texas registered company, 4125 Fairway Drive, STE 145, Carrollton TX 75010.",
    icon: "pin",
  },
  {
    title: "One-on-one training",
    body: "We are happy to schedule a one-on-one or group training session and tour to answer any questions.",
    icon: "training",
  },
] as const;

function CardIcon({ name }: { name: (typeof CARDS)[number]["icon"] }) {
  const common = "h-7 w-7";
  if (name === "flag") {
    return (
      <svg viewBox="0 0 48 48" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M16 42V8" />
        <path d="M16 10h18l-4 7 4 7H16" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg viewBox="0 0 48 48" className={common} aria-hidden fill="currentColor">
        <path d="M24 6c-7 0-12 5.2-12 12.2 0 8.6 12 23.8 12 23.8s12-15.2 12-23.8C36 11.2 31 6 24 6zm0 16.4a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className={common} aria-hidden fill="currentColor">
      <path d="M18 30a6 6 0 1 0-6-6 6 6 0 0 0 6 6zm14 0a5 5 0 1 0-5-5 5 5 0 0 0 5 5zM8 40c0-5 4.4-8 10-8s10 3 10 8H8zm16.5 0c.3-2.2 1.6-4.2 3.6-5.6 1.2-.8 2.6-1.2 4.1-1.2 4.4 0 7.8 2.4 7.8 6.8H24.5z" />
      <path d="M34 8l6 6m0-6v6h-6" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function ContactExperience() {
  useEffect(() => {
    let held = false;
    const hold = () => {
      held = true;
    };
    window.addEventListener("pointerdown", hold);
    const timer = window.setTimeout(() => {
      if (held || window.scrollY > 24) return;
      scrollPageTo("#message", 1.2);
    }, 1400);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", hold);
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="cirrus relative min-h-[100dvh] bg-[#f5f5fa] font-display text-[#180061]">
        <CirrusNav />
        <main>
          <section className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 md:pt-40 md:pb-24 lg:px-12">
            <p
              aria-hidden
              className="pointer-events-none absolute -top-6 right-[-4vw] font-display text-[clamp(7rem,22vw,18rem)] leading-none font-medium tracking-[-0.06em] text-[#180061]/[0.05] select-none"
            >
              Hello
            </p>
            <div className="relative mx-auto grid max-w-[90rem] items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <p data-rise className="font-mono text-[11px] tracking-[0.25em] text-[#6d28d9] uppercase">
                  Contact us
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.8rem,1.4rem+5vw,5.6rem)] leading-[0.9] font-medium tracking-[-0.03em] text-[#180061]">
                  <Words text="Write to" />
                  <span className="block italic text-[#6d28d9]">
                    <Words text="the team." />
                  </span>
                </h1>
                <p data-rise className="mt-7 max-w-md text-base leading-relaxed text-[#180061]/70 sm:text-lg">
                  For enquiries, please leave a message. Questions about modules, setup or training all come to the same place.
                </p>
              </div>
              <div className="relative mx-auto h-72 w-full max-w-sm translate-x-6 sm:h-80 sm:translate-x-10 lg:mx-0 lg:ml-auto lg:h-[22rem] lg:translate-x-16">
                <div aria-hidden className="absolute inset-[10%] rounded-full border border-[#180061]/10" />
                <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-[#6600ff]/25" />
                <SensorModel
                  mode="manual"
                  className="relative h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-[#6600ff]"
                />
                <span className="pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[#180061]/70 uppercase shadow-sm">
                  Drag to rotate
                </span>
              </div>
            </div>
          </section>

          <section id="message" className="relative scroll-mt-28 px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
            <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-white p-6 shadow-[0_40px_90px_-40px_rgba(24,0,97,0.45)] ring-1 ring-[#180061]/8 sm:p-10">
              <h2 className="font-display text-2xl font-medium text-[#180061] sm:text-3xl">Send us a message</h2>
              <p className="mt-2 text-sm text-[#180061]/60">We&apos;ll get back to you as soon as we can.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="mx-auto mt-20 max-w-[90rem] md:mt-28">
              <h2 className="mx-auto max-w-2xl text-center font-display text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] leading-tight font-medium tracking-[-0.02em] text-[#180061]">
                Get answers to all of your management questions
              </h2>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3">
                {CARDS.map((card) => (
                  <li
                    key={card.title}
                    data-rise
                    className="group rounded-2xl bg-white p-7 ring-1 ring-[#180061]/8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(102,0,255,0.6)] sm:p-8"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6600ff]/10 text-[#6600ff] transition-colors duration-500 group-hover:bg-[#6600ff] group-hover:text-white">
                      <CardIcon name={card.icon} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-medium text-[#180061]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#180061]/70">{card.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <SiteFooter />
        <ReticleCursor />
        <RevealKit />
      </div>
    </SmoothScrollProvider>
  );
}
