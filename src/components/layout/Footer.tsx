import { ArrowUp } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import { formatCardDate } from "@/lib/dates";
import { GoldDivider, IslamicPattern, CrescentStar } from "@/components/decoration/Ornaments";
import { Reveal } from "@/components/ui/Reveal";

export function Footer({ wedding }: { wedding: WeddingData }) {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-black py-16 sm:py-20">
      <IslamicPattern opacity={0.05} />
      <div className="container-narrow relative z-10 flex flex-col items-center text-center">
        <CrescentStar size={42} className="animate-floaty" />

        <Reveal variant="fade" className="mt-6">
          <p className="font-cormorant text-sm italic tracking-wide text-ivory/60">
            {wedding.footer.note}
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-4">
          <p className="script gold-text gold-shimmer text-3xl sm:text-4xl">
            {wedding.footer.signoff}
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-3">
          <p className="font-cinzel text-xs uppercase tracking-widest2 text-gold/80">
            {formatCardDate(wedding.weddingDate, wedding.timezone)}
          </p>
        </Reveal>

        <GoldDivider className="my-8 max-w-md" />

        <Reveal delay={200}>
          <p className="font-display text-base text-ivory/80">{wedding.footer.guestsLine}</p>
        </Reveal>

        {wedding.hashtag ? (
          <Reveal delay={240} className="mt-3">
            <p className="font-cormorant text-sm tracking-widest2 text-gold/60">{wedding.hashtag}</p>
          </Reveal>
        ) : null}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-outline mt-10 !px-4 !py-2"
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
          <span className="font-cinzel text-[0.58rem] uppercase tracking-widest2">Back to top</span>
        </button>

        <p className="mt-8 text-[0.65rem] uppercase tracking-widest2 text-ivory/30">
          Made with love · {wedding.couple.groom.name} &amp; {wedding.couple.bride.name}
        </p>
      </div>
    </footer>
  );
}
