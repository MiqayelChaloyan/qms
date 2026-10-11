"use client";

import { useState, type FormEvent } from "react";

const FIELDS = [
  { name: "name", label: "Your Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Your Email", type: "email", autoComplete: "email" },
] as const;

const fieldClass =
  "w-full rounded-xl border border-[#180061]/10 bg-[#f5f5fa] px-4 py-3.5 text-base text-[#180061] outline-none transition-[border-color,background-color,box-shadow] placeholder:text-[#180061]/40 focus:border-[#6600ff] focus:bg-white focus:shadow-[0_0_0_4px_rgba(102,0,255,0.12)] sm:text-sm";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-[#180061]/55 uppercase">
      {children}
    </label>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[20rem] flex-col items-center justify-center text-center" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6600ff] text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-5 font-display text-2xl font-medium text-[#180061]">Thank you for your message.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      {FIELDS.map((field) => (
        <div key={field.name}>
          <Label htmlFor={`contact-${field.name}`}>{field.label}</Label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            placeholder={field.label}
            className={fieldClass}
          />
        </div>
      ))}
      <div className="sm:col-span-2">
        <Label htmlFor="contact-subject">Your Subject</Label>
        <input id="contact-subject" name="subject" type="text" required placeholder="Your Subject" className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="contact-message">Your Message</Label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Your Message"
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#6600ff] px-8 py-4 text-sm font-medium text-white shadow-[0_14px_34px_-14px_rgba(102,0,255,0.75)] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#180061] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6600ff] focus-visible:ring-offset-4 sm:w-fit"
        >
          Submit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
