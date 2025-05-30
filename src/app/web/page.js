import MainContent from "@/components/main/MainContent";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";

export default function WebProjects() {
  const webProjects = projectsData.filter((project) => project.type === "web");

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Projets Web
        </h1>
        <p className="text-gray-600 mb-6">
          Explorez nos projets web innovants, allant des plateformes e-commerce aux sites vitrines modernes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webProjects.length > 0 ? (
            webProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <p className="text-gray-600">Aucun projet web disponible pour le moment.</p>
          )}
        </div>
      </section>
    </MainContent>
  );
}