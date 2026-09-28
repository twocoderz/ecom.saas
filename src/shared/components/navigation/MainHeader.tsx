import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import AccountButton from "../ui/AccountButton";
import CartButton from "../ui/CartButton";
import { useCartStore } from "../../../stores/useCartStore";
import { ROUTE_PATHS } from "../../../config/paths";

export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileDrawerId = "mobile-main-menu";
  const cartCount = useCartStore((s) => s.count)();
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const burgerButton = burgerButtonRef.current;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      burgerButton?.focus();
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-black py-p2 lg:px-p6">
      <Container>
        {/* Version mobile */}
        <div className="lg:hidden">
          {/* Ligne 1 : menu + logo + compte + panier */}
          <div className="flex items-center justify-between py-p2">
            <button
              ref={burgerButtonRef}
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
                <HamburgerMdIcon className="h-8 w-8 text-white" />
              )}
            </button>
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

          {/* Ligne 2 : recherche mobile pleine largeur, masquée quand le menu est ouvert */}
          {!isMobileMenuOpen && (
            <div className="mt-p2 pb-p2">
              <MobileSearchBar />
            </div>
          )}

          {/* Drawer mobile plein écran façon JD */}
          {isMobileMenuOpen &&
            createPortal(
              <div className="fixed inset-0 z-50 lg:hidden">
                <MobileMenuDrawer
                  id={mobileDrawerId}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              </div>,
              document.body,
            )}
        </div>

        {/* Version desktop : un seul bloc segmenté */}
        <div className="hidden lg:block">
          {/* Ligne 1 : logo + bloc recherche/compte/panier */}
          <div className="flex items-center justify-between gap-p6 py-p2">
            <Logo />
            <div className="flex w-full max-w-3xl items-stretch divide-x divide-black-20 rounded-sm bg-white">
              <DesktopSearchBar />
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
