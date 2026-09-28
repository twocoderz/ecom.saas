import { CloseIcon } from "../../icons";
import { plpPageCopy } from "../../data/plp";
import type { ActiveFilterPill } from "../../data/filterSections";

type ActiveFilterPillsProps = {
  pills: ActiveFilterPill[];
  onClearAll: () => void;
  /** listing = pills compactes du PLP, sidebar = pills du drawer. */
  variant: "listing" | "sidebar";
  /** Majuscule sur la premiere lettre (comportement historique sidebar). */
  capitalizeLabels?: boolean;
};

const variantStyles = {
  listing: {
    list: "flex flex-wrap items-center gap-2",
    pill: "flex items-center gap-2 cursor-pointer rounded-full bg-black px-3 py-2 text-xs font-medium text-white",
    icon: "h-2 w-2 text-white/70 hover:text-white transition-all duration-300",
    clear:
      "text-xs cursor-pointer text-black-70 hover:text-black transition-all duration-300 underline underline-offset-2",
  },
  sidebar: {
    list: "flex flex-wrap gap-2",
    pill: "cursor-pointer flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white",
    icon: "h-4 w-4 text-white/80 hover:text-white transition-all duration-300",
    clear:
      "mt-4 cursor-pointer text-xs underline underline-offset-2 text-black-70",
  },
} as const;

function capitalizeFirst(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Pills de filtres actifs + action Tout effacer.
 * Source unique pour FilterPillsBar (listing) et FilterSidebar (drawer).
 */
export function ActiveFilterPills({
  pills,
  onClearAll,
  variant,
  capitalizeLabels = false,
}: ActiveFilterPillsProps) {
  const styles = variantStyles[variant];

  return (
    <>
      <ul className={styles.list}>
        {pills.map((pill) => (
          <li key={pill.key}>
            <button
              type="button"
              onClick={pill.onRemove}
              className={styles.pill}
            >
              <span>
                {capitalizeLabels ? capitalizeFirst(pill.label) : pill.label}
              </span>
              <CloseIcon className={styles.icon} />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onClearAll} className={styles.clear}>
        {plpPageCopy.clearAll}
      </button>
    </>
  );
}
