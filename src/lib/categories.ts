import { CategoryMeta } from "./types";

export const categories: CategoryMeta[] = [
  {
    slug: "eat",
    title: "Eat & Drink",
    description:
      "From roti shops to fine dining, bake & shark to rum bars — discover the flavours of Trinidad & Tobago.",
    icon: "UtensilsCrossed",
    color: "#E85D04",
    gradient: "from-orange-500 to-red-500",
  },
  {
    slug: "stay",
    title: "Stay",
    description:
      "Hotels, guesthouses, and hostels across both islands for every budget.",
    icon: "Bed",
    color: "#7209B7",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    slug: "explore",
    title: "Explore",
    description:
      "Beaches, nature reserves, attractions, and hidden gems of the twin islands.",
    icon: "Compass",
    color: "#06D6A0",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    slug: "carnival",
    title: "Carnival",
    description:
      "Mas bands, J'ouvert, calypso tents, fetes — the greatest show on earth.",
    icon: "PartyPopper",
    color: "#F72585",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    slug: "nightlife",
    title: "Nightlife",
    description:
      "Bars, nightclubs, casinos, cinemas, galleries — limin' on de island.",
    icon: "Music",
    color: "#4361EE",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    slug: "culture",
    title: "Culture",
    description:
      "Steelpan, folklore, festivals, dialect — the soul of Trinbago.",
    icon: "Drum",
    color: "#F48C06",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    slug: "shop",
    title: "Shop",
    description:
      "Shopping malls, duty free, department stores — retail therapy island style.",
    icon: "ShoppingBag",
    color: "#9B5DE5",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    slug: "sports",
    title: "Sports & Adventure",
    description:
      "Diving, fishing, golf, yacht clubs — active adventures in paradise.",
    icon: "Waves",
    color: "#00BBF9",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    slug: "getting-around",
    title: "Getting Around",
    description:
      "Airlines, car rentals, taxis, ferries — navigate the islands with ease.",
    icon: "Car",
    color: "#4CC9F0",
    gradient: "from-sky-400 to-cyan-500",
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
