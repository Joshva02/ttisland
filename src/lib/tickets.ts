const ISLANDETICKETS_SEARCH = "https://www.islandetickets.com/search?q=";

export function getTicketSearchUrl(name: string): string {
  return `${ISLANDETICKETS_SEARCH}${encodeURIComponent(name)}`;
}

export function enrichWithTicketLinks<
  T extends { name: string; type?: string; ticketUrl?: string },
>(items: T[], categorySlug: string): T[] {
  const eventCategories = new Set(["carnival", "culture", "nightlife"]);
  if (!eventCategories.has(categorySlug)) return items;

  const eventTypes = new Set([
    "mas_band",
    "panyard",
    "calypso_tent",
    "festival",
    "carnival",
  ]);

  return items.map((item) => {
    if (item.ticketUrl) return item;
    if (item.type && eventTypes.has(item.type)) {
      return { ...item, ticketUrl: getTicketSearchUrl(item.name) };
    }
    return item;
  });
}
