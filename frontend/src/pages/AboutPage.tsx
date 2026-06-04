import { HeroSection } from "@/components/hero/HeroSection";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { values, partners } from "@/content/team";
import { site } from "@/config/site";
import { Award, MapPin } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <HeroSection
        page="about"
        title="Our Story"
        description="Passion for automotive customization and commitment to quality craftsmanship."
      />
      <Section>
        <MotionSection>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Company Story"
              title="Born from a passion for vehicles"
              align="center"
            />
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              AK Wraps & Customs started with a simple vision: bring premium
              vehicle customization to drivers across Greater Vancouver. From our
              shop in Delta, BC, we specialize in wraps, paint protection, and
              enhancements that make every vehicle stand out.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              We believe great work is a collaboration. Our team listens to your
              goals, recommends the right solutions, and delivers results built
              to last — whether you want a bold color change or invisible paint
              protection.
            </p>
          </div>
        </MotionSection>
      </Section>

      <Section variant="warm">
        <SectionHeading
          eyebrow="Mission"
          title="What guides us"
          align="center"
        />
        <MotionSection>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-cream p-8 text-center shadow-sm"
              >
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
          description="Proudly serving drivers across Greater Vancouver and the Fraser Valley."
          align="center"
        />
        <MotionSection>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-4">
            {site.serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 rounded-xl bg-warm-white px-4 py-3 shadow-sm"
              >
                <MapPin className="h-4 w-4 shrink-0 text-cerulean" />
                <span className="text-sm font-medium text-charcoal">{area}</span>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <Section variant="warm">
        <SectionHeading
          eyebrow="Shop Location"
          title="Visit our shop"
          align="center"
        />
        <MotionSection>
          <p className="mb-6 text-center text-muted-foreground">{site.address}</p>
          <div className="overflow-hidden rounded-lg">
            <iframe
              title="AK Wraps & Customs location map"
              src={site.mapEmbedUrl}
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-charcoal underline-offset-4 hover:underline"
            >
              Get directions →
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
          <ul className="mx-auto grid max-w-2xl gap-4">
            {partners.map((partner) => (
              <li
                key={partner}
                className="flex items-center gap-3 rounded-xl bg-warm-white px-6 py-4 shadow-sm"
              >
                <Award className="h-5 w-5 shrink-0 text-cerulean" />
                <span className="text-charcoal">{partner}</span>
              </li>
            ))}
          </ul>
        </MotionSection>
      </Section>

      <CtaBand />
    </>
  );
}
