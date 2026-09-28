import { StatCard } from "../../shared/components/admin/StatCard";
import { DataTable } from "../../shared/components/admin/DataTable";
import { getMockOrders } from "../../data/api/shopApi";
import { products, promotions } from "../../data/mock";
import type { MockOrderStatus } from "../../types";

const STATUS_LABELS: Record<MockOrderStatus, string> = {
  pending: "en attente",
  paid: "payée",
  shipped: "expédiée",
  delivered: "livrée",
  cancelled: "annulée",
};

/**
 * Dashboard marchand démo : stats catalogue + dernières commandes.
 */
export function AdminDashboardPage() {
  const orders = getMockOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Produits catalogue" value={String(products.length)} />
        <StatCard label="Commandes (démo)" value={String(orders.length)} />
        <StatCard label="Promotions actives" value={String(promotions.filter((p) => p.is_active).length)} />
      </div>
      <DataTable
        columns={["Commande", "Statut", "Total (F CFA)", "Date"]}
        rows={orders.map((o) => [o.id, STATUS_LABELS[o.status] ?? o.status, o.total.toFixed(2), o.created_at])}
      />
    </div>
  );
}
