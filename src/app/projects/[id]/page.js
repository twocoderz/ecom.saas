"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiSmartphone, FiMonitor, FiExternalLink } from "react-icons/fi";
import ProjectImageGallery from "../components/ProjectImageGalery";
import projectsData from "@/data/projects.json";
import { use } from "react";
import { FaCalendar, FaTag } from "react-icons/fa";

export default function ProjectDetail({ params }) {
  const { id } = use(params);
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Projet non trouvé</h1>
          <p className="text-gray-400 mb-6">
            Désolé, ce projet n'existe pas.
          </p>
          <Link href="/portfolio" className="btn-primary">
            Retour au portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-8"
          >
            <FiArrowLeft className="w-5 h-5" />
            Retour au portfolio
          </Link>

          {/* Main Card */}
          <div className="card-premium overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
                  {project.title}
                </h1>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  project.type === 'mobile' 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {project.type === 'mobile' ? <FiSmartphone className="w-4 h-4" /> : <FiMonitor className="w-4 h-4" />}
                  {project.type === 'mobile' ? 'Application Mobile' : 'Application Web'}
                </span>
              </div>
              <p className="text-gray-400 text-lg">{project.description}</p>
            </div>

            {/* Gallery */}
            <div className="p-8 border-b border-white/10">
              <ProjectImageGallery images={project.images} type={project.type} />
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full" />
                    À propos du projet
                  </h2>
                  <p className="text-gray-400 leading-relaxed">{project.details}</p>

                  {/* Technologies */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-emerald-400 text-sm border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Info */}
                <div className="space-y-6">
                  <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Informations</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        <FaCalendar className="w-4 h-4 text-emerald-400" />
                        <span>Date : <span className="text-white">{project.date}</span></span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <FaTag className="w-4 h-4 text-emerald-400" />
                        <span>Type : <span className="text-white capitalize">{project.type}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Live URL */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Voir le projet en ligne
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
