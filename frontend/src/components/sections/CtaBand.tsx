import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { serviceOptions } from "@/content/services";
import { site } from "@/config/site";
import { routes } from "@/config/routes";

interface CtaBandProps {
  title?: string;
  description?: string;
}

export function CtaBand({
  title = "Give Your Vehicle the Finish It Deserves",
  description = "Book your appointment and experience true premium detailing.",
}: CtaBandProps) {
  return (
    <Section variant="elevated">
      <div className="relative overflow-hidden rounded-lg border border-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <Marquee duration={110} className="py-8">
            {serviceOptions.map((option) => (
              <span
                key={option}
                className="type-label shrink-0 px-8 text-white/20"
              >
                {option}
              </span>
            ))}
          </Marquee>
        </div>

        <MotionReveal variant="fade" className="relative glass-panel border-0 bg-surface-glass/90 p-8 text-center sm:p-16 md:p-24">
          <SectionHeading
            eyebrow="Ready to begin"
            title={title}
            description={description}
            align="center"
            className="mb-0"
          />

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button variant="default" size="lg" asChild>
              <Link to={routes.contact}>Book Appointment</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={`tel:${site.phone.replace(/\D/g, "")}`}>
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                {site.phone}
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-xs font-light tracking-wide text-white/35 sm:flex-row sm:justify-center sm:gap-8">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-white/60"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              {site.email}
            </a>
            <Link
              to={routes.contact}
              className="inline-flex min-h-[44px] items-center uppercase tracking-[0.15em] transition-colors hover:text-white/60"
            >
              Send a message
            </Link>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
