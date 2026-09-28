import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, UserIcon } from "../../icons";
import { useAuthStore } from "../../../stores/useAuthStore";
import { ROUTE_PATHS } from "../../../config/paths";

export default function AccountButton() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      cancelClose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex items-stretch"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-label="Mon compte"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1 px-4 text-black-80 transition-colors hover:bg-black-5"
      >
        {user ? (
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white"
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <UserIcon className="h-6 w-6 text-black-80" />
        )}
        <span className="whitespace-nowrap text-sm font-normal">
          {user ? user.name : "Compte"}
        </span>
        <ChevronDownIcon className="h-6 w-6 text-black-60" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Menu compte"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 rounded-md border border-black-20 bg-white p-4 text-black-80 shadow-lg"
        >
          {user ? (
            <div className="space-y-3">
              <p className="text-sm">
                Bonjour, <strong>{user.name}</strong>
              </p>
              <ul className="space-y-1 text-sm font-semibold">
                <li>
                  <Link
                    to={ROUTE_PATHS.accountDashboard}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-1.5 hover:bg-black-5"
                  >
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTE_PATHS.accountOrders}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-1.5 hover:bg-black-5"
                  >
                    Mes commandes
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTE_PATHS.accountWishlist}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-1.5 hover:bg-black-5"
                  >
                    Ma wishlist
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="w-full rounded-md border border-black-20 px-4 py-2 text-sm font-semibold hover:border-black"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold">Bienvenue</p>
              <div className="grid gap-2">
                <Link
                  to={ROUTE_PATHS.auth}
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:bg-black-80"
                >
                  Se connecter
                </Link>
                <Link
                  to={ROUTE_PATHS.auth}
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-black-20 px-4 py-2 text-center text-sm font-semibold hover:border-black"
                >
                  Créer un compte
                </Link>
              </div>
              <ul className="space-y-1 border-t border-black-10 pt-2 text-sm">
                <li>
                  <Link
                    to={ROUTE_PATHS.orderTracking}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-1.5 hover:bg-black-5"
                  >
                    Suivre ma commande
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTE_PATHS.help}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-1.5 hover:bg-black-5"
                  >
                    Aide
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
