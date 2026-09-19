import type { WeddingData } from "@/types/wedding";
import { env } from "@/lib/env";

export interface RsvpSubmission {
  name: string;
  phone: string;
  email: string;
  guests: number;
  attending: "yes" | "no";
  eventId: string;
  message: string;
  weddingId: string;
  submittedAt: string;
}

export interface RsvpResult {
  ok: boolean;
  error?: string;
}

const STORAGE_PREFIX = "wedding-rsvp:";

/** Persist locally so the site is fully functional without any backend. */
function saveLocal(wedding: WeddingData, payload: RsvpSubmission): void {
  try {
    const key = `${STORAGE_PREFIX}${wedding.slug}`;
    const raw = localStorage.getItem(key);
    const list: RsvpSubmission[] = raw ? (JSON.parse(raw) as RsvpSubmission[]) : [];
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* storage unavailable — non fatal */
  }
}

export function readLocalRsvps(wedding: WeddingData): RsvpSubmission[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${wedding.slug}`);
    return raw ? (JSON.parse(raw) as RsvpSubmission[]) : [];
  } catch {
    return [];
  }
}

/** Basic client-side validation shared by the form and the store. */
export function validateRsvp(input: Partial<RsvpSubmission>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your full name.";
  if (!input.phone || !/^[0-9+\-\s()]{7,15}$/.test(input.phone.trim()))
    return "Please enter a valid phone number.";
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()))
    return "Please enter a valid email address.";
  if (input.attending !== "yes" && input.attending !== "no")
    return "Please tell us whether you can attend.";
  if (typeof input.guests !== "number" || input.guests < 1)
    return "Number of guests must be at least 1.";
  if (!input.eventId) return "Please choose which event you are attending.";
  return null;
}

/**
 * Submit an RSVP. Uses a backend when configured (Supabase / Firebase /
 * Laravel / Node / MySQL — anything that accepts JSON), otherwise falls
 * back to localStorage so the invitation works standalone.
 */
export async function submitRsvp(
  wedding: WeddingData,
  payload: RsvpSubmission,
): Promise<RsvpResult> {
  const method = (env.rsvpMethod || wedding.rsvp.method || "local") as "local" | "backend";
  const apiUrl = env.rsvpApiUrl || wedding.rsvp.apiUrl || "";

  const validationError = validateRsvp(payload);
  if (validationError) return { ok: false, error: validationError };

  if (method === "backend") {
    if (!apiUrl) {
      saveLocal(wedding, payload);
      return { ok: true };
    }
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        return { ok: false, error: `Submission failed (${res.status}). Please try again.` };
      }
      saveLocal(wedding, payload);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error. Please check your connection and try again." };
    }
  }

  saveLocal(wedding, payload);
  return { ok: true };
}
