/**
 * Date & timezone helpers.
 * Every guest-facing date is rendered in the wedding's venue timezone,
 * so invitations are correct no matter where they are opened.
 */

export const DEFAULT_TIMEZONE = "Asia/Kolkata";

const datePartOptions: Intl.DateTimeFormatOptions = {
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

type Numbers = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function toNumbers(parts: Intl.DateTimeFormatPart[]): Numbers {
  const o: Partial<Numbers> = {};
  for (const part of parts) {
    if (part.type === "literal") continue;
    o[part.type as keyof Numbers] = Number(part.value);
  }
  return {
    year: o.year ?? 0,
    month: o.month ?? 0,
    day: o.day ?? 0,
    hour: o.hour ?? 0,
    minute: o.minute ?? 0,
    second: o.second ?? 0,
  };
}

/**
 * Converts a calendar date + clock time expressed in `timeZone` into an
 * absolute UTC `Date` (handles DST and arbitrary zones correctly).
 */
export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = new Date(Date.UTC(y, mo - 1, d, h, mi, 0));

  const asParts = (tz: string) =>
    new Intl.DateTimeFormat("en-US", { ...datePartOptions, timeZone: tz }).formatToParts(guess);

  const u = toNumbers(asParts("UTC"));
  const z = toNumbers(asParts(timeZone));
  const asUTC = Date.UTC(u.year, u.month - 1, u.day, u.hour, u.minute, u.second);
  const asZone = Date.UTC(z.year, z.month - 1, z.day, z.hour, z.minute, z.second);

  return new Date(guess.getTime() + (asUTC - asZone));
}

function zonedDateParts(date: string, timeZone: string) {
  const [y, mo, d] = date.split("-").map(Number);
  const noon = new Date(Date.UTC(y, mo - 1, d, 12));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(noon);
  const o: Record<string, string> = {};
  for (const p of parts) if (p.type !== "literal") o[p.type] = p.value;
  return o;
}

/** "Saturday" */
export function formatDay(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  return zonedDateParts(date, timeZone).weekday ?? "";
}

/** "3 October 2026" */
export function formatLongDate(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  const p = zonedDateParts(date, timeZone);
  return `${p.day} ${p.month} ${p.year}`.trim();
}

/** "03 October 2026" — exactly as printed on the card. */
export function formatCardDate(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  const p = zonedDateParts(date, timeZone);
  const day = String(p.day ?? "").padStart(2, "0");
  return `${day} ${p.month} ${p.year}`.trim();
}

/** "03 OCTOBER" — timeline heading style. */
export function formatDayMonthUpper(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  const p = zonedDateParts(date, timeZone);
  const day = String(p.day ?? "").padStart(2, "0");
  return `${day} ${String(p.month ?? "").toUpperCase()}`.trim();
}

/** "October" */
export function formatMonth(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  return zonedDateParts(date, timeZone).month ?? "";
}

/** "2026" */
export function formatYear(date: string, timeZone: string = DEFAULT_TIMEZONE): string {
  return zonedDateParts(date, timeZone).year ?? "";
}

/** "19:00" -> "7:00 PM" */
export function formatTime(time: string): string {
  const [hRaw, mRaw] = time.split(":").map(Number);
  const h = Number.isFinite(hRaw) ? hRaw : 0;
  const m = Number.isFinite(mRaw) ? mRaw : 0;
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** Current local ISO date `YYYY-MM-DD`. */
export function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
}
