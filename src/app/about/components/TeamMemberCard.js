import Image from "next/image";

export default function TeamMemberCard({ name, title, imageUrl }) {
  return (
    <div className="bg-[#4F46E5] rounded-lg shadow-sm p-4 w-42 h-58 flex flex-col items-center justify-center hover:cursor-pointer">
      <Image src={imageUrl} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
      <h3 className="text-[#E1E3E7] text-base lg:text-lg font-semibold">{name}</h3>
      <p className="text-[#E1E3E7] text-center text-sm font-medium">{title}</p>
    </div>
  );
}