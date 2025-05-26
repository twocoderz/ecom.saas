export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-gray-500 font-medium">Email : <a href="mailto:contact@portfoliopro.com" className="text-[#4F46E5] hover:underline text-sm lg:text-base font-poppins">contact@portfoliopro.com</a></p>
      <p className="text-gray-500 font-medium">Téléphone : <a href="tel:+33123456789" className="text-[#4F46E5] hover:underline">+33 1 23 45 67 89</a></p>
      <p className=" text-sm lg:text-base text-gray-500 font-medium">Adresse : Paris, France</p>
      <p className="text-sm text-gray-400 font-medium">Horaires : Lun-Ven, 9h-18h</p>
    </div>
  );
}