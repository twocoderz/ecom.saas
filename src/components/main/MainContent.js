import projectsData from '../../data/projects.json';

export default function MainContent({ children }) {
  // Calcul du nombre total de projets
  const projectCount = projectsData.length;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </section>
  );
}
