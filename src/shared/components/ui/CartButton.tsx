import { ShoppingCartIcon } from "../../icons";

export default function CartButton() {
  return (
    <button
      type="button"
      aria-label="Go to cart"
      className="bg-white hover:bg-black-5 transition-all duration-500 px-p2 py-p2 flex items-center border-l border-black-80 rounded-r-md cursor-pointer"
    >
      <ShoppingCartIcon text-black-80 />
      <span className="text-md font-normal text-black-80">Cart</span>
    </button>
  );
}
