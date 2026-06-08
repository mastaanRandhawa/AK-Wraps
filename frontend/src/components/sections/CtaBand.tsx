import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { GlassEffect } from "@/components/ui/liquid-glass";
import {
  GlassMarqueeShell,
  TextMarquee,
} from "@/components/ui/glass-marquee-shell";
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
    <Section variant="muted">
      <MotionSection>
        <GlassMarqueeShell
          tone="muted"
          minHeight="min-h-[440px] sm:min-h-[520px] md:min-h-[580px]"
          marquee={
            <TextMarquee items={serviceOptions} size="md" duration={110} />
          }
        >
          <GlassEffect
            variant="frosted"
            className="px-6 py-16 text-center sm:px-12 sm:py-24 md:px-16 md:py-32"
          >
            <p className="editorial-label mb-6 sm:mb-8">Ready to begin</p>
            <h2 className="type-section mx-auto max-w-2xl font-serif font-medium text-white">
              {title}
            </h2>
            <p className="type-body-sm mx-auto mt-5 max-w-sm font-light text-white/45 sm:mt-6">
              {description}
            </p>

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
                className="inline-flex items-center gap-2 transition-colors hover:text-white/60"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                {site.email}
              </a>
              <Link
                to={routes.contact}
                className="uppercase tracking-[0.15em] transition-colors hover:text-white/60"
              >
                Send a message
              </Link>
            </div>
          </GlassEffect>
        </GlassMarqueeShell>
      </MotionSection>
    </Section>
  );
}
