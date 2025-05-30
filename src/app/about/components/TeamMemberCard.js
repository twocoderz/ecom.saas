import Image from "next/image";

export default function TeamMemberCard({ name, title, imageUrl }) {
  return (
    <div className="bg-[#4F46E5] rounded-lg shadow-sm p-4 flex flex-col items-center justify-center hover:cursor-pointer">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes="96px"
        />
      </div>
      <h3 className="text-[#E1E3E7] text-base font-semibold">{name}</h3>
      <p className="text-[#E1E3E7] text-center text-sm font-medium">{title}</p>
    </div>
  );
}