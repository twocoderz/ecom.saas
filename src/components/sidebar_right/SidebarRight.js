import Link from "next/link";
import RecentProjectCard from "./RecentProjectCard";
import projectsData from "../../data/projects.json";

export default function SidebarRight() {
  // Prendre les 2 projets les plus récents (tri par date décroissante)
  const recentProjects = projectsData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <aside className="bg-white p-6 rounded-sm shadow-sm">
      {/* Titre */}
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold font-poppins text-[#1e3a8a] flex items-center mb-4">
        Projets Récents
      </h2>

      {/* Liste des projets récents */}
      <div className="space-y-4">
        {recentProjects.map((project) => (
          <RecentProjectCard
            key={project.id}
            title={project.title}
            date={project.date}
          />
        ))}
      </div>

      {/* Bouton "Voir tous les projets" */}
      <Link
        href="/portfolio"
        className="text-sm block mt-6 text-[#1e3a8a] hover:text-blue-800 hover:underline text-center"
      >
        Voir tous les projets
      </Link>
    </aside>
  );
}