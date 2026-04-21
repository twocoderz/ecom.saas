import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  parsePlpFiltersFromSearchParams,
  toSearchParams,
  toggleFilterValue,
} from "../lib/filters";
import type { PlpFiltersQuery, PlpSortOption, PriceRange } from "../types";

type ArrayFilterKey =
  | "gender"
  | "brand"
  | "category"
  | "activity"
  | "collection"
  | "color";

/**
 * Synchronise les filtres catalogue avec l'URL pour rendre les liens partageables.
 */
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => parsePlpFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const updateFilters = useCallback(
    (
      updater: (
        current: Required<PlpFiltersQuery>,
      ) => Required<PlpFiltersQuery>,
    ) => {
      const next = updater(parsePlpFiltersFromSearchParams(searchParams));
      setSearchParams(toSearchParams(next), { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const toggleArrayFilter = useCallback(
    (key: ArrayFilterKey, value: string) => {
      updateFilters((current) => ({
        ...current,
        [key]: toggleFilterValue(current[key], value),
        page: 1,
      }));
    },
    [updateFilters],
  );

  const setSort = useCallback(
    (sort: PlpSortOption) => {
      updateFilters((current) => ({
        ...current,
        sort,
        page: 1,
      }));
    },
    [updateFilters],
  );

  const setPriceRange = useCallback(
    (priceRange: PriceRange) => {
      updateFilters((current) => ({
        ...current,
        price_range: priceRange,
        page: 1,
      }));
    },
    [updateFilters],
  );

  const setSearchText = useCallback(
    (q: string) => {
      updateFilters((current) => ({
        ...current,
        q,
        page: 1,
      }));
    },
    [updateFilters],
  );

  const setPage = useCallback(
    (page: number) => {
      updateFilters((current) => ({
        ...current,
        page: Math.max(1, page),
      }));
    },
    [updateFilters],
  );

  const setPerPage = useCallback(
    (perPage: number) => {
      updateFilters((current) => ({
        ...current,
        per_page: Math.max(1, perPage),
        page: 1,
      }));
    },
    [updateFilters],
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    toggleArrayFilter,
    setSort,
    setPriceRange,
    setSearchText,
    setPage,
    setPerPage,
    clearAllFilters,
  };
}
