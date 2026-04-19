import type { ReactNode } from "react";
import { FooterColumns } from "./FooterColumns";
import { TrustStrip } from "./TrustStrip";
import { MainHeader } from "../navigation/MainHeader";
import { UtilityBar } from "../navigation/UtilityBar";
import { Utilities } from "../../data/Utilities";

/**
 * Global shell shared by most pages.
 * JD mapping: utility bar + main header + trust strip + rich footer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black-80">
      <UtilityBar />
      <MainHeader />
      <main>{children}</main>
      <TrustStrip />
      <FooterColumns />
    </div>
  );
}
