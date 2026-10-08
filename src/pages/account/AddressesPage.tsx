import { useState } from "react";
import {
  useAddressStore,
  type AddressDraft,
} from "../../stores/useAddressStore";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";

const EMPTY_DRAFT: AddressDraft = {
  label: "Domicile",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  country: "Sénégal",
  phone: "",
};

function validate(draft: AddressDraft): string | null {
  if (draft.firstName.trim().length < 2) return "Prénom requis.";
  if (draft.lastName.trim().length < 2) return "Nom requis.";
  if (draft.address.trim().length < 4) return "Adresse requise.";
  if (draft.city.trim().length < 2) return "Ville requise.";
  return null;
}

/**
 * Carnet d'adresses : CRUD local (sans backend).
 */
export function AddressesPage() {
  const addresses = useAddressStore((s) => s.addresses);
  const addAddress = useAddressStore((s) => s.addAddress);
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const setDefault = useAddressStore((s) => s.setDefault);

  const [draft, setDraft] = useState<AddressDraft>(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof AddressDraft, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const startEdit = (id: string) => {
    const entry = addresses.find((item) => item.id === id);
    if (!entry) return;
    setDraft({
      label: entry.label,
      firstName: entry.firstName,
      lastName: entry.lastName,
      address: entry.address,
      city: entry.city,
      country: entry.country,
      phone: entry.phone,
    });
    setEditingId(id);
    setError(null);
  };

  const cancel = () => {
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = validate(draft);
    setError(message);
    if (message) return;
    if (editingId) updateAddress(editingId, draft);
    else addAddress(draft);
    cancel();
  };

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader
          title="Mes adresses"
          subtitle="Livraison et facturation : ajoutez, modifiez, définissez l'adresse par défaut."
        />

        {addresses.length === 0 ? (
          <EmptyState message="Aucune adresse enregistrée. Ajoutez votre première adresse ci-dessous." />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {addresses.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-black-10 bg-white p-4"
              >
                <p className="flex items-center justify-between font-bold">
                  {entry.label}
                  {entry.isDefault && (
                    <span className="rounded-full bg-black px-2 py-0.5 text-[11px] font-bold text-white">
                      Par défaut
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-black-70">
                  {entry.firstName} {entry.lastName}
                  <br />
                  {entry.address}, {entry.city}, {entry.country}
                  <br />
                  {entry.phone}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => startEdit(entry.id)}
                    className="font-semibold underline underline-offset-2"
                  >
                    Modifier
                  </button>
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
                    onClick={() => removeAddress(entry.id)}
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
          onSubmit={handleSubmit}
          noValidate
          className="space-y-3 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
        >
          <h2 className="font-bold">
            {editingId ? "Modifier l'adresse" : "Ajouter une adresse"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Libellé
              <input
                value={draft.label}
                onChange={(e) => set("label", e.target.value)}
                placeholder="Domicile, Bureau…"
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              Téléphone
              <input
                type="tel"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+221 77 000 00 00"
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              Prénom
              <input
                value={draft.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              Nom
              <input
                value={draft.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Adresse
            <input
              value={draft.address}
              onChange={(e) => set("address", e.target.value)}
              className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Ville
              <input
                value={draft.city}
                onChange={(e) => set("city", e.target.value)}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              Pays
              <input
                value={draft.country}
                onChange={(e) => set("country", e.target.value)}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
          </div>
          {error && (
            <p className="text-xs font-semibold text-danger" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
            >
              {editingId ? "Enregistrer" : "Ajouter"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancel}
                className="rounded-md border border-black-20 px-4 py-2.5 text-sm font-semibold hover:border-black"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
