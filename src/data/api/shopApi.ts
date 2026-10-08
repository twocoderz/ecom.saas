import { promotions } from "../mock";
import type { MockOrder, MockOrderLine, Promotion } from "../../types";
import { DEFAULT_SHOP_ID } from "../../types";
import type { CartLine } from "../../stores/useCartStore";

/**
 * API mock boutique : promos + commandes.
 * Source unique des mocks (aucun backend) : les pages/composants
 * ne doivent pas dupliquer ces donnees en dur.
 * `shopId` est accepte mais ignore (mono-boutique "default-shop").
 * Les commandes creees via `createMockOrder()` sont persistee en
 * localStorage : la confirmation est rejouable apres refresh.
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

const CREATED_ORDERS_KEY = `ecom-${DEFAULT_SHOP_ID}-orders`;

function readCreatedOrders(): MockOrder[] {
  try {
    const raw = window.localStorage.getItem(CREATED_ORDERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MockOrder[]) : [];
  } catch {
    return [];
  }
}

function writeCreatedOrders(orders: MockOrder[]): void {
  try {
    window.localStorage.setItem(CREATED_ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Stockage indisponible : la commande reste visible pour la session.
  }
}

export function getMockOrders(shopId: string = DEFAULT_SHOP_ID): MockOrder[] {
  void shopId;
  return [...MOCK_ORDERS, ...readCreatedOrders()];
}

export function getMockOrderById(
  orderId: string,
  shopId: string = DEFAULT_SHOP_ID,
): MockOrder | null {
  void shopId;
  return getMockOrders().find((o) => o.id === orderId) ?? null;
}

export type CreateMockOrderInput = {
  lines: Pick<CartLine, "productId" | "name" | "image" | "unitPrice" | "qty">[];
  subtotal: number;
  discount: number;
  discountCode: string;
  shippingFee: number;
  shippingMethodId: string;
  taxes: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  country: string;
  paymentMethod: string;
  shopId?: string;
};

/**
 * Cree une commande mock depuis le panier + les formulaires checkout.
 * Numero sequentiel (`CMD-1003`, …), statut `pending`, sans appel reseau.
 */
export function createMockOrder(
  input: CreateMockOrderInput,
  shopId: string = DEFAULT_SHOP_ID,
): MockOrder {
  const created = readCreatedOrders();
  const order: MockOrder = {
    id: `CMD-${1003 + created.length}`,
    shopId: input.shopId ?? shopId,
    total: input.total,
    currency: "XOF",
    status: "pending",
    created_at: new Date().toISOString(),
    lines: input.lines.map(
      (line): MockOrderLine => ({
        product_id: line.productId,
        name: line.name,
        qty: line.qty,
        unit_price: line.unitPrice,
      }),
    ),
    subtotal: input.subtotal,
    discount: input.discount,
    discountCode: input.discountCode,
    shippingFee: input.shippingFee,
    shippingMethodId: input.shippingMethodId,
    taxes: input.taxes,
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    addressLine: input.addressLine,
    city: input.city,
    country: input.country,
    paymentMethod: input.paymentMethod,
  };
  writeCreatedOrders([...created, order]);
  return order;
}
