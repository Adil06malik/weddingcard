import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/cn";

export interface NavItem {
  id: string;
  label: string;
}

interface NavigationProps {
  items: NavItem[];
  /** Monogram shown on the left. */
  monogram?: string;
}

/** Floating, minimal gold navigation with an animated mobile drawer. */
export function Navigation({ items, monogram = "A & A" }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useScrollSpy(ids, 160);

  useClickOutside(menuRef, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold/20 bg-black/80 py-2 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-3",
        )}
      >
        <nav
          ref={menuRef}
          aria-label="Primary"
          className="container-wed flex items-center justify-between"
        >
          <button
            onClick={() => go(items[0]?.id ?? "home")}
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="script gold-text text-2xl leading-none sm:text-3xl">{monogram}</span>
          </button>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 font-cinzel text-[0.68rem] uppercase tracking-widest2 transition-colors duration-300",
                    active === item.id
                      ? "text-gold-pale"
                      : "text-ivory/60 hover:text-gold-pale",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-center transition-transform duration-300",
                      active === item.id ? "scale-x-100 bg-gold" : "scale-x-0 bg-gold/50",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="btn-outline !px-4 !py-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">Menu</span>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          className={cn(
            "absolute inset-x-3 top-[4.5rem] overflow-hidden rounded-2xl border border-gold/25 bg-ink/95 p-3 shadow-panel transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
          )}
        >
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  style={{ transitionDelay: open ? `${i * 45 + 80}ms` : "0ms" }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-4 text-left font-cinzel text-sm uppercase tracking-widest2 transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    active === item.id ? "bg-gold/10 text-gold-pale" : "text-ivory/75",
                  )}
                >
                  {item.label}
                  <span className="script text-lg text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
