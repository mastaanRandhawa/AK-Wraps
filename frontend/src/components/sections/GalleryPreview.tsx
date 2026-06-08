import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/content/gallery";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our finest work"
        description="Detailing transformations, paint protection, and ceramic finishes."
        align="center"
      />
      <MotionSection>
        <div className="grid auto-rows-[minmax(160px,28vw)] grid-cols-2 gap-px border border-white/10 bg-white/10 sm:auto-rows-[220px] md:auto-rows-[280px] md:grid-cols-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={cn(
                "group relative overflow-hidden bg-black",
                i === 0 && "col-span-2 row-span-2",
              )}
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                className="image-zoom-hover h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 p-5 transition-transform duration-300 group-hover:translate-y-0">
                <p className="editorial-label">{img.category}</p>
                <p className="type-body-sm mt-2 font-sans font-light text-white/70">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center sm:mt-16 md:mt-20">
          <Button variant="secondary" size="lg" asChild>
            <Link to={routes.gallery}>View Full Gallery</Link>
          </Button>
        </div>
      </MotionSection>
    </Section>
  );
}
