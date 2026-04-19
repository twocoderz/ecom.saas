import { CampaignCard } from '../../shared/components/merchandising/CampaignCard'
import { CategoryTile } from '../../shared/components/merchandising/CategoryTile'
import { CollectionRail } from '../../shared/components/merchandising/CollectionRail'
import { HeroBanner } from '../../shared/components/merchandising/HeroBanner'
import { PromoStrip } from '../../shared/components/merchandising/PromoStrip'
import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { Section } from '../../shared/components/layout/Section'
import { HomeSectionsGuide } from './components/HomeSectionsGuide'

/**
 * Homepage template.
 * JD mapping: campaign-first discovery page with rails and merchandising blocks.
 */
export function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <Section title="Hero campagne">
        <HeroBanner />
      </Section>

      <Section title="Bande promo">
        <PromoStrip />
      </Section>

      <Section title="Raccourcis categories">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryTile name="Tech" />
          <CategoryTile name="Maison" />
          <CategoryTile name="Mode" />
          <CategoryTile name="Beaute" />
        </div>
      </Section>

      <Section title="Collections tendances">
        <CollectionRail />
      </Section>

      <Section title="Produits mis en avant">
        <ProductGrid />
      </Section>

      <Section title="Blocs campagne secondaires">
        <div className="grid gap-4 md:grid-cols-3">
          <CampaignCard title="Campagne 1" />
          <CampaignCard title="Campagne 2" />
          <CampaignCard title="Campagne 3" />
        </div>
      </Section>

      <Section title="Guide structure home">
        <HomeSectionsGuide />
      </Section>
    </div>
  )
}
