export default function FastFactCard({ number, label }) {
  return (
    <div className="bg-[#4F46E5] rounded-lg shadow-sm p-4 w-42 h-48 flex flex-col items-center justify-center hover:cursor-pointer">
      <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#E1E3E7]">{number}</span>
      <p className="text-[#E1E3E7] text-sm mt-2 font-medium">{label}</p>
    </div>
  );
}