import { useSearchParams } from "react-router-dom";
import { PlpListing } from "../../shared/components/catalog/PlpListing";

/**
 * Resultats de recherche : meme template que les PLP catalogue.
 * Le header specifique (requete) passe par `titleOverride`,
 * tout le reste (filtres/tri/pagination/SEO) vit dans PlpListing.
 */
export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const title = query ? `Recherche : « ${query} »` : "Recherche";

  return <PlpListing slug="search-results" titleOverride={title} />;
}
