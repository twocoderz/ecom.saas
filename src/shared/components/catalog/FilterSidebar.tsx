import { useMemo, useState } from "react";
import { CaretDownIcon, CaretUpIcon, CloseIcon } from "../../icons";
import {
  defaultOpenFilterSections,
  filterSectionLabels,
  plpPageCopy,
  priceLabelMap,
  priceRangeOptions,
  type FilterSectionId,
  type PriceRange,
} from "../../data/plp";

type FilterSidebarProps = {
  departments: string[];
  selectedDepartments: string[];
  onToggleDepartment: (department: string) => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedPriceRange: PriceRange;
  onSelectPriceRange: (range: PriceRange) => void;
  onClearAll: () => void;
  onApply: () => void;
  resultCount: number;
};

function formatLabel(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Panneau de facettes pour le tiroir de filtres.
 * Repere JD : colonnes de filtres (gender/brand/category/price) dans le panneau droit.
 */
export function FilterSidebar({
  departments,
  selectedDepartments,
  onToggleDepartment,
  brands,
  selectedBrands,
  onToggleBrand,
  categories,
  selectedCategories,
  onToggleCategory,
  selectedPriceRange,
  onSelectPriceRange,
  onClearAll,
  onApply,
  resultCount,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<
    Record<FilterSectionId, boolean>
  >(defaultOpenFilterSections);

  const toggleSection = (sectionId: FilterSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const activePills = useMemo(() => {
    const pills = [
      ...selectedDepartments.map((department) => ({
        key: `department-${department}`,
        label: formatLabel(department),
        onRemove: () => onToggleDepartment(department),
      })),
      ...selectedBrands.map((brand) => ({
        key: `brand-${brand}`,
        label: brand,
        onRemove: () => onToggleBrand(brand),
      })),
      ...selectedCategories.map((category) => ({
        key: `category-${category}`,
        label: formatLabel(category),
        onRemove: () => onToggleCategory(category),
      })),
    ];

    if (selectedPriceRange !== "all") {
      pills.push({
        key: `price-${selectedPriceRange}`,
        label: priceLabelMap[selectedPriceRange],
        onRemove: () => onSelectPriceRange("all"),
      });
    }

    return pills;
  }, [
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    onToggleDepartment,
    onToggleBrand,
    onToggleCategory,
    onSelectPriceRange,
  ]);

  const hasActiveFilters = activePills.length > 0;

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="border-b border-black/10 px-4 py-4">
        <h2 className="text-2xl font-semibold text-black">
          {plpPageCopy.drawerTitle}
        </h2>

        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className={`mt-4 text-sm underline underline-offset-2 ${
            hasActiveFilters
              ? "text-black/70"
              : "cursor-not-allowed text-black/30"
          }`}
        >
          {plpPageCopy.clearAll}
        </button>

        {hasActiveFilters && (
          <>
            <ul className="mt-4 flex flex-wrap gap-2">
              {activePills.map((pill) => (
                <li key={pill.key}>
                  <button
                    type="button"
                    onClick={pill.onRemove}
                    className="flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
                  >
                    <span>{pill.label}</span>
                    <CloseIcon className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-black/10 px-4">
          <button
            type="button"
            onClick={() => toggleSection("department")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.department}
            </h3>
            {openSections.department ? (
              <CaretUpIcon className="h-4 w-4 text-black" />
            ) : (
              <CaretDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.department && (
            <ul className="grid gap-3 pb-4">
              {departments.map((department) => {
                const inputId = `filter-department-${department}`;
                const checked = selectedDepartments.includes(department);

                return (
                  <li key={department}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span className="capitalize">{department}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleDepartment(department)}
                        className="h-5 w-5 rounded border-black/30"
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="border-b border-black/10 px-4">
          <button
            type="button"
            onClick={() => toggleSection("brand")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.brand}
            </h3>
            {openSections.brand ? (
              <CaretUpIcon className="h-4 w-4 text-black" />
            ) : (
              <CaretDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.brand && (
            <ul className="grid gap-3 pb-4">
              {brands.map((brand) => {
                const inputId = `filter-brand-${brand}`;
                const checked = selectedBrands.includes(brand);

                return (
                  <li key={brand}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span>{brand}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleBrand(brand)}
                        className="h-5 w-5 rounded border-black/30"
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="border-b border-black/10 px-4">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.category}
            </h3>
            {openSections.category ? (
              <CaretUpIcon className="h-4 w-4 text-black" />
            ) : (
              <CaretDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.category && (
            <ul className="grid gap-3 pb-4">
              {categories.map((category) => {
                const inputId = `filter-category-${category}`;
                const checked = selectedCategories.includes(category);

                return (
                  <li key={category}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span className="capitalize">{category}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleCategory(category)}
                        className="h-5 w-5 rounded border-black/30"
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="px-4">
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.price}
            </h3>
            {openSections.price ? (
              <CaretUpIcon className="h-4 w-4 text-black" />
            ) : (
              <CaretDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.price && (
            <ul className="grid gap-3 pb-4">
              {priceRangeOptions.map((range) => {
                const inputId = `filter-price-${range.id}`;
                const checked = selectedPriceRange === range.id;

                return (
                  <li key={range.id}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span>{range.label}</span>
                      <input
                        id={inputId}
                        type="radio"
                        name="price-range"
                        checked={checked}
                        onChange={() => onSelectPriceRange(range.id)}
                        className="h-5 w-5 border-black/30"
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <div className="border-t border-black/10 p-4">
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-sm bg-[#d8eb2a] px-4 py-3 text-sm font-semibold text-black"
        >
          {plpPageCopy.viewItems} ({resultCount})
        </button>
      </div>
    </aside>
  );
}
