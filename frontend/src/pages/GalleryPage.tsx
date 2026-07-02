import { HeroSection } from "@/components/hero/HeroSection";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
import { usePageMeta } from "@/hooks/use-page-meta";

export function GalleryPage() {
  usePageMeta({
    title: "Portfolio",
    description:
      "Browse detailing transformations, paint protection, vinyl wraps, and premium finishes completed at AK Wraps & Customs.",
  });

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
