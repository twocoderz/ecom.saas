export default function AboutIntro() {
  const stats = [
    { value: "2025", label: "Année de création" },
    { value: "50+", label: "Projets livrés" },
    { value: "10+", label: "Experts" },
    { value: "100%", label: "Satisfaction" },
  ];

  return (
    <div className="flex flex-col gap-6 items-center mb-16">
      {/* Badge */}
      <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
        Notre Histoire
      </span>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-center text-white">
        À propos de <span className="text-gradient">nous</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-400 text-center max-w-3xl leading-relaxed">
        Fondée en 2025, <span className="text-emerald-400 font-semibold">twocoderz</span> excelle dans le développement 
        de sites web et applications mobiles innovants. Nous combinons créativité, expertise technique et écoute 
        pour offrir des solutions sur mesure à nos clients.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="card-premium p-6 text-center group hover:border-emerald-500/30 transition-colors"
          >
            <div className="text-3xl font-bold font-display text-gradient mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
