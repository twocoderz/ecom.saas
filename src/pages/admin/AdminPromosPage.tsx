import { DataTable } from "../../shared/components/admin/DataTable";
import { promotions } from "../../data/mock";

/**
 * Liste promotions démo.
 */
export function AdminPromosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Promotions ({promotions.length})</h1>
      <DataTable
        columns={["Code", "Nom", "Type", "Valeur", "Actif"]}
        rows={promotions.map((p) => [
          p.code,
          p.name,
          p.discount_type === "percentage" ? "pourcentage" : "fixe",
          String(p.discount_value),
          p.is_active ? "oui" : "non",
        ])}
      />
    </div>
  );
}
