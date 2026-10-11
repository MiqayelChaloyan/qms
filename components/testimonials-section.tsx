const TESTIMONIALS = [
  {
    quote:
      "We cut document review cycles in half and walked into our ISO audit with confidence. Auditors commented on how clear our evidence was.",
    name: "Elena Vasquez",
    role: "Quality Director",
    company: "MedNova Devices",
  },
  {
    quote:
      "Training used to live in three systems. Now one dashboard shows who is qualified for what—and managers actually use it every day.",
    name: "James Okonkwo",
    role: "Head of Operations",
    company: "BioForm Labs",
  },
  {
    quote:
      "Implementation was faster than any QMS we evaluated. Our team adopted it without a six-month change project.",
    name: "Sarah Lindholm",
    role: "VP Regulatory Affairs",
    company: "Nordic Pharma Co.",
  },
];

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 24" fill="currentColor" aria-hidden>
      <path d="M0 24V14.4C0 6.4 4.8 1.6 12 0l1.6 3.2C8 5.6 5.6 9.6 4.8 14.4H12V24H0zm18 0V14.4c0-8 4.8-12.8 12-14.4L32 3.2c-5.6 2.4-8 6.4-8.8 11.2H32V24H18z" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-brand-cream-dark/50 bg-brand-cream"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-orange">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
          >
            Trusted by quality teams who ship on schedule
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.name}
              className="flex flex-col rounded-2xl border border-brand-cream-dark bg-white/80 p-8 shadow-sm"
            >
              <QuoteIcon className="h-8 w-8 text-brand-orange/25" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-brand-navy/80">
                “{item.quote}”
              </blockquote>
              <footer className="mt-8 border-t border-brand-cream-dark/80 pt-6">
                <p className="font-semibold text-brand-navy">{item.name}</p>
                <p className="mt-0.5 text-sm text-brand-navy/60">
                  {item.role}, {item.company}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
