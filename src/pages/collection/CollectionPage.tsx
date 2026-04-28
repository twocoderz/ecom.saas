import { TrendingOutfit } from "../../shared/components/merchandising/TrendingOutfit";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";

/**
 * Curated collection page template.
 * JD mapping: themed collection pages (seasonal, trend, or campaign).
 */
export function CollectionPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title="Collection"
          subtitle="Page collection/campagne avec bloc editorial + listing."
        />
        <TrendingOutfit title="Storytelling collection" />
        <ProductGrid />
      </div>
    </Container>
  );
}
