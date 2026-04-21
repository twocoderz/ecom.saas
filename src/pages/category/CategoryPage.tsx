import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CatalogFilterDrawer } from "../../shared/components/catalog/CatalogFilterDrawer";
import { FilterPillsBar } from "../../shared/components/catalog/FilterPillsBar";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { SortBar } from "../../shared/components/catalog/SortBar";
import { useCatalogFilters } from "../../shared/hooks/useCatalogFilters";
import { useFilterDrawer } from "../../shared/hooks/useFilterDrawer";
import { Container } from "../../shared/components/layout/Container";
import { CategoryPageSpecifics } from "./components/CategoryPageSpecifics";
import { plpPageCopy } from "../../shared/data/plp";
import { applySeoToDocument } from "../../lib/seo";

/**
 * Template PLP type JD.
 * Le panneau de filtres est ouvert a droite via un drawer overlay.
 */
export function CategoryPage() {
  const params = useParams();
  const resolvedSlug = useMemo(() => {
    if (params.slug) {
      return params.slug;
    }

    if (params.department && params.category) {
      return `${params.department}-${params.category}`;
    }

    return "mens-shoes";
  }, [params.category, params.department, params.slug]);

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
    totalResults,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    listingSeo,
  } = useCatalogFilters({ slug: resolvedSlug });

  useEffect(() => {
    applySeoToDocument(listingSeo);
  }, [listingSeo]);

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
            {resolvedSlug.replace(/-/g, " ")}
          </h1>
          <p className="pb-1 text-sm text-black-60">({totalResults} items)</p>
        </div>

        <SortBar
          resultCount={totalResults}
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

        <div className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={!hasPreviousPage}
            className="rounded-md border border-black/20 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-black/70">
            Page {currentPage} / {totalPages}
          </p>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="rounded-md border border-black/20 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
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
        resultCount={totalResults}
      />
    </Container>
  );
}
