import { MerchandiseSection } from "@/components/sections/MerchandiseSection";
import { ServicePageLinks } from "@/pages/SearchPage";
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


export function HomePage() {
  usePageMeta({
    title: "Car Wraps, PPF, Tint & Ceramic Coating in Delta | AK Wraps & Customs",
    description:
      "Car wraps, paint protection film (PPF), window tint and ceramic coating at our Delta studio, serving Surrey and Greater Vancouver. Request a vehicle-specific quote.",
  });

  return (
    <>
      <HeroSection />
      <MerchandiseSection />
      <BrandsSection />
      <section className="container-padding mx-auto max-w-7xl py-10"><h2 className="text-2xl font-semibold text-white">Car wraps, PPF, window tint and ceramic coating in Delta</h2><p className="mt-4 max-w-3xl leading-relaxed text-white/65">Visit AK Wraps &amp; Customs at 6165 BC-17A, Delta, BC. We welcome drivers from Delta, Surrey, Richmond, White Rock, Burnaby, Vancouver, Langley, Abbotsford, New Westminster and Coquitlam. All work takes place at our Delta studio.</p><ServicePageLinks /></section>
      <ServiceCarousel services={featuredServices} />
      <PortfolioGrid limit={2} />
      <CinematicBand
        eyebrow="The Delta studio"
        titleLines={["Run by the hands", "that do the work."]}
        accentLine={1}
        description="AK Wraps & Customs is a workshop, not a franchise. Every wrap, paint protection film, tint and ceramic job is handled in-house — no outsourcing, no shortcuts, and no vehicle leaves until it meets our standard."
        image={images.pageHeroServices}
        cta={{ text: "Book Appointment", href: routes.booking }}
      />
      <InstagramCarousel id="gallery-preview" limit={6} showHeading />
      <Testimonials items={testimonials} />
      <ContactCta />
    </>
  );
}



