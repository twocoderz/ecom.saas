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
      "FooterColumns",
    ],
  },
  {
    group: "navigation",
    items: [
      "UtilityBar",
      "MainHeader",
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
      "CampaignCard",
      "CategoryTile",
      "BrandTile",
      "TrendingCollection",
    ],
  },
  {
    group: "catalog",
    items: ["ProductCard", "ProductGrid", "FilterSidebar", "SortBar"],
  },
  {
    group: "product",
    items: ["ProductGallery", "ProductInfoPanel", "AddToCartPanel"],
  },
  { group: "checkout", items: ["CartSummary", "CheckoutStepper"] },
  { group: "ui", items: ["Button", "Input", "Badge"] },
];
