import Link from "next/link";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] mt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-5">
              <span className="heading-display text-xl tracking-tight">TnT</span>
              <span className="heading-display text-xl tracking-tight text-[var(--terra)]">island</span>
            </Link>
            <p className="text-sm text-[var(--faded)] leading-relaxed max-w-xs">
              Your guide to the twin-island republic of Trinidad &amp; Tobago.
              Originally curated by Roger James since 1996.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <span className="label-mono text-[var(--faded)] mb-4 block">Categories</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-sm text-[var(--faded)] hover:text-[var(--fg)] transition-colors py-0.5"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-4">
            <span className="label-mono text-[var(--faded)] mb-4 block">About</span>
            <p className="text-sm text-[var(--faded)] leading-relaxed mb-3">
              Data sourced from tntisland.com, a labour of love for Trinidad &amp; Tobago.
              3,700+ listings across restaurants, hotels, beaches, carnival, nightlife, and culture.
            </p>
          </div>
        </div>

        <div className="editorial-rule my-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="label-mono text-[var(--faded)]">
            &copy; 1996&ndash;2026 tntisland.com
          </p>
          <p className="label-mono text-[var(--faded)]">
            Trinidad &amp; Tobago, W.I.
          </p>
        </div>
      </div>
    </footer>
  );
}
