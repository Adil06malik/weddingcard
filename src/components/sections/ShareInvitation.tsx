import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2, MessageCircle } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import {
  buildInviteUrl,
  buildShareMessage,
  copyText,
  nativeShare,
  shareOnWhatsApp,
  supportsNativeShare,
} from "@/lib/sharing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IslamicPattern } from "@/components/decoration/Ornaments";
import { cn } from "@/lib/cn";

export function ShareInvitation({ wedding }: { wedding: WeddingData }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [nativeAvailable, setNativeAvailable] = useState(false);
  const timer = useRef<number | null>(null);
  const url = buildInviteUrl(wedding);

  useEffect(() => {
    setNativeAvailable(supportsNativeShare());
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async () => {
    const ok = await copyText(url);
    setCopyState(ok ? "copied" : "error");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyState("idle"), 3200);
  };

  const message = buildShareMessage(wedding);

  return (
    <section id="share" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-24">
      <IslamicPattern opacity={0.05} />
      <div className="container-narrow relative z-10 text-center">
        <SectionHeading
          eyebrow="Spread The Joy"
          title="Share The Invitation"
          subtitle="Invite your family and friends to celebrate with us."
        />

        <Reveal className="mt-10" variant="zoom">
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            {nativeAvailable ? (
              <button onClick={() => nativeShare(wedding)} className="btn-gold">
                <Share2 size={16} />
                <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                  Share Invitation
                </span>
              </button>
            ) : null}

            <button onClick={() => shareOnWhatsApp(message)} className="btn-outline">
              <MessageCircle size={16} />
              <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                Share on WhatsApp
              </span>
            </button>

            <button
              onClick={handleCopy}
              className={cn("btn-outline", copyState === "copied" && "border-gold bg-gold/10")}
              aria-live="polite"
            >
              {copyState === "copied" ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
              <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                {copyState === "copied"
                  ? "Link copied!"
                  : copyState === "error"
                    ? "Press & hold to copy"
                    : "Copy Invitation Link"}
              </span>
            </button>
          </div>

          <p
            className={cn(
              "mt-6 break-all text-xs",
              copyState === "error" ? "select-all text-gold/80" : "text-ivory/40",
            )}
          >
            {url}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
