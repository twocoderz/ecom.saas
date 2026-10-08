import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { ROUTE_PATHS } from "../config/paths";

/**
 * Garde auth mock : redirige vers /auth si non connecte.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to={ROUTE_PATHS.auth} replace />;
  return <>{children}</>;
}

/**
 * Garde admin mock : redirige vers /auth si non admin.
 */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== "admin") return <Navigate to={ROUTE_PATHS.auth} replace />;
  return <>{children}</>;
}

/**
 * Garde panier : le tunnel checkout exige au moins une ligne.
 * Redirige vers /cart si le panier est vide.
 */
export function RequireCart({ children }: { children: ReactNode }) {
  const lines = useCartStore((s) => s.lines);
  if (lines.length === 0) return <Navigate to={ROUTE_PATHS.cart} replace />;
  return <>{children}</>;
}
