import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * Layout back-office isole (pas de AppShell storefront).
 */
const LINKS = [
  { to: ROUTE_PATHS.adminDashboard, label: "Tableau de bord" },
  { to: ROUTE_PATHS.adminProducts, label: "Produits" },
  { to: ROUTE_PATHS.adminOrders, label: "Commandes" },
  { to: ROUTE_PATHS.adminPromos, label: "Promotions" },
  { to: ROUTE_PATHS.home, label: "← Retour boutique" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-black-5 text-black-80">
      <header className="border-b border-black-10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-2 py-3 md:px-8">
          <strong className="mr-4 text-sm font-bold">Admin marchand (démo)</strong>
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={pathname === l.to ? "page" : undefined}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                pathname === l.to ? "bg-black text-white" : "bg-black-5 hover:bg-black-10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl space-y-6 px-2 py-6 md:px-8">{children}</main>
    </div>
  );
}
