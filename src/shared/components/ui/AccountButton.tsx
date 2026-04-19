export default function AccountButton() {
  return (
    <button
      type="button"
      aria-label="Go to account"
      className="bg-white hover:bg-black-5 transition-all duration-500 px-p2 py-p2 flex items-center justify-center border-l border-black-80 cursor-pointer"
    >
      <span className="text-md text-black-80 font-normal">Account</span>
    </button>
  );
}
