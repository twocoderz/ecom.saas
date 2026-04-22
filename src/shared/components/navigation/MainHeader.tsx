import { useEffect, useState } from "react";
import Logo from "../branding/Logo";
import { Container } from "../layout/Container";
import { MegaMenu } from "./MegaMenu";
import {
  CloseIcon,
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
 * En-tete principal de navigation.
 */
export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileDrawerId = "mobile-main-menu";

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-20 bg-black py-p2 lg:px-p6">
      <Container>
        {/* Version mobile */}
        <div className="lg:hidden">
          {/* Ligne 1 : actions + logo */}
          <div className="flex items-center justify-between py-p2">
            <div className="flex items-center gap-p2">
              <button
                type="button"
                aria-label={
                  isMobileMenuOpen
                    ? "Fermer le menu mobile"
                    : "Ouvrir le menu mobile"
                }
                aria-controls={mobileDrawerId}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="h-6 w-6 text-white" />
                ) : (
                  <HamburgerMdIcon className="h-7 w-7 text-white" />
                )}
              </button>
              <button
                type="button"
                aria-label="Changer la localisation"
                className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <GlobeIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <Logo />
            <div className="flex items-center gap-p2">
              <button
                type="button"
                aria-label="Acceder a votre compte"
                className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <UserIcon className="h-7 w-7 text-white" />
              </button>
              <button
                type="button"
                aria-label="Voir le panier"
                className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ShoppingCartIcon className="h-7 w-7 text-white" />
              </button>
            </div>
          </div>

          {/* Ligne 2 : recherche mobile pleine largeur */}
          <div className="mt-p2 pb-p2">
            <MobileSearchBar />
          </div>

          {/* Drawer mobile en overlay */}
          {isMobileMenuOpen && (
            <>
              <button
                type="button"
                aria-label="Fermer le menu mobile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-30 bg-black/40"
              />
              <div className="absolute left-0 right-0 top-full z-40 pt-p2">
                <MobileMenuDrawer
                  id={mobileDrawerId}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </>
          )}
        </div>

        {/* Version desktop */}
        <div className="hidden lg:block">
          {/* Ligne 1 : logo + recherche + actions */}
          <div className="flex items-center justify-between gap-p6 py-p2">
            <Logo />
            <div className="flex flex-1 items-center justify-end">
              <DesktopSearchBar />
              <LocationButton />
              <AccountButton />
              <CartButton />
            </div>
          </div>

          {/* Ligne 2 : menu categories */}
          <MegaMenu />
        </div>
      </Container>
    </header>
  );
}
