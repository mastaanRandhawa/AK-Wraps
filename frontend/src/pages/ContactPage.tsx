import { HeroSection } from "@/components/hero/HeroSection";
import { ContactCta } from "@/components/sections/ContactCta";
import { MapEmbed } from "@/components/ui/map-embed";

export function ContactPage() {
  return (
    <>
      <HeroSection
        page="contact"
        title="Get in Touch"
        description="Book an appointment or request a quote at our Delta studio."
        badge="Contact"
      />

      <ContactCta variant="contact" />

      <MapEmbed variant="default" showHeading={false} className="!pt-0" />
    </>
  );
}
