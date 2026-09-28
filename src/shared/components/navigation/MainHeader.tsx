import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../branding/Logo";
import { Container } from "../layout/Container";
import { MegaMenu } from "./MegaMenu";
import {
  CloseIcon,
  HamburgerMdIcon,
  ShoppingCartIcon,
  UserIcon,
} from "../../icons";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import MobileSearchBar from "../ui/MobileSearchBar";
import DesktopSearchBar from "../ui/DesktopSearchBar";
import { PrefsSwitcher } from "../ui/PrefsSwitcher";
import AccountButton from "../ui/AccountButton";
import CartButton from "../ui/CartButton";
import { useCartStore } from "../../../stores/useCartStore";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * En-tete principal de navigation (sticky façon JD).
 */
export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileDrawerId = "mobile-main-menu";
  const cartCount = useCartStore((s) => s.count)();

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
    <header className="sticky top-0 z-30 bg-black py-p2 lg:px-p6">
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
              <span className="[&_select]:border-white/30 [&_select]:bg-black [&_select]:text-white">
                <PrefsSwitcher compact />
              </span>
            </div>
            <Logo />
            <div className="flex items-center gap-p2">
              <Link
                to={ROUTE_PATHS.auth}
                aria-label="Accéder à votre compte"
                className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <UserIcon className="h-7 w-7 text-white" />
              </Link>
              <Link
                to={ROUTE_PATHS.cart}
                aria-label={`Voir le panier, ${cartCount} articles`}
                className="relative flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ShoppingCartIcon className="h-7 w-7 text-white" />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
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
            <div className="flex flex-1 items-center justify-end gap-2">
              <DesktopSearchBar />
              <PrefsSwitcher />
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
