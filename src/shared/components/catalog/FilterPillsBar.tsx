import { ActiveFilterPills } from "./ActiveFilterPills";
import type { ActiveFilterPill } from "../../data/filterSections";

type FilterPillsBarProps = {
  pills: ActiveFilterPill[];
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
      <ActiveFilterPills
        pills={pills}
        onClearAll={onClearAll}
        variant="listing"
      />
    </div>
  );
}
