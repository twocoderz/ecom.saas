import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { getMockOrders } from "../../data/api/shopApi";
import { useAddressStore } from "../../stores/useAddressStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { statusLabel } from "../../shared/components/admin/orderStatus";
import { formatPrice } from "../../lib/currency";

const SHORTCUTS = [
  { to: ROUTE_PATHS.accountOrders, title: "Mes commandes", hint: "Historique et suivi" },
  { to: ROUTE_PATHS.accountAddresses, title: "Mes adresses", hint: "Livraison et facturation" },
  { to: ROUTE_PATHS.accountPaymentMethods, title: "Mes paiements", hint: "Moyens mémorisés" },
  { to: ROUTE_PATHS.accountWishlist, title: "Ma liste d'envies", hint: "Articles sauvegardés" },
] as const;

/**
 * Hub du compte : bonjour, raccourcis, derniere commande, deconnexion.
 */
export function AccountDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const addressCount = useAddressStore((s) => s.addresses.length);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const orders = getMockOrders();
  const lastOrder = orders[orders.length - 1];

  const counts: Record<string, number> = {
    [ROUTE_PATHS.accountOrders]: orders.length,
    [ROUTE_PATHS.accountAddresses]: addressCount,
    [ROUTE_PATHS.accountWishlist]: wishlistCount,
  };

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title={`Bonjour, ${user?.name ?? "client"}`}
          subtitle={user?.email ?? "Gérez vos commandes, adresses et paiements."}
        />

        <nav aria-label="Raccourcis du compte" className="grid gap-3 sm:grid-cols-2">
          {SHORTCUTS.map((shortcut) => (
            <Link
              key={shortcut.to}
              to={shortcut.to}
              className="rounded-xl border border-black-10 bg-white p-4 transition-colors hover:border-black"
            >
              <span className="flex items-center justify-between">
                <span className="font-bold">{shortcut.title}</span>
                {counts[shortcut.to] !== undefined && (
                  <span className="rounded-full bg-black-5 px-2 py-0.5 text-xs font-bold">
                    {counts[shortcut.to]}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-black-60">{shortcut.hint}</span>
            </Link>
          ))}
        </nav>

        {lastOrder && (
          <section
            aria-label="Dernière commande"
            className="rounded-xl border border-black-10 bg-white p-4"
          >
            <h2 className="font-bold">Dernière commande</h2>
            <p className="mt-1 text-sm text-black-70">
              {lastOrder.id} — {statusLabel(lastOrder.status)} —{" "}
              {formatPrice(lastOrder.total)}
            </p>
            <Link
              to={ROUTE_PATHS.accountOrderDetail.replace(":orderId", lastOrder.id)}
              className="mt-2 inline-block text-sm font-semibold underline underline-offset-2"
            >
              Voir le détail
            </Link>
          </section>
        )}

        <button
          type="button"
          onClick={signOut}
          className="rounded-md border border-black-20 px-4 py-2.5 text-sm font-semibold hover:border-black"
        >
          Se déconnecter
        </button>
      </div>
    </Container>
  );
}
