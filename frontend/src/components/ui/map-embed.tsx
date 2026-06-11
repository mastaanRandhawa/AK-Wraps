import { site } from "@/config/site";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

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
    <Section
      variant={variant}
      className={cn("[content-visibility:visible]", className)}
    >
      {showHeading ? (
        <SectionHeading
          eyebrow="Location"
          title="Visit the Studio"
          description={site.address}
        />
      ) : (
        <div className="mb-6">
          <p className="type-label">Location</p>
          <p className="type-small mt-2 text-white/60">{site.address}</p>
        </div>
      )}
      <MotionReveal variant="fadeUp">
        <div className="aspect-video min-h-[220px] w-full overflow-hidden rounded-lg border border-white/10 bg-surface-elevated sm:min-h-[320px]">
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
