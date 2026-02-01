"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/categories";
import { ThemeToggle } from "./theme-toggle";

import clsx from "clsx";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link href="/" className="flex items-baseline gap-1.5 group">
            <span className="heading-display text-lg tracking-tight">
              TnT
            </span>
            <span className="heading-display text-lg tracking-tight text-[var(--terra)]">
              island
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-3 py-1.5 text-[13px] font-[var(--font-display)] font-medium text-[var(--faded)] hover:text-[var(--fg)] transition-colors"
              >
                {cat.title}
              </Link>
            ))}
            <Link
              href="/services"
              className="px-3 py-1.5 text-[13px] font-[var(--font-display)] font-medium text-[var(--faded)] hover:text-[var(--fg)] transition-colors"
            >
              Services
            </Link>
            <div className="ml-3 pl-3 border-l border-[var(--rule)] flex items-center gap-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-[5px] p-2 min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={clsx(
                  "block w-5 h-[1.5px] bg-[var(--fg)] transition-transform origin-center",
                  open && "rotate-45 translate-y-[6.5px]"
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-[1.5px] bg-[var(--fg)] transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-[1.5px] bg-[var(--fg)] transition-transform origin-center",
                  open && "-rotate-45 -translate-y-[6.5px]"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Rule below nav */}
      <div className="editorial-rule" />

      {/* Mobile menu */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300 bg-[var(--bg)]",
          open ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-6 py-6 space-y-1">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={() => setOpen(false)}
              className="block py-3 border-b border-[var(--rule)] text-[var(--fg)] font-[var(--font-display)] font-semibold text-lg reveal-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {cat.title}
            </Link>
          ))}
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="block py-3 border-b border-[var(--rule)] text-[var(--fg)] font-[var(--font-display)] font-semibold text-lg reveal-up"
            style={{ animationDelay: `${categories.length * 40}ms` }}
          >
            Services
          </Link>
        </nav>
      </div>
    </header>
  );
}
