import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import MainContent from "@/components/main/MainContent";
import ProjectImageGallery from "../components/ProjectImageGalery";
import projectsData from "@/data/projects.json";

export default function ProjectDetail({ params }) {
  const id = params.id;
  // Trouver le projet correspondant à l'ID
  const project = projectsData.find((p) => p.id === id);

  // Si le projet n'existe pas, afficher une erreur ou rediriger
  if (!project) {
    return (
      <MainContent>
        <section className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Projet non trouvé
          </h1>
          <p className="text-gray-600">
            Désolé, ce projet n&apos;existe pas.{" "}
            <Link href="/about" className="text-blue-600 hover:underline">
              Retour à la page À propos
            </Link>
          </p>
        </section>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <section className="flex flex-col items-start gap-3">
        <Link
          href="/"
          className="flex items-center text-[#E1E3E7] bg-[#4F46E5] p-1 rounded-full"
        >
          <FiArrowLeft size={20} />
        </Link>

        <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
        <ProjectImageGallery images={project.images} />
        <p className="text-gray-600">{project.description}</p>
        <p className="text-gray-600 italic">{project.details}</p>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Technologies utilisées
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600 text-sm">Date : {project.date}</p>
        <p className="text-gray-600 text-sm">Type : {project.type}</p>
        {project.liveUrl && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Voir le projet
            </h2>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Visiter le site
            </Link>
          </div>
        )}
      </section>
    </MainContent>
  );
}