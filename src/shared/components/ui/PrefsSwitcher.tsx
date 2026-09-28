import { useTranslation } from "react-i18next";
import type { CurrencyCode } from "../../../lib/currency";
import { usePrefsStore, type LocaleCode } from "../../../stores/usePrefsStore";

/**
 * Selecteurs langue + devise pour le header (FR/EN, XOF/EUR/USD).
 */
export function PrefsSwitcher() {
  const { i18n } = useTranslation();
  const locale = usePrefsStore((s) => s.locale);
  const currency = usePrefsStore((s) => s.currency);
  const setLocale = usePrefsStore((s) => s.setLocale);
  const setCurrency = usePrefsStore((s) => s.setCurrency);

  const onLocale = (value: LocaleCode) => {
    setLocale(value);
    void i18n.changeLanguage(value);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="prefs-locale">
        Langue
      </label>
      <select
        id="prefs-locale"
        value={locale}
        onChange={(e) => onLocale(e.target.value as LocaleCode)}
        className="rounded-md border border-black-20 bg-white px-2 py-1 text-xs font-semibold"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
      <label className="sr-only" htmlFor="prefs-currency">
        Devise
      </label>
      <select
        id="prefs-currency"
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
