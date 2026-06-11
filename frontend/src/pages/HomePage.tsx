import { HeroSection } from "@/components/hero/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { featuredServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <ServiceCarousel services={featuredServices} />
      <PortfolioGrid limit={6} />
      <InstagramCarousel id="gallery-preview" limit={6} showHeading />
      <Testimonials items={testimonials} />
      <ContactCta />
    </>
  );
}
