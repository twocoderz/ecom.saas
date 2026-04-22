import { useSearchQueryNavigation } from "../../hooks/useSearchQueryNavigation";
import { SearchIcon } from "../../icons";

export default function MobileSearchBar() {
  const { query, setQuery, submitSearch } = useSearchQueryNavigation();

  const handleSubmit = () => {
    submitSearch();
  };

  return (
    <div className="bg-white px-6 py-2 rounded-full flex items-center gap-p2 w-full">
      <button
        type="button"
        aria-label="Lancer la recherche"
        onClick={handleSubmit}
        className="bg-transparent border-none p-0"
      >
        <SearchIcon className="text-black-80" />
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
