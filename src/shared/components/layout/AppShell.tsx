import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { TrustStrip } from "./TrustStrip";
import { BackToTop } from "./BackToTop";
import { Header } from "../navigation/Header";
import { UtilityBar } from "../navigation/UtilityBar";
import { Utilities } from "../../data/Utilities";

/**
 * Global shell shared by most pages.
 * JD mapping: utility bar + static main header + trust strip + rich footer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black-80">
      <UtilityBar utilities={Utilities} />
      <Header />
      <TrustStrip />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
