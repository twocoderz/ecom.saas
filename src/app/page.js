import MainContent from '../components/main/MainContent';
import FeaturedProject from '../components/main/FeaturedProject';
import HeroSection from '../components/main/HeroSection';
import Testimonials from '../components/main/Testimonials';
import projectsData from '../data/projects.json';

export default function Home() {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <>
      <HeroSection />
      <MainContent>
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1e3a8a] font-poppins">
          Projets Réalisés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>
      </MainContent>
      <Testimonials />
    </>
  );
}