import Link from 'next/link';
import ProjectBanner from './ProjectBanner';
import Tag from './Tag';

export default function FeaturedProject({ project }) {
  return (
    <div className="bg-white border-2 border-gray-400 p-4 rounded-sm space-y-4">
      {/* Titre */}
      <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center font-poppins">
        {project.title}
      </h2>

      {/* Bannière */}
      <ProjectBanner
        image={project.image}
        title={project.title}
        details={project.details}
      />

      {/* Description */}
      <p className="text-gray-600 tex-base">{project.description}</p>

      {/* Tags */}
      <div className="flex space-x-2">
        {project.tags.map((tag, index) => (
          <Tag key={index} label={tag} />
        ))}
      </div>

      {/* Bouton */}
      <Link
        href={`/projects/${project.id}`}
        className="inline-block bg-[#4F46E5] text-white px-4 py-1 rounded-sm hover:bg-blue-600"
      >
        Voir les détails
      </Link>
    </div>
  );
}