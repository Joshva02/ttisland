"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";
import { ListingCard } from "./listing-card";
import type { SubCategory } from "@/lib/data";
import clsx from "clsx";

const PAGE_SIZE = 30;

export function CategoryClient({
  subCategories,
}: {
  subCategories: SubCategory[];
}) {
  const [activeTab, setActiveTab] = useState(subCategories[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const active = useMemo(
    () => subCategories.find((s) => s.slug === activeTab) ?? subCategories[0],
    [activeTab, subCategories]
  );

  const filtered = useMemo(() => {
    if (!active) return [];
    if (!query.trim()) return active.items;
    const q = query.toLowerCase();
    return active.items.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.address?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.section?.toLowerCase().includes(q)
    );
  }, [active, query]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const handleTabChange = useCallback((slug: string) => {
    setActiveTab(slug);
    setQuery("");
    setVisibleCount(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => c + PAGE_SIZE);
  }, []);

  if (subCategories.length === 0) return null;

  return (
    <div>
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Sub-category tabs — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none pr-6 -mr-6">
          {subCategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => handleTabChange(sub.slug)}
              className={clsx(
                "shrink-0 px-4 py-2.5 text-sm font-[var(--font-display)] font-medium transition-all border min-h-[44px]",
                activeTab === sub.slug
                  ? "cat-pill-active border-transparent"
                  : "bg-transparent text-[var(--faded)] border-[var(--rule)] hover:text-[var(--fg)] hover:border-[var(--fg)]"
              )}
              style={{ borderRadius: "2px" }}
            >
              {sub.label}
              <span className="ml-1.5 label-mono opacity-60">{sub.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--faded)]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder={`Search ${active?.label ?? "listings"}...`}
          className="w-full pl-6 pr-4 py-3 bg-transparent border-b border-[var(--rule)] text-sm font-[var(--font-body)] placeholder:text-[var(--faded)] focus:outline-none focus:border-[var(--fg)] transition-colors"
        />
        {query && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 label-mono text-[var(--faded)]">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="label-mono text-[var(--faded)]">
          {active?.label}
        </span>
        <span className="label-mono text-[var(--faded)]">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Results */}
      <div>
        {visible.map((item, i) => (
          <ListingCard
            key={`${item.name}-${i}`}
            item={item}
            index={i}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-[var(--font-display)] font-semibold text-lg text-[var(--faded)]">
            No results found
          </p>
          <p className="text-sm text-[var(--faded)] mt-2">
            Try a different search term
          </p>
        </div>
      )}

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="group flex items-center gap-2 px-6 py-3 border border-[var(--rule)] text-sm font-[var(--font-display)] font-medium hover:border-[var(--fg)] hover:text-[var(--fg)] text-[var(--faded)] transition-all"
            style={{ borderRadius: "2px" }}
          >
            Load more
            <span className="label-mono opacity-60">
              ({filtered.length - visibleCount} remaining)
            </span>
            <ChevronDown
              size={14}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
}
