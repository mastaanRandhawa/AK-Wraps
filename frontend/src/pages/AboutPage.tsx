import about from "@/content/about.json";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/hero/HeroSection";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { MapEmbed } from "@/components/ui/map-embed";
import { values } from "@/content/team";
import { site } from "@/config/site";
import { usePageMeta } from "@/hooks/use-page-meta";
import { MapPin } from "lucide-react";

export function AboutPage() {
  usePageMeta({
    title: "About Us",
    description:
      "Learn about AK Wraps & Customs — premium vehicle protection and customization from our Delta, BC studio serving Greater Vancouver.",
  });

  return (
    <>
      <HeroSection
        page="about"
        title="Our Story"
        description="Vinyl wraps, paint protection and custom finishing at one Delta studio, serving drivers across Greater Vancouver."
        badge="About Us"
      />

      <Section>
        <SectionHeading
          eyebrow="Company Story"
          title={about.heading}
          align="center"
        />
        <MotionReveal variant="fade">
          <div className="mx-auto max-w-3xl text-center">
            {about.paragraphs.map(text => <p key={text} className="type-small mt-6 font-light text-muted-foreground">{text}</p>)}<p className="mt-6"><Link className="text-accent underline" to="/gallery">Explore our vehicle projects</Link> · <Link className="text-accent underline" to="/contact#booking-form">Discuss your vehicle</Link></p>
          </div>
        </MotionReveal>
      </Section>

      <Section variant="elevated">
        <div className="mx-auto max-w-3xl rounded-xl border border-accent/30 bg-black/30 p-6 text-center sm:p-10">
          <p className="type-label text-accent">2026 Quality Business Awards</p>
          <h2 className="type-section mt-4 text-white">{about.award.heading}</h2>
          <p className="mt-6 leading-relaxed text-white/70">{about.award.text}</p>
          <a className="mt-6 inline-flex min-h-11 items-center text-accent underline underline-offset-4" href={about.award.source} target="_blank" rel="noopener noreferrer">{about.award.label}</a>
          <div className="mt-8 border-t border-white/15 pt-6"><h3 className="text-lg font-semibold text-white">{about.ownerRecognition.heading}</h3><p className="mt-3 text-sm leading-relaxed text-white/65">{about.ownerRecognition.text}</p></div>
        </div>
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
