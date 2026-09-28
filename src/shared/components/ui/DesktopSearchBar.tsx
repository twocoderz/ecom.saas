import { useRef, useState } from "react";
import { useSearchQueryNavigation } from "../../hooks/useSearchQueryNavigation";
import { ChevronRightIcon, SearchIcon } from "../../icons";
import { SearchOverlay } from "../navigation/SearchOverlay";

/**
 * Segment recherche du bloc header unifié : loupe à gauche, flèche submit à droite.
 */
export default function DesktopSearchBar() {
  const { query, setQuery, submitSearch } = useSearchQueryNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    setIsFocused(false);
    submitSearch();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-w-0 flex-1 items-stretch"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 py-3 pl-4">
        <SearchIcon
          className="h-4 w-4 shrink-0 text-black-80"
          aria-hidden="true"
        />
        <label htmlFor="header-search" className="sr-only">
          Rechercher des produits
        </label>
        <input
          id="header-search"
          type="text"
          placeholder="Rechercher Nike Dunk, adidas..."
          className="w-full min-w-0 border-none bg-transparent text-sm text-black-80 outline-none placeholder:text-black-40"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            if (!containerRef.current?.contains(event.relatedTarget as Node)) {
              setIsFocused(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
            if (event.key === "Escape") {
              setIsFocused(false);
            }
          }}
        />
      </div>
      <button
        type="button"
        aria-label="Lancer la recherche"
        onClick={handleSubmit}
        className="mr-2 flex items-center justify-center self-center rounded-full bg-black-10 p-1.5 text-black-80 transition-colors hover:bg-black hover:text-white"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
      {isFocused && <SearchOverlay onNavigate={() => setIsFocused(false)} />}
    </div>
  );
}
