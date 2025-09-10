import Link from 'next/link';
import ProjectBanner from './ProjectBanner';
import Tag from './Tag';

export default function FeaturedProject({ project }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Bannière */}
      <ProjectBanner
        image={project.images[0].url}
        title={project.title}
        details={project.details}
      />

      <div className="p-6 space-y-4">
        {/* Titre */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-poppins">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>

        {/* Bouton */}
        <Link
          href={`/projects/${project.id}`}
          className="inline-block bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors duration-300"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
}