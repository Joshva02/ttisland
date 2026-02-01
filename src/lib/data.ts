import { Listing } from "./types";
import { enrichWithTicketLinks } from "./tickets";

import tdadRestaurants from "@/data/tdadrestaurants.json";
import tobRestaurants from "@/data/tobrestaurants.json";
import rotishops from "@/data/rotishops.json";
import bakenshark from "@/data/bakensharkshops.json";
import localdishes from "@/data/localdishes.json";
import bakeries from "@/data/bakeries.json";
import icecreamshops from "@/data/icecreamshops.json";
import foodcourts from "@/data/foodcourts.json";
import supermarkets from "@/data/supermarkets.json";
import pastryshops from "@/data/pastryshops.json";
import tdadHotels from "@/data/tdadhotels.json";
import tobHotels from "@/data/tobhotels.json";
import tdadGuesthouses from "@/data/tdadguesthouse.json";
import tobGuesthouses from "@/data/tobguesthouse.json";
import hostels from "@/data/hostels.json";
import beaches from "@/data/beaches.json";
import natureparks from "@/data/natureparks.json";
import carnival from "@/data/carnival.json";
import masbands from "@/data/masbands.json";
import panyards from "@/data/panyards.json";
import calypsonians from "@/data/calypsonians.json";
import tents from "@/data/tents.json";
import bars from "@/data/bars.json";
import nightclubs from "@/data/nightclubs.json";
import casinos from "@/data/casinos.json";
import gallery from "@/data/gallery.json";
import cinemas from "@/data/cinemas.json";
import halls from "@/data/halls.json";
import festivals from "@/data/festivals.json";
import dialect from "@/data/dialect.json";
import tntfacts from "@/data/tntfacts.json";
import shoppingmalls from "@/data/shoppingmalls.json";
import deptstores from "@/data/deptstores.json";
import dutyfree from "@/data/dutyfree.json";
import diving from "@/data/diving.json";
import fishing from "@/data/fishing.json";
import golf from "@/data/golf.json";
import yachtclubs from "@/data/yachtclubs.json";
import carrentals from "@/data/carrentals.json";
import airline from "@/data/airline.json";
import marinas from "@/data/marinas.json";

function extractData(file: Record<string, unknown>): Listing[] {
  const d = file.data;
  if (Array.isArray(d)) return d as Listing[];
  return [];
}

function sub(label: string, slug: string, file: Record<string, unknown>): SubCategory {
  const items = extractData(file);
  return { label, slug, items, count: items.length };
}

export type SubCategory = {
  label: string;
  slug: string;
  items: Listing[];
  count: number;
};

function getEatData(): SubCategory[] {
  return [
    sub("Trinidad Restaurants", "trinidad-restaurants", tdadRestaurants),
    sub("Tobago Restaurants", "tobago-restaurants", tobRestaurants),
    sub("Roti Shops", "roti-shops", rotishops),
    sub("Bake & Shark", "bake-shark", bakenshark),
    sub("Bakeries", "bakeries", bakeries),
    sub("Ice Cream Shops", "ice-cream", icecreamshops),
    sub("Pastry Shops", "pastry", pastryshops),
    sub("Food Courts", "food-courts", foodcourts),
    sub("Supermarkets", "supermarkets", supermarkets),
    sub("Local Dishes", "local-dishes", localdishes),
  ];
}

function getStayData(): SubCategory[] {
  return [
    sub("Trinidad Hotels", "trinidad-hotels", tdadHotels),
    sub("Tobago Hotels", "tobago-hotels", tobHotels),
    sub("Trinidad Guesthouses", "trinidad-guesthouses", tdadGuesthouses),
    sub("Tobago Guesthouses", "tobago-guesthouses", tobGuesthouses),
    sub("Hostels", "hostels", hostels),
  ];
}

function getExploreData(): SubCategory[] {
  return [
    sub("Beaches", "beaches", beaches),
    sub("Nature Reserves & Parks", "nature-parks", natureparks),
  ];
}

function getCarnivalData(): SubCategory[] {
  const carnivalSub = sub("Carnival Info", "carnival-info", carnival);
  return [
    sub("Mas Bands", "mas-bands", masbands),
    sub("Steelpan & Panyards", "panyards", panyards),
    sub("Calypsonians", "calypsonians", calypsonians),
    sub("Calypso Tents", "tents", tents),
    ...(carnivalSub.count > 0 ? [carnivalSub] : []),
  ];
}

function getNightlifeData(): SubCategory[] {
  return [
    sub("Bars", "bars", bars),
    sub("Night Clubs", "nightclubs", nightclubs),
    sub("Casinos", "casinos", casinos),
    sub("Art Galleries & Museums", "galleries", gallery),
    sub("Cinemas", "cinemas", cinemas),
    sub("Theatres & Halls", "theatres", halls),
  ];
}

function extractDialect(): Listing[] {
  const d = dialect.data;
  if (d && typeof d === "object" && "dialect_stories" in d) {
    const stories = (d as Record<string, unknown>).dialect_stories;
    if (Array.isArray(stories)) {
      return stories.map((s: Record<string, string>) => ({
        name: s.title || "",
        description: s.url ? `Story: ${s.title}` : "",
        type: "dialect",
      }));
    }
  }
  return [];
}

function getCultureData(): SubCategory[] {
  const dialectItems = extractDialect();
  return [
    sub("Festivals & Holidays", "festivals", festivals),
    sub("TnT Facts", "facts", tntfacts),
    ...(dialectItems.length > 0
      ? [{ label: "Trinbago Dialect", slug: "dialect", items: dialectItems, count: dialectItems.length }]
      : []),
  ];
}

function getShopData(): SubCategory[] {
  return [
    sub("Shopping Malls & Plazas", "malls", shoppingmalls),
    sub("Department Stores", "dept-stores", deptstores),
    sub("Duty Free Shops", "duty-free", dutyfree),
  ];
}

function getSportsData(): SubCategory[] {
  return [
    sub("Diving", "diving", diving),
    sub("Fishing", "fishing", fishing),
    sub("Golf", "golf", golf),
    sub("Yacht Clubs", "yacht-clubs", yachtclubs),
  ];
}

function getGettingAroundData(): SubCategory[] {
  return [
    sub("Car Rentals", "car-rentals", carrentals),
    sub("Airlines", "airlines", airline),
    sub("Marinas", "marinas", marinas),
  ];
}

const dataGetters: Record<string, () => SubCategory[]> = {
  eat: getEatData,
  stay: getStayData,
  explore: getExploreData,
  carnival: getCarnivalData,
  nightlife: getNightlifeData,
  culture: getCultureData,
  shop: getShopData,
  sports: getSportsData,
  "getting-around": getGettingAroundData,
};

export function getDataForCategory(slug: string): SubCategory[] {
  const getter = dataGetters[slug];
  if (!getter) return [];
  const subs = getter();
  return subs.map((sub) => ({
    ...sub,
    items: enrichWithTicketLinks(sub.items, slug),
  }));
}
