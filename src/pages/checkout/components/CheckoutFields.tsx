import type { InputHTMLAttributes } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  input: InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Champ de formulaire checkout avec erreur en ligne (aria).
 */
export function Field({ id, label, error, input }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        {...input}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 w-full rounded-md border bg-white px-3 py-2.5 text-sm ${
          error ? "border-[#d60000]" : "border-black-20"
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs font-semibold text-[#d60000]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
