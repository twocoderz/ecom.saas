import { useState } from "react";
import Logo from "../branding/Logo";
import { Container } from "../layout/Container";
import { MegaMenu } from "./MegaMenu";
import { GlobeIcon, HamburgerMdIcon } from "../../icons";

/**
 * Main navigation header.
 * JD mapping: brand area + search + account/cart actions + department nav.
 */
export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="z-20 bg-black py-p2 px-p6">
      <Container>
        {/* Version mobile */}
        <div className="lg:hidden">
          {/* ligne1 : les icones */}
          <div className="flex items-center justify-between">
            {/* Icones de gauche */}
            <div className="flex items-center gap-p2">
              <button
                type="button"
                aria-label="Ouvrir ou fermer le menu mobile"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus-visible:outline focus-visible:outline-white"
              >
                <HamburgerMdIcon className="text-white" />
              </button>
              <button type="button" aria-label="Changer de localisation">
                <GlobeIcon className="text-white" />
              </button>
            </div>
            <Logo />
            <div></div>
          </div>
          {/* ligne2 : la barre de recherche en full */}
          <div></div>
        </div>
        {/* Version desktop */}
        <div></div>
      </Container>
      <MegaMenu />
    </header>
  );
}
