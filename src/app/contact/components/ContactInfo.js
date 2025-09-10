export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-sm lg:text-base text-gray-500 font-medium">
        Email :{" "}
        <a
          href="mailto:aziamadjicrepin@gmail.com"
          className="text-[#1e3a8a] hover:underline font-poppins"
        >
          azratech@gmail.com
        </a>
      </p>
      <p className="text-sm lg:text-base text-gray-500 font-medium">
        Téléphone :{" "}
        <a href="tel:+22879812087" className="text-[#1e3a8a] hover:underline">
          +228 79 81 20 87
        </a>
      </p>
      <p className="text-sm lg:text-base text-gray-500 font-medium">
        Adresse : Lomé, Togo
      </p>
    </div>
  );
}