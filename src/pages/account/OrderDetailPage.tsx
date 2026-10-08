import { Link, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { getMockOrderById } from "../../data/api/shopApi";
import { Container } from "../../shared/components/layout/Container";
import { EmptyState } from "../../shared/components/ui/EmptyState";
import {
  OrderDetailView,
} from "../../shared/components/account/OrderDetailView";
import { statusLabel } from "../../shared/components/admin/orderStatus";

/**
 * Detail commande : lignes, totaux, livraison, paiement, statut.
 */
export function OrderDetailPage() {
  const params = useParams();
  const order = params.orderId ? getMockOrderById(params.orderId) : null;

  if (!order) {
    return (
      <Container>
        <div className="space-y-4 py-8">
          <EmptyState message="Commande introuvable. Vérifiez le numéro dans votre historique." />
          <Link
            to={ROUTE_PATHS.accountOrders}
            className="inline-block text-sm font-semibold underline underline-offset-2"
          >
            Retour à mes commandes
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div>
          <Link
            to={ROUTE_PATHS.accountOrders}
            className="text-sm text-black-60 underline underline-offset-2 hover:text-black"
          >
            ← Mes commandes
          </Link>
          <h1 className="mt-2 text-2xl font-bold">Commande {order.id}</h1>
          <p className="text-sm text-black-60">
            Passée le {new Date(order.created_at).toLocaleDateString("fr-FR")} —{" "}
            {statusLabel(order.status)}
          </p>
        </div>
        <OrderDetailView order={order} />
      </div>
    </Container>
  );
}
