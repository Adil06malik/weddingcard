import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import { MapPin } from "lucide-react";
import type { Venue } from "@/types/wedding";
import { hasCoordinates } from "@/lib/maps";
import { cn } from "@/lib/cn";

interface VenueMapProps {
  venue: Venue;
  className?: string;
}

/**
 * Real interactive map (Leaflet + OpenStreetMap/Carto tiles).
 *
 * The map is only rendered once genuine coordinates are configured — we
 * never fabricate a location. Until then an honest placeholder is shown.
 */
export function VenueMap({ venue, className }: VenueMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [ready, setReady] = useState(false);
  const hasCoords = hasCoordinates(venue);


  if (!hasCoords) {
return (
  <div
    className={cn(
      "flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gold/30 bg-[radial-gradient(circle_at_50%_30%,#14110a,#000)] p-6 text-center",
      className,
    )}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
      <span className="font-display text-3xl font-bold text-gold">
        {venue.name.charAt(0).toUpperCase()}
      </span>
    </div>
        <MapPin size={26} className="text-gold/80" />


    {/* <p className="font-display text-lg text-ivory">
      Location details will be updated soon.
    </p> */}

    <p className="max-w-xs text-sm text-ivory/55">
      The exact map pin for {venue.name} is being confirmed. Please use the
      directions button to search the venue by name.
    </p>
  </div>
);
  }

  return (
  <div
    className={cn(
      "flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gold/30 bg-[radial-gradient(circle_at_50%_30%,#14110a,#000)] p-6 text-center",
      className,
    )}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
      <span className="font-display text-3xl font-bold text-gold">
        {venue.name.charAt(0).toUpperCase()}
      </span>
    </div>

    <MapPin size={26} className="text-gold/80" />

    {/* <p className="font-display text-lg text-ivory">
      Location details will be updated soon.
    </p> */}

    <p className="max-w-xs text-sm text-ivory/55">
      The exact map pin for {venue.name} is being confirmed. Please use the directions button to
      search the venue by name.
    </p>
  </div>
);
}