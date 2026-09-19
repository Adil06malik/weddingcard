import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface GoldCornerDecorationProps {
  position?: CornerPosition;
  className?: string;
  size?: number;
}

const rotation: Record<CornerPosition, string> = {
  "top-left": "rotate-0",
  "top-right": "rotate-90",
  "bottom-right": "rotate-180",
  "bottom-left": "-rotate-90",
};

/**
 * Ornamental gold corner filigree inspired by the floral scrollwork of the
 * printed wedding card. Rotate through the four positions using `position`.
 */
export function GoldCornerDecoration({
  position = "top-left",
  className,
  size = 128,
}: GoldCornerDecorationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("pointer-events-none text-gold", rotation[position], className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
        <path d="M118 4 C 70 6 40 20 24 40 C 12 55 8 78 10 116" />
        <path d="M101 8 C 61 13 39 29 29 49 C 21 65 17 85 17 116" opacity="0.55" />
        <path d="M24 40 C 35 33 46 36 52 45 C 43 53 30 53 24 40 Z" />
        <path d="M14 96 C 22 84 34 79 45 83 C 39 95 25 100 14 96 Z" opacity="0.7" />
        <path d="M52 45 C 61 37 61 26 52 22 C 45 19 38 25 41 32 C 43 38 51 38 53 31" />
        <path d="M45 83 C 37 75 39 64 48 61 C 55 59 60 66 56 72 C 53 77 45 76 45 70" />
        <path d="M70 12 C 76 18 76 26 70 31" opacity="0.6" />
        <path d="M12 70 C 18 76 26 76 31 70" opacity="0.6" />
      </g>
      <g fill="currentColor">
        <circle cx="62" cy="11" r="2.3" />
        <circle cx="11" cy="62" r="2.3" />
        <circle cx="24" cy="40" r="1.7" />
        <circle cx="45" cy="83" r="1.7" />
        <path d="M70 31 l2.6 4.2 4.2 2.6 -4.2 2.6 -2.6 4.2 -2.6 -4.2 -4.2 -2.6 4.2 -2.6z" opacity="0.85" />
      </g>
    </svg>
  );
}

/** Four corner filigrees for a framed section. */
export function FloralBorder({
  className,
  size = 120,
  inset = "inset-3 sm:inset-5",
}: {
  className?: string;
  size?: number;
  inset?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute", inset, className)} aria-hidden="true">
      <GoldCornerDecoration position="top-left" size={size} className="absolute -left-1 -top-1" />
      <GoldCornerDecoration position="top-right" size={size} className="absolute -right-1 -top-1" />
      <GoldCornerDecoration
        position="bottom-left"
        size={size}
        className="absolute -bottom-1 -left-1"
      />
      <GoldCornerDecoration
        position="bottom-right"
        size={size}
        className="absolute -bottom-1 -right-1"
      />
    </div>
  );
}

/** Elegant horizontal rule with a central floral-diamond motif. */
export function GoldDivider({
  className,
  label,
  width = "max-w-md",
}: {
  className?: string;
  label?: string;
  width?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)}>
      <span className={cn("hairline w-full flex-1", width)} />
      <svg viewBox="0 0 120 24" width="120" height="24" aria-hidden="true" className="shrink-0">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <path d="M4 12 H34" opacity="0.7" />
          <path d="M86 12 H116" opacity="0.7" />
          <path d="M34 12 C 42 6 50 6 58 12 C 50 18 42 18 34 12 Z" />
          <path d="M86 12 C 78 6 70 6 62 12 C 70 18 78 18 86 12 Z" />
        </g>
        <g fill="currentColor">
          <path d="M60 3 l2.2 4.6 4.6 2.2 -4.6 2.2 -2.2 4.6 -2.2 -4.6 -4.6 -2.2 4.6 -2.2z" />
          <circle cx="60" cy="12" r="1.6" />
        </g>
      </svg>
      {label ? (
        <span className="font-cinzel text-[0.6rem] uppercase tracking-widest2 text-gold/70">
          {label}
        </span>
      ) : null}
      <span className={cn("hairline w-full flex-1", width)} />
    </div>
  );
}

/** Subtle repeating Islamic geometric pattern for section backgrounds. */
export function IslamicPattern({
  className,
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="islamic-star" width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#C9A227" strokeWidth="0.8">
            <path d="M36 4 L52 20 L68 36 L52 52 L36 68 L20 52 L4 36 L20 20 Z" />
            <path d="M36 4 L36 68 M4 36 L68 36" opacity="0.5" />
            <path d="M20 20 L52 52 M52 20 L20 52" opacity="0.5" />
            <circle cx="36" cy="36" r="7" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" />
    </svg>
  );
}

/** Soft radial glow used behind headings and the hero. */
export function GoldGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        "bg-[radial-gradient(circle,rgba(201,162,39,0.28),transparent_70%)]",
        className,
      )}
    />
  );
}

/** Decorative crescent-and-star motif (Islamic accent). */
export function CrescentStar({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path
        d="M30 6 a18 18 0 1 0 0 36 a14 14 0 1 1 0 -36 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M38 12 l1.7 3.6 3.6 1.7 -3.6 1.7 -1.7 3.6 -1.7 -3.6 -3.6 -1.7 3.6 -1.7z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * A framed container: thin double gold border plus four corner filigrees.
 * Used for the invitation, family and hero panels.
 */
export function OrnamentalFrame({
  children,
  className,
  contentClassName,
  corners = true,
  cornerSize = 96,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  corners?: boolean;
  cornerSize?: number;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 rounded-[1.4rem] border border-gold/30" aria-hidden="true" />
      <div
        className="absolute inset-[6px] rounded-[1.1rem] border border-gold/15"
        aria-hidden="true"
      />
      {corners ? <FloralBorder size={cornerSize} /> : null}
      <div className={cn("relative", glow && "panel-glow", contentClassName)}>{children}</div>
    </div>
  );
}
