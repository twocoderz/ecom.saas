/**
 * Reusable component inventory.
 * JD mapping: these blocks correspond to recurring homepage, PLP, PDP,
 * and checkout patterns visible across the storefront.
 */
export type ComponentGroup = {
  group: string;
  items: string[];
};

export const componentBlueprint: ComponentGroup[] = [
  {
    group: "layout",
    items: [
      "AppShell",
      "Container",
      "Section",
      "PageHeader",
      "TrustStrip",
      "Footer",
      "BackToTop",
    ],
  },
  {
    group: "navigation",
    items: [
      "UtilityBar",
      "Header",
      "MegaMenu",
      "MobileMenuDrawer",
      "SearchOverlay",
    ],
  },
  {
    group: "merchandising",
    items: [
      "HeroBanner",
      "PromoStrip",
      "TrendingOutfit",
      "CategoryTile",
      "BrandTile",
      "TrendingCollection",
    ],
  },
  {
    group: "catalog",
    items: [
      "ProductCard",
      "ProductGrid",
      "FilterSidebar",
      "CatalogFilterDrawer",
      "FilterAccordionSection",
      "FilterOptionRow",
      "ActiveFilterPills",
      "FilterPillsBar",
      "PlpListing",
      "Pagination",
      "SortBar",
    ],
  },
  {
    group: "product",
    items: [
      "ProductGallery",
      "ProductInfoPanel",
      "AddToCartPanel",
      "FulfillmentSelector",
      "ProductStickyBar",
      "PaymentMethods",
      "ProductReviews",
      "SizeGuideModal",
    ],
  },
  {
    group: "checkout",
    items: ["CartSummary", "CheckoutStepper", "CartButton", "QuantityStepper"],
  },
  {
    group: "ui",
    items: [
      "Button",
      "Input",
      "Badge",
      "Price",
      "ProductPrice",
      "Rail",
      "Popover",
      "EmptyState",
      "RatingStars",
      "AccountButton",
      "DesktopSearchBar",
      "MobileSearchBar",
    ],
  },
  { group: "admin", items: ["AdminShell", "StatCard", "DataTable"] },
];
