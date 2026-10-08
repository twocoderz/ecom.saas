import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { getMockOrders } from "../../data/api/shopApi";
import { formatPrice } from "../../lib/currency";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";
import { statusLabel } from "../../shared/components/admin/orderStatus";

/**
 * Historique des commandes : seeds demo + commandes creees au checkout.
 */
export function OrdersPage() {
  const orders = getMockOrders();

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title="Mes commandes"
          subtitle={`${orders.length} commande${orders.length > 1 ? "s" : ""} au total.`}
        />
        {orders.length === 0 ? (
          <EmptyState message="Aucune commande pour l'instant. Parcourez le catalogue pour commencer." />
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-xl border border-black-10 bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-xs text-black-60">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")} —{" "}
                      {statusLabel(order.status)} —{" "}
                      {order.lines.reduce((sum, line) => sum + line.qty, 0)}{" "}
                      article(s)
                    </p>
                  </div>
                  <p className="font-bold">{formatPrice(order.total)}</p>
                </div>
                <Link
                  to={ROUTE_PATHS.accountOrderDetail.replace(":orderId", order.id)}
                  className="mt-2 inline-block text-sm font-semibold underline underline-offset-2 hover:text-black"
                >
                  Voir le détail
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
