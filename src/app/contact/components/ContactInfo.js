import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "contact@twocoderz.com",
      href: "mailto:contact@twocoderz.com",
    },
    {
      icon: FaPhone,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Adresse",
      value: "Paris, France",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <div className="space-y-6">
      {contactDetails.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <item.icon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">{item.label}</p>
            {item.href ? (
              <a
                href={item.href}
                className="text-white font-semibold hover:text-emerald-400 transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-white font-semibold">{item.value}</p>
            )}
          </div>
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-white/10 my-6" />

      {/* Social Links */}
      <div>
        <p className="text-sm text-gray-400 mb-4">Suivez-nous</p>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-emerald-500/30"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
