import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { AppShell } from "../shared/components/layout/AppShell";
import { AdminShell } from "../shared/components/admin/AdminShell";
import { RequireAdmin } from "./guards";

/**
 * Layout: header + trust + footer partages.
 */
export function StorefrontLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

/**
 * Layout back-office isole avec garde admin mock.
 */
export function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <RequireAdmin>
      <AdminShell>{children ?? <Outlet />}</AdminShell>
    </RequireAdmin>
  );
}

/**
 * Layout authentification : page autonome sans header ni footer
 * (style portail de compte : logo centre, contenu etroit).
 */
export function AuthLayout() {
  return (
    <main className="min-h-screen bg-white">
      <Outlet />
    </main>
  );
}

/**
 * Layout systeme nu : 404/500/maintenance sans header/footer/newsletter.
 * Les pages systeme ne doivent pas heriter du shell boutique.
 */
export function SystemLayout() {
  return (
    <main className="min-h-screen bg-white">
      <Outlet />
    </main>
  );
}
