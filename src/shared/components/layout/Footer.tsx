import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { ROUTE_PATHS } from "../../../config/paths";

const LINK_GROUPS: Array<{
  title: string;
  links: Array<{ label: string; to: string }>;
}> = [
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

const SOCIALS: Array<{ label: string; iconSrc: string; href: string }> = [
  { label: "Facebook", iconSrc: "/socials/facebook.svg", href: "https://www.facebook.com" },
  { label: "Instagram", iconSrc: "/socials/instagram.svg", href: "https://www.instagram.com" },
  { label: "LinkedIn", iconSrc: "/socials/linkedin.svg", href: "https://www.linkedin.com" },
  { label: "TikTok", iconSrc: "/socials/tiktok.svg", href: "https://www.tiktok.com" },
  { label: "WhatsApp", iconSrc: "/socials/whatsapp.svg", href: "https://www.whatsapp.com" },
  { label: "X", iconSrc: "/socials/x.svg", href: "https://x.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-black text-white">
      <Container>
        {/* Newsletter */}
        <div className="flex flex-col gap-4 border-b border-white/15 py-8 md:flex-row md:items-center md:justify-between pt-12 mb-8">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">
              Reste informé des sorties
            </h3>
            <p className="mt-2 text-md text-white/70">
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
                className="min-w-0 flex-1 border border-white/25 bg-transparent px-3 py-4 text-sm text-white placeholder:text-white/50"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-xs bg-white px-6 py-4 text-md font-bold text-black hover:bg-white/85"
              >
                S'inscrire
              </button>
            </form>
          )}
        </div>

        {/* Colonnes */}
        <div className="grid gap-12 py-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={`Footer — ${group.title}`}>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="mt-8 space-y-4">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-md text-white/70 hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bas: copyright + icônes sociales */}
        <div className="flex flex-col items-center gap-8 border-t border-white/15 pb-12 pt-4 lg:pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm text-white/50 md:text-left">
            © {new Date().getFullYear()} ecom.saas — Template boutique démo.
            Tous droits réservés.
          </p>
          <ul className="flex items-center gap-5" aria-label="Réseaux sociaux">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="block transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <img
                    src={social.iconSrc}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-5 w-5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
