import { useState } from "react";
import Logo from "../branding/Logo";
import { Container } from "../layout/Container";
import { MegaMenu } from "./MegaMenu";
import {
  GlobeIcon,
  HamburgerMdIcon,
  ShoppingCartIcon,
  UserIcon,
} from "../../icons";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import MobileSearchBar from "../ui/MobileSearchBar";
import DesktopSearchBar from "../ui/DesktopSearchBar";
import LocationButton from "../ui/LocationButton";
import AccountButton from "../ui/AccountButton";
import CartButton from "../ui/CartButton";

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
                aria-label="Open or close mobile menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus-visible:outline focus-visible:outline-white"
              >
                <HamburgerMdIcon className="text-white" />
              </button>
              <button type="button" aria-label="Change location">
                <GlobeIcon className="text-white" />
              </button>
            </div>
            <Logo />
            {/* Icones de droite */}
            <div className="flex items-center gap-p2">
              <button type="button" aria-label="Go to your account">
                <UserIcon className="text-white" />
              </button>
              <button type="button" aria-label="Shopping cart">
                <ShoppingCartIcon className="text-white" />
              </button>
            </div>
          </div>
          {/* ligne2 : la barre de recherche en full width */}
          <div className="py-p2">
            <MobileSearchBar />
          </div>
          {/* Drawer mobile : seulement si ouvert */}
          {isMobileMenuOpen && <MobileMenuDrawer />}
        </div>
        {/* Version desktop */}
        <div className="hidden lg:block">
          {/* Ligne1 : Logo, recherche + les actions */}
          <div className="flex items-center justify-between">
            {/* Le Logo seul a gauche */}
            <Logo />
            {/* SearchBar + actions a droite */}
            <div className="flex items-center">
              <DesktopSearchBar />
              <LocationButton />
              <AccountButton />
              <CartButton />
            </div>
          </div>
          {/* Ligne2 : Le megamenu */}
          <MegaMenu />
        </div>
      </Container>
    </header>
  );
}
