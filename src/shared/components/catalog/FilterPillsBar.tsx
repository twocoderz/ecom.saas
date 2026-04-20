import { plpPageCopy } from "../../data/plp";

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
          className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
        >
          {pill.label} x
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-black/70 underline underline-offset-2"
      >
        {plpPageCopy.clearAll}
      </button>
    </div>
  );
}
