"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiSmartphone, FiMonitor } from "react-icons/fi";
import MainContent from "@/components/main/MainContent";
import ProjectImageGallery from "../components/ProjectImageGalery";
import projectsData from "@/data/projects.json";
import { use } from "react";

export default function ProjectDetail({ params }) {
  const { id } = use(params);
  // Trouver le projet correspondant à l'ID
  const project = projectsData.find((p) => p.id === id);

  // Si le projet n'existe pas, afficher une erreur ou rediriger
  if (!project) {
    return (
      <MainContent>
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center mx-2 my-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Projet non trouvé
          </h1>
          <p className="text-gray-600">
            Désolé, ce projet n&apos;existe pas.{' '}
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
      <section className="w-full max-w-3xl mx-auto bg-white/90 p-3 sm:p-6 md:p-8 rounded-2xl shadow-xl mt-4 mb-8 flex flex-col gap-4 sm:gap-6">
        <Link
          href="/"
          className="flex items-center text-[#E1E3E7] bg-[#1e3a8a] p-2 sm:p-2.5 rounded-full mb-2 w-fit hover:bg-[#3730a3] transition-colors"
        >
          <FiArrowLeft size={22} />
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight break-words">
            {project.title}
          </h1>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${project.type === 'mobile' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {project.type === 'mobile' ? <FiSmartphone /> : <FiMonitor />} {project.type}
          </span>
        </div>
        <div className="mb-2 sm:mb-4">
          <ProjectImageGallery images={project.images} type={project.type} />
        </div>
        <div className="mb-2 sm:mb-4">
          <p className="text-gray-700 text-base sm:text-lg mb-1 break-words">{project.description}</p>
          <p className="text-gray-500 italic text-sm sm:text-base break-words">{project.details}</p>
        </div>
        <div className="mb-2 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
            Technologies utilisées
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-1 sm:mb-2 text-xs sm:text-sm text-gray-600">
          <span>Date : <span className="font-medium text-gray-800">{project.date}</span></span>
          <span>Type : <span className="font-medium text-gray-800">{project.type}</span></span>
        </div>
        {project.liveUrl && (
          <div className="mt-2 sm:mt-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Voir le projet
            </h2>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Visiter le site
            </Link>
          </div>
        )}
      </section>
    </MainContent>
  );
}