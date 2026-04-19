import { useEffect, useMemo, useState } from "react";
import { FilterSidebar } from "../../shared/components/catalog/FilterSidebar";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import {
  SortBar,
  type SortOption,
} from "../../shared/components/catalog/SortBar";
import { Container } from "../../shared/components/layout/Container";
import { CategoryPageSpecifics } from "./components/CategoryPageSpecifics";
import {
  plpPageCopy,
  priceLabelMap,
  type PriceRange,
} from "../../shared/data/plp";
import { productCatalog } from "../../shared/data/products";

/**
 * Template PLP type JD.
 * Le panneau de filtres est ouvert a droite via un drawer overlay.
 */
export function CategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [storeOnly, setStoreOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange>("all");

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFilterOpen]);

  const departments = useMemo(
    () =>
      Array.from(new Set(productCatalog.map((product) => product.department))),
    [],
  );

  const brands = useMemo(
    () => Array.from(new Set(productCatalog.map((product) => product.brand))),
    [],
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(productCatalog.map((product) => product.category))),
    [],
  );

  const toggleValue = (
    value: string,
    setter: (updater: (prev: string[]) => string[]) => void,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const filteredProducts = useMemo(() => {
    let nextProducts = [...productCatalog];

    if (storeOnly) {
      // Mock de disponibilite magasin en attendant le vrai stock local.
      nextProducts = nextProducts.filter((_product, index) => index % 2 === 0);
    }

    if (selectedDepartments.length > 0) {
      nextProducts = nextProducts.filter((product) =>
        selectedDepartments.includes(product.department),
      );
    }

    if (selectedBrands.length > 0) {
      nextProducts = nextProducts.filter((product) =>
        selectedBrands.includes(product.brand),
      );
    }

    if (selectedCategories.length > 0) {
      nextProducts = nextProducts.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    if (selectedPriceRange === "under-50") {
      nextProducts = nextProducts.filter((product) => product.price < 50);
    }

    if (selectedPriceRange === "50-200") {
      nextProducts = nextProducts.filter(
        (product) => product.price >= 50 && product.price <= 200,
      );
    }

    if (selectedPriceRange === "200-500") {
      nextProducts = nextProducts.filter(
        (product) => product.price > 200 && product.price <= 500,
      );
    }

    if (selectedPriceRange === "500-plus") {
      nextProducts = nextProducts.filter((product) => product.price > 500);
    }

    if (sortBy === "newest") {
      nextProducts.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id),
      );
    }

    if (sortBy === "top-rated") {
      nextProducts.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "price-low-high") {
      nextProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high-low") {
      nextProducts.sort((a, b) => b.price - a.price);
    }

    return nextProducts;
  }, [
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    sortBy,
    storeOnly,
  ]);

  const activeFilterCount =
    selectedDepartments.length +
    selectedBrands.length +
    selectedCategories.length +
    (selectedPriceRange === "all" ? 0 : 1);

  const activeFilterPills = useMemo(() => {
    const pills = [
      ...selectedDepartments.map((value) => ({
        key: `department-${value}`,
        label: value,
        onRemove: () => toggleValue(value, setSelectedDepartments),
      })),
      ...selectedBrands.map((value) => ({
        key: `brand-${value}`,
        label: value,
        onRemove: () => toggleValue(value, setSelectedBrands),
      })),
      ...selectedCategories.map((value) => ({
        key: `category-${value}`,
        label: value,
        onRemove: () => toggleValue(value, setSelectedCategories),
      })),
    ];

    if (selectedPriceRange !== "all") {
      pills.push({
        key: `price-${selectedPriceRange}`,
        label: priceLabelMap[selectedPriceRange],
        onRemove: () => setSelectedPriceRange("all"),
      });
    }

    return pills;
  }, [
    selectedDepartments,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
  ]);

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPriceRange("all");
  };

  return (
    <Container>
      <div className="space-y-6 py-8">
        <nav className="text-xs text-black/70">
          <span className="underline underline-offset-2">
            {plpPageCopy.breadcrumbRoot}
          </span>
          <span className="mx-2">/</span>
          <span>{plpPageCopy.breadcrumbCurrent}</span>
        </nav>

        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-semibold text-black">
            {plpPageCopy.heading}
          </h1>
          <p className="pb-1 text-sm text-black/70">
            ({filteredProducts.length} items)
          </p>
        </div>

        <SortBar
          resultCount={filteredProducts.length}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenFilters={() => setIsFilterOpen(true)}
          storeOnly={storeOnly}
          onToggleStoreOnly={setStoreOnly}
        />

        {activeFilterPills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" aria-live="polite">
            {activeFilterPills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={pill.onRemove}
                className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
              >
                {pill.label} x
              </button>
            ))}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-black/70 underline underline-offset-2"
            >
              {plpPageCopy.clearAll}
            </button>
          </div>
        )}

        <ProductGrid products={filteredProducts} />
        <CategoryPageSpecifics />
      </div>

      {isFilterOpen && (
        <button
          type="button"
          aria-label="Fermer les filtres"
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 z-40 bg-black/55"
        />
      )}

      <aside
        id="plp-filter-drawer"
        aria-label="Panneau des filtres"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <p className="text-sm font-medium text-black/70">
            {plpPageCopy.drawerSubtitle}
          </p>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="text-sm font-medium text-black underline underline-offset-2"
          >
            {plpPageCopy.close}
          </button>
        </div>

        <FilterSidebar
          departments={departments}
          selectedDepartments={selectedDepartments}
          onToggleDepartment={(department) =>
            toggleValue(department, setSelectedDepartments)
          }
          brands={brands}
          selectedBrands={selectedBrands}
          onToggleBrand={(brand) => toggleValue(brand, setSelectedBrands)}
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={(category) =>
            toggleValue(category, setSelectedCategories)
          }
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={setSelectedPriceRange}
          onClearAll={clearAllFilters}
          onApply={() => setIsFilterOpen(false)}
          resultCount={filteredProducts.length}
        />
      </aside>
    </Container>
  );
}
