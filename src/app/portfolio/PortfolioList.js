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
        <p className="mb-8 text-emerald-400 text-sm text-center">
          Résultats pour : <span className="font-semibold">{search}</span>
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-2 text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Aucun projet ne correspond à votre recherche.</p>
            <p className="text-gray-500 text-sm mt-2">Essayez avec d'autres termes.</p>
          </div>
        )}
      </div>
    </>
  );
}
