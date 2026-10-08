import { termsContent } from "../../shared/data/legal";
import { LegalPage } from "./components/LegalPage";

/**
 * CGU / CGV redigees.
 */
export function TermsPage() {
  return <LegalPage content={termsContent} />;
}
