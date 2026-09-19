/**
 * =====================================================================
 *  ✦  CENTRAL WEDDING CONFIGURATION  ✦
 * =====================================================================
 *  EVERY section of the invitation (hero, countdown, events, venues,
 *  family, gallery, story, RSVP, music, share links, calendar, SEO)
 *  is rendered dynamically from the object(s) below.
 *
 *  ▶ To edit this wedding .......... edit `weddings["adil-and-ayesha"]`.
 *  ▶ To add another wedding ........ copy that entry, change its
 *                                    `slug`, and it is instantly live at
 *                                    /wedding/<new-slug>.
 *  ▶ To remove a wedding ........... delete its entry — the UI adapts.
 *
 *  Nothing in this file is invented. Where the physical invitation does
 *  not state a value (e.g. GPS coordinates) the field is left empty /
 *  null and the interface shows an honest "will be updated soon" state.
 *
 *  Future admin dashboard maps 1:1 onto this shape — no component edits
 *  required to change names, dates, events, venues, gallery or RSVP.
 * =====================================================================
 */

import type { WeddingData, WeddingRegistry } from "@/types/wedding";

/** The real coordinates for these venues are not printed on the card.
 *  Add them here (e.g. latitude: 28.7016, longitude: 77.4231) and the
 *  maps + "Get Directions" buttons update automatically. */
