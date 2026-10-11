import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/product-modules";

export function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="border-t border-brand-cream-dark/50 bg-white/40 scroll-mt-24 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-orange">
            Products
          </p>
          <h2
            id="products-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
          >
            One platform for laboratory quality operations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            Every module below lives on this site—use the menu to jump straight
            to what your team needs. No separate product microsites.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              id={`products-${category.id}`}
              className="scroll-mt-24 md:scroll-mt-28"
            >
              <div className="border-b border-brand-cream-dark pb-4">
                <h3 className="text-xl font-semibold text-brand-navy sm:text-2xl">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-brand-navy/65 sm:text-base">
                  {category.summary}
                </p>
              </div>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.modules.map((module) => (
                  <li key={module.id} id={module.id} className="scroll-mt-28">
                    <article className="flex h-full flex-col rounded-2xl border border-brand-cream-dark/80 bg-brand-cream p-6 transition-shadow hover:shadow-md">
                      <h4 className="text-base font-semibold leading-snug text-brand-navy">
                        {module.title}
                      </h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy/70">
                        {module.description}
                      </p>
                      <Link
                        href={`/#${module.anchor}`}
                        className="mt-4 text-sm font-semibold text-brand-orange hover:text-brand-orange-hover"
                      >
                        Learn more
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
