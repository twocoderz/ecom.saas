import { StatCard } from "../../shared/components/admin/StatCard";
import { DataTable } from "../../shared/components/admin/DataTable";
import { getMockOrders } from "../../data/api/shopApi";
import { products, promotions } from "../../data/mock";

/**
 * Dashboard marchand mock : stats catalogue + dernieres commandes.
 */
export function AdminDashboardPage() {
  const orders = getMockOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Produits catalogue" value={String(products.length)} />
        <StatCard label="Commandes mock" value={String(orders.length)} />
        <StatCard label="Promotions actives" value={String(promotions.filter((p) => p.is_active).length)} />
      </div>
      <DataTable
        columns={["Commande", "Statut", "Total USD", "Date"]}
        rows={orders.map((o) => [o.id, o.status, o.total.toFixed(2), o.created_at])}
      />
    </div>
  );
}
