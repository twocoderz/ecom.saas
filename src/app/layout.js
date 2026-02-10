import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import DynamicLayout from "../components/DynamicLayout";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "twocoderz - Développement Web & Mobile Premium",
  description: "Agence de développement web et mobile. Nous transformons vos idées en solutions digitales innovantes, élégantes et performantes.",
  keywords: ["développement web", "développement mobile", "applications", "web design", "twocoderz"],
  authors: [{ name: "twocoderz" }],
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
    icon: [
      { url: "/logo.jpeg", type: "image/jpeg" }
    ],
  },
  openGraph: {
    title: "twocoderz - Développement Web & Mobile Premium",
    description: "Agence de développement web et mobile. Nous transformons vos idées en solutions digitales innovantes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0a0f1c] text-white antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
