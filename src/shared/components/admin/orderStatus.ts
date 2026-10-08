import type { MockOrderStatus } from "../../../types";

/** Libelles FR centralises des statuts commande (admin + compte). */
export const MOCK_ORDER_STATUS_LABELS: Record<MockOrderStatus, string> = {
  pending: "en attente",
  paid: "payée",
  shipped: "expédiée",
  delivered: "livrée",
  cancelled: "annulée",
};
