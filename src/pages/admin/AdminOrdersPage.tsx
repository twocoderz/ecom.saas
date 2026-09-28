import { DataTable } from "../../shared/components/admin/DataTable";
import { getMockOrders } from "../../data/api/shopApi";

/**
 * Liste commandes mock + lignes.
 */
export function AdminOrdersPage() {
  const orders = getMockOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Commandes ({orders.length})</h1>
      <DataTable
        columns={["Commande", "Statut", "Articles", "Total USD", "Date"]}
        rows={orders.map((o) => [
          o.id,
          o.status,
          String(o.lines.reduce((s, l) => s + l.qty, 0)),
          o.total.toFixed(2),
          o.created_at,
        ])}
      />
    </div>
  );
}
