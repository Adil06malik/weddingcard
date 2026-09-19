import { useMemo } from "react";
import type { WeddingData } from "@/types/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { zonedTimeToUtc } from "@/lib/dates";
import { GoldDivider, IslamicPattern } from "@/components/decoration/Ornaments";
import { Reveal } from "@/components/ui/Reveal";

interface CountdownProps {
  wedding: WeddingData;
}

function Unit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const display = String(value).padStart(2, "0");
  return (
    <Reveal variant="zoom" delay={delay} className="w-full">
      <div className="panel panel-glow flex flex-col items-center justify-center px-2 py-5 sm:py-7">
        <span
          key={display}
          className="gold-text font-display text-4xl tabular-nums leading-none sm:text-5xl md:text-6xl"
        >
          {display}
        </span>
        <span className="mt-2 font-cinzel text-[0.55rem] uppercase tracking-widest2 text-gold/75 sm:text-[0.65rem]">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

export function Countdown({ wedding }: CountdownProps) {
  const target = useMemo(
    () => zonedTimeToUtc(wedding.weddingDate, wedding.weddingTime, wedding.timezone),
    [wedding.weddingDate, wedding.weddingTime, wedding.timezone],
  );
  const { days, hours, minutes, seconds, ended } = useCountdown(target);

  return (
    <section
      id="countdown"
      className="relative scroll-mt-24 overflow-hidden bg-black py-16 sm:py-20"
    >
      <IslamicPattern opacity={0.04} />
      <div className="container-narrow relative z-10">
        {ended ? (
          <Reveal>
            <div className="panel panel-glow px-6 py-12 text-center">
              <p className="eyebrow">03 October 2026</p>
              <h2 className="gold-text gold-shimmer script mt-3 text-4xl sm:text-5xl">
                The Celebration Has Begun
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mt-6 text-ivory/70">
                Thank you for being part of our special day. May Allah bless this union.
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal className="text-center">
              <p className="eyebrow">Counting down to the celebration</p>
              <GoldDivider className="mx-auto mt-5 max-w-sm" />
            </Reveal>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <Unit value={days} label="Days" delay={0} />
              <Unit value={hours} label="Hours" delay={90} />
              <Unit value={minutes} label="Minutes" delay={180} />
              <Unit value={seconds} label="Seconds" delay={270} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
