import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ROUTE_PATHS,
  SEARCH_QUERY_KEY,
  buildSearchDestination,
} from "../../config/paths";

/**
 * Source unique de la logique recherche (sync URL + submit navigation).
 */
export function useSearchQueryNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.pathname === ROUTE_PATHS.search) {
      setQuery(searchParams.get(SEARCH_QUERY_KEY) ?? "");
    }
  }, [location.pathname, searchParams]);

  const submitSearch = () => {
    navigate(buildSearchDestination(query));
  };

  return {
    query,
    setQuery,
    submitSearch,
  };
}
