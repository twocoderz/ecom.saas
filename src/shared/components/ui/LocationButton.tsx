import { GlobeIcon } from "../../icons";

export default function LocationButton() {
  return (
    <div className="bg-white hover:bg-white/90 transition-all duration-500 border-l border-black-80">
      <button
        type="button"
        aria-label="Change location"
        className="cursor-pointer flex items-center gap-2 px-4 py-3"
      >
        <GlobeIcon className="text-black-60 w-3 h-3" />
        <span className="text-black-80 text-sm font-normal">Choose</span>
      </button>
    </div>
  );
}
