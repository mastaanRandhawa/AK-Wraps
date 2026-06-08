import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { getFeaturedBentoItems } from "@/content/service-bento";
import { routes } from "@/config/routes";
import type { Service } from "@/content/services";

interface ServiceCardsProps {
  services: Service[];
  showAllLink?: boolean;
  cardHref?: string;
}

export function ServiceCards({
  services,
  showAllLink,
  cardHref,
}: ServiceCardsProps) {
  const items = getFeaturedBentoItems(services, cardHref);

  return (
    <Section variant="elevated" id="services">
      <SectionHeading
        eyebrow="Services"
        title="Crafted for perfection"
        description="Precision, premium products, and an uncompromising eye for detail."
        align="center"
      />
      <MotionSection>
        <BentoGrid items={items} />
      </MotionSection>
      {showAllLink && (
        <MotionSection delay={360}>
          <div className="mt-20 text-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to={routes.services}>View All Services</Link>
            </Button>
          </div>
        </MotionSection>
      )}
    </Section>
  );
}
