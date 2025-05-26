export default function Tag({ label }) {
  return (
    <span className="inline-block bg-[#EEF1F5] text-gray-800 px-2 py-1 rounded text-sm">
      #{label}
    </span>
  );
}