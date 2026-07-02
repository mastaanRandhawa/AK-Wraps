import { HeroSection } from "@/components/hero/HeroSection";
import { ContactCta } from "@/components/sections/ContactCta";
import { MapEmbed } from "@/components/ui/map-embed";
import { usePageMeta } from "@/hooks/use-page-meta";
import { site } from "@/config/site";

export function ContactPage() {
  usePageMeta({
    title: "Contact",
    description: `Book an appointment or request a quote at AK Wraps & Customs, ${site.address}. Call ${site.phone}.`,
  });

  return (
    <>
      <HeroSection
        page="contact"
        title="Get in Touch"
        description="Book an appointment or request a quote at our Delta studio."
        badge="Contact"
      />

      <ContactCta variant="contact" />

      <MapEmbed variant="default" showHeading />
    </>
  );
}
