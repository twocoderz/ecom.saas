import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { getMockOrderById } from "../../data/api/shopApi";
import type { MockOrder } from "../../types";
import { trackingCopy } from "../../shared/data/support";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { OrderStatusLabel } from "../../shared/components/account/OrderDetailView";
import { Price } from "../../shared/components/ui/Price";

const STATUS_ORDER: MockOrder["status"][] = [
  "pending",
  "paid",
  "shipped",
  "delivered",
];

function timelineIndex(status: MockOrder["status"]): number {
  if (status === "cancelled") return -1;
  return STATUS_ORDER.indexOf(status);
}

/**
 * Suivi commande : numero + e-mail -> recherche `getMockOrderById`,
 * timeline de statut + recap. Sans backend.
 */
export function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<MockOrder | "missing" | null>(null);

  const lookup = (event: React.FormEvent) => {
    event.preventDefault();
    const order = getMockOrderById(orderId.trim().toUpperCase());
    if (
      !order ||
      (order.email && order.email.toLowerCase() !== email.trim().toLowerCase())
    ) {
      setResult("missing");
      return;
    }
    setResult(order);
  };

  const stepIndex = result && result !== "missing" ? timelineIndex(result.status) : -1;

  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <PageHeader title={trackingCopy.title} subtitle={trackingCopy.intro} />

        <form
          onSubmit={lookup}
          className="space-y-3 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Numéro de commande
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="CMD-1003"
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal uppercase"
              />
            </label>
            <label className="block text-sm font-semibold">
              E-mail de commande
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
          >
            Suivre
          </button>
        </form>

        {result === "missing" && (
          <p className="rounded-xl border border-black-10 bg-white p-4 text-sm" role="alert">
            {trackingCopy.notFound}
          </p>
        )}

        {result && result !== "missing" && (
          <section
            aria-label={`Suivi ${result.id}`}
            className="space-y-4 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">{result.id}</p>
              <OrderStatusLabel status={result.status} />
            </div>
            {result.status === "cancelled" ? (
              <p className="text-sm text-black-70">
                Cette commande a été annulée. Contactez le support pour un
                remboursement.
              </p>
            ) : (
              <ol className="space-y-2">
                {trackingCopy.timeline.map((label, index) => {
                  const done = index <= stepIndex;
                  return (
                    <li key={label} className="flex items-center gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          done ? "bg-black text-white" : "bg-black-10 text-black-60"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className={done ? "font-semibold" : "text-black-60"}>
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
            <p className="text-sm text-black-70">
              {result.lines.reduce((sum, line) => sum + line.qty, 0)} article(s)
              — Total <Price amount={result.total} />
            </p>
            <Link
              to={ROUTE_PATHS.accountOrderDetail.replace(":orderId", result.id)}
              className="inline-block text-sm font-semibold underline underline-offset-2"
            >
              Voir le détail complet
            </Link>
          </section>
        )}
      </div>
    </Container>
  );
}
