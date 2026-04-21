import { useMemo } from "react";
import { getPlpBySlug } from "../data/api/catalogApi";
import type { ApiPlpResponse, PlpFiltersQuery } from "../types";

type UseProductsInput = {
  slug: string;
  filters: PlpFiltersQuery;
};

/**
 * Hook de listing catalogue, structure identique a la future reponse API backend.
 */
export function useProducts({
  slug,
  filters,
}: UseProductsInput): ApiPlpResponse {
  const cacheKey = `${slug}:${JSON.stringify(filters)}`;

  return useMemo(() => getPlpBySlug(slug, filters), [cacheKey, slug, filters]);
}
