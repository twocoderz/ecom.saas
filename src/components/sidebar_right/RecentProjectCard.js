export default function RecentProjectCard({ title, date }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4">
      <h3 className="text-gray-800 font-bold text-sm md:text-md">{title}</h3>
      <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString('fr-FR')}</p>
    </div>
  );
}