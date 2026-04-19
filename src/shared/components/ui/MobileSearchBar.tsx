import { SearchIcon } from "../../icons";

export default function MobileSearchBar() {
  return (
    <div className="bg-white border border-black-70 px-p2 py-p2 rounded-full flex items-center gap-p2">
      <SearchIcon className="text-black-80" />
      <input
        type="text"
        placeholder="Seach for products..."
        className="border-none outline-none"
      />
    </div>
  );
}
