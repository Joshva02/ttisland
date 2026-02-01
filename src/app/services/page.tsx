import Link from "next/link";
import { services, serviceCategories } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — TnTisland",
  description:
    "Essential services for Trinidad & Tobago — ferry booking, government portals, vehicle registration, and more.",
};

export default function ServicesPage() {
  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
      {/* ---------- back link ---------- */}
      <Link
        href="/"
        className="label-mono text-[var(--faded)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1 mb-10"
      >
        <span aria-hidden="true">&larr;</span> Back
      </Link>

      {/* ---------- header ---------- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12">
        <div>
          <h1 className="heading-display text-4xl md:text-6xl">Services</h1>
          <p className="label-mono text-[var(--faded)] mt-4">
            {services.length} services &middot; {serviceCategories.length}{" "}
            categories
          </p>
        </div>

        <p className="text-[var(--faded)] text-base md:text-lg leading-relaxed max-w-md font-[var(--font-body)]">
          Essential online services for Trinidad &amp; Tobago — ferry booking,
          government portals, driving resources, and more.
        </p>
      </div>

      {/* ---------- divider ---------- */}
      <hr className="editorial-rule my-10 md:my-14" />

      {/* ---------- category groups ---------- */}
      <div className="space-y-16 md:space-y-20">
        {serviceCategories.map((category) => {
          const categoryServices = services.filter(
            (s) => s.category === category.key
          );

          if (categoryServices.length === 0) return null;

          return (
            <section key={category.key}>
              {/* category label */}
              <h2 className="label-mono text-[var(--faded)] mb-6">
                {category.label}
              </h2>

              {/* service cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryServices.map((service) => {
                  const Icon = service.icon;

                  return (
                    <a
                      key={service.name}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[var(--rule)] p-6 md:p-8 hover:bg-[var(--cream)] transition-colors group"
                      style={{ borderRadius: 2 }}
                    >
                      {/* top row: icon + external arrow */}
                      <div className="flex items-start justify-between">
                        <Icon
                          size={24}
                          className="text-[var(--faded)] group-hover:text-[var(--terra)] transition-colors"
                        />
                        <ArrowUpRight
                          size={16}
                          className="text-[var(--rule)] group-hover:text-[var(--faded)] transition-colors"
                        />
                      </div>

                      {/* name */}
                      <h3 className="font-[var(--font-display)] font-semibold text-lg text-[var(--fg)] mt-5 group-hover:text-[var(--terra)] transition-colors">
                        {service.name}
                      </h3>

                      {/* description */}
                      <p className="text-sm text-[var(--faded)] mt-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* url display */}
                      <span className="label-mono text-[var(--rule)] group-hover:text-[var(--faded)] mt-4 block text-xs transition-colors">
                        {service.url
                          .replace(/^https?:\/\//, "")
                          .replace(/\/$/, "")}
                      </span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
