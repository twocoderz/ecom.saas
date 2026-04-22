import { plpPageCopy, type PriceRange } from "../../data/plp";
import { CloseIcon } from "../../icons";
import { FilterSidebar } from "./FilterSidebar";

type CatalogFilterDrawerProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
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
  resultCount: number;
};

/**
 * Wrapper reutilisable du panneau de filtres catalogue (overlay + drawer right).
 */
export function CatalogFilterDrawer({
  id,
  isOpen,
  onClose,
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
  resultCount,
}: CatalogFilterDrawerProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fermer les filtres"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black-50"
        />
      )}

      <aside
        id={id}
        aria-label="Panneau des filtres"
        className={`flex flex-col fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header + close icon */}
        <div className="flex items-center justify-between border-b border-black-10 px-4 py-3">
          <h2 className="text-2xl font-semibold text-black-80">
            {plpPageCopy.drawerTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-black-5 rounded-md transition-all duration-500 bg-transparent border border-black-10 p-2 cursor-pointer"
          >
            <CloseIcon className="text-black w-3 h-3" />
          </button>
        </div>

        <FilterSidebar
          departments={departments}
          selectedDepartments={selectedDepartments}
          onToggleDepartment={onToggleDepartment}
          brands={brands}
          selectedBrands={selectedBrands}
          onToggleBrand={onToggleBrand}
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          activities={activities}
          selectedActivities={selectedActivities}
          onToggleActivity={onToggleActivity}
          collections={collections}
          selectedCollections={selectedCollections}
          onToggleCollection={onToggleCollection}
          colors={colors}
          selectedColors={selectedColors}
          onToggleColor={onToggleColor}
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={onSelectPriceRange}
          onClearAll={onClearAll}
          onApply={onClose}
          resultCount={resultCount}
        />
      </aside>
    </>
  );
}
