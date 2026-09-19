import type { WeddingData } from "@/types/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IslamicPattern } from "@/components/decoration/Ornaments";

/**
 * Optional "Our Story" timeline. Renders nothing when no story entries
 * are configured, so the section disappears automatically.
 */
export function StorySection({ wedding }: { wedding: WeddingData }) {
  if (!wedding.story.length) return null;

  return (
    <section id="story" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading eyebrow="Our Journey" title="Our Story" />

        <ol className="relative mx-auto mt-14 max-w-3xl border-l border-gold/25 pl-6 sm:pl-10">
          {wedding.story.map((entry, i) => (
            <li key={i} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[1.72rem] top-1.5 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border border-gold bg-black sm:-left-[2.72rem]"
                aria-hidden="true"
              />
              <Reveal variant="right" delay={i * 80}>
                {entry.date ? (
                  <p className="font-cinzel text-xs uppercase tracking-widest2 text-gold/75">
                    {entry.date}
                  </p>
                ) : null}
                <h3 className="mt-2 font-display text-xl text-ivory sm:text-2xl">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65">{entry.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
