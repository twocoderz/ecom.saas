import { SearchIcon } from "../../icons";

export default function MobileSearchBar() {
  return (
    <div className="bg-white px-6 py-2 rounded-full flex items-center gap-p2 w-full">
      <SearchIcon className="text-black-80" />
      <input
        type="text"
        placeholder="Seach for products..."
        className="border-none outline-none text-sm text-black-80"
      />
    </div>
  );
}
