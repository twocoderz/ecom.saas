import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-sm italic text-[#1e3a8a] text-center inter-font">
        Vous avez un projet en tête ? Contactez-nous pour discuter de vos
        besoins !
      </p>
      <Link
        href="/contact"
        className="text-sm md:text-base font-medium mt-4 inline-block bg-[#1e3a8a] text-white px-4 md:px-8 py-1 rounded-sm hover:bg-blue-600"
      >
        Nous contacter
      </Link>
    </div>
  );
}
