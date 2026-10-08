import type { PlpFiltersQuery, PlpSortOption, PriceRange } from "../types";

const DEFAULT_SORT: PlpSortOption = "relevance";
const DEFAULT_PRICE_RANGE: PriceRange = "all";
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 12;

const ALLOWED_SORTS: readonly PlpSortOption[] = [
  "relevance",
  "newest",
  "top-rated",
  "price-low-high",
  "price-high-low",
] as const;

const ALLOWED_PRICE_RANGES: readonly PriceRange[] = [
  "all",
  "under-30k",
  "30-120k",
  "120-300k",
  "300k-plus",
] as const;

/** Alias compat : anciennes cles $ -> nouvelles cles FCFA (liens partageables). */
const LEGACY_PRICE_RANGE_ALIASES: Record<string, PriceRange> = {
  "under-50": "under-30k",
  "50-200": "30-120k",
  "200-500": "120-300k",
  "500-plus": "300k-plus",
};

function resolvePriceRange(raw: string | null): PriceRange {
  if (!raw) return DEFAULT_PRICE_RANGE;
  const normalized = raw.trim().toLowerCase();
  if ((ALLOWED_PRICE_RANGES as readonly string[]).includes(normalized)) {
    return normalized as PriceRange;
  }
  return LEGACY_PRICE_RANGE_ALIASES[normalized] ?? DEFAULT_PRICE_RANGE;
}

function uniq(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function readList(searchParams: URLSearchParams, key: string): string[] {
  const repeated = searchParams.getAll(key);
  const single = searchParams.get(key);
  const commaSeparated = single ? single.split(",") : [];

  return uniq(
    [...repeated, ...commaSeparated]
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

function readInteger(
  searchParams: URLSearchParams,
  key: string,
  fallback: number,
): number {
  const raw = searchParams.get(key);
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export function normalizeFilters(
  input: PlpFiltersQuery,
): Required<PlpFiltersQuery> {
  const sort = ALLOWED_SORTS.includes(input.sort ?? DEFAULT_SORT)
    ? (input.sort ?? DEFAULT_SORT)
    : DEFAULT_SORT;

  const priceRange = resolvePriceRange(
    input.price_range ?? DEFAULT_PRICE_RANGE,
  );

  return {
    q: (input.q ?? "").trim(),
    gender: uniq((input.gender ?? []).map((value) => value.toLowerCase())),
    brand: uniq((input.brand ?? []).map((value) => value.toLowerCase())),
    category: uniq((input.category ?? []).map((value) => value.toLowerCase())),
    activity: uniq((input.activity ?? []).map((value) => value.toLowerCase())),
    collection: uniq(
      (input.collection ?? []).map((value) => value.toLowerCase()),
    ),
    color: uniq((input.color ?? []).map((value) => value.toLowerCase())),
    price_range: priceRange,
    sort,
    page: input.page && input.page > 0 ? input.page : DEFAULT_PAGE,
    per_page:
      input.per_page && input.per_page > 0 ? input.per_page : DEFAULT_PER_PAGE,
  };
}

/**
 * Parse les query params URL pour garder des liens PLP partageables.
 */
export function parsePlpFiltersFromSearchParams(
  searchParams: URLSearchParams,
): Required<PlpFiltersQuery> {
  return normalizeFilters({
    q: searchParams.get("q") ?? "",
    gender: readList(searchParams, "gender"),
    brand: readList(searchParams, "brand"),
    category: readList(searchParams, "category"),
    activity: readList(searchParams, "activity"),
    collection: readList(searchParams, "collection"),
    color: readList(searchParams, "color"),
    price_range: resolvePriceRange(
      searchParams.get("price") ?? searchParams.get("price_range"),
    ),
    sort: (searchParams.get("sort") ?? DEFAULT_SORT) as PlpSortOption,
    page: readInteger(searchParams, "page", DEFAULT_PAGE),
    per_page: readInteger(searchParams, "per_page", DEFAULT_PER_PAGE),
  });
}

export function toSearchParams(
  filters: Required<PlpFiltersQuery>,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (filters.q) {
    searchParams.set("q", filters.q);
  }

  const appendValues = (key: string, values: string[]) => {
    values.forEach((value) => searchParams.append(key, value));
  };

  appendValues("gender", filters.gender);
  appendValues("brand", filters.brand);
  appendValues("category", filters.category);
  appendValues("activity", filters.activity);
  appendValues("collection", filters.collection);
  appendValues("color", filters.color);

  if (filters.price_range !== DEFAULT_PRICE_RANGE) {
    searchParams.set("price", filters.price_range);
  }

  if (filters.sort !== DEFAULT_SORT) {
    searchParams.set("sort", filters.sort);
  }

  if (filters.page !== DEFAULT_PAGE) {
    searchParams.set("page", String(filters.page));
  }

  if (filters.per_page !== DEFAULT_PER_PAGE) {
    searchParams.set("per_page", String(filters.per_page));
  }

  return searchParams;
}

export function toggleFilterValue(values: string[], value: string): string[] {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return values;
  }

  return values.includes(normalized)
    ? values.filter((item) => item !== normalized)
    : [...values, normalized];
}

export function applyPriceRange(
  price: number,
  priceRange: PriceRange,
): boolean {
  if (priceRange === "all") {
    return true;
  }

  // Seuils FCFA alinhes sur le catalogue (18k–126k) : distribution utile.
  if (priceRange === "under-30k") {
    return price < 30000;
  }

  if (priceRange === "30-120k") {
    return price >= 30000 && price <= 120000;
  }

  if (priceRange === "120-300k") {
    return price > 120000 && price <= 300000;
  }

  return price > 300000;
}
