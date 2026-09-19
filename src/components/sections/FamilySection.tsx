import type { Person, WeddingData } from "@/types/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider, IslamicPattern, OrnamentalFrame } from "@/components/decoration/Ornaments";

function PersonBlock({ person, role }: { person: Person; role: string }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{role}</p>
      <h4 className="script gold-text gold-shimmer mt-2 text-4xl leading-tight sm:text-5xl">
        {person.name}
      </h4>
      {person.relation ? (
        <p className="mt-3 font-cormorant text-base tracking-wide text-ivory/85">{person.relation}</p>
      ) : null}
      {person.detail ? (
        <p className="mt-1 text-sm text-ivory/60">{person.detail}</p>
      ) : null}
      {person.tagline ? (
        <p className="mt-2 font-cormorant text-sm italic text-gold/70">{person.tagline}</p>
      ) : null}
    </div>
  );
}

export function FamilySection({ wedding }: { wedding: WeddingData }) {
  const { families, contactsSection } = wedding;

  return (
    <section id="family" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-wed relative z-10">
        <SectionHeading
          eyebrow="With Family & Blessings"
          title="The Families"
          subtitle="Our elders request the honour of your presence and prayers for the newly-weds."
        />

        <Reveal className="mt-14" variant="zoom">
          <OrnamentalFrame
            className="mx-auto max-w-4xl"
            contentClassName="px-6 py-12 sm:px-14 sm:py-16"
            cornerSize={104}
          >
            <p className="text-center font-display text-xl text-ivory sm:text-2xl">
              {families.introHeading}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-ivory/65 sm:text-base">
              {families.introSubheading}
            </p>

            <GoldDivider className="my-9" />

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              <PersonBlock person={wedding.couple.groom} role="The Groom" />
              <div className="hidden sm:block">
                <div className="mx-auto h-full w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
              </div>
              <PersonBlock person={wedding.couple.bride} role="The Bride" />
            </div>
          </OrnamentalFrame>
        </Reveal>

        {/* Family branches */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {families.groups.map((group, gi) => (
            <Reveal key={group.title} variant="up" delay={gi * 90}>
              <div className="panel h-full p-6 sm:p-7">
                <p className="eyebrow">{group.title}</p>
                <ul className="mt-5 space-y-4">
                  {group.members.map((member) => (
                    <li key={member.name} className="border-l border-gold/25 pl-4">
                      <p className="font-display text-lg text-ivory">{member.name}</p>
                      {member.detail ? (
                        <p className="text-sm text-gold/65">{member.detail}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Family / RSVP contacts */}
        <div className="mt-16">
          <Reveal className="text-center">
            <p className="eyebrow">With Love From</p>
            <h3 className="gold-text gold-shimmer mt-3 font-display text-2xl sm:text-3xl">
              {contactsSection.title}
            </h3>
            <GoldDivider className="mx-auto mt-5 max-w-sm" />
          </Reveal>

          <ul className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">
            {contactsSection.rsvpNames.map((contact, i) => (
              <Reveal key={`${contact.name}-${i}`} variant="fade" delay={Math.min(i * 45, 400)}>
                <li className="rounded-full border border-gold/25 bg-black/50 px-5 py-2.5 text-center transition-colors duration-300 hover:border-gold/55">
                  <span className="font-display text-sm text-ivory sm:text-base">{contact.name}</span>
                  {contact.note ? (
                    <span className="ml-2 font-cormorant text-xs italic text-gold/65">
                      {contact.note}
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
