import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../stores/useAuthStore";
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
