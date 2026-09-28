import { useId } from "react";
import { useTranslation } from "react-i18next";
import type { CurrencyCode } from "../../../lib/currency";
import { usePrefsStore, type LocaleCode } from "../../../stores/usePrefsStore";

/**
 * Selecteurs langue + devise pour le header (FR/EN, XOF/EUR/USD).
 * En mode compact (mobile), seule la devise est affichée.
 */
export function PrefsSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const baseId = useId();
  const locale = usePrefsStore((s) => s.locale);
  const currency = usePrefsStore((s) => s.currency);
  const setLocale = usePrefsStore((s) => s.setLocale);
  const setCurrency = usePrefsStore((s) => s.setCurrency);

  const onLocale = (value: LocaleCode) => {
    setLocale(value);
    void i18n.changeLanguage(value);
  };

  const localeId = `${baseId}-locale`;
  const currencyId = `${baseId}-currency`;

  return (
    <div className="flex items-center gap-2">
      {!compact && (
        <>
          <label className="sr-only" htmlFor={localeId}>
            Langue
          </label>
          <select
            id={localeId}
            value={locale}
            onChange={(e) => onLocale(e.target.value as LocaleCode)}
            className="rounded-md border border-black-20 bg-white px-2 py-1 text-xs font-semibold"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </>
      )}
      <label className="sr-only" htmlFor={currencyId}>
        Devise
      </label>
      <select
        id={currencyId}
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="rounded-md border border-black-20 bg-white px-2 py-1 text-xs font-semibold"
      >
        <option value="XOF">XOF</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
    </div>
  );
}
