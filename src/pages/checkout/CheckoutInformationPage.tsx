import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import {
  EMPTY_INFORMATION,
  validateInformation,
  type InformationForm,
} from "../../lib/checkout";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { CheckoutStepLayout } from "./components/CheckoutStepLayout";
import { Field } from "./components/CheckoutFields";

/**
 * Etape 1 : informations client. Validee en ligne, persiste en local,
 * pre-remplit l'e-mail du compte connecte si le brouillon est vide.
 */
export function CheckoutInformationPage() {
  const navigate = useNavigate();
  const userEmail = useAuthStore((s) => s.user?.email ?? "");
  const stored = useCheckoutStore((s) => s.information);
  const setInformation = useCheckoutStore((s) => s.setInformation);

  const [form, setForm] = useState<InformationForm>(() => ({
    ...EMPTY_INFORMATION,
    ...stored,
    email: stored.email || userEmail,
  }));
  const [errors, setErrors] = useState<
    Partial<Record<keyof InformationForm, string>>
  >({});

  const set = (key: keyof InformationForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateInformation(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setInformation(form);
    navigate(ROUTE_PATHS.checkoutShipping);
  };

  return (
    <CheckoutStepLayout step="informations" title="Informations">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="info-firstname"
            label="Prénom"
            error={errors.firstName}
            input={{
              value: form.firstName,
              autoComplete: "given-name",
              onChange: (e) => set("firstName", e.target.value),
            }}
          />
          <Field
            id="info-lastname"
            label="Nom"
            error={errors.lastName}
            input={{
              value: form.lastName,
              autoComplete: "family-name",
              onChange: (e) => set("lastName", e.target.value),
            }}
          />
        </div>
        <Field
          id="info-email"
          label="E-mail"
          error={errors.email}
          input={{
            type: "email",
            value: form.email,
            autoComplete: "email",
            onChange: (e) => set("email", e.target.value),
          }}
        />
        <Field
          id="info-phone"
          label="Téléphone"
          error={errors.phone}
          input={{
            type: "tel",
            value: form.phone,
            autoComplete: "tel",
            placeholder: "+221 77 000 00 00",
            onChange: (e) => set("phone", e.target.value),
          }}
        />
        <Field
          id="info-address"
          label="Adresse"
          error={errors.address}
          input={{
            value: form.address,
            autoComplete: "street-address",
            onChange: (e) => set("address", e.target.value),
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="info-city"
            label="Ville"
            error={errors.city}
            input={{
              value: form.city,
              autoComplete: "address-level2",
              onChange: (e) => set("city", e.target.value),
            }}
          />
          <Field
            id="info-country"
            label="Pays"
            error={errors.country}
            input={{
              value: form.country,
              autoComplete: "country-name",
              onChange: (e) => set("country", e.target.value),
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-3 text-sm font-bold text-white hover:bg-black-80 sm:w-auto sm:px-8"
        >
          Continuer vers la livraison
        </button>
      </form>
    </CheckoutStepLayout>
  );
}
