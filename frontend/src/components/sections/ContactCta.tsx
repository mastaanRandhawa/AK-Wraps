import { useState, type FormEvent, type ReactNode } from "react";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { SafeImage } from "@/components/ui/safe-image";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { serviceOptions } from "@/content/services";
import { cn } from "@/lib/utils";

interface ContactCtaProps {
  variant?: "home" | "contact";
}

export function ContactCta({ variant = "home" }: ContactCtaProps) {
  const [submitted, setSubmitted] = useState(false);
  const isContactPage = variant === "contact";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        <div className="absolute inset-0" aria-hidden="true">
          <SafeImage
            src={images.contactCtaBg}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        </div>
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
          {isContactPage ? (
            <>
              <p className="type-label mb-4">Studio</p>
              <h2 className="type-section font-bold text-white">
                Book your appointment
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
                <span className="type-section heading-split-muted block">
                  Your Signature Build
                </span>
                <span className="type-section heading-split-bold mt-1 block">
                  Starts Here
                </span>
              </h2>
              <p className="type-small mt-8 max-w-md font-light leading-relaxed text-white/55">
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
            className={cn(
              "rounded-lg border border-white/10 bg-surface-glass p-6 backdrop-blur-md sm:p-8",
              isContactPage && "lg:sticky lg:top-[calc(var(--navbar-offset)+1.5rem)]",
            )}
          >
            {submitted ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center px-4 text-center">
                <p className="type-card font-semibold uppercase tracking-widest text-accent">
                  Message sent
                </p>
                <p className="type-body mt-4 text-white/80">
                  Thank you. We&apos;ll be in touch shortly to start your build.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <FormField label="Name" className="sm:col-span-2">
                    <Input placeholder="Your name" required name="name" />
                  </FormField>
                  <FormField label="Email">
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      required
                      name="email"
                    />
                  </FormField>
                  <FormField label="Phone">
                    <Input type="tel" placeholder="(000) 000-0000" name="phone" />
                  </FormField>
                  <FormField label="Vehicle" className="sm:col-span-2">
                    <Input
                      placeholder="Make, model, and year"
                      required
                      name="vehicle"
                    />
                  </FormField>
                  <FormField label="Service" className="sm:col-span-2">
                    <Select name="service" required defaultValue="">
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
                  <FormField label="Message" className="sm:col-span-2">
                    <Textarea
                      placeholder="Tell us about your project goals..."
                      name="message"
                      rows={4}
                    />
                  </FormField>
                </div>
                <Button type="submit" size="lg" className="mt-2 w-full">
                  {isContactPage ? "Send Message" : "Start My Signature Build"}
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
