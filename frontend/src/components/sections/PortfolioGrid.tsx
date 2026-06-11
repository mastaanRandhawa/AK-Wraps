import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/ui/media-card";
import { PortfolioLightbox } from "@/components/ui/portfolio-lightbox";
import { portfolioBuilds, portfolioCategories } from "@/content/portfolio";
import { routes } from "@/config/routes";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
  enableFilter?: boolean;
}

export function PortfolioGrid({
  limit,
  showCta = true,
  enableFilter = false,
}: PortfolioGridProps) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sourceBuilds = limit ? portfolioBuilds.slice(0, limit) : portfolioBuilds;

  const visibleBuilds = useMemo(() => {
    if (!enableFilter || filterCategory === "All") return sourceBuilds;
    return sourceBuilds.filter((b) => b.category === filterCategory);
  }, [sourceBuilds, enableFilter, filterCategory]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Section variant="default" id="portfolio" className="[content-visibility:visible]">
      <SectionHeading
        eyebrow="AK Builds"
        title="Our Work"
        description="A selection of vehicles completed in-house."
        align="center"
      />

      {enableFilter && (
        <MotionReveal className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10 sm:gap-3">
          {portfolioCategories.map((category) => (
            <Button
              key={category}
              type="button"
              size="sm"
              variant={filterCategory === category ? "default" : "secondary"}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </Button>
          ))}
        </MotionReveal>
      )}

      <div className="-mx-[var(--spacing-container-x)] sm:mx-0">
        <div className="fade-edge-x sm:[mask-image:none] sm:[-webkit-mask-image:none]">
          <div className="carousel-snap flex flex-nowrap items-stretch gap-[var(--spacing-grid-gap)] overflow-x-auto scroll-smooth px-[var(--spacing-container-x)] pb-2 pt-1 overscroll-x-contain [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3">
            {visibleBuilds.map((build, i) => (
              <MotionReveal
                key={build.id}
                delay={i * 80}
                variant="fadeUp"
                className="w-[min(78vw,260px)] shrink-0 snap-center sm:w-full sm:min-w-0"
              >
                <MediaCard
                  variant="portfolio"
                  image={build.image}
                  imageFallback={build.imageFallback}
                  alt={`${build.brand} ${build.title}`}
                  title={`${build.brand} ${build.title}`}
                  onClick={() => openLightbox(i)}
                  brandLogo={build.brandLogo}
                  brandName={build.brand}
                  services={build.services}
                />
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>

      {visibleBuilds.length === 0 && (
        <p className="type-body mt-8 text-center text-white/50">
          No projects in this category yet.
        </p>
      )}

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

      <PortfolioLightbox
        builds={visibleBuilds}
        activeIndex={activeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setActiveIndex}
      />
    </Section>
  );
}
