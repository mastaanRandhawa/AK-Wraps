import { Instagram } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { galleryImages, beforeAfter } from "@/content/gallery";
import { site } from "@/config/site";

export function GalleryPage() {
  return (
    <>
      <HeroSection
        page="gallery"
        title="Portfolio"
        description="Completed wraps, paint protection, ceramic coatings, and custom vehicle projects."
      />

      <Section>
        <MotionSection>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative mb-6 break-inside-avoid overflow-hidden rounded-xl"
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                  width={900}
                  height={600}
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-warm-white">
                  {img.category}
                </span>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <Section variant="warm">
        <SectionHeading
          eyebrow="Transformations"
          title="Before & After"
          align="center"
        />
        <MotionSection>
          <div className="grid gap-12 md:grid-cols-2">
            {beforeAfter.map((item) => (
              <div key={item.id}>
                <p className="mb-4 text-center font-serif text-xl font-medium text-charcoal">
                  {item.label}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Before
                    </p>
                    <SafeImage
                      src={item.before}
                      alt={`${item.label} before`}
                      className="aspect-[3/4] w-full rounded-xl object-cover"
                      loading="lazy"
                      width={400}
                      height={533}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      After
                    </p>
                    <SafeImage
                      src={item.after}
                      alt={`${item.label} after`}
                      className="aspect-[3/4] w-full rounded-xl object-cover"
                      loading="lazy"
                      width={400}
                      height={533}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <Section variant="gold">
        <MotionSection>
          <div className="flex flex-col items-center text-center">
            <Instagram className="h-10 w-10 text-charcoal" />
            <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-4xl">
              Follow @{site.socialHandle}
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Latest projects, behind-the-scenes, and customization inspiration.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
            >
              View on Instagram
            </a>
          </div>
        </MotionSection>
      </Section>
    </>
  );
}
