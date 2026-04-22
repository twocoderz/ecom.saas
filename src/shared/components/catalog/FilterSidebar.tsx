import { useMemo, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "../../icons";
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
  activities: string[];
  selectedActivities: string[];
  onToggleActivity: (activity: string) => void;
  collections: string[];
  selectedCollections: string[];
  onToggleCollection: (collection: string) => void;
  colors: string[];
  selectedColors: string[];
  onToggleColor: (color: string) => void;
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
  activities,
  selectedActivities,
  onToggleActivity,
  collections,
  selectedCollections,
  onToggleCollection,
  colors,
  selectedColors,
  onToggleColor,
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
      ...selectedActivities.map((activity) => ({
        key: `activity-${activity}`,
        label: formatLabel(activity),
        onRemove: () => onToggleActivity(activity),
      })),
      ...selectedCollections.map((collection) => ({
        key: `collection-${collection}`,
        label: formatLabel(collection),
        onRemove: () => onToggleCollection(collection),
      })),
      ...selectedColors.map((color) => ({
        key: `color-${color}`,
        label: formatLabel(color),
        onRemove: () => onToggleColor(color),
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
    selectedActivities,
    selectedCollections,
    selectedColors,
    selectedPriceRange,
    onToggleDepartment,
    onToggleBrand,
    onToggleCategory,
    onToggleActivity,
    onToggleCollection,
    onToggleColor,
    onSelectPriceRange,
  ]);

  const hasActiveFilters = activePills.length > 0;

  return (
    <aside className="flex h-full flex-col bg-white">
      {/* Selected filters */}
      <div className="border-b border-black/10 px-4 py-4">
        {hasActiveFilters && (
          <>
            <ul className="mt-4 flex flex-wrap gap-2">
              {activePills.map((pill) => (
                <li key={pill.key}>
                  <button
                    type="button"
                    onClick={pill.onRemove}
                    className="flex items-center gap-2 rounded-full bg-black px-3 py-3 text-xs font-medium text-white"
                  >
                    <span>{pill.label}</span>
                    <CloseIcon className="h-2 w-2" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className={`mt-4 text-xs underline underline-offset-2 ${
            hasActiveFilters
              ? "text-black-70"
              : "cursor-not-allowed text-black-30"
          }`}
        >
          {plpPageCopy.clearAll}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-black/10 px-4">
          <button
            type="button"
            onClick={() => toggleSection("department")}
            className="flex w-full items-center justify-between cursor-pointer hover:bg-black-5 transition-all duration-500 py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.department}
            </h3>
            {openSections.department ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
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
                      className="flex items-center justify-between text-xs text-black"
                    >
                      <span className="capitalize">{department}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleDepartment(department)}
                        className="h-3 w-3 rounded-md cursor-pointer border-black/30"
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
            className="flex w-full items-center justify-between cursor-pointer hover:bg-black-5 transition-all duration-500 py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.brand}
            </h3>
            {openSections.brand ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
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
                      className="flex cursor-pointer items-center justify-between text-xs text-black"
                    >
                      <span>{brand}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleBrand(brand)}
                        className="h-3 w-3 rounded-md border-black/30"
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
            className="flex w-full items-center justify-between cursor-pointer hover:bg-black-5 transition-all duration-500 py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.category}
            </h3>
            {openSections.category ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
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

        <section className="border-b border-black/10 px-4">
          <button
            type="button"
            onClick={() => toggleSection("activity")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.activity}
            </h3>
            {openSections.activity ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.activity && (
            <ul className="grid gap-3 pb-4">
              {activities.map((activity) => {
                const inputId = `filter-activity-${activity}`;
                const checked = selectedActivities.includes(activity);

                return (
                  <li key={activity}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span className="capitalize">{activity}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleActivity(activity)}
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
            onClick={() => toggleSection("collection")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.collection}
            </h3>
            {openSections.collection ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.collection && (
            <ul className="grid gap-3 pb-4">
              {collections.map((collection) => {
                const inputId = `filter-collection-${collection}`;
                const checked = selectedCollections.includes(collection);

                return (
                  <li key={collection}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span className="capitalize">{collection}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleCollection(collection)}
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
            onClick={() => toggleSection("color")}
            className="flex w-full items-center justify-between py-4"
          >
            <h3 className="text-xl font-semibold text-black">
              {filterSectionLabels.color}
            </h3>
            {openSections.color ? (
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
            )}
          </button>

          {openSections.color && (
            <ul className="grid gap-3 pb-4">
              {colors.map((color) => {
                const inputId = `filter-color-${color}`;
                const checked = selectedColors.includes(color);

                return (
                  <li key={color}>
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer items-center justify-between text-sm text-black"
                    >
                      <span className="capitalize">{color}</span>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleColor(color)}
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
              <ChevronUpIcon className="h-4 w-4 text-black" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-black" />
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
