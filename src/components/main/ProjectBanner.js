export default function ProjectBanner({ image, title, details }) {
  return (
    <div className="relative bg-gray-200 rounded-sm overflow-hidden h-48">
      {/* Image de fond */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Texte superposé */}
      <div className="absolute inset-0 hidden hover:block hover:bg-[#E1E3E7] hover:text-[#4F46E5] bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-md md:text-lg font-bold">{title}</h3>
          <p className="text-base">{details}</p>
        </div>
      </div>
    </div>
  );
}