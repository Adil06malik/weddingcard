import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/wedding";
import { formatCardDate } from "@/lib/dates";
import { GoldCornerDecoration, GoldDivider, IslamicPattern } from "@/components/decoration/Ornaments";
import { GoldParticles } from "@/components/decoration/GoldParticles";
import { cn } from "@/lib/cn";

interface OpeningExperienceProps {
  wedding: WeddingData;
  onOpen: () => void;
}

/**
 * The optional "Open Invitation" cover. Sits above the site until the
 * guest taps the button, then fades away and reveals the full invitation.
 * Audio is never autoplayed here.
 */
export function OpeningExperience({ wedding, onOpen }: OpeningExperienceProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleOpen = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onOpen, 850);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleOpen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black transition-all duration-[850ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        leaving ? "pointer-events-none scale-105 opacity-0" : "opacity-100",
      )}
      role="dialog"
      aria-label="Open invitation"
    >
      <IslamicPattern opacity={0.05} />
      <GoldParticles count={16} />

      <div className="relative mx-4 w-full max-w-xl">
        <div className="absolute inset-0 rounded-[1.5rem] border border-gold/30" aria-hidden="true" />
        <div className="absolute inset-[7px] rounded-[1.2rem] border border-gold/15" aria-hidden="true" />
        <GoldCornerDecoration position="top-left" size={96} className="absolute -left-2 -top-2" />
        <GoldCornerDecoration position="top-right" size={96} className="absolute -right-2 -top-2" />
        <GoldCornerDecoration position="bottom-left" size={96} className="absolute -bottom-2 -left-2" />
        <GoldCornerDecoration position="bottom-right" size={96} className="absolute -bottom-2 -right-2" />

        <div className="relative flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-16">
          <p className="arabic gold-text gold-shimmer text-2xl sm:text-4xl">
            {wedding.invitation.bismillahArabic}
          </p>
          <p className="mt-4 font-cormorant text-sm italic tracking-wide text-ivory/70 sm:text-base">
            {wedding.invitation.bismillahEnglish}
          </p>

          <GoldDivider className="my-7 w-full" />

          <h1 className="script gold-text gold-shimmer text-5xl leading-tight sm:text-6xl md:text-7xl">
            {wedding.couple.groom.name.split(" ")[0]}
            <span className="mx-3 text-3xl sm:text-4xl"> & </span>
            {wedding.couple.bride.name.split(" ")[0]}
          </h1>

          <p className="mt-6 font-cinzel text-xs uppercase tracking-widest2 text-gold/85 sm:text-sm">
            {formatCardDate(wedding.weddingDate, wedding.timezone)}
          </p>

          <button
            onClick={handleOpen}
            className="btn-gold mt-10 animate-pulse-ring px-9 py-4 font-cinzel text-xs uppercase tracking-widest2"
            autoFocus
          >
            Open Invitation
          </button>

          <p className="mt-6 text-[0.65rem] uppercase tracking-widest2 text-ivory/40">
            Tap to begin
          </p>
        </div>
      </div>
    </div>
  );
}
