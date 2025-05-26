import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import DynamicLayout from "../components/DynamicLayout"; // Nouveau composant
import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "PortfolioPro - Web & Mobile Solutions",
  description: "Showcase of our best web and mobile projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <div className="px-4 py-8 pt-16 md:pt-20">
          <DynamicLayout>{children}</DynamicLayout>
        </div>
        <Footer />
      </body>
    </html>
  );
}