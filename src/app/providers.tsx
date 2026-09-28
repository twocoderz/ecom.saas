import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/config";
import { usePrefsStore } from "../stores/usePrefsStore";

/**
 * Providers globaux : synchronise le store prefs (langue) avec i18next.
 * Le routeur reste monte dans App, ici on ne gere que le transverse.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const locale = usePrefsStore((s) => s.locale);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return <>{children}</>;
}
