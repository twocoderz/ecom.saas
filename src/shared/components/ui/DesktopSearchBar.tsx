import { SearchIcon } from "../../icons";

export default function DesktopSearchBar() {
  return (
    <div className="bg-white px-4 py-2 rounded-l-sm flex items-center gap-p2">
      <SearchIcon className="text-black-60 w-4 h-4" />
      <input
        type="text"
        placeholder="Seach for products..."
        className="border-none outline-none text-sm text-black-80"
      />
    </div>
  );
}
