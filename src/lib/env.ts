/** Centralised, type-safe access to environment variables. */
export const env = {
  /** Absolute site origin used for share/OG links when available. */
  siteUrl: import.meta.env.VITE_SITE_URL ?? "",
  /** Optional RSVP backend endpoint (Supabase/Laravel/Node/etc.). */
  rsvpApiUrl: import.meta.env.VITE_RSVP_API_URL ?? "",
  /** "local" | "backend" — overrides the per-wedding setting. */
  rsvpMethod: import.meta.env.VITE_RSVP_METHOD ?? "",
  /** Optional WhatsApp number that should receive RSVP notifications. */
  rsvpWhatsapp: import.meta.env.VITE_RSVP_WHATSAPP ?? "",
};
