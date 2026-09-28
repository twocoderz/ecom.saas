import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { AppShell } from "../shared/components/layout/AppShell";
import { AdminShell } from "../shared/components/admin/AdminShell";
import { RequireAdmin } from "./guards";

/**
 * Layout storefront JD : header + trust + footer partages.
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
      <AdminShell>
        {children ?? <Outlet />}
      </AdminShell>
    </RequireAdmin>
  );
}
