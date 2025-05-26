"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Merci, nous vous contacterons bientôt !");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Réinitialisation
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-full mb-6">

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full p-2 focus:outline-none text-sm text-gray-700 placeholder-text-gray-600 font-medium border border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Votre email"
        className="w-full p-2 focus:outline-none text-sm text-gray-700 placeholder-text-gray-600 font-medium border border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Objet (ex. : Demande de devis)"
        className="w-full focus:outline-none p-2 text-sm text-gray-700 placeholder-text-gray-600 font-medium border border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Décrivez votre projet..."
        className="w-full text-sm text-gray-700 placeholder-text-gray-600 font-medium p-2 border focus:outline-none border-2 border-gray-100 rounded-md bg-[#EEF1F5] h-38 resize-none overflow-y-auto"
        required
      />

      <button
        type="submit"
        className="w-full font-medium bg-[#4F46E5] text-white px-4 py-2 rounded-sm text-sm hover:bg-blue-600 cursor-pointer"
      >
        Envoyer
      </button>
    </form>
  );
}
