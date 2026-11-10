import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "@/config/routes";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { CinematicMedia } from "@/components/ui/cinematic-media";
import { RevealFade, RevealText } from "@/components/ui/reveal-text";
import { site } from "@/config/site";
import { images } from "@/content/images";
import ppfOffer from "@/content/ppf-offer.json";
import { serviceOptions } from "@/content/services";
import { cn } from "@/lib/utils";

interface ContactCtaProps {
  variant?: "home" | "contact";
  offerMessage?: string;
  offerExtras?: string[];
}

type FormStatus = "idle" | "email-draft" | "submitting" | "success" | "error";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();

export function ContactCta({ variant = "home", offerMessage, offerExtras }: ContactCtaProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const sending = useRef(false);
  const fieldId = useId();
  const isContactPage = variant === "contact";
  const submitted = status === "success";
  const location = useLocation();
  const requestedProject = new URLSearchParams(location.search).get("project")?.slice(0, 200) ?? "";
  useEffect(() => {
    if (!isContactPage || location.hash !== "#booking-form") return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById("booking-form");
      target?.scrollIntoView({ block: "start" });
      target?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [isContactPage, location.key, location.hash]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (sending.current || !form.reportValidity()) return;
    const data = new FormData(form);
    for (const [name, value] of data.entries()) {
      if (typeof value === "string") data.set(name, value.trim());
    }

    // Do not submit automated entries.
    if (data.get("botcheck")) { setStatus("error");
      return;
    }

    // No service key configured → open the visitor's mail client as a fallback.
    if (!WEB3FORMS_KEY) {
      const body = [
        `Name: ${data.get("name") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Phone: ${data.get("phone") ?? ""}`,
        `Vehicle: ${data.get("vehicle") ?? ""}`,
        `Service: ${data.get("service") ?? ""}`,
        ...(data.has("addons") ? ["Optional add-ons: " + data.get("addons")] : []),
        `Paint / existing film: ${data.get("condition") ?? ""}`,
        "",
        `${data.get("message") ?? ""}`,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Quote request — ${data.get("name") ?? "Website"}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("email-draft");
      return;
    }

    sending.current = true;
    setStatus("submitting");
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `New quote request — ${site.name}`);
    data.append("from_name", String(data.get("name") ?? "Website visitor"));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: AbortSignal.timeout(20000),
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch { setStatus("error"); } finally { sending.current = false; }
  };

  return (
    <section
      id="contact"
      data-nav-background="dark"
      className={cn(
        "relative overflow-hidden",
        isContactPage
          ? "bg-black pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24"
          : "section-padding",
      )}
    >
      {!isContactPage && (
        <CinematicMedia
          image={images.contactCtaBg}
          imageFallback={images.heroSupraFallback}
          zoom
          parallax
          parallaxAmount="8%"
          intensity="band"
        />
      )}

      {isContactPage && (
        <>
          <div className="fade-divider absolute inset-x-0 top-0 z-10" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black to-surface"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={cn(
          "relative mx-auto max-w-7xl container-padding",
          isContactPage
            ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,1fr)_32rem] xl:gap-20"
            : "grid gap-16 lg:grid-cols-2 lg:gap-24",
        )}
      >
        <MotionReveal variant="fade">
          {offerMessage ? (
            <div id="ppf-quote" className="scroll-mt-28">
              <p className="type-label mb-3 text-accent">Request a quote</p>
              <h2 className="type-section font-bold text-white">Get your personalized PPF quote</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/75">
                Tell AK Wraps &amp; Customs what you drive and which panels you want protected. Our Delta team will confirm coverage, pricing and available installation dates with you.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  ["Follow-up from our studio", "We’ll review your vehicle details and get in touch about your preferred timing."],
                  ["Booking details up front", "We’ll go over the installation date and any deposit required before you commit."],
                  ["Written warranty details", "Review the terms of your 10-year PPF warranty, including care instructions and exclusions for your film."],
                ].map(([title, description]) => (
                  <li key={title} className="ppf-panel flex items-center gap-4 rounded-lg border border-accent/25 bg-white/[0.04] p-4 sm:p-5">
                    <span aria-hidden="true" className="text-xl text-accent">✓</span>
                    <div><h3 className="font-bold text-white">{title}</h3>
                      <p className="mt-1 leading-relaxed text-white/70">{description}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          ) : isContactPage ? (
            <>
              <p className="type-label mb-4">Studio</p>
              <h2 className="type-section font-bold text-white">
                <Link to={routes.booking}>Book your appointment</Link>
              </h2>
              <p className="type-small mt-6 max-w-md font-light leading-relaxed text-white/50">
                Tell us about your vehicle and goals. We typically respond within
                one business day with availability and a tailored quote.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <ContactInfoCard
                  icon={<Phone className="h-4 w-4" strokeWidth={1.5} />}
                  label="Phone"
                  value={
                    <a
                      href={`tel:${site.phone.replace(/\D/g, "")}`}
                      className="font-medium text-white transition-colors hover:text-white/80"
                    >
                      {site.phone}
                    </a>
                  }
                />
                <ContactInfoCard
                  icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}
                  label="Email"
                  value={
                    <a
                      href={`mailto:${site.email}`}
                      className="break-all font-medium text-white transition-colors hover:text-white/80"
                    >
                      {site.email}
                    </a>
                  }
                />
                <ContactInfoCard
                  icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
                  label="Address"
                  value={
                    <span className="font-medium text-white">{site.address}</span>
                  }
                />
                <ContactInfoCard
                  icon={<Clock className="h-4 w-4" strokeWidth={1.5} />}
                  label="Hours"
                  value={
                    <span className="font-medium text-white">{site.hours}</span>
                  }
                />
              </div>
            </>
          ) : (
            <>
              <h2>
                <RevealText
                  text="Your Signature Build"
                  className="type-section heading-split-muted block"
                />
                <RevealText
                  text="Starts Here"
                  delay={0.18}
                  className="type-section heading-split-bold mt-1 block"
                />
              </h2>
              <RevealFade delay={0.4} className="mt-8 max-w-md">
                <p className="type-small font-light leading-relaxed text-white/55">
                  At AK Wraps & Customs,{" "}
                  <strong className="font-semibold text-white">
                    every vehicle is treated as an investment
                  </strong>
                  . We combine meticulous craftsmanship with{" "}
                  <strong className="font-semibold text-white">
                    premium materials
                  </strong>{" "}
                  to deliver protection and finishes built to last.
                </p>
              </RevealFade>

              <div className="mt-12 space-y-8">
                <ContactRow
                  icon={<Phone className="h-4 w-4" strokeWidth={1.5} />}
                  label="Reach us by phone"
                  value={
                    <a
                      href={`tel:${site.phone.replace(/\D/g, "")}`}
                      className="font-medium text-white transition-colors hover:text-white/80"
                    >
                      {site.phone}
                    </a>
                  }
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}
                  label="Email us"
                  value={
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-white transition-colors hover:text-white/80"
                    >
                      {site.email}
                    </a>
                  }
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
                  label="Visit our studio"
                  value={
                    <span className="font-medium text-white">{site.address}</span>
                  }
                />
              </div>
            </>
          )}
        </MotionReveal>

        <MotionReveal delay={150} variant="slideIn">
          <div
            id="booking-form"
            style={{ scrollMarginTop: "calc(var(--navbar-offset) + 1.5rem)" }}
            className={cn(
              "ppf-panel rounded-lg border border-white/10 bg-surface-glass p-6 backdrop-blur-md sm:p-8",
              isContactPage && "lg:sticky lg:top-[calc(var(--navbar-offset)+1.5rem)]",
            )}
          >
            {submitted ? (
              <div role="status" className="flex min-h-[20rem] flex-col items-center justify-center px-4 text-center">
                <p className="type-card font-semibold uppercase tracking-widest text-accent">
                  Message sent
                </p>
                <p className="type-body mt-4 text-white/80">
                  Thank you. We will review your vehicle and goals and contact you about the next steps. Your appointment is confirmed only after we agree on the scope and availability.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"

              >
                {offerExtras && <><input type="hidden" name="addons" value={offerExtras.join(", ") || "None"}/><header className="ppf-quote-banner"><h3 className="max-w-xs text-3xl font-black leading-tight">Request your PPF quote</h3><p className="mt-2 font-semibold">Full-body PPF + Gtechniq ceramic</p><span className="ppf-price-label mt-3 block">Starting at</span><strong className="ppf-price-number text-3xl">${ppfOffer.special.toLocaleString("en-CA")} <small className="text-sm">CAD</small></strong></header>{offerExtras.length > 0 && <p className="text-sm text-accent">Requested add-ons: {offerExtras.join(", ")}</p>}</>}
                {!offerMessage && !WEB3FORMS_KEY && <p className="type-small text-white/70">This form prepares an email. Please send it from your email app to complete your enquiry.</p>}
                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className={cn("grid gap-4 sm:grid-cols-2 sm:gap-5", offerMessage && "gap-3")}>
                  <FormField label="Name" htmlFor={`${fieldId}-name`} className="sm:col-span-2">
                    <Input id={`${fieldId}-name`} placeholder="Your name" required pattern=".*\S.*" maxLength={100} name="name" autoComplete="name" />
                  </FormField>
                  <FormField label="Email" htmlFor={`${fieldId}-email`}>
                    <Input
                      id={`${fieldId}-email`}
                      type="email"
                      placeholder="you@email.com"
                      required
                      name="email"
                      autoComplete="email"
                    />
                  </FormField>
                  <FormField label="Phone" htmlFor={`${fieldId}-phone`}>
                    <Input id={`${fieldId}-phone`} type="tel" placeholder="(000) 000-0000" name="phone" autoComplete="tel" />
                  </FormField>
                  <FormField label="Vehicle" htmlFor={`${fieldId}-vehicle`} className="sm:col-span-2">
                    <Input
                      id={`${fieldId}-vehicle`}
                      placeholder="Make, model, and year"
                      required
                      pattern=".*\S.*"
                      maxLength={200}
                      name="vehicle"
                    />
                  </FormField>
                  <FormField label="Service" htmlFor={`${fieldId}-service`} className="sm:col-span-2">
                    <Select id={`${fieldId}-service`} name="service" required defaultValue={offerMessage ? "Paint Protection Film" : ""}>
                      <option value="" disabled>
                        Select a service
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField label="Message" htmlFor={`${fieldId}-message`} className="sm:col-span-2">
                    <Textarea
                      id={`${fieldId}-message`}
                      placeholder="Tell us about your project goals..."
                      defaultValue={offerMessage ?? (requestedProject ? `I would like to discuss a project similar to: ${requestedProject}` : "")}
                      name="message"
                      rows={4}
                    />
                  </FormField>
                </div>
                <details className="rounded border border-white/10 p-3"><summary className="cursor-pointer text-sm text-white/70">Paint condition or existing film (optional)</summary><FormField label="Anything we should assess?" htmlFor={`${fieldId}-condition`} className="mt-4"><Textarea id={`${fieldId}-condition`} name="condition" maxLength={2000} rows={3} placeholder="Previous repainting, chips, peeling clear coat, existing wrap or tint…" /></FormField></details>
                {offerMessage && !WEB3FORMS_KEY && <p className="text-sm">Your email app will open with your quote request ready to review and send.</p>}
                <p className="text-xs leading-relaxed text-white/50">Your enquiry helps us prepare a tailored consultation. Scope, price and availability are confirmed with you before booking. <Link to="/privacy" className="underline">Privacy policy</Link></p>
                {status === "email-draft" && <p role="status" className="type-small text-accent">Please send the prepared message in your email app to complete your enquiry. If it did not open, email ak.wraps.customs@gmail.com or call (236) 412-5010.</p>}
                {status === "error" && (
                  <p
                    role="alert"
                    className="type-small text-accent"
                  >
                    Something went wrong sending your message. Please try again, or
                    email us directly at{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : !WEB3FORMS_KEY
                      ? "Prepare enquiry email"
                    : isContactPage
                      ? "Send Message"
                      : "Start My Signature Build"}
                </Button>
              </form>
            )}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="group flex gap-4 transition-transform duration-300 hover:translate-x-1">
      <span className="flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-700 group-hover:border-accent/60">
        <span className="headlight-icon">{icon}</span>
      </span>
      <div>
        <p className="type-label text-white/40">{label}</p>
        <div className="type-small mt-1">{value}</div>
      </div>
    </div>
  );
}

function ContactInfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="group rounded-md border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-accent/50">
          <span className="headlight-icon">{icon}</span>
        </span>
        <div className="min-w-0">
          <p className="type-label text-white/40">{label}</p>
          <div className="type-small mt-1.5">{value}</div>
        </div>
      </div>
    </div>
  );
}
