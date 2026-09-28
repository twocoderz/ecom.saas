import { useCallback, useMemo } from "react";
import { useFilters } from "../../hooks/useFilters";
import { useProducts } from "../../hooks/useProducts";
import { priceLabelMap } from "../data/plp";
import type { ActiveFilterPill } from "../data/filterSections";
import type { PlpProductCard, PlpSortOption, PriceRange } from "../../types";

export type { ActiveFilterPill };

export type SortOption = PlpSortOption;

/**
 * Centralise l'etat et les derives du listing catalogue (PLP/Search).
 */
export function useCatalogFilters({
  slug = "mens-shoes",
}: {
  slug?: string;
} = {}) {
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

  const filteredProducts: PlpProductCard[] = listingResponse.items;

  const toggleDepartment = useCallback(
    (department: string) => {
      toggleArrayFilter("gender", department);
    },
    [toggleArrayFilter],
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      toggleArrayFilter("brand", brand);
    },
    [toggleArrayFilter],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      toggleArrayFilter("category", category);
    },
    [toggleArrayFilter],
  );

  const toggleActivity = useCallback(
    (activity: string) => {
      toggleArrayFilter("activity", activity);
    },
    [toggleArrayFilter],
  );

  const toggleCollection = useCallback(
    (collection: string) => {
      toggleArrayFilter("collection", collection);
    },
    [toggleArrayFilter],
  );

  const toggleColor = useCallback(
    (color: string) => {
      toggleArrayFilter("color", color);
    },
    [toggleArrayFilter],
  );

  const setSortBy = useCallback(
    (value: SortOption) => {
      setSort(value);
    },
    [setSort],
  );

  const setSelectedPriceRange = useCallback(
    (value: PriceRange) => {
      setPriceRange(value);
    },
    [setPriceRange],
  );

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
                label: priceLabelMap[selectedPriceRange],
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
      setSelectedPriceRange,
    ],
  );

  return {
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
