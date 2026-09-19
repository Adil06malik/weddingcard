import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { IslamicPattern } from "@/components/decoration/Ornaments";
import { cn } from "@/lib/cn";

const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[3/4]"];

export function Gallery({ wedding }: { wedding: WeddingData }) {
  const images = wedding.gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [active, close, next, prev]);

  if (!images.length) return null;

  return (
    <section id="gallery" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading
          eyebrow="Memories"
          title="Our Gallery"
          subtitle="A glimpse of the moments we hold dear. Photographs from the celebrations will be added here."
        />

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {images.map((image, i) => (
            <Reveal key={i} variant="zoom" delay={Math.min(i * 70, 350)} className="break-inside-avoid">
              <button
                onClick={() => setActive(i)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl border border-gold/20 transition-all duration-500 hover:border-gold/60",
                  RATIOS[i % RATIOS.length],
                )}
                aria-label={`Open image${image.caption ? `: ${image.caption}` : ` ${i + 1}`}`}
              >
                <SmartImage
                  src={image.image}
                  alt={image.alt || image.caption || `Wedding gallery image ${i + 1}`}
                  placeholderLabel={image.caption}
                  eager={i < 2}
                />
                {image.caption ? (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-left">
                    <span className="script text-xl text-gold-pale sm:text-2xl">{image.caption}</span>
                  </span>
                ) : null}
                <span className="absolute right-3 top-3 rounded-full border border-gold/40 bg-black/60 p-2 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 size={14} className="text-gold-pale" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 rounded-full border border-gold/40 bg-black/60 p-2.5 text-gold-pale transition-colors hover:bg-gold/15"
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/40 bg-black/60 p-2.5 text-gold-pale transition-colors hover:bg-gold/15 sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/40 bg-black/60 p-2.5 text-gold-pale transition-colors hover:bg-gold/15 sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <figure className="flex max-h-[88vh] w-full max-w-3xl flex-col items-center">
            <div className="h-[70vh] w-full overflow-hidden rounded-2xl border border-gold/30">
              <SmartImage
                src={images[active].image}
                alt={images[active].alt || images[active].caption || `Wedding image ${active + 1}`}
                placeholderLabel={images[active].caption}
                eager
                className="[&_img]:object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center">
              {images[active].caption ? (
                <span className="script gold-text text-2xl">{images[active].caption}</span>
              ) : null}
              <span className="mt-1 block font-cinzel text-[0.6rem] uppercase tracking-widest2 text-ivory/50">
                {active + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
