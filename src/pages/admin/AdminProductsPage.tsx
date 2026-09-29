import { DataTable } from "../../shared/components/admin/DataTable";
import { products, brandById, categoryById } from "../../data/mock";
import { formatPrice } from "../../lib/currency";

/**
 * Liste produits marchand (mock lecture seule pour le MVP).
 */
export function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Produits ({products.length})</h1>
      <DataTable
        columns={[
          "SKU",
          "Nom",
          "Marque",
          "Catégorie",
          "Prix (FCFA)",
          "Solde (FCFA)",
        ]}
        rows={products
          .slice(0, 50)
          .map((p) => [
            p.sku,
            p.name,
            brandById.get(p.brand_id)?.name ?? "?",
            categoryById.get(p.category_id)?.name ?? "?",
          p.price != null ? formatPrice(p.price) : "—",
          p.sale_price != null ? formatPrice(p.sale_price) : "—",
          ])}
      />
    </div>
  );
}
