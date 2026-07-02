import { HeroSection } from "@/components/hero/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { featuredServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { usePageMeta } from "@/hooks/use-page-meta";
import { site } from "@/config/site";

export function HomePage() {
  usePageMeta({
    title: site.name,
    description:
      "Premier auto protection, paint protection film, ceramic coating, vinyl wraps, and automotive customization in Delta & Greater Vancouver, BC.",
  });

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
