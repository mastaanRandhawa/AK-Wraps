import { HeroSection } from "@/components/hero/HeroSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { StatsSection } from "@/components/sections/StatsSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { featuredServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServiceCards services={featuredServices} showAllLink />
      <StatsSection />
      <GalleryPreview />
      <Testimonials items={testimonials} />
      <CtaBand />
    </>
  );
}
