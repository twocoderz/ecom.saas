export default function Tag({ label }) {
  // Couleurs dynamiques basées sur le type de technologie
  const getTagColor = (tech) => {
    const lowerTech = tech.toLowerCase();

    if (lowerTech.includes('react') || lowerTech.includes('next')) {
      return 'bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 text-cyan-700 border border-cyan-200';
    }
    if (lowerTech.includes('flutter') || lowerTech.includes('dart')) {
      return 'bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-700 border border-indigo-200';
    }
    if (lowerTech.includes('appwrite') || lowerTech.includes('firebase')) {
      return 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 border border-amber-200';
    }
    if (lowerTech.includes('node') || lowerTech.includes('express')) {
      return 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 border border-emerald-200';
    }
    // Default
    return 'bg-gradient-to-r from-slate-500/10 to-slate-600/10 text-slate-700 border border-slate-200';
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${getTagColor(label)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
      {label}
    </span>
  );
}