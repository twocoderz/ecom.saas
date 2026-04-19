export type PriceRange = "all" | "under-50" | "50-200" | "200-500" | "500-plus";

export type SortOption =
  | "relevance"
  | "newest"
  | "top-rated"
  | "price-low-high"
  | "price-high-low";

export type FilterSectionId = "department" | "brand" | "category" | "price";

export const plpPageCopy = {
  breadcrumbRoot: "Home",
  breadcrumbCurrent: "New Arrivals",
  heading: "Men's New Arrivals",
  drawerTitle: "Filter & Sort",
  drawerSubtitle: "Options de filtre",
  clearAll: "Clear all",
  close: "Close",
  showFilters: "Show Filters",
  sortBy: "Sort By",
  shopMyStore: "Shop My Store:",
  chooseMyStore: "Choose My Store",
  viewItems: "View Items",
} as const;

export const priceRangeOptions: Array<{ id: PriceRange; label: string }> = [
  { id: "all", label: "Tous les prix" },
  { id: "under-50", label: "Moins de $50" },
  { id: "50-200", label: "$50 a $200" },
  { id: "200-500", label: "$200 a $500" },
  { id: "500-plus", label: "Plus de $500" },
];

export const priceLabelMap: Record<PriceRange, string> = {
  all: "Tous les prix",
  "under-50": "Moins de $50",
  "50-200": "$50 a $200",
  "200-500": "$200 a $500",
  "500-plus": "Plus de $500",
};

export const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "top-rated", label: "Top Rated" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

export const filterSectionLabels: Record<FilterSectionId, string> = {
  department: "Department",
  brand: "Brand",
  category: "Category",
  price: "Price",
};

export const defaultOpenFilterSections: Record<FilterSectionId, boolean> = {
  department: true,
  brand: true,
  category: false,
  price: false,
};
