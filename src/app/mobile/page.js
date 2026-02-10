import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";
import { FaMobileAlt } from "react-icons/fa";

export const metadata = {
  title: "Applications Mobiles - twocoderz",
  description: "Découvrez nos applications mobiles innovantes et performantes.",
};

export default function MobileApps() {
  const mobileProjects = projectsData.filter((project) => project.type === "mobile");

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
            <FaMobileAlt className="w-4 h-4 inline mr-2" />
            Applications Mobiles
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Nos apps <span className="text-gradient">Mobiles</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Découvrez nos applications mobiles conçues pour offrir des expériences utilisateur fluides et performantes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {mobileProjects.length > 0 ? (
            mobileProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-2 text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <FaMobileAlt className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">Aucune application mobile disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
