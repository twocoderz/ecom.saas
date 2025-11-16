export default function Testimonials() {
  const testimonials = [
    {
      name: "Jean Dupont",
      position: "Directeur Marketing",
      company: "TechCorp",
      content: "AZRATECH a transformé notre présence digitale. Leur expertise en développement web est remarquable.",
      avatar: "👤"
    },
    {
      name: "Marie Martin",
      position: "CEO",
      company: "StartupPlus",
      content: "Une équipe professionnelle et réactive. Notre application mobile dépasse nos attentes.",
      avatar: "👩‍💼"
    },
    {
      name: "Pierre Durand",
      position: "CTO",
      company: "InnovTech",
      content: "Qualité du code exceptionnelle et délais respectés. Hautement recommandé.",
      avatar: "👨‍💻"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1e3a8a] font-poppins">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{testimonial.avatar}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&#34;{testimonial.content}&#34;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}