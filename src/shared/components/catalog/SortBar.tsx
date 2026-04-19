import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "../../icons";

export type SortOption =
  | "relevance"
  | "newest"
  | "top-rated"
  | "price-low-high"
  | "price-high-low";

type SortBarProps = {
  resultCount?: number;
  activeFilterCount?: number;
  sortBy?: SortOption;
  onSortChange?: (value: SortOption) => void;
  onOpenFilters?: () => void;
  storeOnly?: boolean;
  onToggleStoreOnly?: (checked: boolean) => void;
};

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "top-rated", label: "Top Rated" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

/**
 * Barre de controles PLP.
 * Repere JD : Shop My Store + Show Filters + Sort By.
 */
export function SortBar({
  resultCount = 0,
  activeFilterCount = 0,
  sortBy = "relevance",
  onSortChange,
  onOpenFilters,
  storeOnly = false,
  onToggleStoreOnly,
}: SortBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const canOpenFilters = typeof onOpenFilters === "function";
  const canToggleStore = typeof onToggleStoreOnly === "function";

  useEffect(() => {
    if (!isSortOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isSortOpen]);

  useEffect(() => {
    if (!isSortOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSortOpen]);

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? "Relevance";

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex items-center rounded-md border border-black/15 px-4 py-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-black">
            <input
              type="checkbox"
              checked={storeOnly}
              disabled={!canToggleStore}
              onChange={(event) => onToggleStoreOnly?.(event.target.checked)}
              className="h-5 w-5 rounded border-black/40"
            />
            <span>
              <span className="font-semibold">Shop My Store:</span>{" "}
              <span className="underline underline-offset-2">
                Choose My Store
              </span>
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={onOpenFilters}
          disabled={!canOpenFilters}
          className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-white ${
            canOpenFilters ? "bg-black" : "cursor-not-allowed bg-black/40"
          }`}
          aria-label="Afficher les filtres"
        >
          <span>Show Filters ({activeFilterCount})</span>
          <span aria-hidden="true" className="tracking-[-1px]">
            |||
          </span>
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-md border border-black/20 bg-white px-4 py-3 text-sm text-black"
            aria-haspopup="menu"
            aria-expanded={isSortOpen}
            aria-label="Trier les produits"
          >
            <span>
              <span className="font-semibold">Sort By:</span>{" "}
              {selectedSortLabel}
            </span>
            {isSortOpen ? (
              <CaretUpIcon className="h-3 w-3" />
            ) : (
              <CaretDownIcon className="h-3 w-3" />
            )}
          </button>

          {isSortOpen && (
            <ul
              role="menu"
              className="absolute right-0 top-[calc(100%+0.35rem)] z-30 w-full min-w-55 overflow-hidden rounded-md border border-black/35 bg-white shadow-lg"
            >
              {sortOptions.map((option) => {
                const isActive = option.value === sortBy;

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => {
                        onSortChange?.(option.value);
                        setIsSortOpen(false);
                      }}
                      className="flex w-full items-center justify-between border-b border-black/10 px-4 py-3 text-left text-sm last:border-b-0 hover:bg-black/5"
                    >
                      <span>{option.label}</span>
                      <span
                        className={`h-4 w-4 rounded-full border ${
                          isActive
                            ? "border-black bg-black"
                            : "border-black/40 bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <p className="sr-only">{resultCount} items</p>
    </div>
  );
}
