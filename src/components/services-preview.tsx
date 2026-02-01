import Link from "next/link";
import { services, serviceCategories } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";

const categoryLabelMap = Object.fromEntries(
  serviceCategories.map((c) => [c.key, c.label])
);

export default function ServicesPreview() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
      {/* ---------- header ---------- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <p className="label-mono text-[var(--faded)]">Essential</p>
          <h2 className="heading-display text-3xl md:text-5xl mt-1">
            Services
          </h2>
        </div>

        <Link
          href="/services"
          className="label-mono text-[var(--faded)] hover:text-[var(--fg)] transition-colors flex items-center gap-1 shrink-0"
        >
          View All <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* ---------- grid ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--rule)] mt-12">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--bg)] p-6 md:p-8 hover:bg-[var(--cream)] transition-colors group"
            >
              {/* top row: icon + external arrow */}
              <div className="flex items-start justify-between">
                <Icon
                  size={20}
                  className="text-[var(--faded)] group-hover:text-[var(--terra)] transition-colors"
                />
                <ArrowUpRight
                  size={14}
                  className="text-[var(--rule)] group-hover:text-[var(--faded)] transition-colors"
                />
              </div>

              {/* name */}
              <h3 className="font-[var(--font-display)] font-semibold text-base text-[var(--fg)] mt-4 group-hover:text-[var(--terra)] transition-colors">
                {service.name}
              </h3>

              {/* description */}
              <p className="text-sm text-[var(--faded)] mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* category badge */}
              <span className="label-mono text-[var(--rule)] mt-3 block">
                {categoryLabelMap[service.category]}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
