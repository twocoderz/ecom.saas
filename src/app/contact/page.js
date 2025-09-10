import ContactIntro from "./components/ContactIntro";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

export default function Contact() {
  return (
    <div className="md:col-span-2 bg-white flex flex-col items-center text-gray-900 w-full rounded-sm shadow-sm">
      <section className="w-full max-w-lg p-6 flex flex-col items-center gap-8">
        <h1 className="text-lg md:text-xl xl:text-3xl font-bold font-poppins text-[#1e3a8a] text-center">
          Nous contacter
        </h1>
        <ContactIntro />
        <ContactForm />
        <ContactInfo />
      </section>
    </div>
  );
}