import { CatalogFilterDrawer } from "../../shared/components/catalog/CatalogFilterDrawer";
import { FilterPillsBar } from "../../shared/components/catalog/FilterPillsBar";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { SortBar } from "../../shared/components/catalog/SortBar";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { useCatalogFilters } from "../../shared/hooks/useCatalogFilters";
import { useFilterDrawer } from "../../shared/hooks/useFilterDrawer";

/**
 * Search results template.
 * JD mapping: search listing variant close to PLP, with same product grid system.
 */
export function SearchResultsPage() {
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
        <PageHeader
          title="Recherche"
          subtitle={`Resultats filtres et tries (${filteredProducts.length} items).`}
        />

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
      </div>

      <CatalogFilterDrawer
        id="search-filter-drawer"
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
