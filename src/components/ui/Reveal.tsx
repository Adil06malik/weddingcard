import type { ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animation style. */
  variant?: "up" | "fade" | "zoom" | "left" | "right";
  /** Stagger in ms. */
  delay?: number;
  as?: ElementType;
  once?: boolean;
}

/** Scroll-triggered reveal wrapper (respects reduced motion via CSS). */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