export const adilAndAyesha: WeddingData = {
  slug: "adil-and-ayesha",
  id: "wedding-adil-ayesha",

  timezone: "Asia/Kolkata",

  weddingDate: "2026-10-03",
  weddingTime: "19:00",

  couple: {
    groom: {
      name: "Adil Malik",
      relation: "S/O Dilshad Malik",
      detail: "Noor Nagar, Sihani, Ghaziabad",
      tagline: "(Raghunath Pur Wale)",
    },
    bride: {
      name: "Ayesha Malik",
      relation: "D/O Rahisuddin",
      detail: "Kela Bhatta, Hotel Wali Gali No. 13",
      tagline: "Grandfather Late Ishlam Malik — (Shuhane Wala)",
    },
  },

  invitation: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahEnglish: "In The Name Of Allah, The Most Merciful",
    heading: "Please Join Us To Celebrate The Wedding Of",
    message:
      "With the blessings of the Almighty, and with hearts full of gratitude, we humbly request the honour of your presence as our children begin their journey together.",
    hostHeading: "A Cordial Invitation From:-",
    hostName: "Dilshad Malik (Malik Traders)",
  },

  venueIntro: {
    title: "Venue & Directions",
    description:
      "Every celebration takes place in Raj Nagar Extension, Ghaziabad. We can't wait to welcome you and celebrate together.",
    address: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
    mapQuery: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh, India",
  },

  contacts: [
    { name: "Dilshad Malik", phone: "8800566662", note: "Malik Traders" },
    { name: "Dilshad Malik", phone: "9810167335", note: "Malik Traders" },
    { name: "Ikhlakh Malik", phone: "9873245042" },
    { name: "Ashif Malik", phone: "9870244912" },
  ],

  events: [
    {
      id: "departure-of-barat",
      date: "2026-10-03",
      title: "Departure of Barat",
      time: "18:00",
      venueId: "sona-palace",
      groupLabel: "Dawat",
      description: "The groom's procession departs to join the bride's family.",
    },
    {
      id: "nikah",
      date: "2026-10-03",
      title: "Nikah",
      time: "19:00",
      venueId: "sona-palace",
      groupLabel: "Dawat",
      description: "The sacred marriage ceremony, solemnised in the presence of loved ones.",
    },
    {
      id: "dinner",
      date: "2026-10-03",
      title: "Dinner",
      time: "20:00",
      venueId: "sona-palace",
      groupLabel: "Dawat",
      description: "Join us for a warm celebration dinner.",
    },
    {
      id: "return-of-barat",
      date: "2026-10-03",
      title: "Return of Barat",
      time: "21:00",
      venueId: "sona-palace",
      groupLabel: "Dawat",
      description: "The bride and groom are seen off with blessings and farewell.",
    },
    {
      id: "dawat-e-walima",
      date: "2026-10-05",
      title: "Dawat-e-Walima — Dinner",
      time: "18:00",
      venueId: "shyam-heritage",
      groupLabel: "Dawat-e-Walima",
      description: "The walima feast hosted to honour the newly-weds.",
    },
  ],

  venues: [
    {
      id: "sona-palace",
      name: "Sona Palace",
      area: "Raj Nagar Extension, Ghaziabad",
      address: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
      locationNote: "(Golden View Ke Samne)",
      /** Exact pin from Google Maps Plus Code: PC4G+QFG (Sona Palace, Raj Nagar Extension). */
      latitude: 28.70694,
      longitude: 77.42613,
      /** Optional: paste a full Google Maps share link here. */
      googleMapsUrl: "",
    },
    {
      id: "shyam-heritage",
      name: "Shyam Heritage",
      area: "Raj Nagar Extension, Ghaziabad",
      address: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
      locationNote: "(WVIP Mall Ke Samne)",
      /** ⬇ ADD REAL COORDINATES HERE — map + directions update automatically. */
      latitude: null,
      longitude: null,
      /** Optional: paste a full Google Maps share link here. */
      googleMapsUrl: "",
      /** Optional: venue photo — appears inside the map (marker + popup). */
      // image: "",
    },
  ],

  families: {
    introHeading: "Rehmat Malik Raghunath  Wale & Family",
    introSubheading:
      "Request Your Gracious Presence on the Wedding of their Beloved Grandson",
    groups: [
      {
        title: "Bicholiya",
        members: [
          { name: "Bhai Sharu Malik", detail: "Muradnagar" },
          { name: "Bhai Nazim Malik", detail: "Ghaziabad" },
        ],
      },
      {
        title: "Bhati",
        members: [{ name: "Baharampur Wale" }],
      },
    ],
  },

  contactsSection: {
    title: "Family & RSVP Contacts",
    rsvpNames: [
      { name: "Noor Malik" },
      { name: "Marhum Jahur Malik", note: "In loving memory" },
      { name: "Rahmat Malik" },
      { name: "Marhum Rukshad Malik", note: "In loving memory" },
      { name: "Ikhlakh Malik" },
      { name: "Imran Malik", note: "Sonu Malik" },
      { name: "Ibharim Malik" },
      { name: "Ashif Malik" },
      { name: "Ashad Malik", note:"" },
      { name: "W.B.C.T" },
      { name: "All Relatives & Friends" },
    ],
  },

  /**
   * GALLERY — no personal wedding photographs were supplied, so these
   * are elegant ornamental placeholders. Replace each `image` with a
   * real URL (or an image imported from /public/gallery) and it appears
   * instantly. Empty `image` falls back to a decorative gold tile.
   */
  gallery: [
    { image: "", caption: "Adil & Ayesha" },
    { image: "", caption: "The Beginning" },
    { image: "", caption: "Blessings" },
    { image: "", caption: "Celebration" },
    { image: "", caption: "Together" },
    { image: "", caption: "Forever" },
  ],

  /** No relationship history was provided — leaving this empty keeps
   *  the "Our Story" section hidden automatically. Add entries to show it. */
  story: [],

  rsvp: {
    enabled: true,
    method: "local",
    apiUrl: "",
    deadline: "2026-09-25",
    maxGuests: 12,
  },

  music: {
    enabled: false,
    title: "Wedding Ambience",
    url: "",
  },

  hashtag: "#AdilWedsAyesha",

  footer: {
    note: "With love and blessings",
    signoff: "Adil Malik & Ayesha Malik",
    guestsLine: "All Relatives & Friends",
  },

  seo: {
    title: "Adil Malik & Ayesha Malik — Wedding Invitation",
    description:
      "Wedding invitation of Adil Malik and Ayesha Malik — 03 October 2026. Dawat on 03 October at Sona Palace and Dawat-e-Walima on 05 October at Shyam Heritage, Raj Nagar Extension.",
    shareImage: "/og-image.svg",
    canonicalUrl: "",
  },

  openingExperience: true,
};

/** Registry keyed by slug — powers `/wedding/:slug`. */
export const weddings: WeddingRegistry = {
  [adilAndAyesha.slug]: adilAndAyesha,
};

export const defaultWeddingSlug = adilAndAyesha.slug;

/** Convenience accessor with a safe default. */
export function getWedding(slug?: string | null): WeddingData {
  if (slug && weddings[slug]) return weddings[slug];
  return weddings[defaultWeddingSlug];
}

export function listWeddings(): WeddingData[] {
  return Object.values(weddings);
}
