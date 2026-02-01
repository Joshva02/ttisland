import Link from "next/link";
import { categories } from "@/lib/categories";
import { CategoryIcon } from "@/components/category-icon";
import { TrinidadClock } from "@/components/trinidad-clock";
import { CarnivalCountdown } from "@/components/carnival-countdown";
import TrendingEvents from "@/components/trending-events";
import ServicesPreview from "@/components/services-preview";

const TICKER_ITEMS = [
  "Bake & Shark",
  "Maracas Bay",
  "Panorama",
  "Doubles",
  "Soca",
  "J'ouvert",
  "Pelau",
  "Nylon Pool",
  "Roti",
  "Calypso",
  "Steelpan",
  "Carnival",
  "Lime",
  "Pigeon Point",
  "Parang",
  "Moko Jumbie",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — oversized editorial type */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 md:pt-24 pb-10 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
          {/* Left: Big type */}
          <div className="lg:col-span-8">
            <span className="label-mono text-[var(--terra)] mb-6 block">
              Your Guide to T&amp;T
            </span>
            <h1 className="heading-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] text-[var(--fg)]">
              Trinidad
              <br />
              <span className="text-[var(--terra)]">&amp;</span>{" "}
              Tobago
            </h1>
          </div>

          {/* Right: Clock, countdown & intro blurb */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <TrinidadClock />
            <CarnivalCountdown />
            <p className="text-[var(--faded)] text-base leading-relaxed max-w-md">
              Over 3,700 listings across the twin-island republic.
              Restaurants, beaches, carnival, culture, nightlife, and everything
              in between &mdash; all in one place.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/eat"
                className="inline-flex items-center gap-2 px-5 py-2.5 toggle-active text-sm font-[var(--font-display)] font-semibold hover:bg-[var(--terra)] hover:text-white transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Start Exploring
              </Link>
              <Link
                href="/carnival"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--rule)] text-sm font-[var(--font-display)] font-medium text-[var(--faded)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Carnival 2026
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker strip */}
      <div className="border-y border-[var(--rule)] py-3 overflow-hidden">
        <div className="ticker-strip flex items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center mx-6"
            >
              <span className="w-1.5 h-1.5 bg-[var(--terra)] rounded-full mr-4 shrink-0" />
              <span className="label-mono text-[var(--faded)]">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categories — asymmetric editorial grid */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <span className="label-mono text-[var(--faded)] mb-3 block">Browse</span>
            <h2 className="heading-display text-3xl md:text-5xl text-[var(--fg)]">
              Categories
            </h2>
          </div>
          <span className="label-mono text-[var(--faded)] hidden md:block">
            9 categories &middot; 3,700+ listings
          </span>
        </div>

        {/* Mixed grid: first 3 large, rest compact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-[var(--rule)]">
          {categories.slice(0, 3).map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group md:col-span-4 bg-[var(--bg)] p-8 md:p-10 flex flex-col justify-between min-h-[240px] hover:bg-[var(--cream)] transition-colors reveal-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <CategoryIcon
                  name={cat.icon}
                  size={28}
                  className="text-[var(--faded)] group-hover:text-[var(--terra)] transition-colors"
                />
                <span className="label-mono text-[var(--rule)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="heading-display text-2xl md:text-3xl text-[var(--fg)] mb-2 group-hover:text-[var(--terra)] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-[var(--faded)] leading-relaxed max-w-xs">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}

          {categories.slice(3).map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group md:col-span-4 bg-[var(--bg)] p-6 md:p-8 flex items-center gap-5 hover:bg-[var(--cream)] transition-colors reveal-up"
              style={{ animationDelay: `${(i + 3) * 80}ms` }}
            >
              <CategoryIcon
                name={cat.icon}
                size={22}
                className="shrink-0 text-[var(--faded)] group-hover:text-[var(--terra)] transition-colors"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-[var(--font-display)] font-semibold text-base text-[var(--fg)] group-hover:text-[var(--terra)] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-[var(--faded)] truncate">
                  {cat.description}
                </p>
              </div>
              <span className="label-mono text-[var(--rule)] shrink-0">
                {String(i + 4).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Events from islandetickets */}
      <TrendingEvents />

      {/* Featured stripe — Carnival */}
      <section className="feature-section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <span className="label-mono text-[var(--terra)] mb-4 block">Featured</span>
              <h2 className="heading-display text-4xl md:text-6xl lg:text-7xl mb-6">
                Carnival
                <br />
                2026
              </h2>
              <p className="text-[#999999] text-base leading-relaxed max-w-lg mb-8">
                February 16th &amp; 17th — the Greatest Show on Earth.
                Mas bands, J&apos;ouvert, calypso tents, soca fetes,
                steelpan panorama. The streets come alive with colour,
                rhythm, and freedom.
              </p>
              <Link
                href="/carnival"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--terra)] text-white text-sm font-[var(--font-display)] font-semibold hover:bg-[#A30D1E] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Explore Carnival
              </Link>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-end">
              <div className="space-y-4">
                {[
                  { label: "Mas Bands", link: "/carnival" },
                  { label: "Steelpan & Panyards", link: "/carnival" },
                  { label: "Calypsonians", link: "/carnival" },
                  { label: "Calypso Tents", link: "/carnival" },
                ].map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="group flex items-center justify-between py-3 border-b border-[#333333] hover:border-[var(--terra)] transition-colors"
                  >
                    <span className="font-[var(--font-display)] font-medium group-hover:text-[var(--terra)] transition-colors">
                      {item.label}
                    </span>
                    <span className="label-mono text-[#666666]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Services */}
      <div className="editorial-rule" />
      <ServicesPreview />

      {/* Bottom motto */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-28 text-center">
        <blockquote className="heading-display text-[clamp(1.5rem,4vw,3.5rem)] text-[var(--fg)] max-w-3xl mx-auto italic">
          &ldquo;Together we aspire, together we achieve&rdquo;
        </blockquote>
        <p className="label-mono text-[var(--faded)] mt-6">
          National Motto of Trinidad &amp; Tobago
        </p>
      </section>
    </>
  );
}
