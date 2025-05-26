import ContactIntro from "./components/ContactIntro";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

export default function Contact() {
  return (
    <div className="md:col-span-2 bg-white flex flex-col items-center text-gray-900 w-full rounded-sm shadow-sm">
      <section className="w-full max-w-md p-4 flex flex-col items-center">
        <h1 className="text-lg md:text-xl xl:text-3xl font-bold font-poppins text-[#4F46E5] mb-6 text-center">
          Contact Us
        </h1>

        {/* Introduction */}
        <ContactIntro />

        {/* Formulaire */}
        <ContactForm />

        {/* Informations de contact */}
        <ContactInfo />
      </section>
    </div>
  );
}
