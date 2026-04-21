import { useMemo, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { useProducts } from "../../hooks/useProducts";
import type { PlpProductCard, PlpSortOption, PriceRange } from "../../types";

export type ActiveFilterPill = {
  key: string;
  label: string;
  onRemove: () => void;
};

export type SortOption = PlpSortOption;

/**
 * Centralise l'etat et les derives du listing catalogue (PLP/Search).
 */
export function useCatalogFilters({
  slug = "mens-shoes",
}: {
  slug?: string;
} = {}) {
  const [storeOnly, setStoreOnly] = useState(false);

  const {
    filters,
    toggleArrayFilter,
    setSort,
    setPriceRange,
    setPage,
    clearAllFilters,
  } = useFilters();

  const listingResponse = useProducts({
    slug,
    filters,
  });

  const departments = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "gender")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const brands = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "brand")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const categories = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "category")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const activities = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "activity")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const collections = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "collection")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const colors = useMemo(
    () =>
      listingResponse.facets
        .find((facet) => facet.key === "color")
        ?.values.map((value) => value.value) ?? [],
    [listingResponse.facets],
  );

  const selectedDepartments = filters.gender;
  const selectedBrands = filters.brand;
  const selectedCategories = filters.category;
  const selectedActivities = filters.activity;
  const selectedCollections = filters.collection;
  const selectedColors = filters.color;
  const selectedPriceRange = filters.price_range as PriceRange;
  const sortBy = filters.sort as SortOption;
  const searchQuery = filters.q;

  const filteredProducts: PlpProductCard[] = useMemo(() => {
    if (!storeOnly) {
      return listingResponse.items;
    }

    // Simule un filtrage disponibilite magasin, sans modifier la structure API.
    return listingResponse.items.filter((_product, index) => index % 2 === 0);
  }, [listingResponse.items, storeOnly]);

  const toggleDepartment = (department: string) => {
    toggleArrayFilter("gender", department);
  };

  const toggleBrand = (brand: string) => {
    toggleArrayFilter("brand", brand);
  };

  const toggleCategory = (category: string) => {
    toggleArrayFilter("category", category);
  };

  const toggleActivity = (activity: string) => {
    toggleArrayFilter("activity", activity);
  };

  const toggleCollection = (collection: string) => {
    toggleArrayFilter("collection", collection);
  };

  const toggleColor = (color: string) => {
    toggleArrayFilter("color", color);
  };

  const setSortBy = (value: SortOption) => {
    setSort(value);
  };

  const setSelectedPriceRange = (value: PriceRange) => {
    setPriceRange(value);
  };

  const activeFilterCount =
    selectedDepartments.length +
    selectedBrands.length +
    selectedCategories.length +
    selectedActivities.length +
    selectedCollections.length +
    selectedColors.length +
    (selectedPriceRange === "all" ? 0 : 1);

  const activeFilterPills = useMemo(
    () =>
      [
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
        ...selectedActivities.map((value) => ({
          key: `activity-${value}`,
          label: value,
          kind: "activity" as const,
          value,
        })),
        ...selectedCollections.map((value) => ({
          key: `collection-${value}`,
          label: value,
          kind: "collection" as const,
          value,
        })),
        ...selectedColors.map((value) => ({
          key: `color-${value}`,
          label: value,
          kind: "color" as const,
          value,
        })),
        ...(selectedPriceRange === "all"
          ? []
          : [
              {
                key: `price-${selectedPriceRange}`,
                label: selectedPriceRange,
                kind: "price" as const,
                value: selectedPriceRange,
              },
            ]),
      ].map((descriptor) => {
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

        if (descriptor.kind === "activity") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleActivity(descriptor.value as string),
          };
        }

        if (descriptor.kind === "collection") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleCollection(descriptor.value as string),
          };
        }

        if (descriptor.kind === "color") {
          return {
            key: descriptor.key,
            label: descriptor.label,
            onRemove: () => toggleColor(descriptor.value as string),
          };
        }

        return {
          key: descriptor.key,
          label: descriptor.label,
          onRemove: () => setSelectedPriceRange("all"),
        };
      }),
    [
      selectedDepartments,
      selectedBrands,
      selectedCategories,
      selectedActivities,
      selectedCollections,
      selectedColors,
      selectedPriceRange,
      toggleDepartment,
      toggleBrand,
      toggleCategory,
      toggleActivity,
      toggleCollection,
      toggleColor,
    ],
  );

  return {
    storeOnly,
    setStoreOnly,
    sortBy,
    setSortBy,
    departments,
    brands,
    categories,
    activities,
    collections,
    colors,
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedActivities,
    selectedCollections,
    selectedColors,
    selectedPriceRange,
    setSelectedPriceRange,
    toggleDepartment,
    toggleBrand,
    toggleCategory,
    toggleActivity,
    toggleCollection,
    toggleColor,
    filteredProducts,
    activeFilterCount,
    activeFilterPills,
    clearAllFilters,
    searchQuery,
    totalResults: listingResponse.pagination.total_items,
    currentPage: listingResponse.pagination.page,
    totalPages: listingResponse.pagination.total_pages,
    hasNextPage: listingResponse.pagination.has_next,
    hasPreviousPage: listingResponse.pagination.has_previous,
    goToNextPage: () => {
      if (listingResponse.pagination.has_next) {
        setPage(listingResponse.pagination.page + 1);
      }
    },
    goToPreviousPage: () => {
      if (listingResponse.pagination.has_previous) {
        setPage(listingResponse.pagination.page - 1);
      }
    },
    listingSeo: listingResponse.seo,
  };
}
