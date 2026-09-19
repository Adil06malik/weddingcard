import { useRef, useState } from "react";
import { CalendarPlus, Download, ExternalLink } from "lucide-react";
import type { WeddingData, WeddingEvent } from "@/types/wedding";
import {
  buildEventCalendarItem,
  downloadIcsFile,
  googleCalendarUrl,
  icsForItem,
  slugify,
} from "@/lib/calendar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/cn";

interface CalendarButtonProps {
  wedding: WeddingData;
  event: WeddingEvent;
  className?: string;
}

/** "Add to Calendar" control offering Google Calendar and .ics download. */
export function CalendarButton({ wedding, event, className }: CalendarButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const item = buildEventCalendarItem(wedding, event);

  const handleIcs = () => {
    downloadIcsFile(icsForItem(item), `${slugify(event.title)}-${event.date}`);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-outline !px-4 !py-2"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <CalendarPlus size={14} />
        <span className="font-cinzel text-[0.58rem] uppercase tracking-widest2">Add to Calendar</span>
      </button>

      <div
        role="menu"
        className={cn(
          "z-30 overflow-hidden rounded-xl border border-gold/30 bg-ink/98 p-1.5 shadow-panel backdrop-blur transition-all duration-200",
          // Mobile: bottom sheet (never overflows). Desktop: anchored popover.
          "fixed inset-x-4 bottom-4 sm:absolute sm:inset-x-auto sm:bottom-full sm:left-0 sm:mb-2 sm:w-56",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0 sm:translate-y-2",
        )}
      >
        <a
          href={googleCalendarUrl(item)}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-ivory/85 transition-colors hover:bg-gold/10 hover:text-gold-pale"
        >
          <ExternalLink size={15} className="text-gold" />
          Google Calendar
        </a>
        <button
          role="menuitem"
          onClick={handleIcs}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-ivory/85 transition-colors hover:bg-gold/10 hover:text-gold-pale"
        >
          <Download size={15} className="text-gold" />
          Download .ics
        </button>
      </div>
    </div>
  );
}
