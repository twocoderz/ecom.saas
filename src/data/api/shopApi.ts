import { promotions } from "../mock";
import type { MockOrder, Promotion } from "../../types";
import { DEFAULT_SHOP_ID } from "../../types";

/**
 * API mock boutique : promos + commandes.
 * Source unique des mocks (aucun backend) : les pages/composants
 * ne doivent pas dupliquer ces donnees en dur.
 * `shopId` est accepte mais ignore (mono-boutique "default-shop").
 */
export function findPromoByCode(code: string): Promotion | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  return promotions.find((p) => p.code.toUpperCase() === normalized) ?? null;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "CMD-1001",
    total: 78590,
    currency: "XOF",
    status: "delivered",
    created_at: "2026-03-02",
    lines: [
      {
        product_id: "prod-1001",
        name: "Article démo 1",
        qty: 1,
        unit_price: 78590,
      },
    ],
  },
  {
    id: "CMD-1002",
    total: 54148,
    currency: "XOF",
    status: "shipped",
    created_at: "2026-04-11",
    lines: [
      {
        product_id: "prod-1002",
        name: "Article démo 2",
        qty: 2,
        unit_price: 27074,
      },
    ],
  },
];

export function getMockOrders(shopId: string = DEFAULT_SHOP_ID): MockOrder[] {
  void shopId;
  return MOCK_ORDERS;
}

export function getMockOrderById(
  orderId: string,
  shopId: string = DEFAULT_SHOP_ID,
): MockOrder | null {
  void shopId;
  return MOCK_ORDERS.find((o) => o.id === orderId) ?? null;
}
