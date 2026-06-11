import { HeroSection } from "@/components/hero/HeroSection";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { MapEmbed } from "@/components/ui/map-embed";
import { values } from "@/content/team";
import { site } from "@/config/site";
import { MapPin } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <HeroSection
        page="about"
        title="Our Story"
        description="Passion for automotive excellence and an uncompromising commitment to quality."
        badge="About Us"
      />

      <Section>
        <SectionHeading
          eyebrow="Company Story"
          title="Born from a passion for vehicles"
          align="center"
        />
        <MotionReveal variant="fade">
          <div className="mx-auto max-w-3xl text-center">
            <p className="type-small font-light text-muted-foreground">
              AK Wraps & Customs started with a simple vision: bring premium
              vehicle detailing and protection to drivers across Greater Vancouver.
              From our shop in Delta, BC, we specialize in paint correction,
              ceramic coating, and enhancements that make every vehicle stand out.
            </p>
            <p className="type-small mt-8 font-light text-muted-foreground">
              We believe great work is a collaboration. Our team listens to your
              goals, recommends the right solutions, and delivers results built
              to last.
            </p>
          </div>
        </MotionReveal>
      </Section>

      <Section variant="elevated">
        <SectionHeading
          eyebrow="Mission"
          title="What guides us"
          align="center"
        />
        <MotionReveal>
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-black p-[var(--spacing-card-padding)] text-center"
              >
                <h3 className="type-card font-bold uppercase text-white">
                  {value.title}
                </h3>
                <p className="type-small mt-5 font-light text-muted-foreground sm:mt-6">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </Section>

      <ProcessSection />

      <StatsSection />

      <Section>
        <SectionHeading
          eyebrow="Service Area"
          title="Where we serve"
          description="Greater Vancouver and the Fraser Valley."
          align="center"
        />
        <MotionReveal>
          <div className="mx-auto grid max-w-2xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {site.serviceAreas.map((area) => (
              <div
                key={area}
                className="flex min-h-[44px] items-center gap-3 bg-black px-6 py-4"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-white/30" strokeWidth={1.5} />
                <span className="type-card font-light uppercase text-white/60">{area}</span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </Section>

      <MapEmbed variant="default" />
    </>
  );
}
