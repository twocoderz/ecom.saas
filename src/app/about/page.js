import AboutIntro from "./components/AboutIntro";
import Team from "./components/Team";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "À propos - twocoderz",
  description: "Découvrez l'équipe twocoderz et notre passion pour le développement web et mobile.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-8 items-center">
          <AboutIntro />
          <Team />
          
          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vous voulez rejoindre l&apos;aventure ?
            </h3>
            <p className="text-gray-400 mb-6">
              Nous sommes toujours à la recherche de nouveaux talents passionnés.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Nous contacter
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
