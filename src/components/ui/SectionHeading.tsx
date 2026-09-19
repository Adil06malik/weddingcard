import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/decoration/Ornaments";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  align?: "center" | "left";
}

/** Consistent ornamental section heading used across the invitation. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal variant="fade">
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <h2 className="gold-text gold-shimmer font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={140} className={align === "center" ? "w-full" : ""}>
        <GoldDivider width="max-w-[7rem]" />
      </Reveal>
      {subtitle ? (
        <Reveal delay={200}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-ivory/70 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
