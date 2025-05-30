"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setStatus({ type: "error", message: "Veuillez entrer un email valide." });
      return;
    }

    const time = new Date().toLocaleString("fr-FR", {
      timeZone: "GMT",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    try {
      const result = await emailjs.send(
        "service_aydwv4u", // Remplacez par votre Service ID
        "template_4dku10m", // Remplacez par votre Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: time, // Ajout de l'heure actuelle
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.text === "OK") {
        setStatus({
          type: "success",
          message: "Message envoyé ! Nous vous contacterons bientôt.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
      console.error("EmailJS error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-full mb-6">
      {status.message && (
        <p className={`text-sm font-medium ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {status.message}
        </p>
      )}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Votre nom"
        className="w-full p-2 focus:outline-none text-sm text-gray-700 placeholder-gray-600 font-medium border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Votre email"
        className="w-full p-2 focus:outline-none text-sm text-gray-700 placeholder-gray-600 font-medium border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Objet (ex. : Demande de devis)"
        className="w-full p-2 focus:outline-none text-sm text-gray-700 placeholder-gray-600 font-medium border-2 border-gray-100 rounded-md bg-[#EEF1F5]"
        required
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Décrivez votre projet..."
        className="w-full p-2 text-sm text-gray-700 placeholder-gray-600 font-medium border-2 border-gray-100 rounded-md bg-[#EEF1F5] h-32 resize-none overflow-y-auto focus:outline-none"
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