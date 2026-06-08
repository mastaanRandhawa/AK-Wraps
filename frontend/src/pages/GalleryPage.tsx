import { Instagram } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/content/gallery";
import { site } from "@/config/site";

export function GalleryPage() {
  return (
    <>
      <HeroSection
        page="gallery"
        title="Portfolio"
        description="Detailing transformations, paint protection, and premium finishes."
      />

      <Section variant="elevated">
        <MotionSection>
          <div className="columns-1 gap-px sm:columns-2 lg:columns-3">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="group relative mb-px break-inside-avoid overflow-hidden border border-white/10 bg-black"
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  className="image-zoom-hover w-full object-cover opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  width={900}
                  height={600}
                />
                <span className="type-caption absolute bottom-0 left-0 bg-black/80 px-3 py-2 font-sans font-medium uppercase text-white/70 sm:px-4 sm:py-3">
                  {img.category}
                </span>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <BeforeAfterShowcase />

      <Section variant="muted">
        <MotionSection>
          <div className="flex flex-col items-center border border-white/15 px-6 py-16 text-center sm:px-8 sm:py-24">
            <Instagram className="h-5 w-5 text-white/40" strokeWidth={1.5} />
            <h2 className="type-section mt-6 font-serif font-medium text-white sm:mt-8">
              @{site.socialHandle}
            </h2>
            <p className="type-body-sm mt-4 max-w-xs font-light text-white/45">
              Latest projects and behind-the-scenes.
            </p>
            <Button variant="secondary" size="lg" className="mt-10" asChild>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Instagram
              </a>
            </Button>
          </div>
        </MotionSection>
      </Section>

      <CtaBand />
    </>
  );
}
