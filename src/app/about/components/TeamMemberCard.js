import Image from "next/image";

export default function TeamMemberCard({ name, title, imageUrl }) {
  return (
    <div className="card-premium p-6 flex flex-col items-center justify-center hover:border-emerald-500/30 transition-colors group">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-full object-cover border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-colors"
          sizes="96px"
        />
      </div>
      <h3 className="text-white text-base font-semibold group-hover:text-emerald-400 transition-colors">{name}</h3>
      <p className="text-gray-400 text-center text-sm">{title}</p>
    </div>
  );
}
