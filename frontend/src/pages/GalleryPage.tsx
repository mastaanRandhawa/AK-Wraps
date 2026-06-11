import { HeroSection } from "@/components/hero/HeroSection";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
export function GalleryPage() {
  return (
    <>
      <HeroSection
        page="gallery"
        title="Portfolio"
        description="Detailing transformations, paint protection, and premium finishes."
        badge="Our Work"
      />

      <PortfolioGrid showCta={false} enableFilter />

      <InstagramCarousel showHeading />

      <BeforeAfterShowcase />
    </>
  );
}
