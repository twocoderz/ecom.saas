import { useEffect } from "react";
import { CatalogFilterDrawer } from "../../shared/components/catalog/CatalogFilterDrawer";
import { FilterPillsBar } from "../../shared/components/catalog/FilterPillsBar";
import { Pagination } from "../../shared/components/catalog/Pagination";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { SortBar } from "../../shared/components/catalog/SortBar";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { useCatalogFilters } from "../../shared/hooks/useCatalogFilters";
import { useFilterDrawer } from "../../shared/hooks/useFilterDrawer";
import { applySeoToDocument } from "../../lib/seo";

/**
 * Search results template.
 * JD mapping: search listing variant close to PLP, with same product grid system.
 */
export function SearchResultsPage() {
  const { isFilterOpen, openFilters, closeFilters } = useFilterDrawer();
  const {
    sortBy,
    setSortBy,
    departments,
    brands,
    categories,
    activities,
    collections,
    colors,
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedActivities,
    selectedCollections,
    selectedColors,
    selectedPriceRange,
    setSelectedPriceRange,
    toggleDepartment,
    toggleBrand,
    toggleCategory,
    toggleActivity,
    toggleCollection,
    toggleColor,
    filteredProducts,
    activeFilterCount,
    activeFilterPills,
    clearAllFilters,
    totalResults,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    listingSeo,
    searchQuery,
  } = useCatalogFilters({ slug: "search-results" });

  useEffect(() => {
    applySeoToDocument(listingSeo);
  }, [listingSeo]);

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title="Recherche"
          subtitle={`Résultats filtrés et triés (${totalResults} articles)${
            searchQuery ? ` pour "${searchQuery}"` : ""
          }.`}
        />

        <SortBar
          resultCount={totalResults}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenFilters={openFilters}
        />

        <FilterPillsBar
          pills={activeFilterPills}
          onClearAll={clearAllFilters}
        />

        <ProductGrid products={filteredProducts} />

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          hasPrevious={hasPreviousPage}
          hasNext={hasNextPage}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
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
        activities={activities}
        selectedActivities={selectedActivities}
        onToggleActivity={toggleActivity}
        collections={collections}
        selectedCollections={selectedCollections}
        onToggleCollection={toggleCollection}
        colors={colors}
        selectedColors={selectedColors}
        onToggleColor={toggleColor}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={setSelectedPriceRange}
        onClearAll={clearAllFilters}
        resultCount={totalResults}
      />
    </Container>
  );
}
