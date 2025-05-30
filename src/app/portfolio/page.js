import MainContent from "@/components/main/MainContent";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";

export default function Portfolio() {
  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Notre Portfolio
        </h1>
        <p className="text-gray-600 mb-6">
          Découvrez notre collection complète de projets web et mobiles, conçus pour répondre aux besoins variés de nos clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>
      </section>
    </MainContent>
  );
}