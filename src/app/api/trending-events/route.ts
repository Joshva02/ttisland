import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { TrendingEvent } from "@/lib/events";

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    const res = await fetch("https://islandetickets.com", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TnTisland/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json([] as TrendingEvent[]);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const events: TrendingEvent[] = [];

    // Try multiple selector strategies for robustness
    // islandetickets.com uses carousel cards and event listing cards

    // Strategy 1: Look for event links with images (carousel items, cards, etc.)
    $("a[href*='/event/']").each((_, el) => {
      const $el = $(el);
      const href = $el.attr("href") || "";
      const url = href.startsWith("http")
        ? href
        : `https://islandetickets.com${href}`;

      // Try to get title from various places
      const title =
        $el.find("h1, h2, h3, h4, h5, p, span").first().text().trim() ||
        $el.attr("title") ||
        $el.text().trim();

      if (!title || title.length < 3) return;

      // Avoid duplicates
      if (events.some((e) => e.url === url)) return;

      // Try to get image
      const img =
        $el.find("img").attr("src") || $el.find("img").attr("data-src") || "";
      const imageUrl = img.startsWith("http")
        ? img
        : img
          ? `https://islandetickets.com${img}`
          : undefined;

      // Try to find host/venue/date info near the link
      const parentText = $el.parent().text();
      const hostedBy = parentText
        .match(/hosted by\s+(.+?)(?:\n|$)/i)?.[1]
        ?.trim();
      const venue = parentText.match(/@\s*(.+?)(?:\n|$)/)?.[1]?.trim();

      events.push({
        title: title.slice(0, 100),
        url,
        imageUrl: imageUrl || undefined,
        host: hostedBy,
        venue,
      });
    });

    // Limit to 12 events max
    const limited = events.slice(0, 12);

    return NextResponse.json(limited, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    return NextResponse.json([] as TrendingEvent[]);
  }
}
