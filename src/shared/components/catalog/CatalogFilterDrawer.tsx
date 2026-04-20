import { plpPageCopy, type PriceRange } from "../../data/plp";
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
          className="fixed inset-0 z-40 bg-black/55"
        />
      )}

      <aside
        id={id}
        aria-label="Panneau des filtres"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <p className="text-sm font-medium text-black/70">
            {plpPageCopy.drawerSubtitle}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-black underline underline-offset-2"
          >
            {plpPageCopy.close}
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
