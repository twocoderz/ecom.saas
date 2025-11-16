export default function AboutIntro() {
  return (
    <div className="flex flex-col gap-6 items-center mb-8">
      {/* Badge */}
      <div className="inline-block animate-fadeInDown">
        <span className="glass-light backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 border border-indigo-200 shadow-md">
          ✨ Notre Histoire
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold font-poppins text-center animate-fadeInUp">
        <span className="text-gradient">À propos</span> de nous
      </h1>

      {/* Description with improved styling */}
      <p className="text-lg md:text-xl font-medium text-slate-600 text-center max-w-3xl leading-relaxed animate-fadeInUp" style={{animationDelay: '100ms'}}>
        Fondée en 2025, <span className="text-indigo-600 font-semibold">AZRATECH</span> excelle dans le développement de sites web et applications mobiles innovants. Nous combinons{' '}
        <span className="relative inline-block">
          <span className="relative z-10">créativité</span>
          <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-200/50 -skew-y-1"></span>
        </span>
        ,{' '}
        <span className="relative inline-block">
          <span className="relative z-10">expertise technique</span>
          <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-200/50 -skew-y-1"></span>
        </span>
        {' '}et{' '}
        <span className="relative inline-block">
          <span className="relative z-10">écoute</span>
          <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-200/50 -skew-y-1"></span>
        </span>
        {' '}pour offrir des solutions sur mesure à nos clients.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-4xl animate-fadeInUp" style={{animationDelay: '200ms'}}>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 p-6 rounded-2xl text-center card-hover">
          <div className="text-3xl font-bold text-indigo-600 mb-2">2025</div>
          <div className="text-sm text-slate-600">Année de création</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 p-6 rounded-2xl text-center card-hover">
          <div className="text-3xl font-bold text-cyan-600 mb-2">4+</div>
          <div className="text-sm text-slate-600">Projets livrés</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-6 rounded-2xl text-center card-hover">
          <div className="text-3xl font-bold text-amber-600 mb-2">2+</div>
          <div className="text-sm text-slate-600">Experts</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-6 rounded-2xl text-center card-hover">
          <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
          <div className="text-sm text-slate-600">Satisfaction</div>
        </div>
      </div>
    </div>
  );
}