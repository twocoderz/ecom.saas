import { useState } from "react";
import {
  maskPhoneLabel,
  useSavedPaymentsStore,
} from "../../stores/useSavedPaymentsStore";
import {
  PaymentMethods,
  type PaymentMethodId,
} from "../../shared/components/product/PaymentMethods";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";

/**
 * Moyens de paiement memorises : ajout (libelle masque uniquement,
 * jamais de numero complet) + suppression + defaut. Sans backend.
 */
export function PaymentMethodsPage() {
  const payments = useSavedPaymentsStore((s) => s.payments);
  const addPayment = useSavedPaymentsStore((s) => s.addPayment);
  const removePayment = useSavedPaymentsStore((s) => s.removePayment);
  const setDefault = useSavedPaymentsStore((s) => s.setDefault);

  const [method, setMethod] = useState<PaymentMethodId>("mixx");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (method === "cash") {
      addPayment({ method, label: "Cash — paiement à la livraison" });
      setError(null);
      return;
    }
    if (method === "visa") {
      addPayment({ method, label: "Visa •••• (simulé)" });
      setError(null);
      return;
    }
    if (phone.replace(/[^0-9]/g, "").length < 8) {
      setError("Numéro invalide : 8 chiffres minimum (seul un libellé masqué est conservé).");
      return;
    }
    addPayment({ method, label: maskPhoneLabel(method, phone) });
    setPhone("");
    setError(null);
  };

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title="Mes moyens de paiement"
          subtitle="Moyens mémorisés localement. Aucun numéro complet n'est conservé."
        />

        {payments.length === 0 ? (
          <EmptyState message="Aucun moyen mémorisé. Ajoutez Mixx, Flooz, Visa ou Cash ci-dessous." />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {payments.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-black-10 bg-white p-4"
              >
                <div>
                  <p className="font-bold">
                    {entry.label}
                    {entry.isDefault && (
                      <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-[11px] font-bold text-white">
                        Par défaut
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  {!entry.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefault(entry.id)}
                      className="font-semibold underline underline-offset-2"
                    >
                      Par défaut
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removePayment(entry.id)}
                    className="font-semibold text-danger underline underline-offset-2"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={handleAdd}
          noValidate
          className="space-y-3 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
        >
          <h2 className="font-bold">Ajouter un moyen</h2>
          <PaymentMethods selected={method} onSelect={setMethod} />
          {method !== "cash" && method !== "visa" && (
            <label className="block text-sm font-semibold">
              Numéro {method === "mixx" ? "Mixx" : "Flooz"}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+221 77 000 00 00"
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
          )}
          {method === "visa" && (
            <p className="text-sm text-black-70">
              Démo sans backend : la carte est mémorisée sous libellé masqué
              « Visa •••• » sans aucun numéro conservé.
            </p>
          )}
          {error && (
            <p className="text-xs font-semibold text-danger" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
          >
            Mémoriser
          </button>
        </form>
      </div>
    </Container>
  );
}
