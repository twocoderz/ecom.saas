/**
 * Mapping slug -> titre d'affichage pour les PLP.
 * Source unique utilisee par CategoryPage (/plp/*, /c/*) et
 * CollectionPage (/collection/*) via le template partage PlpListing.
 */
const PLP_TITLE_MAP: Record<string, string> = {
  "mens-shoes": "Chaussures homme",
  "mens-clothing": "Vêtements homme",
  "womens-shoes": "Chaussures femme",
  "womens-clothing": "Vêtements femme",
  "kids-shoes": "Chaussures enfant",
  "new-arrivals": "Nouveautés",
  "recent-releases": "Sorties récentes",
  "running-shoes": "Chaussures running",
  "lifestyle-shoes": "Sneakers lifestyle",
  "t-shirts": "T-shirts",
  hoodies: "Sweats à capuche",
  tracksuits: "Survêtements",
  shorts: "Shorts",
  bags: "Sacs",
  shoes: "Chaussures",
  clothing: "Vêtements",
  accessories: "Accessoires",
};

/** Slugs qui doivent trier par nouveautes par defaut. */
const NEWEST_DEFAULT_SLUGS = new Set(["new-arrivals", "recent-releases"]);

function toTitleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function resolvePlpTitle(slug: string, override?: string): string {
  if (override) return override;
  const normalized = slug.trim().toLowerCase();
  return PLP_TITLE_MAP[normalized] ?? toTitleCaseSlug(normalized);
}

export function getPlpDefaultSort(
  slug: string,
): "newest" | undefined {
  if (NEWEST_DEFAULT_SLUGS.has(slug.trim().toLowerCase())) {
    return "newest";
  }
  return undefined;
}
