"use client";

import Link from "next/link";
import Image from "next/image";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";

export default function FeaturedProject({ project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="card-premium card-glow overflow-hidden h-full">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.images[0]?.url || "/images/programmeur.png"}
            alt={project.images[0]?.alt || project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.type === "mobile" 
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}>
              {project.type === "mobile" ? "📱 Mobile" : "🌐 Web"}
            </span>
          </div>

          {/* Hover Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <FaExternalLinkAlt className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 text-gray-400 text-xs"
              >
                <FaCode className="w-3 h-3" />
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-gray-500 text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
