import { useRef, useState } from "react";
import { useSearchQueryNavigation } from "../../hooks/useSearchQueryNavigation";
import { SearchIcon } from "../../icons";
import { SearchOverlay } from "../navigation/SearchOverlay";

export default function DesktopSearchBar() {
  const { query, setQuery, submitSearch } = useSearchQueryNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    setIsFocused(false);
    submitSearch();
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="bg-white px-4 py-3 rounded-l-sm flex items-center gap-p2 w-md">
        <button
          type="button"
          aria-label="Lancer la recherche"
          onClick={handleSubmit}
          className="bg-transparent border-none p-0"
        >
          <SearchIcon className="text-black-80 w-4 h-4" />
        </button>
        <input
          type="text"
          placeholder="Search for products..."
          aria-label="Rechercher des produits"
          className="border-none outline-none text-sm text-black-80 w-full"
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
      {isFocused && <SearchOverlay onNavigate={() => setIsFocused(false)} />}
    </div>
  );
}
