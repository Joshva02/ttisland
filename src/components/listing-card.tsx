"use client";

import { useState } from "react";
import { MapPin, Phone, Globe, Mail } from "lucide-react";
import { Listing } from "@/lib/types";
import { ListingModal } from "./listing-modal";

export function ListingCard({ item, index = 0 }: { item: Listing; index?: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const addressLine = item.address?.replace(/\n/g, ", ").trim();

  return (
    <>
      <article
        className="group border-b border-[var(--rule)] py-5 first:pt-0 reveal-up cursor-pointer"
        style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setModalOpen(true);
          }
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-[var(--font-display)] font-semibold text-base text-[var(--fg)] group-hover:text-[var(--terra)] transition-colors leading-snug">
              {item.name}
            </h3>

            {item.section && (
              <span className="label-mono text-[var(--faded)] mt-1 inline-block">
                {item.section.replace(/^(Restaurants|Hotels|Bars|Nightclubs)\s*-\s*/i, "")}
              </span>
            )}

            {item.description && (
              <p className="text-sm text-[var(--faded)] mt-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Index number */}
          <span className="label-mono text-[var(--rule)] shrink-0 pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3">
          {addressLine && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--faded)]">
              <MapPin size={13} className="shrink-0 text-[var(--deep-green)]" />
              <span className="truncate max-w-[200px] sm:max-w-[260px]">{addressLine}</span>
            </div>
          )}
          {item.phone && item.phone.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--faded)]">
              <Phone size={13} className="shrink-0 text-[var(--sea)]" />
              <span>{item.phone[0]}</span>
            </div>
          )}
          {item.website && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--faded)]">
              <Globe size={13} className="shrink-0" />
              <span className="truncate max-w-[180px]">
                {item.website.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
            </div>
          )}
          {item.email && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--faded)]">
              <Mail size={13} className="shrink-0" />
              <span className="truncate max-w-[180px]">{item.email}</span>
            </div>
          )}
        </div>
      </article>

      <ListingModal
        item={item}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
