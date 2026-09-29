import type { ApiPdpResponse } from "../../../types";
import { Price } from "../ui/Price";

type ProductInfoPanelProps = {
  detail: ApiPdpResponse;
  selectedColorName?: string;
};

/**
 * Bloc haut de colonne droite: marque, titre, note, prix,
 * nom de couleur. Les sélecteurs couleur/taille vivent dans AddToCartPanel.
 */
export function ProductInfoPanel({ detail }: ProductInfoPanelProps) {
  const hasDiscount =
    detail.product.sale_price !== null &&
    detail.product.sale_price < detail.product.price;

  return (
    <section className="mb-8" aria-label="Informations produit">
      <h1 className="text-xl font-bold leading-tight text-black-80 lg:text-3xl">
        {detail.brand.name} {detail.product.name}
      </h1>

      <div className="flex flex-col gap-2">
        <div className="mt-4 flex items-center gap-2 text-md">
          <Price
            amountUsd={detail.product.sale_price ?? detail.product.price}
            className={`font-bold ${hasDiscount ? "text-[#d60000]" : "text-black"}`}
          />
          {hasDiscount && (
            <Price
              amountUsd={detail.product.price}
              className="text-md text-black-60 line-through"
            />
          )}
        </div>

        {detail.promotions.length > 0 && (
          <p className="mt-2 inline-block rounded bg-black-5 px-2 py-2 text-sm font-semibold text-black-80">
            {detail.promotions[0]?.code} :{" "}
            {detail.promotions[0]?.description ?? "Offre en cours"}
          </p>
        )}
      </div>
    </section>
  );
}
