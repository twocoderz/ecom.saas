import type { MockOrder } from "../../../types";
import {
  checkoutCopy,
  getShippingMethod,
} from "../../data/checkout";
import { statusLabel } from "../admin/orderStatus";
import { Price } from "../ui/Price";

/**
 * Bloc recapitulatif de commande partage entre la confirmation
 * checkout et le detail commande du compte.
 */
export function OrderDetailView({ order }: { order: MockOrder }) {
  const shippingMethod = getShippingMethod(order.shippingMethodId ?? "standard");

  return (
    <div className="space-y-6">
      <section
        aria-label="Articles commandés"
        className="rounded-xl border border-black-10 bg-white p-4 sm:p-6"
      >
        <h2 className="text-base font-bold">Articles</h2>
        <ul className="mt-3 divide-y divide-black-10 text-sm">
          {order.lines.map((line, index) => (
            <li
              key={`${line.product_id}-${index}`}
              className="flex justify-between gap-3 py-2"
            >
              <span>
                {line.name} <span className="text-black-60">× {line.qty}</span>
              </span>
              <span className="font-semibold">
                <Price amount={line.unit_price * line.qty} />
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-black-60">Sous-total</dt>
            <dd className="font-semibold">
              <Price amount={order.subtotal ?? order.total} />
            </dd>
          </div>
          {(order.discount ?? 0) > 0 && (
            <div className="flex justify-between text-green-700">
              <dt>Remise ({order.discountCode})</dt>
              <dd className="font-semibold">
                −<Price amount={order.discount ?? 0} />
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-black-60">
              Livraison ({shippingMethod.name})
            </dt>
            <dd className="font-semibold">
              {(order.shippingFee ?? 0) === 0 ? (
                checkoutCopy.freeShipping
              ) : (
                <Price amount={order.shippingFee ?? 0} />
              )}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-black-60">{checkoutCopy.taxesLabel}</dt>
            <dd className="font-semibold">
              <Price amount={order.taxes ?? 0} />
            </dd>
          </div>
          <div className="flex justify-between border-t border-black-10 pt-2 text-base font-bold">
            <dt>Total</dt>
            <dd>
              <Price amount={order.total} />
            </dd>
          </div>
        </dl>
      </section>

      <div className="grid gap-4 text-sm sm:grid-cols-2">
        <section
          aria-label="Livraison"
          className="rounded-xl border border-black-10 bg-white p-4"
        >
          <h2 className="font-bold">Livraison</h2>
          <p className="mt-1 text-black-70">
            {order.customerName ?? "—"}
            <br />
            {order.addressLine
              ? `${order.addressLine}, ${order.city ?? ""}`
              : (order.city ?? "—")}
            <br />
            {shippingMethod.name} — {shippingMethod.delay}
          </p>
        </section>
        <section
          aria-label="Paiement"
          className="rounded-xl border border-black-10 bg-white p-4"
        >
          <h2 className="font-bold">Paiement</h2>
          <p className="mt-1 text-black-70">
            <Price amount={order.total} /> via {order.paymentMethod ?? "—"}
            {order.paymentMethod ? " (simulé)" : ""}
          </p>
          <p className="mt-1 text-black-70">
            Statut : <OrderStatusLabel status={order.status} />
          </p>
        </section>
      </div>
    </div>
  );
}

export function OrderStatusLabel({ status }: { status: MockOrder["status"] }) {
  return <span className="font-semibold">{statusLabel(status)}</span>;
}
