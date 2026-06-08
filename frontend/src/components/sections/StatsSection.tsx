import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassEffect } from "@/components/ui/liquid-glass";
import { statMetrics } from "@/content/whyChooseUs";

export function StatsSection() {
  return (
    <Section id="why-us">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Built on trust and precision"
        align="center"
      />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {statMetrics.map((stat, index) => (
          <MotionSection key={stat.label} delay={index * 80} className="h-full">
            <GlassEffect className="flex h-full flex-col justify-between px-6 py-10 sm:px-8 sm:py-16 lg:py-20">
              <p className="type-stat font-serif font-medium tracking-tight text-white">
                {stat.value}
              </p>
              <div className="mt-8 sm:mt-10">
                <p className="type-caption font-sans font-semibold uppercase text-white">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="type-body-sm mt-3 max-w-[200px] font-light text-white/40">
                    {stat.description}
                  </p>
                )}
              </div>
            </GlassEffect>
          </MotionSection>
        ))}
      </div>
    </Section>
  );
}
