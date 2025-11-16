import Link from 'next/link';
import ProjectBanner from './ProjectBanner';
import Tag from './Tag';

export default function FeaturedProject({ project }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden card-hover-glow">
      {/* Bannière */}
      <div className="relative overflow-hidden">
        <ProjectBanner
          image={project.images[0].url}
          title={project.title}
          details={project.details}
        />
        {/* Badge type de projet */}
        <div className="absolute top-4 right-4">
          <span className="glass-light backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/30 shadow-lg">
            {project.type === 'mobile' ? '📱 Mobile' : '🌐 Web'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Titre avec icône */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-poppins group-hover:text-indigo-600 transition-colors duration-300">
            {project.title}
          </h2>
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        {/* Bouton avec animation */}
        <Link
          href={`/projects/${project.id}`}
          className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <span>Voir les détails</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}