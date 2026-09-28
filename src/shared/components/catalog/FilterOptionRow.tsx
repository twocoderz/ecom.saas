type FilterOptionRowProps = {
  inputId: string;
  label: string;
  /** Majuscule sur la premiere lettre (slugs), sauf marques. */
  capitalize?: boolean;
  type: "checkbox" | "radio";
  name?: string;
  checked: boolean;
  onChange: () => void;
};

const inputClassNames = {
  checkbox: "h-5 w-5 rounded cursor-pointer border-black/30 accent-black",
  radio: "h-5 w-5 border-black/30 accent-black-80",
} as const;

function capitalizeFirst(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Ligne d'option checkbox/radio d'une section de filtres.
 */
export function FilterOptionRow({
  inputId,
  label,
  capitalize = false,
  type,
  name,
  checked,
  onChange,
}: FilterOptionRowProps) {
  return (
    <li>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center justify-between text-sm text-black"
      >
        <span>{capitalize ? capitalizeFirst(label) : label}</span>
        <input
          id={inputId}
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
          className={inputClassNames[type]}
        />
      </label>
    </li>
  );
}
