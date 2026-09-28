import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PlpListing } from "../../shared/components/catalog/PlpListing";
import { CategoryPageSpecifics } from "./components/CategoryPageSpecifics";

/**
 * Template PLP type JD.
 * Thin wrapper : le listing (filtres, tri, pagination, SEO) vit dans PlpListing,
 * partage avec CollectionPage (/collection/*).
 */
export function CategoryPage() {
  const params = useParams();
  const resolvedSlug = useMemo(() => {
    if (params.slug) {
      return params.slug;
    }

    if (params.department && params.category) {
      return `${params.department}-${params.category}`;
    }

    return "mens-shoes";
  }, [params.category, params.department, params.slug]);

  return <PlpListing slug={resolvedSlug} specifics={<CategoryPageSpecifics />} />;
}
