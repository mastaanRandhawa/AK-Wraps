import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { galleryImages } from "@/content/gallery";

export function GalleryPreview() {
  const preview = galleryImages.slice(0, 4);

  return (
    <Section variant="warm">
      <SectionHeading
        eyebrow="Portfolio"
        title="Recent work"
        description="Vehicle wraps, paint protection, ceramic coatings, and custom enhancements."
        align="center"
      />
      <MotionSection>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {preview.map((img, i) => (
            <div
              key={img.id}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-[400px]" : "aspect-square"
              }`}
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                width={600}
                height={600}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex font-semibold text-charcoal transition-colors hover:text-charcoal/70"
          >
            View full gallery →
          </Link>
        </div>
      </MotionSection>
    </Section>
  );
}
