"use client";
import MainContent from "@/components/main/MainContent";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";
import { useSearchParams } from "next/navigation";

export default function Portfolio() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search")?.toLowerCase() || "";
  const filteredProjects = search
    ? projectsData.filter(
        (project) =>
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search)
      )
    : projectsData;

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Notre Portfolio
        </h1>
        <p className="text-gray-600 mb-6">
          Découvrez notre collection complète de projets web et mobiles, conçus pour répondre aux besoins variés de nos clients.
        </p>
        {search && (
          <p className="mb-4 text-blue-700 text-sm">
            Résultats pour : <span className="font-semibold">{search}</span>
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">Aucun projet ne correspond à votre recherche.</p>
          )}
        </div>
      </section>
    </MainContent>
  );
}