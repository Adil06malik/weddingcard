import { useEffect, type RefObject } from "react";

/** Closes menus/popovers on outside click, touch or Escape. */
export function useClickOutside(ref: RefObject<HTMLElement>, onOutside: () => void): void {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      onOutside();
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOutside();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", esc);
    };
  }, [ref, onOutside]);
}
