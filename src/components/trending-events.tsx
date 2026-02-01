"use client";

import { useEffect, useState } from "react";
import type { TrendingEvent } from "@/lib/events";

/* ---------- skeleton card ---------- */
function SkeletonCard() {
  return (
    <div
      className="shrink-0 w-full md:w-auto snap-start border border-[var(--rule)] bg-[var(--bg)] overflow-hidden"
      style={{ borderRadius: 2 }}
    >
      <div className="h-[160px] w-full animate-pulse bg-[var(--rule)]" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 animate-pulse bg-[var(--rule)] rounded" />
        <div className="h-3 w-1/2 animate-pulse bg-[var(--rule)] rounded" />
        <div className="h-3 w-1/3 animate-pulse bg-[var(--rule)] rounded mt-3" />
      </div>
    </div>
  );
}

/* ---------- event card ---------- */
function EventCard({ event }: { event: TrendingEvent }) {
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-[260px] md:w-auto snap-start border border-[var(--rule)] bg-[var(--bg)] overflow-hidden card-hover block min-h-[44px]"
      style={{ borderRadius: 2 }}
    >
      {/* image */}
      <div className="h-[160px] w-full overflow-hidden bg-[var(--cream)]">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="label-mono text-[var(--rule)] text-xs">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* details */}
      <div className="p-4">
        <h3 className="font-[var(--font-display)] font-semibold text-sm text-[var(--fg)] line-clamp-2">
          {event.title}
        </h3>

        {event.host && (
          <p className="label-mono text-[var(--faded)] mt-1">{event.host}</p>
        )}

        {event.venue && (
          <p className="text-xs text-[var(--faded)] mt-1">{event.venue}</p>
        )}

        <span className="label-mono text-[var(--terra)] hover:underline mt-3 block text-xs">
          Get Tickets
        </span>
      </div>
    </a>
  );
}

/* ---------- main component ---------- */
export default function TrendingEvents() {
  const [events, setEvents] = useState<TrendingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/trending-events");
        if (res.ok) {
          const data: TrendingEvent[] = await res.json();
          setEvents(data);
        }
      } catch {
        // silently fail — section will be hidden
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  /* hide entire section when no events and not loading */
  if (!loading && events.length === 0) return null;

  return (
    <section className="w-full bg-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        {/* ---------- header row ---------- */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="label-mono text-[var(--faded)]">
              Trending on islandetickets
            </p>
            <h2 className="heading-display text-2xl md:text-3xl mt-1">
              What&rsquo;s Hot
            </h2>
          </div>

          <a
            href="https://islandetickets.com"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-[var(--faded)] hover:text-[var(--fg)] transition-colors flex items-center gap-1 shrink-0"
          >
            View All <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* ---------- loading skeletons ---------- */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ---------- events ---------- */}
        {!loading && events.length > 0 && (
          <>
            {/* mobile: horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory md:hidden pr-6 -mr-6">
              {events.map((event, i) => (
                <EventCard key={`${event.url}-${i}`} event={event} />
              ))}
            </div>

            {/* desktop: grid */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4">
              {events.map((event, i) => (
                <EventCard key={`${event.url}-${i}`} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
