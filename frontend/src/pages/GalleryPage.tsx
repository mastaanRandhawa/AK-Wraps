import { HeroSection } from "@/components/hero/HeroSection";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";

export function GalleryPage() {
  return (
    <>
      <HeroSection
        page="gallery"
        title="Portfolio"
        description="Detailing transformations, paint protection, and premium finishes."
      />

      <InstagramCarousel showHeading={false} />

      <BeforeAfterShowcase />

      <CtaBand />
    </>
  );
}
