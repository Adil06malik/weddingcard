import { Link } from "react-router-dom";
import { listWeddings } from "@/data/weddingData";
import { formatCardDate } from "@/lib/dates";
import { IslamicPattern, GoldDivider, CrescentStar } from "@/components/decoration/Ornaments";

/**
 * Small directory that lists every configured invitation. Each wedding is
 * reachable at /wedding/<slug> — adding a wedding to the data file makes
 * it appear here automatically.
 */
export function IndexPage() {
  const weddings = listWeddings();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 py-20">
      <IslamicPattern opacity={0.05} />
      <div className="relative z-10 w-full max-w-2xl text-center">
        <CrescentStar size={44} className="mx-auto animate-floaty" />
        <p className="eyebrow mt-6">Digital Wedding Invitations</p>
        <h1 className="gold-text gold-shimmer mt-3 font-display text-3xl sm:text-5xl">
          Choose An Invitation
        </h1>
        <GoldDivider className="mx-auto my-8 max-w-sm" />

        <ul className="flex flex-col gap-4">
          {weddings.map((wedding) => (
            <li key={wedding.slug}>
              <Link
                to={`/wedding/${wedding.slug}`}
                className="panel group flex items-center justify-between gap-4 p-6 text-left transition-all duration-300 hover:border-gold/60"
              >
                <span>
                  <span className="script gold-text block text-3xl">
                    {wedding.couple.groom.name} &amp; {wedding.couple.bride.name}
                  </span>
                  <span className="mt-1 block font-cinzel text-[0.62rem] uppercase tracking-widest2 text-gold/70">
                    {formatCardDate(wedding.weddingDate, wedding.timezone)}
                  </span>
                </span>
                <span className="font-cinzel text-xs uppercase tracking-widest2 text-ivory/50 transition-colors group-hover:text-gold-pale">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
