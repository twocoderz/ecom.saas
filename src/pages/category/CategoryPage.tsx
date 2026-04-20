import { CatalogFilterDrawer } from "../../shared/components/catalog/CatalogFilterDrawer";
import { FilterPillsBar } from "../../shared/components/catalog/FilterPillsBar";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { SortBar } from "../../shared/components/catalog/SortBar";
import { useCatalogFilters } from "../../shared/hooks/useCatalogFilters";
import { useFilterDrawer } from "../../shared/hooks/useFilterDrawer";
import { Container } from "../../shared/components/layout/Container";
import { CategoryPageSpecifics } from "./components/CategoryPageSpecifics";
import { plpPageCopy } from "../../shared/data/plp";

/**
 * Template PLP type JD.
 * Le panneau de filtres est ouvert a droite via un drawer overlay.
 */
export function CategoryPage() {
  const { isFilterOpen, openFilters, closeFilters } = useFilterDrawer();
  const {
    storeOnly,
    setStoreOnly,
    sortBy,
    setSortBy,
    departments,
    brands,
    categories,
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    setSelectedPriceRange,
    toggleDepartment,
    toggleBrand,
    toggleCategory,
    filteredProducts,
    activeFilterCount,
    activeFilterPills,
    clearAllFilters,
  } = useCatalogFilters();

  return (
    <Container>
      <div className="space-y-6 py-8">
        {/* Bread crumbs */}
        <nav className="text-xs text-black/70">
          <span className="underline underline-offset-2">
            {plpPageCopy.breadcrumbRoot}
          </span>
          <span className="mx-2">/</span>
          <span>{plpPageCopy.breadcrumbCurrent}</span>
        </nav>
        {/* Heading */}
        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-semibold text-black-80">
            {plpPageCopy.heading}
          </h1>
          <p className="pb-1 text-sm text-black-60">
            ({filteredProducts.length} items)
          </p>
        </div>

        <SortBar
          resultCount={filteredProducts.length}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenFilters={openFilters}
          storeOnly={storeOnly}
          onToggleStoreOnly={setStoreOnly}
        />

        <FilterPillsBar
          pills={activeFilterPills}
          onClearAll={clearAllFilters}
        />

        <ProductGrid products={filteredProducts} />
        <CategoryPageSpecifics />
      </div>

      <CatalogFilterDrawer
        id="plp-filter-drawer"
        isOpen={isFilterOpen}
        onClose={closeFilters}
        departments={departments}
        selectedDepartments={selectedDepartments}
        onToggleDepartment={toggleDepartment}
        brands={brands}
        selectedBrands={selectedBrands}
        onToggleBrand={toggleBrand}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={setSelectedPriceRange}
        onClearAll={clearAllFilters}
        resultCount={filteredProducts.length}
      />
    </Container>
  );
}
