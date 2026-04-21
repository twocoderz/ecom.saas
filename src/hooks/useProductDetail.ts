import { useMemo } from "react";
import { getPdpBySlug } from "../data/api/catalogApi";
import type { ApiPdpResponse } from "../types";

type UseProductDetailInput = {
  descriptiveSlug: string;
  productId: string;
};

/**
 * Hook PDP calque sur la forme d'un endpoint GET /pdp/{slug}/{id}.
 */
export function useProductDetail({
  descriptiveSlug,
  productId,
}: UseProductDetailInput): ApiPdpResponse | null {
  const cacheKey = `${descriptiveSlug}:${productId}`;

  return useMemo(
    () => getPdpBySlug({ descriptiveSlug, productId }),
    [cacheKey, descriptiveSlug, productId],
  );
}
