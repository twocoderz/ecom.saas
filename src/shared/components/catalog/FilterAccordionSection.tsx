import type { ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons";

type FilterAccordionSectionProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  /** La derniere section (prix) n'a pas de bordure basse, comme avant. */
  bordered?: boolean;
  children: ReactNode;
};

/**
 * Accordéon de section de filtres (header + panneau).
 * Un seul endroit pour le style : chevrons h-5 w-5 partout.
 */
export function FilterAccordionSection({
  id,
  title,
  open,
  onToggle,
  bordered = true,
  children,
}: FilterAccordionSectionProps) {
  const panelId = `filter-panel-${id}`;
  const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon;

  return (
    <section className={bordered ? "border-b border-black/10" : undefined}>
      <div className="hover:bg-black-5 transition-all duration-300">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex cursor-pointer w-full items-center justify-between px-4 py-4"
        >
          <h3 className="text-lg font-medium text-black-80">{title}</h3>
          <ChevronIcon className="h-5 w-5 text-black" />
        </button>
      </div>

      {open && (
        <ul id={panelId} className="grid gap-3 px-4 py-4">
          {children}
        </ul>
      )}
    </section>
  );
}
