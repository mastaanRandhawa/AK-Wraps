import { HeroSection } from "@/components/hero/HeroSection";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { values, partners } from "@/content/team";
import { site } from "@/config/site";
import { MapPin } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <HeroSection
        page="about"
        title="Our Story"
        description="Passion for automotive excellence and an uncompromising commitment to quality."
      />
      <Section>
        <MotionSection>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              eyebrow="Company Story"
              title="Born from a passion for vehicles"
              align="center"
            />
            <p className="type-body-sm font-light text-white/45">
              AK Wraps & Customs started with a simple vision: bring premium
              vehicle detailing and protection to drivers across Greater Vancouver.
              From our shop in Delta, BC, we specialize in paint correction,
              ceramic coating, and enhancements that make every vehicle stand out.
            </p>
            <p className="type-body-sm mt-6 font-light text-white/45 sm:mt-8">
              We believe great work is a collaboration. Our team listens to your
              goals, recommends the right solutions, and delivers results built
              to last.
            </p>
          </div>
        </MotionSection>
      </Section>

      <Section variant="elevated">
        <SectionHeading
          eyebrow="Mission"
          title="What guides us"
          align="center"
        />
        <MotionSection>
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-black px-5 py-10 text-center sm:px-8 sm:py-16"
              >
                <h3 className="type-caption font-sans font-semibold uppercase text-white">
                  {value.title}
                </h3>
                <p className="type-body-sm mt-5 font-light text-white/45 sm:mt-6">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Service Area"
          title="Where we serve"
          description="Greater Vancouver and the Fraser Valley."
          align="center"
        />
        <MotionSection>
          <div className="mx-auto grid max-w-2xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {site.serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 bg-black px-6 py-4"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-white/30" strokeWidth={1.5} />
                <span className="type-caption font-light uppercase text-white/60">{area}</span>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <Section variant="muted">
        <SectionHeading
          eyebrow="Shop Location"
          title="Visit our shop"
          align="center"
        />
        <MotionSection>
          <p className="type-body-sm mb-6 text-center font-light text-white/45 sm:mb-8">{site.address}</p>
          <div className="overflow-hidden border border-white/15">
            <iframe
              title="AK Wraps & Customs location map"
              src={site.mapEmbedUrl}
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-6 text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="type-caption font-sans font-medium uppercase text-white/40 transition-colors hover:text-white"
            >
              Get directions
            </a>
          </p>
        </MotionSection>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Partners"
          title="Partners & brands"
          align="center"
        />
        <MotionSection>
          <ul className="mx-auto max-w-xl border border-white/15">
            {partners.map((partner, i) => (
              <li
                key={partner}
                className={`type-body-sm flex items-center px-5 py-4 font-light text-white/60 sm:px-8 sm:py-5 ${i > 0 ? "border-t border-white/10" : ""}`}
              >
                {partner}
              </li>
            ))}
          </ul>
        </MotionSection>
      </Section>

      <CtaBand />
    </>
  );
}
