import { useCallback, useMemo, useState } from "react";
import { type PriceRange, type SortOption } from "../data/plp";
import { productCatalog, type Product } from "../data/products";
import {
  applyCatalogFilters,
  calculateActiveFilterCount,
  getActiveFilterDescriptors,
  getCatalogFacetOptions,
  toggleArrayValue,
} from "../utils/catalogFilters";

export type ActiveFilterPill = {
  key: string;
  label: string;
  onRemove: () => void;
};

type UseCatalogFiltersOptions = {
  products?: Product[];
};

/**
 * Centralise l'etat et les derives du listing catalogue (PLP/Search).
 */
export function useCatalogFilters({
  products = productCatalog,
}: UseCatalogFiltersOptions = {}) {
  const [storeOnly, setStoreOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange>("all");

  const { departments, brands, categories } = useMemo(
    () => getCatalogFacetOptions(products),
    [products],
  );

  const toggleDepartment = useCallback((department: string) => {
    setSelectedDepartments((prev) => toggleArrayValue(prev, department));
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) => toggleArrayValue(prev, brand));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) => toggleArrayValue(prev, category));
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedDepartments([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPriceRange("all");
  }, []);

  const filteredProducts = useMemo(
    () =>
      applyCatalogFilters(products, {
        selectedDepartments,
        selectedBrands,
        selectedCategories,
        selectedPriceRange,
        sortBy,
        storeOnly,
      }),
    [
      products,
      selectedDepartments,
      selectedBrands,
      selectedCategories,
      selectedPriceRange,
      sortBy,
      storeOnly,
    ],
  );

  const activeFilterCount = useMemo(
    () =>
      calculateActiveFilterCount({
        selectedDepartments,
        selectedBrands,
        selectedCategories,
        selectedPriceRange,
      }),
    [
      selectedDepartments,
      selectedBrands,
      selectedCategories,
      selectedPriceRange,
    ],
  );

  const activeFilterDescriptors = useMemo(
    () =>
      getActiveFilterDescriptors({
        selectedDepartments,
        selectedBrands,
        selectedCategories,
        selectedPriceRange,
      }),
    [
      selectedDepartments,
      selectedBrands,
      selectedCategories,
      selectedPriceRange,
    ],
  );

  const activeFilterPills = useMemo(
    () =>
      activeFilterDescriptors.map((descriptor) => {
        if (descriptor.kind === "department") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleDepartment(descriptor.value as string),
          };
        }

        if (descriptor.kind === "brand") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleBrand(descriptor.value as string),
          };
        }

        if (descriptor.kind === "category") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleCategory(descriptor.value as string),
          };
        }

        return {
          key: descriptor.key,
          label: descriptor.label,
          onRemove: () => setSelectedPriceRange("all"),
        };
      }),
    [activeFilterDescriptors, toggleDepartment, toggleBrand, toggleCategory],
  );

  return {
    storeOnly,
    setStoreOnly,
    sortBy,
    setSortBy,
    departments,
    brands,
    categories,
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    setSelectedPriceRange,
    toggleDepartment,
    toggleBrand,
    toggleCategory,
    filteredProducts,
    activeFilterCount,
    activeFilterPills,
    clearAllFilters,
  };
}
