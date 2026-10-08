import type { MockOrderStatus } from "../../../types";

/** Libelles FR centralises des statuts commande (admin + compte). */
export const MOCK_ORDER_STATUS_LABELS: Record<MockOrderStatus, string> = {
  pending: "en attente",
  paid: "payée",
  shipped: "expédiée",
  delivered: "livrée",
  cancelled: "annulée",
};

/** Libelle affiche (premiere lettre capitale) pour le compte et le suivi. */
export function statusLabel(status: MockOrderStatus): string {
  const raw = MOCK_ORDER_STATUS_LABELS[status] ?? status;
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}
