import { CalendarPlus, Phone } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import {
  buildAllCalendarItems,
  downloadIcsFile,
  icsForItems,
  slugify,
} from "@/lib/calendar";
import { formatCardDate } from "@/lib/dates";
import { IslamicPattern } from "@/components/decoration/Ornaments";
import { OrnamentalFrame } from "@/components/decoration/Ornaments";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function InvitationSection({ wedding }: { wedding: WeddingData }) {
  const handleSaveDate = () => {
    const items = buildAllCalendarItems(wedding);
    downloadIcsFile(icsForItems(items), `${slugify(wedding.slug)}-full-invitation`);
  };

  return (
    <section
      id="invitation"
      className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28"
    >
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading
          eyebrow="The Invitation"
          title="With The Blessings Of Allah"
          subtitle={wedding.invitation.message}
        />

        <Reveal className="mt-14" variant="zoom">
          <OrnamentalFrame
            className="mx-auto max-w-3xl"
            contentClassName="px-6 py-12 text-center sm:px-12 sm:py-16"
            cornerSize={100}
          >
            <p className="arabic gold-text gold-shimmer text-3xl sm:text-4xl">
              {wedding.invitation.bismillahArabic}
            </p>
            <p className="mt-4 font-cormorant text-sm italic text-ivory/70 sm:text-base">
              {wedding.invitation.bismillahEnglish}
            </p>

            <p className="mt-8 font-cinzel text-[0.62rem] uppercase tracking-widest2 text-gold/80 sm:text-xs">
              {wedding.invitation.heading}
            </p>

            <h3 className="mt-5 flex flex-col items-center">
              <span className="script gold-text gold-shimmer text-4xl leading-tight sm:text-6xl">
                {wedding.couple.groom.name}
              </span>
              <span className="my-1 font-display text-2xl text-gold/70">&amp;</span>
              <span className="script gold-text gold-shimmer text-4xl leading-tight sm:text-6xl">
                {wedding.couple.bride.name}
              </span>
            </h3>

            <p className="mt-6 font-cormorant text-lg tracking-wide text-ivory sm:text-xl">
              {formatCardDate(wedding.weddingDate, wedding.timezone)}
            </p>

            <div className="hairline my-8" />

            <p className="font-cinzel text-[0.6rem] uppercase tracking-widest2 text-gold/75">
              {wedding.invitation.hostHeading}
            </p>
            <p className="mt-3 font-display text-xl text-ivory sm:text-2xl">
              {wedding.invitation.hostName}
            </p>

            <OurContacts wedding={wedding} />

            <button onClick={handleSaveDate} className="btn-gold mt-10">
              <CalendarPlus size={16} />
              <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                Save The Date
              </span>
            </button>
          </OrnamentalFrame>
        </Reveal>
      </div>
    </section>
  );
}

function OurContacts({ wedding }: { wedding: WeddingData }) {
  if (!wedding.contacts.length) return null;
  return (
    <div className="mt-10">
      <p className="eyebrow">For Any Assistance</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {wedding.contacts.map((contact, i) => (
          <li
            key={`${contact.phone}-${i}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-black/40 px-4 py-3"
          >
            <span className="min-w-0 text-left">
              <span className="block truncate font-display text-base text-ivory">
                {contact.name}
              </span>
              {contact.note ? (
                <span className="block truncate text-xs text-gold/65">{contact.note}</span>
              ) : null}
              <span className="block font-cormorant tracking-wider text-ivory/70">
                {contact.phone}
              </span>
            </span>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="btn-outline !px-4 !py-2 shrink-0"
              aria-label={`Call ${contact.name} at ${contact.phone}`}
            >
              <Phone size={14} />
              <span className="font-cinzel text-[0.58rem] uppercase tracking-widest2">Call</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
