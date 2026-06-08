import { HeroSection } from "@/components/hero/HeroSection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { StatsSection } from "@/components/sections/StatsSection";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { featuredServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards services={featuredServices} showAllLink />
      <StatsSection />
      <BeforeAfterShowcase />
      <ProcessSection />
      <Testimonials items={testimonials} />
      <GalleryPreview />
      <CtaBand />
    </>
  );
}
