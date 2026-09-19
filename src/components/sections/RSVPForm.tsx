import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import { formatCardDate } from "@/lib/dates";
import { submitRsvp, type RsvpSubmission } from "@/lib/rsvpStore";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IslamicPattern, GoldDivider } from "@/components/decoration/Ornaments";
import { cn } from "@/lib/cn";

interface EventOption {
  id: string;
  label: string;
}

function buildEventOptions(wedding: WeddingData): EventOption[] {
  const seen = new Set<string>();
  const options: EventOption[] = [];
  for (const event of wedding.events) {
    const key = `${event.date}|${event.groupLabel ?? event.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    options.push({
      id: key,
      label: `${event.groupLabel ?? event.title} — ${formatCardDate(event.date, wedding.timezone)}`,
    });
  }
  return options;
}

const initialForm = {
  name: "",
  phone: "",
  email: "",
  guests: 1,
  attending: "" as "" | "yes" | "no",
  eventId: "",
  message: "",
};

const fieldClasses =
  "w-full rounded-xl border border-gold/25 bg-black/50 px-4 py-3 text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold focus:outline-none";

export function RSVPForm({ wedding }: { wedding: WeddingData }) {
  const eventOptions = useMemo(() => buildEventOptions(wedding), [wedding]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const maxGuests = wedding.rsvp.maxGuests ?? 10;

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.attending) next.attending = "Please let us know if you can attend.";
    if (!form.eventId) next.eventId = "Please choose an event.";
    if (form.guests < 1 || form.guests > maxGuests)
      next.guests = `Guests must be between 1 and ${maxGuests}.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");

    const payload: RsvpSubmission = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      guests: Number(form.guests),
      attending: form.attending as "yes" | "no",
      eventId: form.eventId,
      message: form.message.trim(),
      weddingId: wedding.id,
      submittedAt: new Date().toISOString(),
    };

    const result = await submitRsvp(wedding, payload);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="rsvp" className="relative scroll-mt-24 overflow-hidden bg-black py-20 sm:py-28">
      <IslamicPattern opacity={0.04} />
      <div className="container-narrow relative z-10">
        <SectionHeading
          eyebrow="Kindly Respond"
          title="RSVP"
          subtitle={
            wedding.rsvp.deadline
              ? `Please confirm your presence before ${formatCardDate(wedding.rsvp.deadline, wedding.timezone)}.`
              : "Your presence means the world to us — please let us know if you can join."
          }
        />

        <Reveal className="mt-12" variant="zoom">
          <div className="panel panel-glow p-6 sm:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 size={52} className="text-gold" />
                <h3 className="gold-text gold-shimmer mt-4 font-display text-2xl sm:text-3xl">
                  Thank you for confirming your presence.
                </h3>
                <GoldDivider className="mx-auto mt-6 max-w-xs" />
                <p className="mt-5 max-w-md text-sm text-ivory/65">
                  We have received your response with gratitude. May Allah bless you for sharing in
                  our joy.
                </p>
                <button
                  className="btn-outline mt-7"
                  onClick={() => {
                    setForm(initialForm);
                    setStatus("idle");
                  }}
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.name} className="sm:col-span-2">
                  <input
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.name)}
                  />
                </Field>

                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="10-digit mobile number"
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.email)}
                  />
                </Field>

                <Field label="Number of Guests" required error={errors.guests}>
                  <input
                    type="number"
                    min={1}
                    max={maxGuests}
                    value={form.guests}
                    onChange={(e) => set("guests", Number(e.target.value))}
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.guests)}
                  />
                </Field>

                <Field label="Event" required error={errors.eventId}>
                  <select
                    value={form.eventId}
                    onChange={(e) => set("eventId", e.target.value)}
                    className={cn(fieldClasses, "appearance-none")}
                    aria-invalid={Boolean(errors.eventId)}
                  >
                    <option value="">Select an event</option>
                    {eventOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Will You Attend?" required error={errors.attending} className="sm:col-span-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        { value: "yes", label: "Yes, I will attend" },
                        { value: "no", label: "Sorry, I can't attend" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => set("attending", option.value)}
                        aria-pressed={form.attending === option.value}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm transition-all duration-300",
                          form.attending === option.value
                            ? "border-gold bg-gold/15 text-gold-pale"
                            : "border-gold/25 bg-black/40 text-ivory/70 hover:border-gold/50",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Send your wishes to the couple…"
                    className={cn(fieldClasses, "resize-none")}
                  />
                </Field>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="sm:col-span-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    {serverError}
                  </p>
                ) : null}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-gold w-full py-4"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                          Sending…
                        </span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span className="font-cinzel text-[0.62rem] uppercase tracking-widest2">
                          Submit RSVP
                        </span>
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-ivory/45">
                    Your details are only used to plan the celebrations.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="font-cinzel text-[0.6rem] uppercase tracking-widest2 text-gold/80">
        {label}
        {required ? <span className="ml-1 text-gold">*</span> : null}
      </span>
      {children}
      {error ? (
        <span role="alert" className="text-xs text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}
