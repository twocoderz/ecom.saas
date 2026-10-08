export type PaymentMethodId = "mixx" | "flooz" | "visa" | "cash";

const METHODS: Array<{
  id: PaymentMethodId;
  label: string;
  badge:
    | { kind: "image"; src: string; alt: string }
    | { kind: "text"; text: string };
}> = [
  {
    id: "mixx",
    label: "Mixx by Yas (T-Money)",
    badge: {
      kind: "image",
      src: "/images/payments/mixx.svg",
      alt: "Mixx by Yas (T-Money)",
    },
  },
  {
    id: "flooz",
    label: "Flooz",
    badge: { kind: "image", src: "/images/payments/flooz.png", alt: "Flooz" },
  },
  {
    id: "visa",
    label: "Visa",
    badge: { kind: "text", text: "VISA" },
  },
  {
    id: "cash",
    label: "Paiement à la livraison",
    badge: { kind: "text", text: "Cash" },
  },
];

type PaymentMethodsProps = {
  /** Mode affichage seul (PDP) ou selectionnable (checkout, Sprint C). */
  selected?: PaymentMethodId;
  onSelect?: (method: PaymentMethodId) => void;
};

/**
 * Moyens de paiement : Mixx by Yas (T-Money) + Flooz fournis par le client.
 * Logos servis depuis public/images/payments.
 */
export function PaymentMethods({
  selected,
  onSelect,
}: PaymentMethodsProps = {}) {
  const selectable = typeof onSelect === "function";

  return (
    <div className="space-y-2">
      <p className="text-xs text-black-70">
        Paiement sécurisé à la livraison ou par mobile money.{" "}
        <span className="underline underline-offset-2">En savoir plus</span>
      </p>
      <div
        className="flex items-center gap-2"
        role={selectable ? "radiogroup" : undefined}
        aria-label={selectable ? "Choisir un moyen de paiement" : undefined}
      >
        {METHODS.map((method) => {
          const isActive = selected === method.id;
          const badge =
            method.badge.kind === "image" ? (
              <img
                src={method.badge.src}
                alt={method.badge.alt}
                className="h-5 w-auto"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold italic text-navy">
                {method.badge.text}
              </span>
            );

          if (!selectable) {
            return (
              <span
                key={method.id}
                title={method.label}
                className="flex h-9 items-center rounded-xs border border-black-10 bg-white px-3"
              >
                {badge}
              </span>
            );
          }

          return (
            <button
              key={method.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={method.label}
              title={method.label}
              onClick={() => onSelect(method.id)}
              className={`flex h-9 cursor-pointer items-center rounded-xs border bg-white px-3 transition-colors ${
                isActive
                  ? "border-black"
                  : "border-black-10 hover:border-black-40"
              }`}
            >
              {badge}
            </button>
          );
        })}
      </div>
    </div>
  );
}
