import { useParams } from "react-router-dom";
import { PlpListing } from "../../shared/components/catalog/PlpListing";
import { brands } from "../../data/mock";

/**
 * Page marque : meme template PLP que Category/Collection.
 * Le slug de marque filtre via `getPlpBySlug` (support natif des slugs marque).
 */
export function BrandPage() {
  const params = useParams();
  const slug = (params.slug ?? "").trim().toLowerCase() || "nike";
  const brand = brands.find((candidate) => candidate.slug === slug);
  const title = brand ? `Marque ${brand.name}` : `Marque ${slug}`;

  return <PlpListing slug={slug} titleOverride={title} />;
}
