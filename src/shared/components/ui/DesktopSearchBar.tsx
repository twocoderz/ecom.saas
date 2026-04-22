import { useSearchQueryNavigation } from "../../hooks/useSearchQueryNavigation";
import { SearchIcon } from "../../icons";

export default function DesktopSearchBar() {
  const { query, setQuery, submitSearch } = useSearchQueryNavigation();

  const handleSubmit = () => {
    submitSearch();
  };

  return (
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
        placeholder="Seach for products..."
        className="border-none outline-none text-sm text-black-80"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </div>
  );
}
