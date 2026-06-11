import { site } from "@/config/site";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

interface MapEmbedProps {
  showHeading?: boolean;
  variant?: "default" | "muted" | "elevated";
  className?: string;
}

export function MapEmbed({
  showHeading = true,
  variant = "muted",
  className,
}: MapEmbedProps) {
  return (
    <Section variant={variant} className={className}>
      {showHeading ? (
        <SectionHeading
          eyebrow="Location"
          title="Visit the Studio"
          description={site.address}
        />
      ) : (
        <p className="type-label mb-6">Location</p>
      )}
      <MotionReveal variant="maskReveal">
        <div className="aspect-video overflow-hidden rounded-lg border border-white/10">
          <iframe
            title="AK Wraps & Customs location"
            src={site.mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </MotionReveal>
    </Section>
  );
}
