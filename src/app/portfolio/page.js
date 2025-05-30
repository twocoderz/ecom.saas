"use client";

import MainContent from "@/components/main/MainContent";
import FeaturedProject from "@/components/main/FeaturedProject";
import projectsData from "@/data/projects.json";
import { useSearchParams, Suspense } from "next/navigation";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredProjects = projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery) ||
      project.technologies.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Notre Portfolio
        </h1>
        <p className="text-gray-600 mb-6">
          {searchQuery
            ? `Résultats de la recherche pour "${searchQuery}"`
            : "Découvrez notre collection complète de projets web et mobiles, conçus pour répondre aux besoins variés de nos clients."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))
          ) : (
            <p className="text-gray-600">
              Aucun projet ne correspond à votre recherche.
            </p>
          )}
        </div>
      </section>
    </MainContent>
  );
}

export default function Portfolio() {
  return (
    <Suspense fallback={<div className="text-center text-gray-600">Chargement des projets...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}