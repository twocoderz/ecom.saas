import { DataTable } from "../../shared/components/admin/DataTable";
import { getMockOrders } from "../../data/api/shopApi";
import type { MockOrderStatus } from "../../types";

const STATUS_LABELS: Record<MockOrderStatus, string> = {
  pending: "en attente",
  paid: "payée",
  shipped: "expédiée",
  delivered: "livrée",
  cancelled: "annulée",
};

/**
 * Liste commandes démo + lignes.
 */
export function AdminOrdersPage() {
  const orders = getMockOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Commandes ({orders.length})</h1>
      <DataTable
        columns={["Commande", "Statut", "Articles", "Total (F CFA)", "Date"]}
        rows={orders.map((o) => [
          o.id,
          STATUS_LABELS[o.status] ?? o.status,
          String(o.lines.reduce((s, l) => s + l.qty, 0)),
          o.total.toFixed(2),
          o.created_at,
        ])}
      />
    </div>
  );
}
