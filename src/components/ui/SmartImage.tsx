import { useState } from "react";
import { GoldCornerDecoration } from "@/components/decoration/Ornaments";
import { cn } from "@/lib/cn";

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Decorative label shown when no image is supplied / it fails. */
  placeholderLabel?: string;
  eager?: boolean;
  onClick?: () => void;
}

/**
 * Lazy, error-tolerant image. When no `src` is supplied (or the image
 * fails to load) it renders an elegant gold ornamental placeholder rather
 * than a broken image — so the gallery never looks unfinished.
 */
export function SmartImage({
  src,
  alt,
  className,
  placeholderLabel,
  eager = false,
  onClick,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#14110a,#000)]",
        className,
      )}
      onClick={onClick}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.06]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6">
          <GoldCornerDecoration position="top-left" size={64} className="absolute left-1 top-1 opacity-70" />
          <GoldCornerDecoration
            position="bottom-right"
            size={64}
            className="absolute bottom-1 right-1 opacity-70"
          />
          <div className="text-center">
            <p className="script gold-text text-2xl sm:text-3xl">{placeholderLabel || alt}</p>
            <p className="mt-2 font-cinzel text-[0.6rem] uppercase tracking-widest2 text-gold/60">
              Photo coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
