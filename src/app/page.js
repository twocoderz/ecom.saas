import MainContent from '../components/main/MainContent';
import FeaturedProject from '../components/main/FeaturedProject';
import projectsData from '../data/projects.json';

export default function Home() {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <MainContent>
      {featuredProjects.map((project) => (
        <FeaturedProject key={project.id} project={project} />
      ))}
    </MainContent>
  );
}