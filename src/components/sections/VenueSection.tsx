import { ExternalLink, Navigation, MapPin } from "lucide-react";
import type { Venue, WeddingData } from "@/types/wedding";
import { formatCardDate } from "@/lib/dates";
import { directionsUrl, hasCoordinates, viewOnMapsUrl } from "@/lib/maps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IslamicPattern } from "@/components/decoration/Ornaments";
import { VenueMap } from "@/components/sections/VenueMap";

function VenueCard({ wedding, venue, index }: { wedding: WeddingData; venue: Venue; index: number }) {
  const eventsHere = wedding.events.filter((e) => e.venueId === venue.id);
  const reverse = index % 2 === 1;

  return (
    <Reveal variant={reverse ? "right" : "left"}>
      <article className="panel grid gap-0 overflow-hidden md:grid-cols-2">
        <div className={reverse ? "md:order-2" : ""}>
          <div className="h-64 w-full p-2 sm:h-72 md:h-full md:min-h-[22rem]">
            <VenueMap venue={venue} />
          </div>
        </div>

        <div className={`flex flex-col justify-center p-6 sm:p-8 ${reverse ? "md:order-1" : ""}`}>
          <p className="eyebrow">Venue {index + 1}</p>
          <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{venue.name}</h3>
          <p className="mt-1 flex items-center gap-2 text-gold/80">
            <MapPin size={15} />
            <span className="font-cormorant tracking-wide">{venue.area}</span>
          </p>

          {/* {venue.locationNote ? (
            <p className="mt-2 font-cormorant italic text-ivory/70">{venue.locationNote}</p>
          ) : null} */}

          {/* <p className="mt-4 text-sm leading-relaxed text-ivory/60">
            {venue.address || "Full address will be updated soon."}
          </p> */}

          {eventsHere.length ? (
            <div className="mt-5 border-t border-gold/12 pt-4">
              <p className="eyebrow">Celebrations here</p>
              <ul className="mt-2 space-y-1.5">
                {eventsHere.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-ivory/80">{e.title}</span>
                    <span className="text-gold/70">{formatCardDate(e.date, wedding.timezone)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={directionsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <Navigation size={15} />
              <span className="font-cinzel text-[0.6rem] uppercase tracking-widest2">
                Get Directions
              </span>
            </a>
            <a
              href={viewOnMapsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <ExternalLink size={15} />
              <span className="font-cinzel text-[0.6rem] uppercase tracking-widest2">
                Open in Google Maps
              </span>
            </a>
          </div>

          {/* {!hasCoordinates(venue) ? (
            <p className="mt-4 text-xs italic text-ivory/40">
              📍 Exact coordinates are not yet published — the map will appear here automatically
              once they are added.
            </p>
          ) : null} */}
        </div>
      </article>
    </Reveal>
  );
}

export function VenueSection({ wedding }: { wedding: WeddingData }) {
  return (
    <section id="venue" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading
          eyebrow="Find Us"
          title={wedding.venueIntro.title}
          subtitle={wedding.venueIntro.description}
        />
        <p className="mx-auto mt-5 max-w-xl text-center text-sm text-ivory/55">
          {wedding.venueIntro.address}
        </p>

        <div className="mt-14 flex flex-col gap-8">
          {wedding.venues.map((venue, i) => (
            <VenueCard key={venue.id} wedding={wedding} venue={venue} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
