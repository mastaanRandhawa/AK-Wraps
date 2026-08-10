import { HeroSection } from "@/components/hero/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CinematicBand } from "@/components/sections/CinematicBand";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { featuredServices } from "@/content/services";
import { images } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { usePageMeta } from "@/hooks/use-page-meta";
import { routes } from "@/config/routes";
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
      <CinematicBand
        eyebrow="The Delta studio"
        titleLines={["Run by the hands", "that do the work."]}
        accentLine={1}
        description="AK Wraps & Customs is a workshop, not a franchise. Every wrap, paint protection film, tint and ceramic job is handled in-house — no outsourcing, no shortcuts, and no vehicle leaves until it meets our standard."
        image={images.pageHeroServices}
        cta={{ text: "Book Appointment", href: routes.contact }}
      />
      <InstagramCarousel id="gallery-preview" limit={6} showHeading />
      <Testimonials items={testimonials} />
      <ContactCta />
    </>
  );
}
