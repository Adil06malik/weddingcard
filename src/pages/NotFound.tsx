import { Link } from "react-router-dom";
import { defaultWeddingSlug } from "@/data/weddingData";
import { IslamicPattern, GoldDivider, CrescentStar } from "@/components/decoration/Ornaments";

export function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 text-center">
      <IslamicPattern opacity={0.05} />
      <div className="relative z-10">
        <CrescentStar size={44} className="mx-auto animate-floaty" />
        <h1 className="gold-text gold-shimmer mt-6 font-display text-3xl sm:text-4xl">
          Invitation Not Found
        </h1>
        <GoldDivider className="mx-auto my-7 max-w-xs" />
        <p className="max-w-md text-sm text-ivory/60">
          This invitation link is not available. It may have been moved or the address may be
          incorrect.
        </p>
        <Link to={`/wedding/${defaultWeddingSlug}`} className="btn-gold mt-8">
          <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
            View The Invitation
          </span>
        </Link>
      </div>
    </main>
  );
}
