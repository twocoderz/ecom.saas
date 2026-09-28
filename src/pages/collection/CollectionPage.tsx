import { useParams } from "react-router-dom";
import { PlpListing } from "../../shared/components/catalog/PlpListing";
import { getPlpDefaultSort } from "../../shared/data/plpListings";
import { CollectionPageSpecifics } from "./components/CollectionPageSpecifics";

/**
 * Page collection/campagne type JD (ex: /collection/new-arrivals).
 * Vraie PLP parametree : meme template que CategoryPage
 * (breadcrumb, titre + count, toolbar, filtres, tri, pagination, SEO).
 * "Nouveautes" trie par nouveautes par defaut.
 */
export function CollectionPage() {
  const params = useParams();
  const slug = params.slug ?? "new-arrivals";

  return (
    <PlpListing
      slug={slug}
      defaultSort={getPlpDefaultSort(slug)}
      specifics={<CollectionPageSpecifics />}
    />
  );
}
