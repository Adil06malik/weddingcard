import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import { formatCardDate, formatDay } from "@/lib/dates";
import { GoldCornerDecoration, GoldDivider, IslamicPattern } from "@/components/decoration/Ornaments";
import { GoldParticles } from "@/components/decoration/GoldParticles";
import { cn } from "@/lib/cn";

interface WeddingHeroProps {
  wedding: WeddingData;
  /** When true the entrance animations run. */
  active: boolean;
}

/** Local entrance animation wrapper for the hero sequence. */
function Enter({
  children,
  active,
  delay = 0,
  className,
}: {
  children: ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function WeddingHero({ wedding, active }: WeddingHeroProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(id);
  }, [active]);

  const groomFirst = wedding.couple.groom.name;
  const brideFirst = wedding.couple.bride.name;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-24 items-center justify-center overflow-hidden bg-black"
    >
      <IslamicPattern opacity={0.05} />
      <GoldParticles count={20} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_68%)] blur-2xl"
      />

      {/* Ornamental frame */}
      <div className="pointer-events-none absolute inset-3 hidden sm:block md:inset-6" aria-hidden="true">
        <div className="absolute inset-0 rounded-[1.5rem] border border-gold/25" />
        <div className="absolute inset-[8px] rounded-[1.2rem] border border-gold/12" />
        <GoldCornerDecoration position="top-left" size={110} className="absolute -left-1 -top-1" />
        <GoldCornerDecoration position="top-right" size={110} className="absolute -right-1 -top-1" />
        <GoldCornerDecoration position="bottom-left" size={110} className="absolute -bottom-1 -left-1" />
        <GoldCornerDecoration position="bottom-right" size={110} className="absolute -bottom-1 -right-1" />
      </div>

      <div className="container-wed relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-28">
        <Enter active={entered} delay={100}>
          <p className="arabic gold-text gold-shimmer text-3xl sm:text-4xl md:text-5xl">
            {wedding.invitation.bismillahArabic}
          </p>
        </Enter>

        <Enter active={entered} delay={320}>
          <p className="mt-4 font-cormorant text-sm italic tracking-wide text-ivory/70 sm:text-base">
            {wedding.invitation.bismillahEnglish}
          </p>
        </Enter>

        <Enter active={entered} delay={520} className="mt-8 w-full">
          <GoldDivider width="max-w-[9rem]" />
        </Enter>

        <Enter active={entered} delay={650}>
          <p className="mt-8 font-cinzel text-[0.62rem] uppercase tracking-widest3 text-gold/80 sm:text-xs">
            {wedding.invitation.heading}
          </p>
        </Enter>

        <Enter active={entered} delay={820} className="mt-6">
          <h1 className="flex flex-col items-center">
            <span className="script gold-text gold-shimmer text-[3.4rem] leading-[1.05] sm:text-7xl md:text-8xl">
              {groomFirst}
            </span>
            <span className="my-2 font-display text-3xl text-gold/80 sm:my-3 sm:text-4xl">&amp;</span>
            <span className="script gold-text gold-shimmer text-[3.4rem] leading-[1.05] sm:text-7xl md:text-8xl">
              {brideFirst}
            </span>
          </h1>
        </Enter>

        <Enter active={entered} delay={1050} className="mt-9">
          <div className="flex flex-col items-center gap-1">
            <span className="font-cinzel text-lg tracking-widest2 text-ivory sm:text-2xl">
              {formatCardDate(wedding.weddingDate, wedding.timezone)}
            </span>
            <span className="font-cormorant text-xs uppercase tracking-widest2 text-gold/70">
              {formatDay(wedding.weddingDate, wedding.timezone)}
            </span>
          </div>
        </Enter>

        <Enter active={entered} delay={1250} className="mt-10">
          <button
            onClick={() => document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline"
            aria-label="Scroll to invitation"
          >
            <ChevronDown size={16} className="animate-bounce" />
            <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
              View Invitation
            </span>
          </button>
        </Enter>
      </div>
    </section>
  );
}
