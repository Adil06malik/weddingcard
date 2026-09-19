import { MapPin } from "lucide-react";
import type { WeddingData, WeddingEvent } from "@/types/wedding";
import { formatDay, formatDayMonthUpper, formatTime } from "@/lib/dates";
import { hasCoordinates } from "@/lib/maps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CalendarButton } from "@/components/widgets/CalendarButton";
import { IslamicPattern } from "@/components/decoration/Ornaments";

interface EventTimelineProps {
  wedding: WeddingData;
}

function groupByDate(events: WeddingEvent[]): Array<[string, WeddingEvent[]]> {
  const map = new Map<string, WeddingEvent[]>();
  for (const event of [...events].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  )) {
    const list = map.get(event.date) ?? [];
    list.push(event);
    map.set(event.date, list);
  }
  return Array.from(map.entries());
}

export function EventTimeline({ wedding }: EventTimelineProps) {
  const groups = groupByDate(wedding.events);

  return (
    <section id="events" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading
          eyebrow="Celebrations"
          title="Wedding Events"
          subtitle="We would be honoured to have you with us at each of these celebrations."
        />

        <div className="mx-auto mt-16 max-w-3xl">
          {groups.map(([date, events], gi) => (
            <div key={date} className="relative">
              {gi > 0 ? <div className="my-12" /> : null}

              {/* Date heading */}
              <Reveal variant="left" className="relative flex items-center gap-4 pl-2 sm:pl-0">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-black sm:h-16 sm:w-16">
                  <span className="gold-text font-display text-xl leading-none sm:text-2xl">
                    {formatDayMonthUpper(date, wedding.timezone).split(" ")[0]}
                  </span>
                </span>
                <div>
                  <p className="font-cinzel text-lg uppercase tracking-widest2 text-gold-pale sm:text-xl">
                    {formatDayMonthUpper(date, wedding.timezone).split(" ")[1]}
                  </p>
                  <p className="font-cormorant text-sm text-ivory/60">
                    {formatDay(date, wedding.timezone)}
                  </p>
                </div>
              </Reveal>

              {/* Events */}
              <ol className="relative mt-8 space-y-6 border-l border-gold/25 pl-6 sm:pl-10">
                {events.map((event, i) => {
                  const venue = wedding.venues.find((v) => v.id === event.venueId);
                  return (
                    <li key={event.id} className="relative">
                      <span
                        className="absolute -left-[1.72rem] top-6 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border border-gold bg-black sm:-left-[2.72rem]"
                        aria-hidden="true"
                      />
                      <Reveal variant="right" delay={i * 70}>
                        <article className="panel p-5 transition-colors duration-300 hover:border-gold/45 sm:p-6">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              {event.groupLabel ? (
                                <p className="eyebrow">{event.groupLabel}</p>
                              ) : null}
                              <h3 className="mt-1 font-display text-xl text-ivory sm:text-2xl">
                                {event.title}
                              </h3>
                              <p className="mt-1 font-cinzel text-sm tracking-widest2 text-gold">
                                {formatTime(event.time)}
                              </p>
                            </div>
                            <CalendarButton wedding={wedding} event={event} />
                          </div>

                          {event.description ? (
                            <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                              {event.description}
                            </p>
                          ) : null}

                          {venue ? (
                            <div className="mt-4 flex items-start gap-2 border-t border-gold/12 pt-3">
                              <MapPin size={15} className="mt-0.5 shrink-0 text-gold/80" />
                              <span className="text-sm text-ivory/75">
                                <span className=" text-gold/70">{venue.name}</span>, {venue.area}
                                {/* {venue.locationNote ? (
                                  <span className="block text-gold/70">{venue.locationNote}</span>
                                ) : null} */}
                                {!hasCoordinates(venue) ? (
                                  <span className="mt-1 block text-xs italic text-ivory/45">
                                    {/* Exact location will be updated soon. */}
                                  </span>
                                ) : null}
                              </span>
                            </div>
                          ) : null}
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
