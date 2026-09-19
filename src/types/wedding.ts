/**
 * =====================================================================
 *  WEDDING TYPES
 * =====================================================================
 *  These interfaces describe the single central configuration object
 *  that drives every screen of the invitation. Keeping them strict is
 *  what makes the site safe to edit by hand or (later) through an
 *  admin dashboard.
 * =====================================================================
 */

export type ISODate = string; // "2026-10-03"
export type Time24 = string; // "18:00"

export interface Venue {
  /** Stable id referenced by events. */
  id: string;
  name: string;
  /** Short area line, e.g. "Raj Nagar Extension". */
  area: string;
  /**
   * Full postal address. May be empty until known — the UI shows a
   * graceful fallback instead of inventing one.
   */
  address: string;
  /** Landmark note exactly as printed on the card. */
  locationNote?: string;
  /** Can be null until the real coordinates are supplied. */
  latitude: number | null;
  longitude: number | null;
  /** Optional custom Google Maps link; directions are built from coords. */
  googleMapsUrl?: string;
  /** Optional venue photo shown inside the map marker & popup. */
  image?: string;
}

export interface WeddingEvent {
  id: string;
  /** ISO date `YYYY-MM-DD`. */
  date: ISODate;
  title: string;
  /** 24h `HH:mm`. */
  time: Time24;
  /** Optional 24h `HH:mm` end time (used by calendar export). */
  endTime?: Time24;
  venueId: string;
  description?: string;
  /** Group heading used by the timeline, e.g. "Dawat". */
  groupLabel?: string;
}

export interface Contact {
  name: string;
  phone: string;
  /** Optional label, e.g. "Dilshad Malik (Malik Traders)". */
  note?: string;
}

export interface Person {
  name: string;
  /** e.g. "S/O Dilshad Malik" or "D/O Rahisuddin". */
  relation?: string;
  /** Address / family line as printed on the card. */
  detail?: string;
  /** Optional honorific / branch note. */
  tagline?: string;
}

export interface FamilyGroup {
  /** Heading, e.g. "Bicholiya" or "Bhati". */
  title: string;
  members: Person[];
}

export interface FamilyContact {
  name: string;
  note?: string;
}

export interface GalleryImage {
  image: string;
  caption?: string;
  alt?: string;
}

export interface StoryEntry {
  title: string;
  date?: string;
  description: string;
}

export interface RSVPConfig {
  enabled: boolean;
  /**
   * "local"  — persists to localStorage (works with zero backend).
   * "backend"— POSTs JSON to `apiUrl` / `VITE_RSVP_API_URL`.
   */
  method: "local" | "backend";
  apiUrl?: string;
  /** ISO date after which RSVPs close (informational). */
  deadline?: ISODate;
  maxGuests?: number;
}

export interface MusicConfig {
  enabled: boolean;
  title?: string;
  url: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  /** Absolute URL of the social preview image. */
  shareImage?: string;
  /** Absolute canonical URL of this invitation. */
  canonicalUrl?: string;
}

export interface CoupleConfig {
  groom: Person;
  bride: Person;
}

export interface WeddingData {
  /** URL slug: `/wedding/<slug>`. */
  slug: string;
  /** Stable id for future database/admin mapping. */
  id: string;

  /** IANA timezone used for every date/time calculation. */
  timezone: string;

  /** Main wedding date (ISO) + time (24h). */
  weddingDate: ISODate;
  weddingTime: Time24;

  couple: CoupleConfig;

  invitation: {
    bismillahArabic: string;
    bismillahEnglish: string;
    heading: string;
    message: string;
    hostHeading: string;
    hostName: string;
  };

  venueIntro: {
    title: string;
    description: string;
    address: string;
    mapQuery: string;
  };

  /** Ordered list of phone contacts. */
  contacts: Contact[];

  events: WeddingEvent[];
  venues: Venue[];

  families: {
    introHeading: string;
    introSubheading: string;
    groups: FamilyGroup[];
  };

  contactsSection: {
    title: string;
    rsvpNames: FamilyContact[];
  };

  gallery: GalleryImage[];

  /** Optional — when empty the "Our Story" section hides itself. */
  story: StoryEntry[];

  rsvp: RSVPConfig;
  music: MusicConfig;

  hashtag?: string;
  footer: {
    note: string;
    signoff: string;
    guestsLine: string;
  };

  seo: SEOConfig;
  /** Show the "Open Invitation" experience before the site. */
  openingExperience: boolean;
}

/** Registry used by the slug-based router. */
export type WeddingRegistry = Record<string, WeddingData>;
