import projectsData from '../../data/projects.json';

export default function MainContent({ children }) {
  // Calcul du nombre total de projets
  const projectCount = projectsData.length;

  return (
    <section className="flex flex-col gap-6 p-6 w-full">
      {children}
    </section>
  );
}
