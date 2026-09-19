/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_RSVP_API_URL?: string;
  readonly VITE_RSVP_METHOD?: string;
  readonly VITE_RSVP_WHATSAPP?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
