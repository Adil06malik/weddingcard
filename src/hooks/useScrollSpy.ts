import { useEffect, useRef, useState } from "react";

/**
 * Highlights the nav item matching the section currently in view.
 * Accepts the list of section ids present on the page.
 */
export function useScrollSpy(ids: string[], offset = 140): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        let current = ids[0] ?? "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top - offset <= 0) current = id;
        }
        setActive(current);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
