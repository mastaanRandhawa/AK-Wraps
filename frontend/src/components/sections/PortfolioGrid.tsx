import { Link } from "react-router-dom";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/ui/media-card";
import { portfolioBuilds } from "@/content/portfolio";
import { routes } from "@/config/routes";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const builds = limit ? portfolioBuilds.slice(0, limit) : portfolioBuilds;

  return (
    <Section variant="default" id="portfolio">
      <SectionHeading
        eyebrow="AK Builds"
        title="Our Work"
        description="A selection of vehicles completed in-house."
        align="center"
      />
      <div className="grid gap-[var(--spacing-grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
        {builds.map((build, i) => (
          <MotionReveal key={build.id} delay={i * 80} variant="maskReveal">
            <MediaCard
              variant="portfolio"
              image={build.image}
              alt={`${build.brand} ${build.title}`}
              href={routes.gallery}
              brandLogo={build.brandLogo}
              brandName={build.brand}
              services={build.services}
            />
          </MotionReveal>
        ))}
      </div>
      {showCta && (
        <MotionReveal delay={200} className="mt-16 text-center sm:mt-20">
          <Button variant="default" size="lg" asChild>
            <Link to={routes.gallery}>View Full Gallery</Link>
          </Button>
        </MotionReveal>
      )}
    </Section>
  );
}
