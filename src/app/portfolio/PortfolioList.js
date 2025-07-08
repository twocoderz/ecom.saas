"use client";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";
import { useSearchParams } from "next/navigation";

export default function PortfolioList() {
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
    <>
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
          <p className="col-span-2 text-center text-gray-500">
            Aucun projet ne correspond à votre recherche.
          </p>
        )}
      </div>
    </>
  );
} 