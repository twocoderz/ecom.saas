import type { PlpSortOption, PriceRange } from "../../types";

export type SortOption = PlpSortOption;
export type { PriceRange };

export type FilterSectionId =
  | "department"
  | "brand"
  | "category"
  | "activity"
  | "collection"
  | "color"
  | "price";

export const plpPageCopy = {
  breadcrumbRoot: "Accueil",
  breadcrumbCurrent: "Nouveautés",
  heading: "Nouveautés homme",
  drawerTitle: "Filtres & tri",
  drawerSubtitle: "Options de filtre",
  clearAll: "Tout effacer",
  close: "Fermer",
  showFilters: "Afficher les filtres",
  sortBy: "Trier par",
  shopMyStore: "Shop My Store :",
  chooseMyStore: "Choisir mon magasin",
  viewItems: "Voir les articles",
} as const;

export const priceRangeOptions: Array<{ id: PriceRange; label: string }> = [
  { id: "all", label: "Tous les prix" },
  { id: "under-50", label: "Moins de 30 000 F" },
  { id: "50-200", label: "30 000 à 120 000 F" },
  { id: "200-500", label: "120 000 à 300 000 F" },
  { id: "500-plus", label: "Plus de 300 000 F" },
];

export const priceLabelMap: Record<PriceRange, string> = {
  all: "Tous les prix",
  "under-50": "Moins de 30 000 F",
  "50-200": "30 000 à 120 000 F",
  "200-500": "120 000 à 300 000 F",
  "500-plus": "Plus de 300 000 F",
};

export const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "relevance", label: "Pertinence" },
  { value: "newest", label: "Nouveautés" },
  { value: "top-rated", label: "Mieux notés" },
  { value: "price-low-high", label: "Prix croissant" },
  { value: "price-high-low", label: "Prix décroissant" },
];

export const filterSectionLabels: Record<FilterSectionId, string> = {
  department: "Genre",
  brand: "Marque",
  category: "Catégorie",
  activity: "Activité",
  collection: "Collection",
  color: "Couleur",
  price: "Prix",
};

export const defaultOpenFilterSections: Record<FilterSectionId, boolean> = {
  department: false,
  brand: false,
  category: false,
  activity: false,
  collection: false,
  color: false,
  price: false,
};
