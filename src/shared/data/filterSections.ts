import type { FilterSectionId, PriceRange } from "./plp";

/**
 * Source de verite des pills de filtres actifs.
 * Produit par useCatalogFilters, consomme par FilterPillsBar et FilterSidebar
 * via le composant partage ActiveFilterPills.
 */
export type ActiveFilterPill = {
  key: string;
  label: string;
  onRemove: () => void;
};

export type CheckboxFilterSectionConfig = {
  kind: "checkbox";
  id: FilterSectionId;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  capitalize: boolean;
};

export type PriceFilterSectionConfig = {
  kind: "price";
  id: Extract<FilterSectionId, "price">;
  selected: PriceRange;
  onSelect: (range: PriceRange) => void;
};

export type FilterSectionConfig =
  | CheckboxFilterSectionConfig
  | PriceFilterSectionConfig;

export type FilterSectionsInput = {
  departments: string[];
  selectedDepartments: string[];
  onToggleDepartment: (value: string) => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (value: string) => void;
  activities: string[];
  selectedActivities: string[];
  onToggleActivity: (value: string) => void;
  collections: string[];
  selectedCollections: string[];
  onToggleCollection: (value: string) => void;
  colors: string[];
  selectedColors: string[];
  onToggleColor: (value: string) => void;
  selectedPriceRange: PriceRange;
  onSelectPriceRange: (range: PriceRange) => void;
};

/**
 * Construit la config des 7 sections de filtres dans un ordre stable.
 * Ajouter une facette = 1 entree ici, pas 45 lignes de JSX.
 */
export function buildFilterSections(
  input: FilterSectionsInput,
): FilterSectionConfig[] {
  return [
    {
      kind: "checkbox",
      id: "department",
      options: input.departments,
      selected: input.selectedDepartments,
      onToggle: input.onToggleDepartment,
      capitalize: true,
    },
    {
      kind: "checkbox",
      id: "brand",
      options: input.brands,
      selected: input.selectedBrands,
      onToggle: input.onToggleBrand,
      capitalize: false,
    },
    {
      kind: "checkbox",
      id: "category",
      options: input.categories,
      selected: input.selectedCategories,
      onToggle: input.onToggleCategory,
      capitalize: true,
    },
    {
      kind: "checkbox",
      id: "activity",
      options: input.activities,
      selected: input.selectedActivities,
      onToggle: input.onToggleActivity,
      capitalize: true,
    },
    {
      kind: "checkbox",
      id: "collection",
      options: input.collections,
      selected: input.selectedCollections,
      onToggle: input.onToggleCollection,
      capitalize: true,
    },
    {
      kind: "checkbox",
      id: "color",
      options: input.colors,
      selected: input.selectedColors,
      onToggle: input.onToggleColor,
      capitalize: true,
    },
    {
      kind: "price",
      id: "price",
      selected: input.selectedPriceRange,
      onSelect: input.onSelectPriceRange,
    },
  ];
}
