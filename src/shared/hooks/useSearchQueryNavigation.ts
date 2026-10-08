import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  SEARCH_QUERY_KEY,
  buildSearchDestination,
} from "../../config/paths";

/**
 * Source unique de la logique recherche (sync URL + submit navigation).
 * Le champ est initialise depuis l'URL ; la page /search lit ?q
 * directement, donc aucun effet de resync n'est necessaire.
 */
export function useSearchQueryNavigation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get(SEARCH_QUERY_KEY) ?? "");

  const submitSearch = () => {
    navigate(buildSearchDestination(query));
  };

  return {
    query,
    setQuery,
    submitSearch,
  };
}
