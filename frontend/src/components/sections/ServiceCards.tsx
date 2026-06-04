import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Service } from "@/content/services";

interface ServiceCardsProps {
  services: Service[];
  showAllLink?: boolean;
}

export function ServiceCards({ services, showAllLink }: ServiceCardsProps) {
  return (
    <Section>
      <SectionHeading
        eyebrow="Featured Services"
        title="Built for your vehicle"
        description="From full wraps to interior upgrades — every service is tailored to your goals."
        align="center"
      />
      <MotionSection>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-2xl bg-warm-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={300}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm font-medium">
                  <span className="text-charcoal">{service.price}</span>
                  <Link
                    to="/services"
                    className="text-charcoal underline-offset-4 transition-colors hover:text-charcoal/70 hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {showAllLink && (
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex rounded-full bg-gold px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
            >
              View All Services
            </Link>
          </div>
        )}
      </MotionSection>
    </Section>
  );
}
