import directory from "@/content/home-service-directory.json";
import { WarrantySummary } from "@/components/sections/WarrantySummary";
import { MerchandiseSection } from "@/components/sections/MerchandiseSection";
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
      <ServiceCarousel services={featuredServices} />
      <section className="container-padding mx-auto max-w-7xl py-10"><h2 className="text-2xl font-semibold text-white">Vehicle wraps and protection, at our studio or your location.</h2><p className="mt-4 max-w-3xl leading-relaxed text-white/65">Our main studio is at 6165 BC-17A, Delta, BC. We offer mobile service in Delta, including Ladner and Tsawwassen, and in Surrey, Richmond, White Rock, Burnaby, Vancouver, Langley, Abbotsford, New Westminster and Coquitlam. Ask about a mobile appointment for your vehicle.</p><WarrantySummary compact /></section>
      <BrandsSection />
      <PortfolioGrid limit={2} />
      <CinematicBand
        eyebrow="The Delta studio"
        titleLines={["Run by the hands", "that do the work."]}
        accentLine={1}
        description="AK Wraps & Customs is a workshop, not a franchise. Our own team handles your wrap, PPF, tint or ceramic coating, whether at the Delta studio or by mobile appointment."
        image={images.pageHeroServices}
        cta={{ text: "Inside the studio", href: routes.about }}
      />
      <InstagramCarousel compact id="gallery-preview" limit={6} showHeading />
      <Testimonials items={testimonials} />
      <ContactCta />
      <nav id="local-services" aria-label="Service and location links" className="container-padding mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 pb-5 lg:grid-cols-3">
        {directory.map(group => <div key={group.city} className="min-w-0">
          <h2 className="text-sm font-semibold text-white">{group.city}</h2>
          <ul className="mt-1 flex flex-wrap gap-x-3">
            {group.links.map(link => <li key={link.label}><a href={link.href} className="inline-flex min-h-7 items-center py-1 text-xs leading-snug text-accent underline underline-offset-2 sm:text-sm">{link.label}</a></li>)}
          </ul>
        </div>)}
      </nav>
    </>
  );
}



