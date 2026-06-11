import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaCard } from "@/components/ui/media-card";
import { statMetrics } from "@/content/whyChooseUs";

export function StatsSection() {
  return (
    <Section variant="elevated" id="why-us">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Built on trust and precision"
        align="center"
      />
      <div className="grid gap-[var(--spacing-grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
        {statMetrics.map((stat, index) => (
          <MotionReveal key={stat.label} delay={index * 80} variant="fade" className="h-full">
            <MediaCard
              variant="stat"
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
