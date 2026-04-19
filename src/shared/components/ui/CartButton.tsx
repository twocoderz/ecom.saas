import { ShoppingCartIcon } from "../../icons";

export default function CartButton() {
  return (
    <div className="bg-white hover:bg-white/90 transition-all duration-500 border-l border-black-80 rounded-r-sm">
      <button
        type="button"
        aria-label="Go to cart"
        className="cursor-pointer flex items-center gap-2 px-4 py-2"
      >
        <ShoppingCartIcon className="text-black-60 w-4 h-4" />
        <span className="text-sm font-normal text-black-80">Cart</span>
      </button>
    </div>
  );
}
