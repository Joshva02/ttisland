export interface Listing {
  name: string;
  type?: string;
  section?: string;
  phone?: string[];
  address?: string;
  description?: string;
  website?: string;
  email?: string;
  island?: string;
  fax?: string[];
  ticketUrl?: string;
}

export interface DataFile {
  source: string;
  page_title: string;
  category: string;
  scraped_at: string;
  data: Listing[];
}

export interface CategoryIndex {
  site: string;
  scraped_at: string;
  total_pages: number;
  total_items_extracted: number;
  categories: Record<string, { pages: string[]; page_count: number }>;
}

export type CategorySlug =
  | "eat"
  | "stay"
  | "explore"
  | "carnival"
  | "nightlife"
  | "culture"
  | "shop"
  | "sports"
  | "getting-around";

export interface CategoryMeta {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}
