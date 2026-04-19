import { GlobeIcon } from "../../icons";

export default function LocationButton() {
  return (
    <button
      type="button"
      aria-label="Change location"
      className="bg-white hover:bg-black-5 transition-all duration-500 px-p2 py-p2 flex items-center gap-p2 border-l border-black-80 cursor-pointer"
    >
      <GlobeIcon className="text-black-80" />
      <span className="uppercase text-black-80 text-md font-normal">
        Choose
      </span>
    </button>
  );
}
