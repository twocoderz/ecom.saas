export default function Services() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-lg md:text-xl xl:text-3xl font-bold font-poppins text-[#4F46E5] text-center">Nos services</h2>
      <p className="text-base font-medium text-gray-600 mb-4 text-center">
        Experts en développement web (React, Next.js, Django) et mobile (Flutter, React Native), nous créons des solutions performantes et esthétiques. Nos services incluent :
      </p>
      <ul className="list-disc list-inside text-gray-600 font-semibold text-base space-y-2">
        <li>Sites e-commerce</li>
        <li>Applications de réservation</li>
        <li>Sites vitrines</li>
        <li>Applications métiers personnalisées</li>
      </ul>
      <p className="text-base font-medium text-gray-600 text-center mt-4">
        Nous avons réalisé plus de 50 projets pour des clients dans divers secteurs : e-commerce, éducation, santé.
      </p>
    </div>
  );
}