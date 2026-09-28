import { useState } from "react";
import {
  defaultOpenFilterSections,
  filterSectionLabels,
  plpPageCopy,
  priceRangeOptions,
  type FilterSectionId,
} from "../../data/plp";
import type {
  ActiveFilterPill,
  FilterSectionConfig,
} from "../../data/filterSections";
import { FilterAccordionSection } from "./FilterAccordionSection";
import { FilterOptionRow } from "./FilterOptionRow";
import { ActiveFilterPills } from "./ActiveFilterPills";

type FilterSidebarProps = {
  isOpen: boolean;
  /** Config des sections construite par buildFilterSections. */
  sections: FilterSectionConfig[];
  activePills: ActiveFilterPill[];
  onClearAll: () => void;
  onApply: () => void;
  resultCount: number;
};

export function FilterSidebar({
  isOpen,
  sections,
  activePills,
  onClearAll,
  onApply,
  resultCount,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<
    Record<FilterSectionId, boolean>
  >(defaultOpenFilterSections);
  const [wasOpen, setWasOpen] = useState(isOpen);

  // Reset les sections a l'ouverture du drawer (ajustement pendant le rendu,
  // pas dans un effet : pas de rendu en cascade).
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setOpenSections(defaultOpenFilterSections);
    }
  }

  const toggleSection = (sectionId: FilterSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <aside className="flex flex-1 min-h-0 flex-col bg-white">
      <div className="overflow-y-auto min-h-0 flex-1">
        {activePills.length > 0 && (
          <div
            className="border-b border-black-10 px-4 py-4"
            aria-live="polite"
          >
            <ActiveFilterPills
              pills={activePills}
              onClearAll={onClearAll}
              variant="sidebar"
              capitalizeLabels
            />
          </div>
        )}

        <div>
          {sections.map((section) => {
            const isSectionOpen = openSections[section.id];

            if (section.kind === "price") {
              return (
                <FilterAccordionSection
                  key={section.id}
                  id={section.id}
                  title={filterSectionLabels[section.id]}
                  open={isSectionOpen}
                  onToggle={() => toggleSection(section.id)}
                  bordered={false}
                >
                  {priceRangeOptions.map((range) => (
                    <FilterOptionRow
                      key={range.id}
                      inputId={`filter-price-${range.id}`}
                      label={range.label}
                      type="radio"
                      name="price-range"
                      checked={section.selected === range.id}
                      onChange={() => section.onSelect(range.id)}
                    />
                  ))}
                </FilterAccordionSection>
              );
            }

            return (
              <FilterAccordionSection
                key={section.id}
                id={section.id}
                title={filterSectionLabels[section.id]}
                open={isSectionOpen}
                onToggle={() => toggleSection(section.id)}
              >
                {section.options.map((option) => (
                  <FilterOptionRow
                    key={option}
                    inputId={`filter-${section.id}-${option}`}
                    label={option}
                    capitalize={section.capitalize}
                    type="checkbox"
                    checked={section.selected.includes(option)}
                    onChange={() => section.onToggle(option)}
                  />
                ))}
              </FilterAccordionSection>
            );
          })}
        </div>
      </div>

      <div className="border-t border-black-10 p-4">
        <button
          type="button"
          onClick={onApply}
          className="rounded-sm cursor-pointer bg-primary px-4 py-3 text-sm font-normal text-white"
        >
          {plpPageCopy.viewItems} ({resultCount})
        </button>
      </div>
    </aside>
  );
}
