import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWedding } from "@/data/weddingData";
import { useSeo } from "@/hooks/useSeo";
import { OpeningExperience } from "@/components/OpeningExperience";
import { Navigation, type NavItem } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WeddingHero } from "@/components/sections/WeddingHero";
import { Countdown } from "@/components/sections/Countdown";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { EventTimeline } from "@/components/sections/EventTimeline";
import { FamilySection } from "@/components/sections/FamilySection";
import { StorySection } from "@/components/sections/StorySection";
// import { Gallery } from "@/components/sections/Gallery";
// import { RSVPForm } from "@/components/sections/RSVPForm";
import { ShareInvitation } from "@/components/sections/ShareInvitation";
import { MusicPlayer } from "@/components/widgets/MusicPlayer";
import { NotFound } from "@/pages/NotFound";

const VenueSection = lazy(() =>
  import("@/components/sections/VenueSection").then((m) => ({ default: m.VenueSection })),
);

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "invitation", label: "Invitation" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "family", label: "Family" },
  // { id: "gallery", label: "Gallery" },
  // { id: "rsvp", label: "RSVP" },
];

export function WeddingPage() {
  const { slug } = useParams<{ slug: string }>();
  const wedding = getWedding(slug);
  // A deep link to a section (#events, #rsvp …) skips the cover so shared
  // links land the guest exactly where they expected.
  const [opened, setOpened] = useState(
    () => !wedding.openingExperience || (typeof window !== "undefined" && Boolean(window.location.hash)),
  );

  useSeo(wedding);

  const handleOpen = useCallback(() => {
    setOpened(true);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", !opened);
    return () => document.body.classList.remove("no-scroll");
  }, [opened]);

  // Unknown slug that isn't in the registry → show 404 (never silently swap).
  if (slug && slug !== wedding.slug) {
    return <NotFound />;
  }

  return (
    <div className="relative min-h-screen bg-black">
      {!opened ? <OpeningExperience wedding={wedding} onOpen={handleOpen} /> : null}

      <div
        className={opened ? "opacity-100 transition-opacity duration-1000" : "pointer-events-none opacity-0"}
        aria-hidden={!opened}
      >
        <Navigation items={NAV_ITEMS} monogram={`${wedding.couple.groom.name[0]} & ${wedding.couple.bride.name[0]}`} />

        <main>
          <WeddingHero wedding={wedding} active={opened} />
          <Countdown wedding={wedding} />
          <InvitationSection wedding={wedding} />
          <EventTimeline wedding={wedding} />
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center">
                <span className="font-cinzel text-xs uppercase tracking-widest2 text-gold/60">
                  Loading venues…
                </span>
              </div>
            }
          >
            <VenueSection wedding={wedding} />
          </Suspense>
          <FamilySection wedding={wedding} />
          <StorySection wedding={wedding} />
          {/* <Gallery wedding={wedding} /> */}
          {/* <RSVPForm wedding={wedding} /> */}
          <ShareInvitation wedding={wedding} />
        </main>

        <Footer wedding={wedding} />
        <MusicPlayer wedding={wedding} />
      </div>
    </div>
  );
}
