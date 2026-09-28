import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * Popup interactif centralise (click + hover + Escape).
 * Remplace les tooltips group-hover purs, inutilisables au tactile.
 */
export function Popover({
  open,
  onToggle,
  onClose,
  trigger,
  children,
  align = "left",
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="group/item absolute left-0 top-0">
      <div onClick={onToggle} onMouseEnter={() => !open && onToggle()}>
        {trigger}
      </div>
      <div
        id={id}
        role="dialog"
        aria-hidden={!open}
        className={`absolute z-30 w-[152px] transition-all duration-150 ${
          align === "left" ? "left-10 -top-3 origin-left" : "right-8 -top-2 origin-right"
        } ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
