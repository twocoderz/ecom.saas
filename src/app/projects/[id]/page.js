import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import MainContent from "@/components/main/MainContent";
import ProjectImageGallery from "../components/ProjectImageGalery";

// Données fictives pour les projets
const projects = [
  {
    id: "1",
    title: "Boutique Chic - Plateforme E-commerce",
    description:
      "Une plateforme e-commerce moderne pour Boutique Chic, permettant une gestion simplifiée des produits et des paiements en ligne. Ce projet a permis de doubler les ventes en 6 mois.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    images: [
      {
        url: "/images/project2.webp",
        alt: "Écran principal de Boutique Chic",
      },
      { url: "/images/project1.webp", alt: "Page de paiement sécurisé" },
      { url: "/images/project3.webp", alt: "Tableau de bord administrateur" },
    ],
    liveUrl: "https://boutiquechic-demo.com",
  },
  {
    id: "2",
    title: "App de Réservation - TravelEasy",
    description:
      "Une application mobile pour réserver des voyages, avec une interface intuitive et des notifications en temps réel pour les utilisateurs.",
    technologies: ["Flutter", "Firebase", "Google Maps API"],
    images: [
      { url: "/images/project4.webp", alt: "Écran d’accueil TravelEasy" },
      { url: "/images/project5.webp", alt: "Réservations en cours" },
    ],
    liveUrl: "https://traveleasy-demo.com",
  },
  {
    id: "3",
    title: "Site Vitrine - École Nova",
    description:
      "Un site vitrine pour l’école Nova, mettant en avant leurs programmes éducatifs avec un design moderne et responsive.",
    technologies: ["Next.js", "Django", "PostgreSQL"],
    images: [
      { url: "/images/project2.webp", alt: "Page d’accueil École Nova" },
      { url: "/images/project5.webp", alt: "Section programmes" },
    ],
    liveUrl: "https://ecolenova-demo.com",
  },
];

export default function ProjectDetail({ params }) {
  const id = params.id;
  // Trouver le projet correspondant à l'ID
  const project = projects.find((p) => p.id === id);

  // Si le projet n'existe pas, afficher une erreur ou rediriger
  if (!project) {
    return (
      <MainContent>
        <section className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Projet non trouvé
          </h1>
          <p className="text-gray-600">
            Désolé, ce projet n'existe pas.{" "}
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
