export default function AccountButton() {
  return (
    <div className="bg-white hover:bg-white/90 transition-all duration-500 border-l border-black-60 ">
      <button
        type="button"
        aria-label="Go to account"
        className="cursor-pointer px-4 py-3 flex items-center justify-center"
      >
        <span className="text-sm text-black-80 font-normal">Account</span>
      </button>
    </div>
  );
}
