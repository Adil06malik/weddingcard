import type { Venue } from "@/types/wedding";

/** True only when real, usable coordinates have been supplied. */
export function hasCoordinates(venue: Venue): boolean {
  return (
    typeof venue.latitude === "number" &&
    typeof venue.longitude === "number" &&
    Number.isFinite(venue.latitude) &&
    Number.isFinite(venue.longitude)
  );
}

function queryFor(venue: Venue): string {
  return [venue.name, venue.area, "Ghaziabad", "Uttar Pradesh", "India"]
    .filter(Boolean)
    .join(", ");
}

/** Human-readable destination used by the directions links. */
export function destinationFor(venue: Venue): string {
  if (hasCoordinates(venue)) return `${venue.latitude},${venue.longitude}`;
  return `${venue.name} ${venue.area}`.trim();
}

/**
 * "Get Directions" URL. Prefers exact coordinates when present, then a
 * user-supplied Google Maps link, then a name/area search. Never invents
 * a location — it only searches for what is written on the card.
 */
export function directionsUrl(venue: Venue): string {
  if (hasCoordinates(venue)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;
  }
  if (venue.googleMapsUrl) return venue.googleMapsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destinationFor(venue),
  )}`;
}

/** "Open in Google Maps" URL. */
export function viewOnMapsUrl(venue: Venue): string {
  if (venue.googleMapsUrl) return venue.googleMapsUrl;
  if (hasCoordinates(venue)) {
    return `https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryFor(venue))}`;
}

/** Centre used by the interactive Leaflet map. */
export function mapCenter(
  venue: Venue,
  fallback: { latitude: number; longitude: number } = { latitude: 28.7016, longitude: 77.4231 },
): { latitude: number; longitude: number } {
  if (hasCoordinates(venue)) {
    return { latitude: venue.latitude as number, longitude: venue.longitude as number };
  }
  return fallback;
}

/** Zoom suitable for the current data quality. */
export function mapZoom(venue: Venue): number {
  return hasCoordinates(venue) ? 15 : 12;
}
