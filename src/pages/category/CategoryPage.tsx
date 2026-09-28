import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { CatalogFilterDrawer } from "../../shared/components/catalog/CatalogFilterDrawer";
import { FilterPillsBar } from "../../shared/components/catalog/FilterPillsBar";
import { Pagination } from "../../shared/components/catalog/Pagination";
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

  const readableTitle = useMemo(() => {
    const slugMap: Record<string, string> = {
      "mens-shoes": "Chaussures homme",
      "mens-clothing": "Vêtements homme",
      "womens-shoes": "Chaussures femme",
      "womens-clothing": "Vêtements femme",
      "kids-shoes": "Chaussures enfant",
    };
    if (slugMap[resolvedSlug]) return slugMap[resolvedSlug];
    return resolvedSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [resolvedSlug]);

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
  } = useCatalogFilters({ slug: resolvedSlug });

  useEffect(() => {
    applySeoToDocument(listingSeo);
  }, [listingSeo]);

  return (
    <Container>
      <div className="space-y-6 py-8">
        {/* Fil d'Ariane dynamique */}
        <nav className="text-xs text-black-70" aria-label="Fil d'Ariane">
          <Link to="/" className="underline underline-offset-2 hover:text-black">
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
          <p className="pb-1 text-sm text-black-60">({totalResults} articles)</p>
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
