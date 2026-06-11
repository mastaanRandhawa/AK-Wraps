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
      <div className="-mx-[var(--spacing-container-x)] sm:mx-0">
        <div className="fade-edge-x sm:[mask-image:none] sm:[-webkit-mask-image:none]">
        <div className="carousel-snap flex flex-nowrap gap-[var(--spacing-grid-gap)] overflow-x-auto scroll-smooth px-[var(--spacing-container-x)] pb-2 pt-1 overscroll-x-contain [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3">
          {builds.map((build, i) => (
            <MotionReveal
              key={build.id}
              delay={i * 80}
              variant="maskReveal"
              className="w-[min(68vw,220px)] shrink-0 snap-center sm:w-auto sm:shrink"
            >
              <MediaCard
                variant="portfolio"
                image={build.image}
                alt={`${build.brand} ${build.title}`}
                href={routes.gallery}
                brandLogo={build.brandLogo}
                brandName={build.brand}
                services={build.services}
                className="aspect-[4/5] sm:aspect-[3/4]"
              />
            </MotionReveal>
          ))}
        </div>
        </div>
      </div>
      {showCta && (
        <>
          <p className="type-caption mt-4 text-center text-white/35 sm:hidden">
            Swipe to browse projects
          </p>
          <MotionReveal delay={200} className="mt-10 text-center sm:mt-20">
            <Button variant="default" size="lg" asChild>
              <Link to={routes.gallery}>View Full Gallery</Link>
            </Button>
          </MotionReveal>
        </>
      )}
    </Section>
  );
}
