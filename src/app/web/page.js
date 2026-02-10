import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";
import { FaGlobe } from "react-icons/fa";

export const metadata = {
  title: "Projets Web - twocoderz",
  description: "Découvrez nos projets web innovants et performants.",
};

export default function WebProjects() {
  const webProjects = projectsData.filter((project) => project.type === "web");

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            <FaGlobe className="w-4 h-4 inline mr-2" />
            Projets Web
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Nos réalisations <span className="text-gradient">Web</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explorez nos projets web innovants, allant des plateformes e-commerce aux sites vitrines modernes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {webProjects.length > 0 ? (
            webProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-2 text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <FaGlobe className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">Aucun projet web disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
