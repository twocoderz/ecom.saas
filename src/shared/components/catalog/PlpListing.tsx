import { useEffect, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CatalogFilterDrawer } from "./CatalogFilterDrawer";
import { FilterPillsBar } from "./FilterPillsBar";
import { Pagination } from "./Pagination";
import { ProductGrid } from "./ProductGrid";
import { SortBar } from "./SortBar";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import { useFilterDrawer } from "../../hooks/useFilterDrawer";
import { Container } from "../layout/Container";
import { plpPageCopy } from "../../data/plp";
import { resolvePlpTitle } from "../../data/plpListings";
import { applySeoToDocument } from "../../../lib/seo";

type PlpListingProps = {
  slug: string;
  /** Tri force quand l'URL ne precise pas ?sort (ex: "newest" pour Nouveautes). */
  defaultSort?: "newest";
  titleOverride?: string;
  /** Bloc editorial bas de page (CategoryPageSpecifics, CollectionPageSpecifics...). */
  specifics?: ReactNode;
};

/**
 * Utilise par CategoryPage (/plp/*, /c/*) et CollectionPage (/collection/*).
 */
export function PlpListing({
  slug,
  defaultSort,
  titleOverride,
  specifics,
}: PlpListingProps) {
  const readableTitle = resolvePlpTitle(slug, titleOverride);
  const [searchParams] = useSearchParams();
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
  } = useCatalogFilters({ slug });

  // Tri par defaut (ex: Nouveautes -> newest) tant que l'URL ne fixe pas ?sort.
  useEffect(() => {
    if (defaultSort && !searchParams.get("sort") && sortBy !== defaultSort) {
      setSortBy(defaultSort);
    }
  }, [defaultSort, searchParams, sortBy, setSortBy]);

  useEffect(() => {
    applySeoToDocument(listingSeo);
  }, [listingSeo]);

  return (
    <Container>
      <div className="space-y-6 py-8">
        {/* Fil d'Ariane dynamique */}
        <nav className="text-xs text-black-70" aria-label="Fil d'Ariane">
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-black"
          >
            {plpPageCopy.breadcrumbRoot}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{readableTitle}</span>
        </nav>
        {/* Titre */}
        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-semibold text-black-80">
            {readableTitle}
          </h1>
          <p className="pb-1 text-sm text-black-60">
            ({totalResults} articles)
          </p>
        </div>

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
        {specifics}
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
