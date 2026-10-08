import { privacyContent } from "../../shared/data/legal";
import { LegalPage } from "./components/LegalPage";

/**
 * Politique de confidentialite redigee.
 */
export function PrivacyPolicyPage() {
  return <LegalPage content={privacyContent} />;
}
