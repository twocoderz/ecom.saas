import { legalNoticeContent } from "../../shared/data/legal";
import { LegalPage } from "./components/LegalPage";

/**
 * Mentions legales redigees.
 */
export function LegalNoticePage() {
  return <LegalPage content={legalNoticeContent} />;
}
