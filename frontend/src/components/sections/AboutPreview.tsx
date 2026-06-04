import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { SafeImage } from "@/components/ui/safe-image";
import { site } from "@/config/site";

export function AboutPreview() {
  return (
    <Section variant="warm">
      <MotionSection>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <SafeImage
              src={images.shopExterior}
              alt="AK Wraps & Customs shop"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              width={800}
              height={1000}
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Premium customization for every vehicle"
              description={`${site.name} specializes in vinyl wraps, paint protection, ceramic coating, and vehicle enhancements — serving ${site.serviceAreas.slice(0, 3).join(", ")}, and the Greater Vancouver area.`}
            />
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              We combine quality craftsmanship with premium materials to deliver
              results that protect, transform, and personalize your vehicle.
              Every project receives a tailored approach from consultation to
              final inspection.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-charcoal transition-colors hover:text-charcoal/70"
            >
              Discover our story <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </MotionSection>
    </Section>
  );
}
