import { accessibilityContent } from "../../shared/data/legal";
import { LegalPage } from "./components/LegalPage";

/**
 * Declaration d'accessibilite redigee.
 */
export function AccessibilityPage() {
  return <LegalPage content={accessibilityContent} />;
}
