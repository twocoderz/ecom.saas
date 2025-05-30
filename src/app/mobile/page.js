import MainContent from "@/components/main/MainContent";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";

export default function MobileApps() {
  const mobileProjects = projectsData.filter((project) => project.type === "mobile");

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Applications Mobiles
        </h1>
        <p className="text-gray-600 mb-6">
          Découvrez nos applications mobiles conçues pour offrir des expériences utilisateur fluides et performantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mobileProjects.length > 0 ? (
            mobileProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <p className="text-gray-600">Aucune application mobile disponible pour le moment.</p>
          )}
        </div>
      </section>
    </MainContent>
  );
}