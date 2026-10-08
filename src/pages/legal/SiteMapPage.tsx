import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { brands, categories, collections } from "../../data/mock";
import { buildPlpPath } from "../../lib/slug";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";

const STATIC_GROUPS: Array<{
  title: string;
  links: Array<{ label: string; to: string }>;
}> = [
  {
    title: "Compte",
    links: [
      { label: "Connexion", to: ROUTE_PATHS.auth },
      { label: "Tableau de bord", to: ROUTE_PATHS.accountDashboard },
      { label: "Mes commandes", to: ROUTE_PATHS.accountOrders },
      { label: "Mes adresses", to: ROUTE_PATHS.accountAddresses },
      { label: "Mes paiements", to: ROUTE_PATHS.accountPaymentMethods },
      { label: "Ma liste d'envies", to: ROUTE_PATHS.accountWishlist },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Centre d'aide", to: ROUTE_PATHS.help },
      { label: "Suivi de commande", to: ROUTE_PATHS.orderTracking },
      { label: "Livraison & retours", to: ROUTE_PATHS.shippingReturns },
      { label: "Contact", to: ROUTE_PATHS.contact },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { label: "Mentions légales", to: ROUTE_PATHS.legalNotice },
      { label: "Confidentialité", to: ROUTE_PATHS.privacyPolicy },
      { label: "CGU / CGV", to: ROUTE_PATHS.terms },
      { label: "Accessibilité", to: ROUTE_PATHS.accessibility },
    ],
  },
];

/**
 * Plan du site : index reel (catalogue + compte + aide + legal).
 */
export function SiteMapPage() {
  return (
    <Container>
      <div className="mx-auto max-w-4xl space-y-8 py-8">
        <PageHeader
          title="Plan du site"
          subtitle="Toutes les rubriques : catalogue, compte, aide et informations légales."
        />

        <section aria-label="Catalogue" className="space-y-4">
          <h2 className="text-xl font-bold">Catalogue</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <nav aria-label="Catégories">
              <h3 className="text-sm font-bold uppercase text-black-60">Catégories</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={buildPlpPath(category.slug)}
                      className="underline-offset-2 hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Marques">
              <h3 className="text-sm font-bold uppercase text-black-60">Marques</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {brands.map((brand) => (
                  <li key={brand.id}>
                    <Link
                      to={buildPlpPath(brand.slug)}
                      className="underline-offset-2 hover:underline"
                    >
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Collections">
              <h3 className="text-sm font-bold uppercase text-black-60">Collections</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      to={buildPlpPath(collection.slug)}
                      className="underline-offset-2 hover:underline"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          {STATIC_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xl font-bold">{group.title}</h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </Container>
  );
}
