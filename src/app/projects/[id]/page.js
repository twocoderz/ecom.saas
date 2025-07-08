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
      <section className="max-w-3xl mx-auto bg-white/90 p-8 rounded-2xl shadow-xl mt-6 mb-8">
        <Link
          href="/"
          className="flex items-center text-[#E1E3E7] bg-[#4F46E5] p-1 rounded-full mb-4"
        >
          <FiArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {project.title}
          </h1>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${project.type === 'mobile' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {project.type === 'mobile' ? <FiSmartphone /> : <FiMonitor />} {project.type}
          </span>
        </div>
        <div className="mb-6">
          <ProjectImageGallery images={project.images} type={project.type} />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-lg mb-1">{project.description}</p>
          <p className="text-gray-500 italic text-base">{project.details}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
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
        <div className="flex gap-6 mb-2 text-sm text-gray-600">
          <span>Date : <span className="font-medium text-gray-800">{project.date}</span></span>
          <span>Type : <span className="font-medium text-gray-800">{project.type}</span></span>
        </div>
        {project.liveUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Voir le projet
            </h2>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
            >
              Visiter le site
            </Link>
          </div>
        )}
      </section>
    </MainContent>
  );
}