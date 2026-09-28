import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { ROUTE_PATHS } from "../../../config/paths";

const LINK_GROUPS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: "Aide",
    links: [
      { label: "Centre d'aide", to: ROUTE_PATHS.help },
      { label: "Suivre ma commande", to: ROUTE_PATHS.orderTracking },
      { label: "Livraison & retours", to: ROUTE_PATHS.shippingReturns },
      { label: "Nous contacter", to: ROUTE_PATHS.contact },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { label: "Se connecter", to: ROUTE_PATHS.auth },
      { label: "Tableau de bord", to: ROUTE_PATHS.accountDashboard },
      { label: "Mes commandes", to: ROUTE_PATHS.accountOrders },
      { label: "Ma liste d'envies", to: ROUTE_PATHS.accountWishlist },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Plan du site", to: ROUTE_PATHS.siteMap },
      { label: "Accessibilité", to: ROUTE_PATHS.accessibility },
      { label: "Espace marchand", to: ROUTE_PATHS.adminDashboard },
    ],
  },
  {
    title: "Infos légales",
    links: [
      { label: "Mentions légales", to: ROUTE_PATHS.legalNotice },
      { label: "Confidentialité", to: ROUTE_PATHS.privacyPolicy },
      { label: "CGU", to: ROUTE_PATHS.terms },
    ],
  },
];

const SOCIALS = ["Instagram", "TikTok", "X", "YouTube"];
const PAYMENTS = ["Visa", "Mastercard", "PayPal", "Mobile Money"];

/**
 * Footer riche façon JD : newsletter, colonnes de liens réels, sociaux, paiements.
 */
export function FooterColumns() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-black text-white">
      <Container>
        {/* Newsletter */}
        <div className="flex flex-col gap-4 border-b border-white/15 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-bold uppercase tracking-tight">
              Reste informé des sorties
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Nouveautés, promos et collections en avant-première.
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm font-semibold text-white" role="status">
              Merci ! Tu es bien inscrit à la newsletter.
            </p>
          ) : (
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.includes("@")) setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                E-mail infolettre
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ton@email.com"
                className="min-w-0 flex-1 rounded-md border border-white/25 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50"
              />
              <button
                type="submit"
                className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black hover:bg-white/85"
              >
                S'inscrire
              </button>
            </form>
          )}
        </div>

        {/* Colonnes */}
        <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={`Footer — ${group.title}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Sociaux + paiements */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Réseaux sociaux">
            {SOCIALS.map((social) => (
              <li key={social}>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={social}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold text-white/80 hover:border-white hover:text-white"
                >
                  {social}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2" aria-label="Moyens de paiement">
            {PAYMENTS.map((payment) => (
              <li
                key={payment}
                className="rounded-sm bg-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white/80"
              >
                {payment}
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-white/15 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} ecom.saas — Template boutique démo. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
