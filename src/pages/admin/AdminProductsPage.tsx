import { DataTable } from "../../shared/components/admin/DataTable";
import { products, brandById, categoryById } from "../../data/mock";

/**
 * Liste produits marchand (mock lecture seule pour le MVP).
 */
export function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Produits ({products.length})</h1>
      <DataTable
        columns={["SKU", "Nom", "Marque", "Categorie", "Prix USD", "Solde USD"]}
        rows={products.slice(0, 50).map((p) => [
          p.sku,
          p.name,
          brandById.get(p.brand_id)?.name ?? "?",
          categoryById.get(p.category_id)?.name ?? "?",
          p.price.toFixed(2),
          p.sale_price != null ? p.sale_price.toFixed(2) : "—",
        ])}
      />
    </div>
  );
}
