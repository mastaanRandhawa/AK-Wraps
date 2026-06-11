import { Link } from "react-router-dom";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { vehicleBrands } from "@/content/brands";
import { routes } from "@/config/routes";

export function BrandsSection() {
  return (
    <Section variant="default">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          titleMuted="Your Trusted"
          titleBold="Vehicle Specialists"
        />
        <MotionReveal delay={100}>
          <Button variant="default" size="lg" asChild>
            <Link to={routes.gallery}>View Portfolio</Link>
          </Button>
        </MotionReveal>
      </div>

      <MotionReveal delay={200} variant="fade">
        <div className="fade-edge-x mt-16">
          <div className="grid grid-cols-2 gap-px bg-white/[0.08] sm:grid-cols-4">
            {vehicleBrands.map((brand, i) => (
              <MotionReveal
                key={brand.id}
                delay={i * 50}
                variant="fade"
                className="group flex items-center justify-center bg-black p-[var(--spacing-card-padding)] transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <BrandLogo
                  src={brand.logo}
                  name={brand.name}
                  interactive
                  className="opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                />
              </MotionReveal>
            ))}
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
