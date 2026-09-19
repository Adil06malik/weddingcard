import { useEffect } from "react";
import type { WeddingData } from "@/types/wedding";

function setMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Per-wedding SEO: title, description, Open Graph & Twitter cards. */
export function useSeo(wedding: WeddingData | undefined, fallbackTitle?: string): void {
  useEffect(() => {
    const title = wedding?.seo.title ?? fallbackTitle ?? "Wedding Invitation";
    const description =
      wedding?.seo.description ??
      "A beautiful digital wedding invitation. Open to share in the joy.";
    document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (wedding) {
      const url =
        wedding.seo.canonicalUrl ||
        `${typeof window !== "undefined" ? window.location.origin : ""}/wedding/${wedding.slug}`;
      setMeta("property", "og:url", url);
      if (wedding.seo.shareImage) {
        setMeta("property", "og:image", wedding.seo.shareImage);
        setMeta("name", "twitter:image", wedding.seo.shareImage);
      }
      setLink("canonical", url);
    }
  }, [wedding, fallbackTitle]);
}
