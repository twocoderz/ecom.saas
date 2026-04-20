import { priceLabelMap, type PriceRange, type SortOption } from "../data/plp";
import type { Product } from "../data/products";

export type CatalogFilterSelection = {
  selectedDepartments: string[];
  selectedBrands: string[];
  selectedCategories: string[];
  selectedPriceRange: PriceRange;
  sortBy: SortOption;
  storeOnly: boolean;
};

export type CatalogActiveFilterDescriptor = {
  key: string;
  label: string;
  kind: "department" | "brand" | "category" | "price";
  value: string | PriceRange;
};

export type CatalogFacetOptions = {
  departments: string[];
  brands: string[];
  categories: string[];
};

export function toggleArrayValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function getCatalogFacetOptions(
  products: Product[],
): CatalogFacetOptions {
  return {
    departments: Array.from(
      new Set(products.map((product) => product.department)),
    ),
    brands: Array.from(new Set(products.map((product) => product.brand))),
    categories: Array.from(
      new Set(products.map((product) => product.category)),
    ),
  };
}

export function applyCatalogFilters(
  products: Product[],
  filters: CatalogFilterSelection,
): Product[] {
  const {
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    sortBy,
    storeOnly,
  } = filters;

  let nextProducts = [...products];

  if (storeOnly) {
    // Mock de disponibilite magasin en attendant le vrai stock local.
    nextProducts = nextProducts.filter((_product, index) => index % 2 === 0);
  }

  if (selectedDepartments.length > 0) {
    nextProducts = nextProducts.filter((product) =>
      selectedDepartments.includes(product.department),
    );
  }

  if (selectedBrands.length > 0) {
    nextProducts = nextProducts.filter((product) =>
      selectedBrands.includes(product.brand),
    );
  }

  if (selectedCategories.length > 0) {
    nextProducts = nextProducts.filter((product) =>
      selectedCategories.includes(product.category),
    );
  }

  if (selectedPriceRange === "under-50") {
    nextProducts = nextProducts.filter((product) => product.price < 50);
  }

  if (selectedPriceRange === "50-200") {
    nextProducts = nextProducts.filter(
      (product) => product.price >= 50 && product.price <= 200,
    );
  }

  if (selectedPriceRange === "200-500") {
    nextProducts = nextProducts.filter(
      (product) => product.price > 200 && product.price <= 500,
    );
  }

  if (selectedPriceRange === "500-plus") {
    nextProducts = nextProducts.filter((product) => product.price > 500);
  }

  if (sortBy === "newest") {
    nextProducts.sort(
      (a, b) => Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id),
    );
  }

  if (sortBy === "top-rated") {
    nextProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "price-low-high") {
    nextProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high-low") {
    nextProducts.sort((a, b) => b.price - a.price);
  }

  return nextProducts;
}

export function calculateActiveFilterCount(
  filters: Pick<
    CatalogFilterSelection,
    | "selectedDepartments"
    | "selectedBrands"
    | "selectedCategories"
    | "selectedPriceRange"
  >,
): number {
  const {
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
  } = filters;

  return (
    selectedDepartments.length +
    selectedBrands.length +
    selectedCategories.length +
    (selectedPriceRange === "all" ? 0 : 1)
  );
}

export function getActiveFilterDescriptors(
  filters: Pick<
    CatalogFilterSelection,
    | "selectedDepartments"
    | "selectedBrands"
    | "selectedCategories"
    | "selectedPriceRange"
  >,
): CatalogActiveFilterDescriptor[] {
  const {
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
  } = filters;

  const descriptors: CatalogActiveFilterDescriptor[] = [
    ...selectedDepartments.map((value) => ({
      key: `department-${value}`,
      label: value,
      kind: "department" as const,
      value,
    })),
    ...selectedBrands.map((value) => ({
      key: `brand-${value}`,
      label: value,
      kind: "brand" as const,
      value,
    })),
    ...selectedCategories.map((value) => ({
      key: `category-${value}`,
      label: value,
      kind: "category" as const,
      value,
    })),
  ];

  if (selectedPriceRange !== "all") {
    descriptors.push({
      key: `price-${selectedPriceRange}`,
      label: priceLabelMap[selectedPriceRange],
      kind: "price",
      value: selectedPriceRange,
    });
  }

  return descriptors;
}
