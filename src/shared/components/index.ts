// Facade unique des composants partages.
// Regle : importer via cette facade OU par chemin profond, pas les deux.

export { AddToCartPanel } from "./product/AddToCartPanel";
export { AppShell } from "./layout/AppShell";
export { BackToTop } from "./layout/BackToTop";
export { Container } from "./layout/Container";
export { Footer } from "./layout/Footer";
export { PageHeader } from "./layout/PageHeader";
export { Section } from "./layout/Section";
export { TrustStrip } from "./layout/TrustStrip";

export { Header } from "./navigation/Header";
export { MegaMenu } from "./navigation/MegaMenu";
export { MobileMenuDrawer } from "./navigation/MobileMenuDrawer";
export { SearchOverlay } from "./navigation/SearchOverlay";
export { UtilityBar } from "./navigation/UtilityBar";

export { BrandTile } from "./merchandising/BrandTile";
export { CategoryTile } from "./merchandising/CategoryTile";
export { HeroBanner } from "./merchandising/HeroBanner";
export { PromoStrip } from "./merchandising/PromoStrip";
export { TrendingCollection } from "./merchandising/TrendingCollection";
export { TrendingOutfit } from "./merchandising/TrendingOutfit";

export { ActiveFilterPills } from "./catalog/ActiveFilterPills";
export { CatalogFilterDrawer } from "./catalog/CatalogFilterDrawer";
export { FilterAccordionSection } from "./catalog/FilterAccordionSection";
export { FilterOptionRow } from "./catalog/FilterOptionRow";
export { FilterPillsBar } from "./catalog/FilterPillsBar";
export { FilterSidebar } from "./catalog/FilterSidebar";
export { Pagination } from "./catalog/Pagination";
export { PlpListing } from "./catalog/PlpListing";
export { ProductCard } from "./catalog/ProductCard";
export { ProductGrid } from "./catalog/ProductGrid";
export { SortBar } from "./catalog/SortBar";

export { AddToCartPanel as PdpAddToCartPanel } from "./product/AddToCartPanel";
export { FulfillmentSelector } from "./product/FulfillmentSelector";
export { PaymentMethods } from "./product/PaymentMethods";
export { ProductGallery } from "./product/ProductGallery";
export { ProductInfoPanel } from "./product/ProductInfoPanel";
export { ProductReviews } from "./product/ProductReviews";
export { ProductStickyBar } from "./product/ProductStickyBar";
export { SizeGuideModal } from "./product/SizeGuideModal";

export { CartSummary } from "./checkout/CartSummary";
export { CheckoutStepper } from "./checkout/CheckoutStepper";

export { default as AccountButton } from "./ui/AccountButton";
export { Badge } from "./ui/Badge";
export { Button } from "./ui/Button";
export { default as CartButton } from "./ui/CartButton";
export { default as DesktopSearchBar } from "./ui/DesktopSearchBar";
export { EmptyState } from "./ui/EmptyState";
export { Input } from "./ui/Input";
export { default as MobileSearchBar } from "./ui/MobileSearchBar";
export { Popover } from "./ui/Popover";
export { Price } from "./ui/Price";
export { ProductPrice } from "./ui/ProductPrice";
export { QuantityStepper } from "./ui/QuantityStepper";
export { Rail } from "./ui/Rail";
export { RatingStars } from "./ui/RatingStars";

export { default as Logo } from "./branding/Logo";

export { AdminShell } from "./admin/AdminShell";
export { DataTable } from "./admin/DataTable";
export { StatCard } from "./admin/StatCard";
