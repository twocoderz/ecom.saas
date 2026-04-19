import { SearchIcon } from "../../icons";

export default function DesktopSearchBar() {
  return (
    <div className="bg-white px-p2 py-p2 rounded-l-md flex items-center gap-p2">
      <SearchIcon className="text-black-80" />
      <input
        type="text"
        placeholder="Seach for products..."
        className="border-none outline-none text-sm text-black-80"
      />
    </div>
  );
}
