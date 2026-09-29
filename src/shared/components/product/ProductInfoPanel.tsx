import type { ApiPdpResponse } from "../../../types";
import { ProductPrice } from "../ui/ProductPrice";

type ProductInfoPanelProps = {
  detail: ApiPdpResponse;
  selectedColorName?: string;
};

/**
 * Bloc haut de colonne droite: marque, titre, note, prix,
 * nom de couleur. Les sélecteurs couleur/taille vivent dans AddToCartPanel.
 */
export function ProductInfoPanel({ detail }: ProductInfoPanelProps) {
  return (
    <section className="mb-8" aria-label="Informations produit">
      <h1 className="text-xl font-bold leading-tight text-black-80 lg:text-3xl">
        {detail.brand.name} {detail.product.name}
      </h1>

      <div className="flex flex-col gap-2">
        <div className="mt-4">
          <ProductPrice
            price={detail.product.price}
            salePrice={detail.product.sale_price}
            size="pdp"
          />
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
