import type { WeddingData } from "@/types/wedding";
import { formatLongDate } from "@/lib/dates";
import { env } from "@/lib/env";

/** Absolute URL of the invitation used in share / OG / calendar links. */
export function buildInviteUrl(wedding: WeddingData): string {
  if (wedding.seo.canonicalUrl) return wedding.seo.canonicalUrl;
  const base =
    env.siteUrl ||
    (typeof window !== "undefined" ? window.location.origin : "") ||
    "";
  const path = `/wedding/${wedding.slug}`;
  return base ? `${base.replace(/\/$/, "")}${path}` : path;
}

/** Clean, human share message used by WhatsApp / Web Share / copy. */
export function buildShareMessage(wedding: WeddingData, url?: string): string {
  const link = url ?? buildInviteUrl(wedding);
  const names = `${wedding.couple.groom.name} & ${wedding.couple.bride.name}`;
  const day = formatLongDate(wedding.weddingDate, wedding.timezone);
  return [
    `بسم الله الرحمن الرحيم`,
    `You are cordially invited to the wedding of ${names}.`,
    `Date: ${day}`,
    `Your presence and prayers would mean the world to our family.`,
    wedding.hashtag ? `${wedding.hashtag}` : "",
    link,
  ]
    .filter(Boolean)
    .join("\n");
}

export function shareOnWhatsApp(message: string, url?: string): void {
  const text = url ? `${message}\n${url}` : message;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function supportsNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

/** Native Web Share sheet when supported. Returns false if unavailable. */
export async function nativeShare(wedding: WeddingData): Promise<boolean> {
  if (!supportsNativeShare()) return false;
  try {
    await navigator.share({
      title: wedding.seo.title,
      text: buildShareMessage(wedding, ""),
      url: buildInviteUrl(wedding),
    });
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return true;
    return false;
  }
}
