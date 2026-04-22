import { plpPageCopy } from "../../data/plp";
import { CloseIcon } from "../../icons";

type FilterPillItem = {
  key: string;
  label: string;
  onRemove: () => void;
};

type FilterPillsBarProps = {
  pills: FilterPillItem[];
  onClearAll: () => void;
};

/**
 * Affiche les filtres actifs sous forme de pills avec action Clear all.
 */
export function FilterPillsBar({ pills, onClearAll }: FilterPillsBarProps) {
  if (pills.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={pill.onRemove}
          className="flex items-center gap-2 cursor-pointer rounded-full bg-black px-3 py-2 text-xs font-medium text-white"
        >
          <span>{pill.label}</span>
          <CloseIcon className="h-2 w-2 text-white/70 hover:text-white transition-all duration-300" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs cursor-pointer text-black-70 hover:text-black transition-all duration-300 underline underline-offset-2"
      >
        {plpPageCopy.clearAll}
      </button>
    </div>
  );
}
