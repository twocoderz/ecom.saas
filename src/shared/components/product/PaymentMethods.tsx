/**
 * Moyens de paiement : Mixx by Yas (T-Money) + Flooz fournis par le client.
 * Logos servis depuis public/images/payments.
 */
export function PaymentMethods() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-black-70">
        Paiement sécurisé à la livraison ou par mobile money.{" "}
        <span className="underline underline-offset-2">En savoir plus</span>
      </p>
      <div className="flex items-center gap-2">
        <span className="flex h-9 items-center rounded-xs border border-black-10 bg-white px-3">
          <img
            src="/images/payments/mixx.svg"
            alt="Mixx by Yas (T-Money)"
            className="h-5 w-auto"
            loading="lazy"
          />
        </span>
        <span className="flex h-9 items-center rounded-xs border border-black-10 bg-white px-3">
          <img
            src="/images/payments/flooz.png"
            alt="Flooz"
            className="h-5 w-auto"
            loading="lazy"
          />
        </span>
        <span className="flex h-9 items-center rounded-xs border border-black-10 bg-white px-3 text-xs font-bold italic text-[#1a1f71]">
          VISA
        </span>
      </div>
    </div>
  );
}
