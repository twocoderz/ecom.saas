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
  { id: "under-30k", label: "Moins de 30 000 F" },
  { id: "30-120k", label: "30 000 à 120 000 F" },
  { id: "120-300k", label: "120 000 à 300 000 F" },
  { id: "300k-plus", label: "Plus de 300 000 F" },
];

export const priceLabelMap: Record<PriceRange, string> = {
  all: "Tous les prix",
  "under-30k": "Moins de 30 000 F",
  "30-120k": "30 000 à 120 000 F",
  "120-300k": "120 000 à 300 000 F",
  "300k-plus": "Plus de 300 000 F",
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
