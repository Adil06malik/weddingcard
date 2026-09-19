import type { Venue, WeddingData, WeddingEvent } from "@/types/wedding";
import { zonedTimeToUtc } from "@/lib/dates";

export interface CalendarItem {
  uid: string;
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  /** IANA timezone for human display; the ICS payload itself uses UTC. */
  timeZone: string;
  displayDate: string;
  displayTime: string;
}

const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** `Date` -> `yyyyMMddTHHmmssZ` (UTC). */
export function toIcsDate(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function findVenue(wedding: WeddingData, venueId: string): Venue | undefined {
  return wedding.venues.find((v) => v.id === venueId);
}

function locationFor(wedding: WeddingData, event: WeddingEvent): string {
  const venue = findVenue(wedding, event.venueId);
  if (!venue) return "";
  return [venue.name, venue.area, venue.locationNote].filter(Boolean).join(", ");
}

function uidFor(slug: string, key: string): string {
  return `adil-ayesha-${slug}-${key}@wedding.invite`;
}

/** Build a calendar item for a single event. */
export function buildEventCalendarItem(wedding: WeddingData, event: WeddingEvent): CalendarItem {
  const start = zonedTimeToUtc(event.date, event.time, wedding.timezone);
  const endMs = event.endTime
    ? zonedTimeToUtc(event.date, event.endTime, wedding.timezone).getTime()
    : start.getTime() + DEFAULT_DURATION_MS;
  const names = `${wedding.couple.groom.name} & ${wedding.couple.bride.name}`;
  return {
    uid: uidFor(wedding.slug, event.id),
    title: `${event.title} — ${names}`,
    description: [
      event.description ?? "",
      wedding.hashtag ? wedding.hashtag : "",
    ]
      .filter(Boolean)
      .join("\n"),
    location: locationFor(wedding, event),
    start,
    end: new Date(endMs),
    timeZone: wedding.timezone,
    displayDate: event.date,
    displayTime: event.time,
  };
}

/** Build calendar items for the whole celebration (main date + events). */
export function buildAllCalendarItems(wedding: WeddingData): CalendarItem[] {
  const names = `${wedding.couple.groom.name} & ${wedding.couple.bride.name}`;
  const mainVenue = wedding.venues[0];
  const start = zonedTimeToUtc(wedding.weddingDate, wedding.weddingTime, wedding.timezone);
  const main: CalendarItem = {
    uid: uidFor(wedding.slug, "main"),
    title: `Wedding of ${names}`,
    description: `${wedding.invitation.bismillahEnglish}. ${names} are getting married.`,
    location: mainVenue ? [mainVenue.name, mainVenue.area].filter(Boolean).join(", ") : wedding.venueIntro.address,
    start,
    end: new Date(start.getTime() + DEFAULT_DURATION_MS),
    timeZone: wedding.timezone,
    displayDate: wedding.weddingDate,
    displayTime: wedding.weddingTime,
  };
  return [main, ...wedding.events.map((e) => buildEventCalendarItem(wedding, e))];
}

function itemToVEvent(item: CalendarItem): string {
  return [
    "BEGIN:VEVENT",
    `UID:${item.uid}`,
    "SEQUENCE:0",
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(item.start)}`,
    `DTEND:${toIcsDate(item.end)}`,
    `SUMMARY:${escapeIcs(item.title)}`,
    `LOCATION:${escapeIcs(item.location)}`,
    `DESCRIPTION:${escapeIcs(item.description)}`,
    "END:VEVENT",
  ].join("\r\n");
}

/** A single-event .ics file body. */
export function icsForItem(item: CalendarItem): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adil & Ayesha Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    itemToVEvent(item),
    "END:VCALENDAR",
  ].join("\r\n");
}

/** A multi-event .ics file body (the full celebration). */
export function icsForItems(items: CalendarItem[]): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adil & Ayesha Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...items.map(itemToVEvent),
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Google Calendar "create event" URL (times supplied as UTC `Z`). */
export function googleCalendarUrl(item: CalendarItem): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: item.title,
    dates: `${toIcsDate(item.start)}/${toIcsDate(item.end)}`,
    details: item.description,
    location: item.location,
    ctz: item.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Trigger a browser download of an .ics file. */
export function downloadIcsFile(contents: string, filename: string): void {
  const blob = new Blob([contents], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "event"
  );
}
